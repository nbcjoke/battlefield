import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";

import paralyze from "../../../../assets/gif/paralyze.gif";
import fire from "../../../../assets/gif/fire.gif";
import styles from "./style.module.css";

interface UnitCardProps {
  unit: Unit;
  isHovering: string;
  currentId: string;
  availableIds: string[];
  selectTarget: (target: Unit) => void;
}

export const UnitCard: FunctionComponent<UnitCardProps> = ({
  unit,
  isHovering,
  currentId,
  availableIds,
  selectTarget,
}) => {
  const onCardClick = () => {
    selectTarget(unit);
    // if(true) {
    //   return;
    // }
  };
  // console.log(unit.isHealing);
  return (
    <div
      className={styles.unitCardContainer}
      key={unit.id}
      style={
        isHovering === unit.id || currentId === unit.id
          ? { boxShadow: "0px 5px 19px 6px rgba(171, 174, 176, 0.29)" }
          : unit.status === "dead"
          ? { pointerEvents: "none" }
          : availableIds.includes(unit.id)
          ? { border: "1px solid green" }
          : unit.status === "paralyzed"
          ? { pointerEvents: "none" }
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
      <div
        className={styles.deadUnit}
        style={
          unit.status === "dead" ? { display: "flex" } : { display: "none" }
        }
      >
        DEAD
      </div>
      {unit.status === "paralyzed" ? (
        <img className={styles.paralyzeUnit} src={paralyze} alt="paralyzed" />
      ) : unit.isAttacking ? (
        <img src={fire} alt="fired" className={styles.heatedUnit} />
      ) : unit.isHealing ? (
        <img src={fire} alt="healed" className={styles.heatedUnit} />
      ) : (
        ""
      )}
    </div>
  );
};
