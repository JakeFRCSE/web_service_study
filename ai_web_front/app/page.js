"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const LandingPage = () => {
  const tempData = `{
	"reviews": [
			{
				"id": 423,
				"reviewContents": "holy shit so delicious",
				"modelRatings": 5
			},
			{
				"id": 424,
				"reviewContents": "Is this food?",
				"modelRatings": 1
			},
			{
				"id": 425,
				"reviewContents": "disgusting",
				"modelRatings": 1
			},
			{
				"id": 426,
				"reviewContents": "dskafnsdklafnksdalflaksfdhlk;ashfl;asdhfiopasdufaiosdhfalsd;",
				"modelRatings": 3
			}
		],
	"pageinfo": {
		"maxPage": 5
	}
}`

  const [data, setData] = useState(JSON.parse(tempData));

  useEffect(()=>{
    console.log(data);
  }, []);

  return (
    <div className={styles.Landing}>
      <div className={styles.Container}>
      <div className={styles.navigationBar}>
        <img src='/aid_logo.png' width = "24" height = "35"/>
        <div className={styles.navItem1}>AI Developer</div>
		<div className={styles.navItem2}>맥도날드 리뷰별점 예측모델</div>
      </div>
        <div className={styles.semi_content}>가장 최근에 다녀왔던 맥도날드의 리뷰를 영어로 남겨보세요!</div>
        <div className={styles.semi_content_2}> AI가 당신이 남길 별점을 예측해드립니다.</div>

        <div className={styles.all_chatting_box}>
          {data.reviews.map((review) => (
            <div key={review.id} className={styles.review}>
			 <div className={styles.chatRow}>
    		  <p className={styles.reviewContents}>{review.reviewContents}</p>
              <p>예측 별점: {review.modelRatings} / 5</p>
			 </div>
            </div>
          ))}
        </div>


      <div className={styles.inputContainer}> 
        <input className={styles.input} type="text" />
        <button className={styles.Upload}></button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
