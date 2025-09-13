import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPHelper } from "../../../services/ISPHelper";

export interface IRotanabrandstandardProps {
  webpartContext: WebPartContext;
  spHelper: ISPHelper;
  configListName: string;
  brands: string;
  departments: string;
  standards: string;
  bannerImgURL: string;
  bannerImgURL2: string;
}
