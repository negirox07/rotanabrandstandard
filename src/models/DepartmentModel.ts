export interface DepartmentModel {
  Title: string
  Order0: any
  Number: number
  ID: number
  GUID: string
}

export interface StandardItem {
  DepartmentId: number;
  [key: string]: any;
}

export interface DepartmentItem {
  Id: number;
  Title: string;
  [key: string]: any;
}

export interface DepartmentCount {
    departmentId: number;
    departmentName: string;
    count: number;
}
