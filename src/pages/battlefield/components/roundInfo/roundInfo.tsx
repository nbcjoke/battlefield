import { FunctionComponent, useEffect } from "react";

import { Action, ActionTypes, Unit } from "../../../../models/unit";

import styles from "./style.module.css";

interface RoundInfoProps {
  units: Unit[];
  currentIndex: number;
  currentRound: number;
  currentAction?: Action;
  setIsHovering: (id: string) => void;
  onAction: (action: Action) => void;
}

export const RoundInfo: FunctionComponent<RoundInfoProps> = ({
  units,
  currentIndex,
  currentAction,
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
          return (
            <button
              key={action.label}
              className={styles.actionButton}
              onClick={() => onAction(action)}
              disabled={!!currentAction}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
