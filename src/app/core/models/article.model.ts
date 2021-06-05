import { Profile } from "./profile.model";

export interface Article {
    id: number;
    parentId: number;
    title: string;
    seoTitle: string;
    slug: string;
    summary: string;
    content: string;
    viewCount: number;
    dateCreated: string;
    dateModified: string;
    author: Profile;
    thumbnailImage: string;
    tagList: string[];
  }
  