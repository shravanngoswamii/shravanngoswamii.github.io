import type socialIcons from "@assets/socialIcons";
import type { CollectionEntry } from "astro:content";

export type BlogCollection = "tech" | "cinema" | "philosophy";
export type AnyPost = CollectionEntry<"tech"> | CollectionEntry<"cinema"> | CollectionEntry<"philosophy">;

export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
