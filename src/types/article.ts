export interface ArticleUser {
  name: string;
  username: string;
  profile_image: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  path: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  tag_list: string[];
  tags: string;
  user: ArticleUser;
  reading_time_minutes: number;
  url: string;
}