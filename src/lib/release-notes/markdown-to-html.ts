import { marked } from 'marked';

/**
 * Converts markdown text to HTML format
 * @param markdown mardown format
 * @returns HTML format
 */
export async function markdownToHtml(
  markdown: string,
  options?: {
    urlBasePath?: string;
  }
): Promise<string> {
  // Documentation for overriding
  // Marked API here: https://marked.js.org/using_pro
  // MD to HTML Conversion guide https://www.markdownguide.org/basic-syntax/
  // Typography for classes https://ui.shadcn.com/docs/components/typography
  const renderer = {
    heading(text: string, level: number) {
      return `
            <h${level} class="${
        level === 1
          ? 'text-2xl'
          : level === 2
          ? 'text-xl'
          : level === 3
          ? 'text-lg'
          : level === 4
          ? 'text-2xl font-semibold leading-none tracking-tight text-white mb-2'
          : 'text-base'
      }">
              ${text}
            </h${level}>`;
    },
    list(body: string) {
      return `
            <ul class="my-6 ml-6 list-disc [&>li]:mt-2 text-sm">
              ${body}
            </ul>`;
    },
    codespan(text: string) {
      return `<code class="text-mono relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">${text}</code>`;
    },
    link(href: string, title: string | null | undefined, text: string) {
      return `<a titke="${title}" href="${options?.urlBasePath}${href}" class="underline underline-offset-2 hover:text-primary">
                ${text}
              </a>`;
    },
  };

  marked.use({ renderer });

  const result = await marked.parse(markdown);
  return result.toString();
}
