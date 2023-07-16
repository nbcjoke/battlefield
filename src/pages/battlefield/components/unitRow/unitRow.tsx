import { FunctionComponent } from "react";

import { Unit } from "../../../../models/unit";
import { UnitCard } from "../unitCard/unitCard";

import styles from "./style.module.css";

interface UnitRowProps {
  units: Unit[];
  isHovering: string;
  currentId: string;
  availableIds: string[];
  selectTarget: (target: Unit) => void;
}

export const UnitRow: FunctionComponent<UnitRowProps> = ({
  units,
  isHovering,
  currentId,
  availableIds,
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
            currentId={currentId}
            availableIds={availableIds}
            selectTarget={selectTarget}
          />
        );
      })}
    </div>
  );
};
