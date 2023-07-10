import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";

import styles from "./style.module.css";
import { UnitCard } from "../unitCard/unitCard";

interface UnitRowProps {
  units: Unit[];
}

export const UnitRow: FunctionComponent<UnitRowProps> = ({ units }) => {
  console.log(units);
  return (
    <div className={styles.rowContainer}>
      {units.map((unit) => {
        return <UnitCard unit={unit} />;
      })}
    </div>
  );
};
