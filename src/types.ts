/**
 * author: Michael McKenzie
 */

export type BlogPostData = Readonly<{
  id: number;
  text: string;
  timestamp: string;
  title: string;
}>;

export type BlogPost = Readonly<{
  id: number;
  text: string;
  timestamp: Date;
  title: string;
}>;
