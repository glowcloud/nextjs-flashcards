import IconButton from "./iconButton";
import styles from "./confirmDialog.module.css";
import utilStyles from "../../styles/utils.module.css";

const ConfirmDialog = ({ setConfirmDialog, handleConfirm, text }) => {
  return (
    <div className={utilStyles.modal}>
      <span
        onClick={() => setConfirmDialog(false)}
        className={utilStyles.close}
        title="Close Modal"
      >
        &times;
      </span>

      <div className={utilStyles.content}>
        <h1 className={styles.text}>{text}</h1>
        <div className={styles.controls}>
          <IconButton
            src="/xmark-solid.svg"
            height={18}
            width={18}
            alt="Cancel Icon"
            text="Cancel"
            handleClick={() => setConfirmDialog(false)}
          />
          <IconButton
            src="/check-solid.svg"
            height={18}
            width={18}
            alt="Confirm Icon"
            text="Confirm"
            handleClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
