import { IDropdownOption } from "office-ui-fabric-react";
import { DepartmentCount, DepartmentItem, StandardItem } from "../models/DepartmentModel";
import { IReusableMultiSelectOption } from "../webparts/rotanabrandstandard/components/dropdowns/IReusableSelectProps";

export function countStandardsByDepartment(
  standards: StandardItem[],
  departments: DepartmentItem[]
): DepartmentCount[] {
  // Count standards per departmentId
  const counts = standards.reduce((acc, item) => {
    acc[item.DepartmentId] = (acc[item.DepartmentId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Join with department names
  return departments.map((dept) => ({
    departmentId: dept.Id,
    departmentName: dept.Title,
    count: counts[dept.Id] || 0, // default 0 if no standards
  }));
}

export const toDropdownOptions = (items: any[]): IDropdownOption[] =>
  (items || []).map((b) => ({ key: b.ID.toString(), text: b.Title }));

export const toMultiDropdownOptions = (items: any[]): IReusableMultiSelectOption[] =>
  (items || []).map((b) => ({ value: b.ID.toString(), label: b.Title }));