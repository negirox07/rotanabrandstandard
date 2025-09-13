export interface StandardResponse {
  "@odata.context": string
  value: StandardModel[]
}

export interface StandardModel {
  "@odata.type": string
  "@odata.id": string
  "@odata.etag": string
  "@odata.editLink": string
  FileSystemObjectType: number
  Id: number
  ServerRedirectedEmbedUri: any
  ServerRedirectedEmbedUrl: string
  ContentTypeId: string
  Title?: string
  ComplianceAssetId: any
  Sub_x0020_Section?: string
  Section: string
  Standard: string
  Reference?: Reference
  URL: any
  Core_x0020_Standards?: string
  Franchise_x0020_Reference?: FranchiseX0020Reference
  Performance_x0020_Classification?: string
  DepartmentId: number
  BrandId: number[]
  Comments: any
  IsDeviated?: string
  HotelsDeviated?: string
  OData__ColorTag: any
  Status?: string
  IndexKey: number
  ID: number
  Modified: string
  Created: string
  AuthorId: number
  EditorId: number
  OData__UIVersionString: string
  Attachments: boolean
  GUID: string
}

export interface Reference {
  Description: string
  Url: string
}

export interface FranchiseX0020Reference {
  Description: string
  Url: string
}
