import { useState, useEffect } from "react";

import { heroes } from "../../constants/heroes";
import { Unit } from "../../models/unit";

import { UnitCard } from "./components/unitCard/unitCard";
import { UnitRow } from "./components/unitRow/unitRow";

import styles from "./style.module.css";

export const Battlefield = () => {
  const [unitsForPlayerOne, setUnitsForPlayerOne] = useState<Unit[][]>([]);
  const [unitsForPlayerTwo, setUnitsForPlayerTwo] = useState<Unit[][]>([]);

  useEffect(() => {
    const playerOneUnits = getUnits();
    const playerTwoUnits = getUnits();
    setUnitsForPlayerOne(playerOneUnits);
    setUnitsForPlayerTwo(playerTwoUnits);
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

  return (
    <div className={styles.battlefieldContainer}>
      <h1 className={styles.title}>Battlefield</h1>
      <div className={styles.teamsContainer}>
        {unitsForPlayerOne.map((units) => {
          return <UnitRow units={units} />;
        })}
        <div className={styles.separator}>VS</div>
        {unitsForPlayerTwo.map((units) => {
          return <UnitRow units={units} />;
        })}
      </div>
    </div>
  );
};
