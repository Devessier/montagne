import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "Devessier",
      name: "montagne",
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Titre" } }),
        description: fields.text({
          label: "Description",
          validation: {
            isRequired: true,
          },
        }),
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
          validation: {
            isRequired: true,
          },
        }),
        primaryImageAlt: fields.text({
          label: "Image principale — texte alternatif",
          validation: {
            isRequired: true,
          },
        }),
        createdAt: fields.datetime({
          label: "Date de création",
          defaultValue: { kind: "now" },
          validation: {
            isRequired: true,
          },
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
