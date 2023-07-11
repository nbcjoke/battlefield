import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";

import styles from "./style.module.css";

interface UnitCardProps {
  unit: Unit;
  isHovering: string;
  selectTarget: (target: Unit) => void;
}

export const UnitCard: FunctionComponent<UnitCardProps> = ({
  unit,
  isHovering,
  selectTarget,
}) => {
  const onCardClick = () => {
    selectTarget(unit);
    // if(true) {
    //   return;
    // }
  };

  return (
    <div
      className={styles.unitCardContainer}
      key={unit.id}
      style={
        isHovering === unit.id
          ? { boxShadow: "0px 5px 19px 6px rgba(171, 174, 176, 0.29)" }
          : {}
      }
      onClick={onCardClick}
    >
      <h2>{unit.name}</h2>
      <div className={styles.imageContainer}>
        <img className={styles.unitImage} src={unit.image} alt={unit.name} />
      </div>
      <p className={styles.unitHealth}>
        {unit.currentHealth}/{unit.health}
      </p>
    </div>
  );
};
