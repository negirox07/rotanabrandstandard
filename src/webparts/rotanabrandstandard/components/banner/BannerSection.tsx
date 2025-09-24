
import * as React from 'react';
import styles from './banner.module.scss';
const BannerSection: React.FC<{
  bannerId: string;
  bannerImageURL?: string;
  bannerImageURL2?: string;
  bannerTitle: string;
  bannerDescription: string;
}> = ({
  bannerId,
  bannerImageURL,
  bannerImageURL2,
  bannerTitle,
  bannerDescription,
}) => {
    console.log('Banner image URLs:', bannerImageURL, bannerImageURL2);
    return (
      <div className={styles.header} id={bannerId} style={{ backgroundImage: `url('${bannerImageURL}'), url('${bannerImageURL2}') , linear-gradient(to right, #202020, #202020)` }}>
        <h1 className={styles.headerh1}>{bannerTitle}</h1>
        <p className={styles.headerP}>{bannerDescription}</p>
      </div>
    );
  };

export default BannerSection;