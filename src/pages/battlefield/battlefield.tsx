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
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [isHovering, setIsHovering] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<Action | undefined>();
  const [availableIds, setAvailableIds] = useState<string[]>([]);

  useEffect(() => {
    const redTeamUnits = getUnits("red");
    const blueTeamUnits = getUnits("blue");
    setRedTeamUnits(redTeamUnits.reverse());
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
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * heroes.length);
        row.push(new heroes[randomIndex](team, i, j));
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
    const unit = units[currentIndex];
    if (action.isTargetRequired) {
      setCurrentAction(action);
      setAvailableTargets();
      return;
    }

    // const unit = units[currentIndex];

    unit.performAction(action, units);

    finishAction();
  };

  const setAvailableTargets = (): void => {
    const unit = units[currentIndex];
    const ids = unit.getAvailableTargets(units);
    console.log(ids);
    setAvailableIds(ids);
  };

  const selectTarget = (target: Unit) => {
    if (!currentAction) {
      return;
    }
    const unit = units[currentIndex];
    if (availableIds.includes(target.id)) {
      unit.performAction(currentAction, units, target);
      finishAction();
      setCurrentAction(undefined);
      setAvailableIds([]);
    }
  };

  const finishAction = () => {
    let index = 0;
    if (currentIndex === units.length - 1) {
      setCurrentRound(currentRound + 1);
      const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
      index = getNextIndex(sorted, 0);
      setCurrentIndex(index);
      setCurrentId(sorted[index].id);
      setUnits(sorted);
      console.log(sorted);
      units.forEach((unit) => unit.resetState());
      alert(`Round ${currentRound} finished`);
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
            <div className={styles.row}>
              {redTeamUnits.map((units, index) => {
                return (
                  <UnitRow
                    key={index}
                    units={units}
                    isHovering={isHovering}
                    selectTarget={selectTarget}
                    currentId={currentId}
                    availableIds={availableIds}
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
            <div className={styles.row}>
              {blueTeamUnits.map((units, index) => {
                return (
                  <UnitRow
                    key={index}
                    units={units}
                    isHovering={isHovering}
                    selectTarget={selectTarget}
                    currentId={currentId}
                    availableIds={availableIds}
                  />
                );
              })}
            </div>
          </div>
          <RoundInfo
            units={units}
            currentIndex={currentIndex}
            currentRound={currentRound}
            currentAction={currentAction}
            setIsHovering={setIsHovering}
            onAction={onAction}
          />
        </div>
      </div>
    </>
  );
};
