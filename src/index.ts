import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkHeadingId from "remark-heading-id";
import remarkHtml from "remark-html";
import { unified } from "unified";
import { matter } from "vfile-matter";
import remarkHeadings from "@vcarl/remark-headings";
import remarkHighlightjs from "remark-highlight.js";

/**
 *
 * @param {VFile} vfile
 * @returns
 */
const remarkMetadata = () => (tree: any, vfile: any) => {
  matter(vfile);
};

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkMetadata)
  .use(remarkGfm)
  .use(remarkHeadingId, { defaults: true, uniqueDefaults: true })
  .use(remarkHeadings)
  .use(remarkHighlightjs as any)
  .use(remarkHtml, { sanitize: false });

export interface MarkdownHeading {
  depth: number;
  value: string;
  data: { id: string };
}
export interface Markdown {
  matter: any;
  headings: MarkdownHeading[];
  value: string;
}
export async function loadByString(content: string): Promise<Markdown> {
  const md = await processor.process(content);
  return {
    matter: md.data.matter,
    headings: md.data.headings as any,
    value: md.value.toString(),
  };
}
