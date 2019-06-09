export interface INewResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

interface Source {
  id?: string;
  name: string;
}
