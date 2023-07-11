import { FunctionComponent } from "react";

import { Action, ActionTypes, Unit } from "../../../../models/unit";

import styles from "./style.module.css";

interface RoundInfoProps {
  units: Unit[];
  currentIndex: number;
  currentTeam: string;
  currentAction?: Action;
  setIsHovering: (id: string) => void;
  onAction: (action: Action) => void;
}

export const RoundInfo: FunctionComponent<RoundInfoProps> = ({
  units,
  currentIndex,
  currentTeam,
  currentAction,
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
      {currentTeam === "red" ? (
        <div className={styles.redTeamTurn}>Red team turn</div>
      ) : (
        <div className={styles.blueTeamTurn}>Blue team turn</div>
      )}
      <div className={styles.buttonsContainer}>
        {units[currentIndex]?.actions?.map((action) => {
          return (
            <button
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
