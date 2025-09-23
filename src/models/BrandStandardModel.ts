export interface BrandStandardModel {
  "@odata.type": string
  "@odata.id": string
  "@odata.etag": string
  "@odata.editLink": string
  FileSystemObjectType: number
  Id: number
  ServerRedirectedEmbedUri: any
  ServerRedirectedEmbedUrl: string
  ContentTypeId: string
  Title: string
  OData__ColorTag: any
  ComplianceAssetId: any
  Standard: string
  Category: string
  Priority: string
  Description?: string
  Touchpoint?: string
  RefNo?: string
  RelatedDocuments?: string
  AssociatedToId: number[]
  ID: number
  Modified: string
  Created: string
  AuthorId: number
  EditorId: number
  OData__UIVersionString: string
  Attachments: boolean
  GUID: string
}

export interface RelatedDocuments {
  Description: string
  Url: string
}
