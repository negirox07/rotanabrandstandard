import * as React from "react";
import { useState } from "react";
import styles from "./BrandStandardsData.module.scss";
import { IBrandStandardsData } from "./IBrandStandardsData";
import { Utility } from "../../../../services/Utility";
import { BrandStandardModel } from "../../../../models/BrandStandardModel";
import DocumentLinks from "./DocumentLinks";

function RenderHeaders(
  enableTitle: boolean,
  allExpanded: boolean,
  indeterminate: boolean,
  onToggleAll: () => void
): React.ReactElement {
  return (
    <thead className={styles.standardTableThead}>
      <tr>
        <th className={styles.standardTableTd}>Ref.</th>
        <th className={styles.standardTableTd}>Journey</th>
        <th className={styles.standardTableTd}>Touchpoint</th>
        {enableTitle && <th className={styles.standardTableTd}>Title</th>}
        <th className={styles.standardTableTd}>Last Updated</th>
        <th className={styles.standardTableTd}>
          <label
            title={
              allExpanded
                ? "Click to collapse all rows"
                : "Click to expand all rows"
            }
            className={styles.expandCollapseHeader}
          >
            <input
              type="checkbox"
              checked={allExpanded}
              ref={(el) => {
                if (el) el.indeterminate = indeterminate;
              }}
              onChange={onToggleAll}
            />{" "}
            Expand/Collapse
          </label>
        </th>
      </tr>
    </thead>
  );
}

function BrandDetailsRow(
  x: BrandStandardModel,
  toggleRow: (id: string) => void,
  openRows: Set<string>,
  enableTitle: boolean
): JSX.Element {
  const isOpen = openRows.has(x.GUID);

  return (
    <tr>
      <td className={styles.standardTableTd}>{x.RefNo || ""}</td>
      <td className={styles.standardTableTd}>{x.Category || ""}</td>
      <td className={styles.standardTableTd}>{x.Touchpoint || ""}</td>
      {enableTitle && (
        <td className={styles.standardTableTd}>{x.Title || ""}</td>
      )}
      <td className={styles.standardTableTd}>
        {Utility.formatDateToLocale(x.Modified)}
      </td>
      <td className={styles.standardTableTd}>
        <button
          className={styles.toggleBtn}
          onClick={() => toggleRow(x.GUID)}
          title={isOpen ? "Collapse this row" : "Expand this row"}
        >
          {isOpen ? "-" : "+"}
        </button>
      </td>
    </tr>
  );
}

function RenderRows(
  enableTitle: boolean,
  x: BrandStandardModel,
  isOpen: boolean
): React.ReactNode {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <tr>
      <td colSpan={6}>
        <div
          ref={contentRef}
          className={styles.expandContent}
          style={{
            maxHeight: isOpen
              ? contentRef.current?.scrollHeight + "px"
              : "0px",
            opacity: isOpen ? 1 : 0,
            padding: isOpen ? "2%" : "0px",
            transition: "max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease",
          }}
        >
          <h6 className={styles.expandContentH6}>
            {enableTitle && <strong>{x.Title}</strong>}
          </h6>
          <p>{x.Standard}</p>
          <DocumentLinks documents={x.RelatedDocuments} />
        </div>
      </td>
    </tr>
  );
}


const BrandStandardsData: React.FC<IBrandStandardsData> = ({
  journeyName,
  brandStandardModel,
  enableTitle,
}) => {
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  const data =
    journeyName === "All"
      ? [...brandStandardModel]
      : brandStandardModel.filter(
          (x) =>
            x.Category?.trim().toLowerCase() === journeyName.toLowerCase()
        );

  const toggleRow = (id: string): void => {
    setOpenRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // collapse
      } else {
        newSet.add(id); // expand
      }
      return newSet;
    });
  };

  const allIds = data.map((x) => x.GUID);
  const allExpanded = openRows.size === allIds.length && allIds.length > 0;
  const noneExpanded = openRows.size === 0;
  const indeterminate = !allExpanded && !noneExpanded;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenRows(new Set()); // collapse all
    } else {
      setOpenRows(new Set(allIds)); // expand all
    }
  };

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.standardTable}>
          {RenderHeaders(enableTitle, allExpanded, indeterminate, toggleAll)}
          <tbody>
            {data.map((x) => {
              const isOpen = openRows.has(x.GUID);
              return (
                <React.Fragment key={x.GUID}>
                  {BrandDetailsRow(x, toggleRow, openRows, enableTitle)}
                  {RenderRows(enableTitle, x, isOpen)}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandStandardsData;
