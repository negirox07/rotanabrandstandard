export interface BrandModel {
  Title: string
  BrandRating:number
  BrandDescription: string
  Modified: string
  ID: number
  GUID: string
}

export interface BrandDTO extends BrandModel {
  departmentsCount: number;
  standardsCount: number;
}
