import { useState } from "react";
import IconButton from "../shared/iconButton";
import styles from "./viewCard.module.css";

const ViewCardReviews = ({ reviews }) => {
  const [isShowReviews, setIsShowReviews] = useState(false);

  return (
    <>
      <IconButton
        src={isShowReviews ? "/eye-slash-solid.svg" : "/eye-solid.svg"}
        height={18}
        width={18}
        alt="Edit Icon"
        text={isShowReviews ? "Hide reviews" : "Show reviews"}
        handleClick={() => {
          setIsShowReviews((prevShow) => !prevShow);
        }}
      />
      {isShowReviews && (
        <div className={styles.reviews}>
          {reviews.map((review, index) => (
            <p key={index}>
              <span>{review.time}: </span>
              <span
                className={
                  review.wasCorrect ? styles.correct : styles.incorrect
                }
              >
                {review.wasCorrect ? "Correct" : "Incorrect"}
              </span>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewCardReviews;
