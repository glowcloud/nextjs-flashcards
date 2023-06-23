import { useState } from "react";
import { useRouter } from "next/router";
import CardContent from "./cardContent";
import ViewCardReviews from "./viewCardReviews";
import IconButton from "../shared/iconButton";
import ConfirmDialog from "../shared/confirmDialog";
import styles from "./viewCard.module.css";
import utilStyles from "../../styles/utils.module.css";

const ViewCard = ({
  card,
  setCardView,
  handleSetCardEdit,
  handleCardDelete,
}) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [currentSide, setCurrentSide] = useState(-1);
  const router = useRouter();

  const handleDelete = async () => {
    await handleCardDelete();
    router.replace(router.asPath);
    setCardView(-1);
  };

  return (
    <div
      className={utilStyles.modal}
      onClick={(e) => {
        if (e.target.className.includes("modal")) {
          setCardView(-1);
        }
      }}
    >
      <span
        onClick={() => setCardView(-1)}
        className={utilStyles.close}
        title="Close Modal"
      >
        &times;
      </span>

      <div className={utilStyles.content}>
        <CardContent
          card={card}
          currentSide={currentSide}
          setCurrentSide={setCurrentSide}
        />
        <ViewCardReviews reviews={card.reviews} />

        <div className={styles.iconBtns}>
          <IconButton
            src="/pen-to-square-solid.svg"
            height={18}
            width={18}
            alt="Edit Icon"
            text="Edit card"
            handleClick={handleSetCardEdit}
          />
          <IconButton
            priority
            src="/trash-solid.svg"
            height={16}
            width={16}
            alt="Delete Icon"
            text="Delete card"
            handleClick={() => setIsConfirm(true)}
          />
        </div>
        {isConfirm && (
          <ConfirmDialog
            setConfirmDialog={setIsConfirm}
            handleConfirm={handleDelete}
            text="Are you sure you want to delete this card?"
          />
        )}
      </div>
    </div>
  );
};

export default ViewCard;
