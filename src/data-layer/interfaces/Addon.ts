export interface DBAddon {
  entityId: number;
  gameId: number;
  name: string;
  authors: {
      Name: string;
  }[];
  primaryAuthor: string;
  primaryCategoryId: number;
  webSiteUrl: string;
  thumbnailUrl: string;
  tags: [];
  installedFile: number 
  latestFile: number
}