import * as React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { IReusableMultiSelectProps } from "./IReusableSelectProps";
import styles from './rotanadropdowns.module.scss';
export const RotanaMultiSelect: React.FC<IReusableMultiSelectProps> = ({
    label,
    options,
    multiSelect = false,
    selectedKeys,
    isDisabled = false,
    onChange,
}) => {
    // Derive selected values
    const selectedValue = multiSelect
        ? options.filter((opt) => Array.isArray(selectedKeys) && selectedKeys.includes(opt.label))
        : options.find((opt) => !Array.isArray(selectedKeys) && opt.label === selectedKeys);

    // Handle react-select change
    const handleChange = (
        selected: MultiValue<{ value: string; label: string }> | SingleValue<{ value: string; label: string }>
    ): void => {
        if (multiSelect) {
            const values = (selected as MultiValue<{ value: string; label: string }>).map((s) => s.value);
            onChange(values); // string[]
        } else {
            const value = (selected as SingleValue<{ value: string; label: string }>)?.value || "";
            onChange(value); // string
        }
    };

    return (
        <div>
            <label className={styles.filterHeadings}>{label}</label>
            <Select
                isMulti={multiSelect}
                name={label}
                placeholder={`Select ${label}`}
                options={options}
                value={selectedValue}
                onChange={handleChange}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                isDisabled={isDisabled}
                label={label}
            />
        </div>
    );
};
