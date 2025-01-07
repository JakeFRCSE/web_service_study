"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navi from "@/components/Navi";

const LandingPage = () => {
  const [existingReviews, setExistingReviews] = useState([]);
  const [newReviews, setNewReviews] = useState([]); // 새로 작성된 리뷰
  const [inputText, setInputText] = useState(""); // 입력한 텍스트 상태 관리
  const [isRating, setIsRating] = useState(false); // 별점 선택 UI 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 기본값 1
  const pageSize = 30; // 한 페이지에 보여줄 리뷰 수
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 상태 관리
  const [activeReviewId, setActiveReviewId] = useState(null); // 현재 별점을 선택 중인 리뷰 ID
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [maxPage, setMaxPage] = useState(1); // 최대 페이지 상태 관리


  useEffect(() => {
    const loadInitialReviews = async () => {
      await fetchReviews(1, 30);
    };
  
    loadInitialReviews();
  }, []);
  
  useEffect(() => {
    if (currentPage > 1) {
      fetchReviews(currentPage, pageSize); 
    }
  }, [currentPage]);
  

  const fetchReviews = async (page, size) => {
    try {
      const validPage = page > 0 ? page : 1;
      const validSize = size > 0 ? size : pageSize; // 기본값은 pageSize
  
      const response = await fetch(
        `http://127.0.0.1:8080/api/review?page=${validPage}&size=${validSize}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setExistingReviews((prevReviews) => [...prevReviews, ...data.reviews]); // 기존 데이터에 추가
      setMaxPage(data.pageinfo.maxPage); // 최대 페이지 업데이트
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류:", error.message);
    }
  };
  

  const postReview = async (reviewContents, userRatings = null) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewContents,
          userRatings,
        }),
      });

      if (!response.ok) {
        console.error("리뷰 등록 실패:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("등록된 리뷰 데이터:", data);
      return data; // 등록된 리뷰 반환
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  const checkPredictionStatus = async (reviewId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/check/${reviewId}`
      );

      if (!response.ok) {
        console.error("리뷰 예측 상태 확인 실패:", response.statusText);
        return null;
      }

      const data = await response.json();
      console.log("예측 상태:", data);
      return data; // 예측 상태 반환
    } catch (error) {
      console.error("예측 상태 API 호출 중 오류:", error);
      return null;
    }
  };

  const fetchReviewPrediction = async (reviewId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/review/${reviewId}`
      );

      if (!response.ok) {
        console.error("리뷰 결과 가져오기 실패:", response.statusText);
        return null;
      }

      const data = await response.json();
      console.log("모델 연산 결과:", data);
      return data; // 모델 결과 반환
    } catch (error) {
      console.error("모델 결과 API 호출 중 오류:", error);
      return null;
    }
  };

  const handleReviewSubmit = () => {
    if (inputText.trim() === "") {
      console.error("리뷰 내용을 입력하세요.");
      return;
    }

    // 리뷰 내용을 임시로 저장하고 별점 입력 UI 활성화
    const tempReview = {
      id: Date.now(), // 임시 ID
      reviewContents: inputText.trim(),
      userRatings: null, // 별점은 아직 선택되지 않음
      modelRatings: null, // 모델 별점 초기화
    };

    setNewReviews((prevReviews) => [...prevReviews, tempReview]);
    setInputText(""); // 입력 필드 초기화
    setIsRating(true); // 별점 입력 활성화
    setActiveReviewId(tempReview.id); // 별점 선택 중인 리뷰 ID 저장
  };

  const handleRatingSubmit = async (rating) => {
    if (!activeReviewId || rating === null) {
      console.error("별점을 선택하세요.");
      return;
    }

    setIsRating(false); // 별점 입력 UI 비활성화
    setShowOverlay(false); // 오버레이 숨기기
    setLoading(true); // 로딩 상태 활성화

    // 리뷰 데이터 업데이트
    const updatedReviews = newReviews.map((review) =>
      review.id === activeReviewId ? { ...review, userRatings: rating } : review
    );
    setNewReviews(updatedReviews);

    // 서버에 리뷰 전송
    const reviewToSubmit = updatedReviews.find(
      (review) => review.id === activeReviewId
    );

    if (!reviewToSubmit) {
      console.error("리뷰를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    try {
      const newReview = await postReview(reviewToSubmit.reviewContents, rating);

      // 리뷰 데이터 업데이트
      const updatedReviews = newReviews.map((review) =>
        review.id === activeReviewId ? { ...review, id: newReview.id } : review
      );
      setNewReviews(updatedReviews);

      if (!newReview) {
        console.error("리뷰 등록 실패");
        setLoading(false);
        return;
      }

      // 상태 확인 함수
      const checkStatusAndFetchResult = async () => {
        try {
          const status = await checkPredictionStatus(newReview.id);

          if (status?.status) {
            // 상태가 완료되면 결과 가져오기
            const result = await fetchReviewPrediction(newReview.id);
            if (result) {
              setNewReviews((prevReviews) =>
                prevReviews.map((review) => {
                  return review.id === newReview.id
                    ? { ...review, modelRatings: result.modelRatings }
                    : review;
                })
              );
              console.log(
                `AI 예측 별점: ${result.modelRatings} (ID: ${newReview.id})`
              );
            }
            setLoading(false); // 로딩 상태 비활성화
          } else {
            console.log("예측 진행 중... 2초 후 다시 확인합니다.");
            setTimeout(checkStatusAndFetchResult, 2000); // 2초 후 재확인
          }
        } catch (error) {
          console.error("예측 상태 확인 중 에러:", error);
          setLoading(false);
        }
      };

      // 상태 확인 시작
      checkStatusAndFetchResult();
    } catch (error) {
      console.error("예측 상태 확인 중 에러:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.semi_content}>
        가장 최근에 다녀왔던 맥도날드의 리뷰를 영어로 남겨보세요!
      </div>
      <div className={styles.semi_content_2}>
        AI가 당신이 남길 별점을 예측해드립니다.
      </div>
      <Navi />
      <div className={styles.rectangle}></div>

      <div className={styles.all_chatting_box}>
        {/* 기존 리뷰 */}
        {existingReviews.map((review) => (
          <div key={review.id}>
            <div className={styles.chatRow}>
              <p className={styles.oldReview}>{review.reviewContents}</p>
              <div className={styles.starRating}>
                {Array.from({ length: 5 }, (_, i) => (
                  <img
                    key={i}
                    src={
                      i < review.modelRatings
                        ? "/yellow_star.svg"
                        : "/empty_star.svg"
                    }
                    alt="star"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* 새로 작성된 리뷰 */}
        {newReviews.map((review) => (
          <div key={review.id} className={styles.chatRow2}>
            <div className={styles.starRating}>
              {Array.from({ length: 5 }, (_, i) => (
                <img
                  key={i}
                  src={
                    i < review.modelRatings
                      ? "/yellow_star.svg"
                      : "/empty_star.svg"
                  }
                  alt="star"
                />
              ))}
            </div>
            <p className={styles.newReview}>{review.reviewContents}</p>
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        {/* 오버레이 */}
        {showOverlay && (
          <div className={styles.overlay}>
            실제로 남길 별점을 입력해주세요. 차후 학습에 이용됩니다.
          </div>
        )}

        {/* 로딩 상태 표시 */}
        {loading && <div className={styles.loading}>로딩 중...</div>}

        <textarea
          className={styles.input}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // 입력 값 업데이트
        ></textarea>

        {!isRating ? (
          // 별점 선택 모드가 비활성화된 경우
          <button
            className={styles.Upload}
            onClick={() => {
              // 별점 선택 모드 활성화
              setIsRating(true);
              setShowOverlay(true); // 오버레이 활성화
              handleReviewSubmit(); // 리뷰 제출 함수 호출
            }}
          >
            <img src="/send.svg" width="14" height="12" alt="send" />
          </button>
        ) : (
          // 별점 선택 UI
          <div className={styles.starRatingSelect}>
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src="/empty_star.svg"
                width="24"
                height="24"
                alt="star"
                onClick={() => {
                  handleRatingSubmit(i + 1); // 별점 선택
                }}
                onMouseEnter={(e) => (e.target.src = "/yellow_star.svg")}
                onMouseLeave={(e) => (e.target.src = "/empty_star.svg")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
