import { useState, useEffect } from "react";

import { heroes } from "../../constants/heroes";
import { Unit } from "../../models/unit";

export const Battlefield = () => {
  const [unitsForPlayerOne, setUnitsForPlayerOne] = useState<Unit[]>([]);
  const [unitsForPlayerTwo, setUnitsForPlayerTwo] = useState<Unit[]>([]);

  useEffect(() => {
    const playerOneUnits = getUnits();
    const playerTwoUnits = getUnits();
    setUnitsForPlayerOne(playerOneUnits);
    setUnitsForPlayerTwo(playerTwoUnits);
  }, []);

  const getUnits = () => {
    const result = [];

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      result.push(new heroes[randomIndex]());
    }

    return result;
  };
  console.log(unitsForPlayerOne);
  console.log(unitsForPlayerTwo);
  return (
    <div>
      <h1>Battlefield</h1>
      <div>
        {/* {units.map((unit) => {
          return <div key={unit.id}>{unit.name}</div>;
        })} */}
      </div>
    </div>
  );
};
