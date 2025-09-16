import * as React from "react";
import { IFilterBarProps } from "./IFilterBarProps";
import { RotanaMultiSelect } from "../dropdowns/RotanaMultiSelect";
import styles from './FilterBar.module.scss';
const FilterBar: React.FC<IFilterBarProps> = ({
    brandDropdownOptions,
    selectedBrand,
    onBrandChange,
    departmentDropdownOptions,
    selectedDepartment,
    onDepartmentChange,
    standardDropdownOptions,
    selectedStandard,
    onStandardChange,
    searchText,
    onSearchChange,
    onSearchClick
}) => {
    return (
        <div className={styles.filterContainer}>
            <div className={styles.dropDownContainers}>
                <RotanaMultiSelect
                    label="Brand"
                    options={brandDropdownOptions}
                    multiSelect={false}
                    selectedKeys={selectedBrand || ""}
                    onChange={(value) => onBrandChange(value as string)}
                />
            </div>
            <div className={styles.dropDownContainers}>
                <RotanaMultiSelect
                    label="Journey"
                    options={departmentDropdownOptions}
                    multiSelect={true}
                    selectedKeys={selectedDepartment}
                    onChange={(value) => onDepartmentChange(value as string[])}
                />
            </div>
            <div className={styles.dropDownContainers}>
                <RotanaMultiSelect
                    label="Touchpoint"
                    options={standardDropdownOptions}
                    multiSelect={false}
                    selectedKeys={selectedStandard}
                    onChange={(value) => onStandardChange(value as string)}
                />
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchBox}
                    placeholder="Search"
                    value={searchText ?? ''}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <button className={styles.searchButton} onClick={onSearchClick} />
            </div>
        </div>
    );
};

export default FilterBar;
