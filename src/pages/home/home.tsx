import { Link } from "react-router-dom";

import styles from "./style.module.css";

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Strategic game</h1>
      <Link className={styles.link} to="battlefield">
        Start
      </Link>
    </div>
  );
};
