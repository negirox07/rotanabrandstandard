import * as React from "react";

import Select from 'react-select';
import { IReusableMultiSelectProps } from "./IReusableSelectProps";

export const RotanaMultiSelect: React.FC<IReusableMultiSelectProps> = ({
    label,
    options,
    multiSelect = false,
    selectedKeys,
    onChange,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (multiSelect) {
            const values = Array.from(event.target.selectedOptions, (opt) => opt.value);
            onChange(values);
        } else {
            onChange(event.target.value);
        }
    };
    console.log('options', options);
    return (<><Select
        defaultValue
        isMulti={multiSelect}
        name={label}
        label={label}
        placeholder={`Select ${label}`}
        options={options}
        handleChange={handleChange}
    /></>)
};