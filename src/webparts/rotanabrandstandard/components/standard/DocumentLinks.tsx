import * as React from "react";
import styles from "./DocumentLinks.module.scss";
import { Utility } from "../../../../services/Utility";

export interface IDocumentLinksProps {
  documents?: string; // semicolon-separated URLs
}

const DocumentLinks: React.FC<IDocumentLinksProps> = ({ documents }) => {
  if (!documents) return null;

  const urls = documents
    .split(";")
    .map((u) => u.trim())
    .filter((u) => u.length > 0);

  if (urls.length === 0) return null;

  const getFileNameFromUrl = (url: string): string => {
    if (!url) return "";
    const cleanUrl = url.split("?")[0]; // remove query params
    const decodedUrl = decodeURIComponent(cleanUrl); // decode %20
    return decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
  };

  return (
    <div>
      <h6 className={styles.expandContentH6}>
        <strong>Documents</strong>
      </h6>

      {urls.map((url, idx) => {
        const fileName = getFileNameFromUrl(url);

        return (
          <div key={idx} className={styles.relatedDocs}>
            <img className={styles.fileIcon} src={Utility.getIcon(url)} alt="icon" />
            <a href={url} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentLinks;
