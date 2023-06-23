import Image from "next/image";
import styles from "./iconButton.module.css";

const IconButton = ({ src, alt, height, width, handleClick, text }) => {
  return (
    <button className={styles.iconBtn} onClick={handleClick} type="button">
      <Image priority src={src} alt={alt} height={height} width={width} />
      {text}
    </button>
  );
};

export default IconButton;
