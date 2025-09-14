import { IReusableMultiSelectOption } from "../dropdowns/IReusableSelectProps";

export interface IFilterBarProps {
  brandDropdownOptions: IReusableMultiSelectOption[];
  selectedBrand: string;
  onBrandChange: (value: string) => void;

  departmentDropdownOptions: IReusableMultiSelectOption[];
  selectedDepartment: string[];
  onDepartmentChange: (value: string[]) => void;

  standardDropdownOptions: IReusableMultiSelectOption[];
  selectedStandard: string;
  onStandardChange: (value: string) => void;

  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchClick?: () => void;
}
