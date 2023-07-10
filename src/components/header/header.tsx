import { Link } from "react-router-dom";

import styles from "./style.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.routesWrapper}>
        <Link className={styles.link} to="/">
          Home
        </Link>
      </div>
    </div>
  );
};
