import styles from "./style.module.css";

const ListTitle = ({ title, description }) => {
  return (
    <div className={styles["list-title-container"]}>
      <div className={styles["list-title-header"]}>{title}</div>
      <div className={styles["list-title-desc"]}>{description}</div>
    </div>
  );
};

export default ListTitle;
