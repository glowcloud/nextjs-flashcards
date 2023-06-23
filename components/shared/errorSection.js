import utilStyles from "../../styles/utils.module.css";

const ErrorSection = ({ text }) => {
  return (
    <section className={utilStyles.section}>
      <h1 className={`${utilStyles.title} ${utilStyles.error}`}>{text}</h1>
    </section>
  );
};

export default ErrorSection;
