import { useState, useEffect } from "react";

import { heroes } from "../../constants/heroes";
import { UnitRow } from "./components/unitRow/unitRow";
import { RoundInfo } from "./components/roundInfo/roundInfo";
import { Action, ActionTypes, Status, Unit } from "../../models/unit";

import styles from "./style.module.css";

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
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string>("");
  const [isOpenLog, setIsOpenLog] = useState<boolean>(false);
  const [logInformation, setLogInformation] = useState<string[]>([]);

  useEffect(() => {
    const redTeamUnits = getUnits("red");
    const blueTeamUnits = getUnits("blue");
    setRedTeamUnits(redTeamUnits.reverse());
    setBlueTeamUnits(blueTeamUnits);
    const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
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

    unit.performAction(action, units);

    finishAction(action);
  };

  const setAvailableTargets = (): void => {
    const unit = units[currentIndex];
    const ids = unit.getAvailableTargets(units);
    setAvailableIds(ids);
  };

  const selectTarget = (target: Unit) => {
    if (!currentAction) {
      return;
    }
    const unit = units[currentIndex];
    if (availableIds.includes(target.id)) {
      unit.performAction(currentAction, units, target);
      finishAction(currentAction, target);
      setCurrentAction(undefined);
    }
  };

  const checkGameState = (units: Unit[]) => {
    const aliveRedTeam = units.filter(
      (unit) => unit.team === "red" && unit.status !== "dead"
    );
    if (!aliveRedTeam.length) {
      setGameResult("Blue team win");
      return true;
    }

    const aliveBlueTeam = units.filter(
      (unit) => unit.team === "blue" && unit.status !== "dead"
    );
    if (!aliveBlueTeam.length) {
      setGameResult("Red team win");
      return true;
    }

    if (
      units.every(
        (unit) =>
          ["healer", "paralyzer"].includes(unit.type) && unit.status !== "dead"
      )
    ) {
      setGameResult("Draw");
      return true;
    }
    return false;
  };

  const finishAction = (action: Action, target?: Unit) => {
    const isEnded = checkGameState(units);
    if (isEnded) {
      setIsGameEnded(true);
      return;
    }

    let index = 0;
    if (currentIndex === units.length - 1) {
      finishRound();
      return;
    }
    index = getNextIndex(units, currentIndex + 1);
    if (index >= units.length) {
      finishRound();
      return;
    }
    setCurrentIndex(index);
    setCurrentId(units[index].id);
    setAvailableIds([]);

    const result = getLogMessage(
      units[currentIndex],
      action.action,
      target?.name
    );
    setLogInformation([...logInformation, result]);
  };

  const getLogMessage = (
    unit: Unit,
    action: ActionTypes,
    targetName?: string
  ) => {
    let message: string = action;
    if (
      !targetName &&
      [ActionTypes.attack, ActionTypes.heal].includes(action)
    ) {
      message = `${action} all`;
    }
    return `${unit.name} ${message}${
      targetName ? ` ${targetName}` : ""
    } in round ${currentRound}`;
  };

  const finishRound = () => {
    setCurrentRound(currentRound + 1);
    const sorted = getSortedUnits([...redTeamUnits, ...blueTeamUnits]);
    const index = getNextIndex(sorted, 0);
    setCurrentIndex(index);
    setCurrentId(sorted[index].id);
    setUnits(sorted);
    units.forEach((unit) => unit.resetState());
    alert(`Round ${currentRound} finished`);
  };

  const getNextIndex = (units: Unit[], index: number): number => {
    let unit = units[index];
    while (unit && unit.status !== Status.alive) {
      index++;
      unit = units[index];
    }
    return index;
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {isGameEnded ? (
        <div className={styles.gameEnded}>
          <p className={styles.result}>{gameResult}</p>
          <button onClick={refreshPage} className={styles.actionButton}>
            Next game
          </button>
        </div>
      ) : (
        <div className={styles.battlefieldContainer}>
          <div className={styles.teamsContainer}>
            <div className={styles.infoContainer}>
              <p
                style={{ backgroundColor: "red" }}
                className={styles.teamColor}
              >
                RED
              </p>
              <div className={styles.row}>
                {redTeamUnits.map((units, index) => {
                  return (
                    <UnitRow
                      key={index}
                      units={units}
                      isHovering={isHovering}
                      currentId={currentId}
                      availableIds={availableIds}
                      selectTarget={selectTarget}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.separator}>VS</div>
            <div className={styles.infoContainer}>
              <p
                style={{ backgroundColor: "blue" }}
                className={styles.teamColor}
              >
                BLUE
              </p>
              <div className={styles.row}>
                {blueTeamUnits.map((units, index) => {
                  return (
                    <UnitRow
                      key={index}
                      units={units}
                      isHovering={isHovering}
                      currentId={currentId}
                      availableIds={availableIds}
                      selectTarget={selectTarget}
                    />
                  );
                })}
              </div>
            </div>
            <RoundInfo
              units={units}
              currentIndex={currentIndex}
              currentRound={currentRound}
              isGameEnded={isGameEnded}
              currentId={currentId}
              isOpenLog={isOpenLog}
              logInformation={logInformation}
              setIsHovering={setIsHovering}
              onAction={onAction}
              setIsOpenLog={setIsOpenLog}
            />
          </div>
        </div>
      )}
    </>
  );
};
