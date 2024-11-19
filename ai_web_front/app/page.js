"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navi from '@/components/Navi';

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
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 상태 관리
  const [isRating, setIsRating] = useState(false); // 별점 선택 UI 상태 관리
  const [activeReviewId, setActiveReviewId] = useState(null); // 현재 별점을 선택 중인 리뷰 ID

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

	// 2초 후 오버레이 자동 닫기
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
    setIsRating(false); // 별점 선택 UI 비활성화
    setActiveReviewId(null); // 활성 리뷰 ID 초기화
  };

  return (
    <div className={styles.Landing}>
			<Navi/>
      <div className={styles.Container}>
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
		 <div key={review.id} className={styles.chatRow}>
			 <p className={styles.newReview}>{review.reviewContents}</p>
			 <div className={styles.starRating}>
			 {/* 선택된 별점 표시 */}
			 {Array.from({ length: 5 }, (_, i) => (
				 <img
				 key={i}
				 src={
					 i < (review.modelRatings || 0)
					 ? "/yellow_star.svg"
					 : "/empty_star.svg"
				 }
				 />
			 ))}
			 </div>
		 </div>
		 ))}
        </div>

		{/* 오버레이 */}
		{showOverlay && (
          <div className={styles.overlay}>
            실제로 남길 별점을 입력해주세요. 차후 학습에 이용됩니다.
          </div>
        )}

		<div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // 입력 값 업데이트
          ></textarea>
          {!isRating && (
            <button className={styles.Upload} onClick={handleButtonClick}>
              <img src="/send.svg" width="14" height="12" />
            </button>
          )}
          {isRating && (
            <div className={styles.starRatingSelect}>
              {Array.from({ length: 5 }, (_, i) => (
                <img
                  key={i}
                  src="/empty_star.svg"
				  width="24" // 원하는 너비(px 단위)
				  height="24" // 원하는 높이(px 단위)
                  onClick={() => handleRatingSelect(i + 1)} // 별점 선택
                  onMouseEnter={(e) =>
                    (e.target.src = "/yellow_star.svg")
                  } // 미리보기
                  onMouseLeave={(e) =>
                    (e.target.src = "/empty_star.svg")
                  } // 미리보기 해제
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
