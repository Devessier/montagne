import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({ label: "Content" }),
        primaryImage: fields.image({
          label: "Image principale",
          directory: "src/assets/images/posts",
          publicPath: '/src/assets/images/posts/',
        }),
        createdAt: fields.datetime({
          label: "Created at",
          defaultValue: { kind: "now" },
        }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Voyage", value: "voyage" },
            { label: "Note", value: "note" },
          ],
          defaultValue: "note",
        }),
      },
    }),
  },
});
