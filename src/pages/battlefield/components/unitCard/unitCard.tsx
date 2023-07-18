import { FunctionComponent, useEffect, useState } from "react";

import { Unit } from "../../../../models/unit";

import paralyze from "../../../../assets/gif/paralyze.gif";
import fire from "../../../../assets/gif/fire.gif";
import selected from "../../../../assets/gif/selected.gif";
import styles from "./style.module.css";

interface UnitCardProps {
  unit: Unit;
  isHovering: string;
  currentId: string;
  availableIds: string[];
  // damagedIds: string[];
  selectTarget: (target: Unit) => void;
  // setDamagedIds: (ids: string[]) => void;
}

export const UnitCard: FunctionComponent<UnitCardProps> = ({
  unit,
  isHovering,
  currentId,
  availableIds,
  selectTarget,
}) => {
  const [currentHealth, setCurrentHealth] = useState<number>(0);

  useEffect(() => {
    setCurrentHealth(unit.currentHealth);
  }, [unit, selectTarget]);

  const onCardClick = () => {
    selectTarget(unit);
  };

  return (
    <div
      className={styles.unitCardContainer}
      key={unit.id}
      style={
        isHovering === unit.id
          ? { boxShadow: "0px 5px 19px 6px rgba(171, 174, 176, 0.4)" }
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
      {currentHealth <= unit.health / 4 ? (
        <div
          className={styles.health}
          style={{
            backgroundColor: "rgba(85, 0, 0, 0.7)",
          }}
        ></div>
      ) : currentHealth <= unit.health / 2 ? (
        <div
          className={styles.health}
          style={{ backgroundColor: "rgba(85, 0, 0, 0.5)" }}
        ></div>
      ) : (
        ""
      )}
      <div
        className={styles.deadUnit}
        style={
          unit.status === "dead" ? { display: "flex" } : { display: "none" }
        }
      >
        DEAD
      </div>
      {currentId === unit.id ? (
        <img className={styles.selectedUnit} src={selected} />
      ) : (
        ""
      )}
      {unit.status === "paralyzed" ? (
        <img className={styles.paralyzeUnit} src={paralyze} alt="paralyzed" />
      ) : (
        ""
      )}
    </div>
  );
};
