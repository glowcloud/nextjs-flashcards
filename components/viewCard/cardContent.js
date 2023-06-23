import IconButton from "../shared/iconButton";
import styles from "./viewCard.module.css";
import utilStyles from "../../styles/utils.module.css";

const CardContent = ({ card, currentSide, setCurrentSide }) => {
  return (
    <div className={styles.sides}>
      <h1 className={utilStyles.title}>{card.front}</h1>
      {card.contentHtml.map((content, index) => {
        if (index <= currentSide) {
          return (
            <div key={index}>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          );
        }
      })}
      <hr />
      {currentSide < card.contentHtml.length - 1 && (
        <IconButton
          src="/right-long-solid.svg"
          alt="Next Icon"
          height={18}
          width={18}
          text="Next side"
          handleClick={() => {
            setCurrentSide((prevSide) => prevSide + 1);
          }}
        />
      )}
    </div>
  );
};

export default CardContent;
