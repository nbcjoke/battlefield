import { FunctionComponent } from "react";

import { Action, ActionTypes, Unit } from "../../../../models/unit";

import styles from "./style.module.css";
import { Modal } from "../../../../components/modal/modal";

interface RoundInfoProps {
  units: Unit[];
  currentIndex: number;
  currentRound: number;
  isGameEnded: boolean;
  currentId: string;
  isOpenLog: boolean;
  logInformation: string[];
  setIsHovering: (id: string) => void;
  onAction: (action: Action) => void;
  setIsOpenLog: (isOpenLog: boolean) => void;
}

export const RoundInfo: FunctionComponent<RoundInfoProps> = ({
  units,
  currentIndex,
  currentRound,
  currentId,
  isOpenLog,
  logInformation,
  setIsHovering,
  onAction,
  setIsOpenLog,
}) => {
  const handleMouseOver = (id: string) => {
    setIsHovering(id);
  };

  const handleMouseOut = () => {
    setIsHovering("");
  };

  const changeModalState = () => {
    setIsOpenLog(!isOpenLog);
  };

  const currentAvailableTargets =
    units[currentIndex]?.getAvailableTargets?.(units);

  return (
    <div className={styles.roundInfoContainer}>
      <div className={styles.unitsContainer}>
        <div className={styles.unitsWrapper}>
          {units.map((unit) => {
            return (
              <div
                key={unit.id}
                onMouseOver={() => handleMouseOver(unit.id)}
                onMouseOut={handleMouseOut}
                className={styles.cardContainer}
              >
                <img
                  className={styles.unitImage}
                  src={unit.image}
                  alt={unit.name}
                  style={
                    currentId === unit.id ? { border: "2px solid green" } : {}
                  }
                />
                {unit.status === "dead" ? (
                  <div className={styles.deadUnit}>DEAD</div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={styles.teamTurn}
        style={
          units[currentIndex]?.team === "red"
            ? { color: "red" }
            : { color: "blue" }
        }
      >
        {units[currentIndex]?.team} turn
      </div>
      <div className={styles.currentRound}>Round: {currentRound}</div>
      <div className={styles.buttonsContainer}>
        {units[currentIndex]?.actions?.map((action) => {
          return [ActionTypes.attack, ActionTypes.heal].includes(
            action.action
          ) && !currentAvailableTargets?.length ? (
            ""
          ) : (
            <button
              key={action.label}
              className={styles.actionButton}
              onClick={() => onAction(action)}
            >
              {action.label}
            </button>
          );
        })}
        <button className={styles.actionButton} onClick={changeModalState}>
          Log
        </button>
      </div>
      {isOpenLog && (
        <Modal
          changeModalState={changeModalState}
          logInformation={logInformation}
        />
      )}
    </div>
  );
};
