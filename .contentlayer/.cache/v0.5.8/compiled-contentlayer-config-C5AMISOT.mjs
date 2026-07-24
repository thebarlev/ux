// contentlayer.config.ts
import path from "path";
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    date: { type: "date", required: true },
    coverImage: { type: "string", required: true },
    category: { type: "string", required: true },
    tags: { type: "json", required: false },
    locale: { type: "string", required: false },
    slug: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc.slug ?? doc._raw.flattenedPath.split("/").pop()
    },
    readingTimeMinutes: {
      type: "number",
      resolve: (doc) => {
        const raw = typeof doc.body?.raw === "string" ? doc.body.raw : "";
        const words = raw.trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Article],
  mdx: {
    esbuildOptions: (options) => {
      options.alias = {
        ...options.alias ?? {},
        "@": path.join(process.cwd(), "src")
      };
      return options;
    }
  }
});
export {
  Article,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-C5AMISOT.mjs.map
