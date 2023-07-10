import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";

import styles from "./style.module.css";

interface UnitCardProps {
  unit: Unit;
}

export const UnitCard: FunctionComponent<UnitCardProps> = ({ unit }) => {
  return (
    <div className={styles.unitCardContainer} key={unit.id}>
      <h2>{unit.name}</h2>
      <div className={styles.imageContainer}>
        <img className={styles.unitImage} src={unit.image} alt={unit.name} />
      </div>
      <p className={styles.unitHealth}>{unit.health}</p>
    </div>
  );
};
