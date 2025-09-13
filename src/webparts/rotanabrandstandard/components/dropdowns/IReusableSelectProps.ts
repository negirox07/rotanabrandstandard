
export interface IReusableSelectOption {
  key: string | number;
  text: string;
}
export interface IReusableMultiSelectOption {
  value: string;
  label: string;
}
export interface IRotanaDropdownProps {
  label?: string;
  options: IReusableSelectOption[];
  multiSelect?: boolean;
  selectedKeys?: string[] | string;
  onChange: (selected: string[] | string) => void;
}

export interface IReusableMultiSelectProps {
  label?: string;
  options: IReusableMultiSelectOption[];
  multiSelect?: boolean;
  selectedKeys?: string[] | string;
  onChange: (selected: string[] | string) => void;
}