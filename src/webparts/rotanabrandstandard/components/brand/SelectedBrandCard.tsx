import * as React from "react";
import styles from "./selectbrandcard.module.scss"; // adjust path
import { BrandPageConstants } from "../../../../models/SPConstants";
import { Utility } from "../../../../services/Utility";
import { IBrandCardProps } from "./IBrandCardProps";


const BrandCard: React.FC<IBrandCardProps> = ({ brand }) => {
  return (
    <div className={styles.brandCard}>
      <div className={styles.brandCardLeft}>
        <h4 className={styles.brandCardTitle}>{brand.Title}</h4>

        <div className={styles.brandCardStars}>
          {brand.BrandRating &&
            Array.from({ length: brand.BrandRating }, (_, i) => (
              <span key={i}>★</span>
            ))}
        </div>

        <p className={styles.brandCardDesc}>{brand.BrandDescription}</p>
      </div>

      <div className={styles.brandCardRight}>
        <div>
          <span className={styles.brandCardLabel}>
            {BrandPageConstants.Standards}
          </span>
          <div className={styles.brandCardValue}>{brand.standardsCount}</div>
        </div>

        <div>
          <span className={styles.brandCardLabel}>
            {BrandPageConstants.Departments}
          </span>
          <div className={styles.brandCardValue}>{brand.departmentsCount}</div>
        </div>

        <div>
          <span className={styles.brandCardLabel}>Last Updated</span>
          <div
            className={`${styles.brandCardValue} ${styles.brandCardValueBold}`}
          >
            {Utility.formatDate(brand.Modified)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
