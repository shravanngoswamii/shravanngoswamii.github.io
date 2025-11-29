import { toJSON } from "bibtex-parse-js";
import fs from "node:fs/promises";
import path from "node:path";

export interface Publication {
  entryTags: {
    year?: string;
    title?: string;
    author?: string;
    journal?: string;
    booktitle?: string;
    publisher?: string;
    url?: string;
    keywords?: string;
    note?: string;
    [key: string]: string | undefined;
  };
  entryType?: string;
}

export async function getPublications(): Promise<Publication[]> {
  const bibFilePath = path.join(process.cwd(), "public", "assets", "publications.bib");
  try {
    const bibContent = await fs.readFile(bibFilePath, "utf-8");
    return toJSON(bibContent);
  } catch (error) {
    console.error("Error reading or parsing bib file:", error);
    return [];
  }
}

export const processLatex = (text: string | undefined) => {
  if (!text) return "";
  // Replace \textbf{...} with <b>...</b>
  let processed = text.replace(/\\textbf{([^}]+)}/g, '<b class="font-semibold text-skin-base">$1</b>');
  // Replace \href{url}{text} with <a href="url" ...>text</a>
  processed = processed.replace(/\\href{([^}]+)}{([^}]+)}/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-0.5 text-skin-accent hover:text-skin-accent/80 hover:underline underline-offset-4 transition-colors">$2<svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-3 w-3 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg></a>');
  return processed;
};
