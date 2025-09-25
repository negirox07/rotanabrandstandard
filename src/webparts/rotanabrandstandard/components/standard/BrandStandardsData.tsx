import * as React from "react";
import { useState } from "react";
import styles from "./BrandStandardsData.module.scss";
import { IBrandStandardsData } from "./IBrandStandardsData";
import { Utility } from "../../../../services/Utility";
import { BrandStandardModel } from "../../../../models/BrandStandardModel";
import DocumentLinks from "./DocumentLinks";


function RenderHeaders(enableTitle: boolean) : React.ReactElement {
  return <thead className={styles.standardTableThead}>
    <tr>
      <th className={styles.standardTableTd}>Ref.</th>
      <th className={styles.standardTableTd}>Journey</th>
      <th className={styles.standardTableTd}>Touchpoint</th>
      {enableTitle && <th className={styles.standardTableTd}>Title</th>}
      <th className={styles.standardTableTd}>Last Updated</th>
      <th className={styles.standardTableTd}>Expand/Collapse</th>
    </tr>
  </thead>;
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
      {enableTitle && <td className={styles.standardTableTd}>{x.Title || ""}</td>}
      <td className={styles.standardTableTd}>
        {Utility.formatDateToLocale(x.Modified)}
      </td>
      <td className={styles.standardTableTd}>
        <button className={styles.toggleBtn} onClick={() => toggleRow(x.GUID)}>
          {isOpen ? "-" : "+"}
        </button>
      </td>
    </tr>
  );
}
function RenderRows(enableTitle: boolean, x: BrandStandardModel): React.ReactNode {
  return <tr>
    <td colSpan={6}>
      <div className={styles.expandContent}>
        <h6
          className={styles.expandContentH6}
          style={{ display: "none" }}
        >
          {enableTitle && <strong>{x.Title}</strong>}
        </h6>
        <p>{x.Standard}</p>
        <DocumentLinks documents={x.RelatedDocuments} />
      </div>
    </td>
  </tr>;
}

const BrandStandardsData: React.FC<IBrandStandardsData> = ({
  journeyName,
  brandStandardModel,
  enableTitle
}) => {
  // Track multiple open rows
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

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

  const data =
    journeyName === "All"
      ? [...brandStandardModel]
      : brandStandardModel.filter((x) => x.Category?.trim().toLowerCase() === journeyName.toLowerCase());

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.standardTable}>
          {RenderHeaders(enableTitle)}
          <tbody>
            {data.map((x) => {
              const isOpen = openRows.has(x.GUID);
              return (
                <React.Fragment key={x.GUID}>
                  {BrandDetailsRow(x, toggleRow, openRows, enableTitle)}
                  {isOpen && (RenderRows(enableTitle, x))}
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

