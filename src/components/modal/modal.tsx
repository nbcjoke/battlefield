import { useState, FunctionComponent } from "react";

import styles from "./style.module.css";

interface ModalProps {
  logInformation: string[];
  changeModalState: () => void;
}

export const Modal: FunctionComponent<ModalProps> = ({
  logInformation,
  changeModalState,
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.centred}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <button className={styles.actionButton} onClick={changeModalState}>
              Close
            </button>
          </div>
          <div className={styles.modalMain}>
            <h2 className={styles.title}>Logs</h2>
            <div className={styles.logs_container}>
              {logInformation.map((info, index) => {
                return <div key={index}>{info}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
