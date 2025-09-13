import * as React from "react";
import { IRotanaDropdownProps } from "./IReusableSelectProps";
/* import { IDropdownOption, Dropdown } from "@fluentui/react/lib/Dropdown";

export interface IRotanaDropdownProps {
  label?: string;
  options: IDropdownOption[];
  multiSelect?: boolean;
  selectedKeys?: string[] | string; // can be array (multi) or string (single)
  onChange: (selected: string[] | string) => void;
}

const RotanaDropdown: React.FC<IRotanaDropdownProps> = ({
  label,
  options,
  multiSelect = false,
  selectedKeys,
  onChange,
}) => {
  const handleChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    if (!option) return;

    if (multiSelect) {
      const current = Array.isArray(selectedKeys) ? [...selectedKeys] : [];
      if (option.selected) {
        current.push(option.key.toString());
      } else {
        const idx = current.indexOf(option.key.toString());
        if (idx > -1) current.splice(idx, 1);
      }
      onChange(current);
    } else {
      onChange(option.key.toString());
    }
  };

  return (
    <Dropdown
      label={label}
      className="form-select"
      placeholder="Select option(s)"
      multiSelect={multiSelect}
      options={options}
      selectedKeys={multiSelect ? (selectedKeys as string[]) : undefined}
      selectedKey={!multiSelect ? (selectedKeys as string) : undefined}
      onChange={handleChange}
    />
  );
};

export default RotanaDropdown; */

const RotanaDropdown: React.FC<IRotanaDropdownProps> = ({
  label,
  options,
  multiSelect = false,
  selectedKeys,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    if (multiSelect) {
      const values = Array.from(event.target.selectedOptions, (opt) => opt.value);
      onChange(values);
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      {label && <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>}
      <select
        multiple={multiSelect}
        value={multiSelect ? (selectedKeys as string[]) : (selectedKeys as string)}
        onChange={handleChange}
        className="form-select"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RotanaDropdown;

