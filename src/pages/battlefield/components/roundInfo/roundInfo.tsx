import { FunctionComponent } from "react";

import { Action, ActionTypes, Unit } from "../../../../models/unit";

import styles from "./style.module.css";

interface RoundInfoProps {
  units: Unit[];
  currentIndex: number;
  currentRound: number;
  isGameEnded: boolean;
  setIsHovering: (id: string) => void;
  onAction: (action: Action) => void;
}

export const RoundInfo: FunctionComponent<RoundInfoProps> = ({
  units,
  currentIndex,
  isGameEnded,
  currentRound,
  setIsHovering,
  onAction,
}) => {
  const handleMouseOver = (id: string) => {
    setIsHovering(id);
  };

  const handleMouseOut = () => {
    setIsHovering("");
  };

  function refreshPage() {
    window.location.reload();
  }

  const currentAvailableTargets =
    units[currentIndex]?.getAvailableTargets?.(units);

  return (
    <div className={styles.roundInfoContainer}>
      {isGameEnded ? (
        <button onClick={refreshPage} className={styles.actionButton}>
          reload
        </button>
      ) : (
        <>
          {" "}
          <div className={styles.unitsContainer}>
            <div className={styles.unitsWrapper}>
              {units.map((unit) => {
                return (
                  <div
                    key={unit.id}
                    onMouseOver={() => handleMouseOver(unit.id)}
                    onMouseOut={handleMouseOut}
                  >
                    <img
                      className={styles.unitImage}
                      src={unit.image}
                      alt={unit.name}
                    />
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
            {units[currentIndex]?.team} team turn
          </div>
          <div className={styles.currentRound}>Round: {currentRound}</div>
          <div className={styles.buttonsContainer}>
            {units[currentIndex]?.actions?.map((action) => {
              return [ActionTypes.attack, ActionTypes.heal].includes(
                action.action
              ) && !currentAvailableTargets.length ? (
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
          </div>
        </>
      )}
    </div>
  );
};
