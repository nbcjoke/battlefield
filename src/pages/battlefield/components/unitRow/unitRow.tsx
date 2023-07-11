import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";
import { UnitCard } from "../unitCard/unitCard";

import styles from "./style.module.css";

interface UnitRowProps {
  units: Unit[];
  isHovering: string;
  selectTarget: (target: Unit) => void;
}

export const UnitRow: FunctionComponent<UnitRowProps> = ({
  units,
  isHovering,
  selectTarget,
}) => {
  return (
    <div className={styles.rowContainer}>
      {units.map((unit) => {
        return (
          <UnitCard
            key={unit.id}
            unit={unit}
            isHovering={isHovering}
            selectTarget={selectTarget}
          />
        );
      })}
    </div>
  );
};
