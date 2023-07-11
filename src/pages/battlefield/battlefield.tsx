import { useState, useEffect } from "react";

import { heroes } from "../../constants/heroes";
import { Action, ActionTypes, Unit } from "../../models/unit";
import { UnitRow } from "./components/unitRow/unitRow";

import styles from "./style.module.css";
import { RoundInfo } from "./components/roundInfo/roundInfo";

export const Battlefield = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [redTeamUnits, setRedTeamUnits] = useState<Unit[][]>([]);
  const [blueTeamUnits, setBlueTeamUnits] = useState<Unit[][]>([]);
  const [currentTeam, setCurrentTeam] = useState<string>("red");
  const [isHovering, setIsHovering] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentAction, setCurrentAction] = useState<Action | undefined>();

  useEffect(() => {
    const redTeamUnits = getUnits();
    const blueTeamUnits = getUnits();
    setRedTeamUnits(redTeamUnits);
    setBlueTeamUnits(blueTeamUnits);

    const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
    console.log(sorted);
    setUnits(sorted);
  }, []);

  const getUnits = () => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const row = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * heroes.length);
        row.push(new heroes[randomIndex]());
      }
      result.push(row);
    }
    return result;
  };

  const getSortedUnits = (units: Unit[][]) => {
    return units
      .reduce((res, row) => {
        return [...res, ...row];
      }, [])
      .sort((a, b) => {
        if (a.initiative === b.initiative) {
          return Math.random() > 0.5 ? 1 : -1;
        }

        return a.initiative - b.initiative;
      });
  };

  const onAction = (action: Action) => {
    if (action.isTargetRequired) {
      setCurrentAction(action);
      return;
    }

    const unit = units[currentIndex];

    unit.performAction(action, units);

    // if (action.action === ActionTypes.defened) {
    //   unit.defend();
    // }

    finishAction();
  };

  const selectTarget = (target: Unit) => {
    if (!currentAction) {
      return;
    }
    const unit = units[currentIndex];

    unit.performAction(currentAction, units, target);
    setCurrentAction(undefined);
  };

  const finishAction = () => {
    if (currentIndex === units.length - 1) {
      console.log("finish round");
      setCurrentIndex(0);
      const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
      setUnits(sorted);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <div className={styles.battlefieldContainer}>
        <div className={styles.teamsContainer}>
          <div className={styles.infoContainer}>
            <p style={{ backgroundColor: "red" }} className={styles.teamColor}>
              RED
            </p>
            <div>
              {redTeamUnits.map((units, index) => {
                return (
                  <UnitRow
                    key={index}
                    units={units}
                    isHovering={isHovering}
                    selectTarget={selectTarget}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.separator}>VS</div>
          <div className={styles.infoContainer}>
            <p style={{ backgroundColor: "blue" }} className={styles.teamColor}>
              BLUE
            </p>
            <div>
              {blueTeamUnits.map((units, index) => {
                return (
                  <UnitRow
                    key={index}
                    units={units}
                    isHovering={isHovering}
                    selectTarget={selectTarget}
                  />
                );
              })}
            </div>
          </div>
          <RoundInfo
            units={units}
            currentIndex={currentIndex}
            currentTeam={currentTeam}
            currentAction={currentAction}
            setIsHovering={setIsHovering}
            onAction={onAction}
          />
        </div>
      </div>
    </>
  );
};
