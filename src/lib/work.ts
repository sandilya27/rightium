import type { Post } from "./post";

export type Work = {
  slug: string;
  title: string;
  sector: string;
  image: string;
  imageAlt: string;
  body: string;
  metric: string;
  metricLabel: string;
  content: Post["content"];
  updatedAt?: string;
};
