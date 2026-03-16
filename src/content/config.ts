import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      primaryImage: image(),
      primaryImageAlt: z.string(),
      createdAt: z.date(),
      type: z.enum(["voyage", "note"]),
    }),
});

export const collections = {
  posts: postCollection,
};
