import { useState, useEffect } from "react";

import { heroes } from "../../constants/heroes";
import { Action, ActionTypes, Status, Unit } from "../../models/unit";
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
  const [currentId, setCurrentId] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<Action | undefined>();

  useEffect(() => {
    const redTeamUnits = getUnits("red");
    const blueTeamUnits = getUnits("blue");
    setRedTeamUnits(redTeamUnits);
    setBlueTeamUnits(blueTeamUnits);

    const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
    console.log(sorted);
    setUnits(sorted);
    setCurrentId(sorted[currentIndex].id);
  }, []);

  const getUnits = (team: string) => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const row = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * heroes.length);
        row.push(new heroes[randomIndex](team));
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
      .filter((unit) => unit.status !== "dead")
      .sort((a, b) => {
        if (a.initiative === b.initiative) {
          return Math.random() > 0.5 ? 1 : -1;
        }

        return b.initiative - a.initiative;
      });
  };

  const onAction = (action: Action) => {
    if (action.isTargetRequired) {
      setCurrentAction(action);
      // receive available targets id => setAvailableTargets(ids);
      return;
    }

    const unit = units[currentIndex];

    unit.performAction(action, units);

    finishAction();
  };

  const selectTarget = (target: Unit) => {
    if (!currentAction) {
      return;
    }
    const unit = units[currentIndex];

    unit.performAction(currentAction, units, target);
    finishAction();
    setCurrentAction(undefined);
  };

  const finishAction = () => {
    let index = 0;
    if (currentIndex === units.length - 1) {
      console.log("finish round");
      const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
      index = getNextIndex(sorted, 0);
      setCurrentIndex(index);
      setCurrentId(sorted[index].id);
      setUnits(sorted);
      return;
    }
    index = getNextIndex(units, currentIndex + 1);
    setCurrentIndex(index);
    setCurrentId(units[index].id);
  };

  const getNextIndex = (units: Unit[], index: number): number => {
    let unit = units[index];

    while (unit.status !== Status.alive) {
      index++;
      unit = units[index];
    }
    return index;
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
                    currentId={currentId}
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
                    currentId={currentId}
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
