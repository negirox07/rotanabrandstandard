import { BrandDTO, BrandModel } from "../../../models/BrandModel";
import { BrandStandardModel } from "../../../models/BrandStandardModel";
import { ConfigItem } from "../../../models/ConfigModel";
import { DepartmentCount, DepartmentModel } from "../../../models/DepartmentModel";
import { StandardModel } from "../../../models/StandardModel";
import { IReusableMultiSelectOption } from "./dropdowns/IReusableSelectProps";

export interface IRotanaBrandStandardState {
    configItems: Array<ConfigItem>;
    brandListItems: Array<BrandModel>;
    brandStandardListItems : Array<BrandStandardModel>;
    brandStandardListItemsCopy :Array<BrandStandardModel>;
    departMentListItems: Array<DepartmentModel>;
    standardListItems: Array<StandardModel>;
    brandDropdownOptions?: IReusableMultiSelectOption[];
    journeyDropDownOptions?: IReusableMultiSelectOption[];
    tabsData?: string[];
    touchPointOptions?: IReusableMultiSelectOption[];
    selectedBrand?: string;
    selectedDepartment?: string[];
    selectedStandard?: string;
    searchText?: string;
    bannerTitle:string;
    bannerDescription:string;
    hotelsTitle:string;
    hotelsDescription:string;
    selectedBrandObj?:BrandDTO;
    departmentWithCounts?:Array<DepartmentCount>;
    errorMessage?:string;
    isPanelOpen?:boolean;
    panelMode?:'Add' | 'Edit' | 'View';
    selectedStandardObj?:StandardModel;
    loading:boolean;
}