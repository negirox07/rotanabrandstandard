import { LogDetails } from "../models/LogDetails";

export interface ISPHelper {
    getListData(url: string):Promise<any>;
    getListDataRecursive(url: string,data:any[]):Promise<any>;
    writeLog(props: any,logDetails:LogDetails): Promise<void>;
}