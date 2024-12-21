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
  const [maxPage, setMaxPage] = useState(1);
  const pageSize = 5; // 한 페이지에 보여줄 리뷰 수
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 상태 관리
  const [activeReviewId, setActiveReviewId] = useState(null); // 현재 별점을 선택 중인 리뷰 ID
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  useEffect(() => {
    const fetchReviews = async () => {
      // currentPage와 pageSize의 유효성을 항상 보장
      const validPage = currentPage > 0 ? currentPage : 1;
      const validSize = pageSize > 0 ? pageSize : 5;

      try {
        // API 호출
        const response = await fetch(
          `http://127.0.0.1:8080/api/review?page=${validPage}&size=${validSize}`
        );

        if (!response.ok) {
          console.error("리뷰 데이터 가져오기 실패:", response.statusText);
          return;
        }

        const data = await response.json();
        setExistingReviews(data.reviews);
        setMaxPage(data.pageinfo.maxPage); // 최대 페이지 수 설정
      } catch (error) {
        console.error("리뷰 API 호출 중 에러 발생:", error);
      }
    };

    fetchReviews();
  }, [currentPage]); // currentPage가 변경될 때마다 호출


  // 리뷰 데이터를 서버 없이 한 페이지 내에서 처리
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
  

  const handleRatingSelect = async (rating) => {
    if (inputText.trim() === "") {
      console.error("리뷰 내용을 입력하세요.");
      return;
    }
  
    try {
      // 리뷰와 별점 서버로 전송
      const newReview = await postReview(inputText.trim(), rating);
  
      if (!newReview) {
        console.error("리뷰 등록 실패");
        return;
      }
  
      setNewReviews((prevReviews) => [...prevReviews, newReview]); // 새 리뷰 추가
      setInputText(""); // 입력 필드 초기화
      setIsRating(false); // 별점 선택 UI 비활성화
      setActiveReviewId(null); // 활성 리뷰 ID 초기화
      setShowOverlay(false); // 오버레이 닫기
    } catch (error) {
      console.error("리뷰 전송 중 에러 발생:", error);
    }
  };

  const handleReviewSubmit = async (rating) => {
    if (inputText.trim() === "" || rating === null) {
      console.error("리뷰 내용과 별점을 입력하세요.");
      return;
    }

    // 1. 리뷰 등록
    setLoading(true); // 로딩 상태 활성화
    const newReview = await postReview(inputText.trim(), rating);

    if (!newReview) {
      console.error("리뷰 등록 실패");
      setLoading(false);
      return;
    }

    setNewReviews((prevReviews) => [...prevReviews, newReview]); // 새 리뷰 추가
    setInputText(""); // 입력 필드 초기화
    setIsRating(false);

    // 2. 주기적으로 예측 상태 확인
    const interval = setInterval(async () => {
      const status = await checkPredictionStatus(newReview.id);

      if (status?.isCompleted) {
        clearInterval(interval); // 상태 확인 중단

        // 3. 모델 결과 가져오기
        const result = await fetchReviewPrediction(newReview.id);

        if (result) {
          setNewReviews((prevReviews) =>
            prevReviews.map((review) =>
              review.id === newReview.id
                ? { ...review, modelRatings: result.modelRatings }
                : review
            )
          );
        }

        setLoading(false); // 로딩 상태 비활성화
      } else if (status === null) {
        console.error("예측 상태 확인 실패. 주기적 호출 중단.");
        clearInterval(interval);
        setLoading(false);
      }
    }, 2000); // 2초 간격으로 상태 확인
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
                    i < (review.modelRatings || 0)
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
      if (inputText.trim() === "") {
        console.error("리뷰 내용을 입력하세요.");
        return;
      }

      // 별점 선택 모드 활성화
      setIsRating(true);
      setShowOverlay(true); // 오버레이 활성화
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
          handleReviewSubmit(i + 1); // 별점 선택
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
