import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "Devessier",
      name: "montagne"
    }
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Titre" } }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({
          label: "Contenu",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "/src/assets/images/posts/",
            },
          },
        }),
        primaryImage: fields.image({
          label: "Image principale",
          directory: "src/assets/images/posts",
          publicPath: "/src/assets/images/posts/",
        }),
        primaryImageAlt: fields.text({
          label: "Image principale — texte alternatif",
        }),
        createdAt: fields.datetime({
          label: "Date de création",
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
