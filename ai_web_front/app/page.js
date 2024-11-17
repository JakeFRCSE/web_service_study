"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

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
      reviewContents: "dskafnsdklafnksdalflaksfdhlk;ashfl;asdhfiopasdufaiosdhfalsd;",
      modelRatings: 3,
    },
  ];

  const [existingReviews, setExistingReviews] = useState(initialData); // 기존 리뷰
  const [newReviews, setNewReviews] = useState([]); // 새로 작성된 리뷰
  const [inputText, setInputText] = useState(""); // 입력한 텍스트 상태 관리

  const handleButtonClick = () => {
    if (inputText.trim() === "") return; // 빈 문자열 입력 방지

    const newReview = {
      id: Date.now(), // 고유 ID 생성
      reviewContents: inputText,
      modelRatings: 3, // 기본 별점 값
    };

    setNewReviews((prevReviews) => [...prevReviews, newReview]); // 새 리뷰 추가
    setInputText(""); // 입력 필드 초기화
  };

  return (
    <div className={styles.Landing}>
      <div className={styles.Container}>
        <div className={styles.navigationBar}>
          <img src="/aid_logo.png" width="24" height="35" />
          <div className={styles.navItem1}>AI Developer</div>
          <div className={styles.navItem2}>맥도날드 리뷰별점 예측모델</div>
        </div>
        <div className={styles.semi_content}>
          가장 최근에 다녀왔던 맥도날드의 리뷰를 영어로 남겨보세요!
        </div>
        <div className={styles.semi_content_2}>
          AI가 당신이 남길 별점을 예측해드립니다.
        </div>

        <div className={styles.all_chatting_box}>
          {/* 기존 리뷰 */}
          {existingReviews.map((review) => (
            <div key={review.id}>
              <div className={styles.chatRow}>
                <p className={styles.oldReview}>
                  {review.reviewContents}
                </p>
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={
                        i < review.modelRatings
                          ? "/yellow_star.svg"
                          : "/empty_star.svg"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 새로 작성된 리뷰 */}
          {newReviews.map((review) => (
            <div key={review.id}>
              <div className={styles.chatRow}>
                <p className={styles.newReview}>
                  {review.reviewContents}
                </p>
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={
                        i < review.modelRatings
                          ? "/yellow_star.svg"
                          : "/empty_star.svg"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // 입력 값 업데이트
          ></textarea>
          <button className={styles.Upload} onClick={handleButtonClick}>
            <img src="/send.svg" width="14" height="12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
