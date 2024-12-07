"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Navi from "@/components/Navi";

const LandingPage = () => {
  const initialData = [
    {
      id: 423,
      reviewContents: "holy shit so delicious",
      modelRatings: 5,
    },
    {
      id: 424,
      reviewContents: "Is this food?",
      modelRatings: 1,
    },
    {
      id: 425,
      reviewContents: "disgusting",
      modelRatings: 1,
    },
    {
      id: 426,
      reviewContents:
        "dskafnsdklafnksdalflaksfdhlk;ashfl;asdhfiopasdufaiosdhfalsd;",
      modelRatings: 3,
    },
  ];

  const [existingReviews, setExistingReviews] = useState(initialData); // 기존 리뷰
  const [newReviews, setNewReviews] = useState([]); // 새로 작성된 리뷰
  const [inputText, setInputText] = useState(""); // 입력한 텍스트 상태 관리
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 상태 관리
  const [isRating, setIsRating] = useState(false); // 별점 선택 UI 상태 관리
  const [activeReviewId, setActiveReviewId] = useState(null); // 현재 별점을 선택 중인 리뷰 ID

  // 리뷰 데이터를 서버 없이 한 페이지 내에서 처리
  const postReview = async (reviewContents, userRatings) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/review/", {
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
      console.log("등록된 리뷰 ID:", data.id);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };
  

  const handleButtonClick = () => {
    if (inputText.trim() === "") return; // 빈 문자열 입력 방지

    const newReview = {
      id: Date.now(), // 고유 ID 생성
      reviewContents: inputText,
      modelRatings: null, // 아직 별점 미선택
    };

    setNewReviews((prevReviews) => [...prevReviews, newReview]); // 새 리뷰 추가
    setInputText(""); // 입력 필드 초기화
    setIsRating(true); // 별점 선택 모드 활성화
    setActiveReviewId(newReview.id); // 활성 리뷰 ID 설정
    setShowOverlay(true); // 오버레이 표시

    // 5초 후 오버레이 자동 닫기
    setTimeout(() => {
      setShowOverlay(false);
    }, 5000);
  };

  const handleRatingSelect = (rating) => {
    setNewReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === activeReviewId ? { ...review, modelRatings: rating } : review
      )
    );

    const activeReview = newReviews.find((review) => review.id === activeReviewId);

    if (activeReview) {
      postReview(activeReview.reviewContents, rating);
    }

    setIsRating(false); // 별점 선택 UI 비활성화
    setActiveReviewId(null); // 활성 리뷰 ID 초기화
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
        <textarea
          className={styles.input}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // 입력 값 업데이트
        ></textarea>
        {!isRating && (
          <button className={styles.Upload} onClick={handleButtonClick}>
            <img src="/send.svg" width="14" height="12" alt="send" />
          </button>
        )}
        {isRating && (
          <div className={styles.starRatingSelect}>
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src="/empty_star.svg"
                width="24"
                height="24"
                alt="star"
                onClick={() => handleRatingSelect(i + 1)}
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
