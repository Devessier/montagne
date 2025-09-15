import { config, fields, collection } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
import VideoPlayer from "./src/components/VideoPlayer";

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
          components: {
            video: block({
              label: "Video",
              description: "Upload a video",
              ContentView: ({ value: { src, autoplay, controls, loop } }) => {
                if (src === null) {
                  return null;
                }

                // @ts-expect-error src.data is a Uint8Array
                const blob = new Blob([src.data], { type: "video/mp4" });

                const url = URL.createObjectURL(blob);

                return (
                  <VideoPlayer
                    src={url}
                    autoPlay={autoplay}
                    controls={controls}
                    loop={loop}
                  />
                );
              },
              schema: {
                src: fields.file({
                  label: "Video file",
                  description: "Select a video file",
                  directory: "src/assets/images/posts",
                  publicPath: "/src/assets/images/posts/",
                }),
                controls: fields.checkbox({
                  label: "Controls",
                  description: "Show video controls",
                  defaultValue: false,
                }),
                autoplay: fields.checkbox({
                  label: "Autoplay",
                  description: "Enable autoplay (will mute the video)",
                  defaultValue: false,
                }),
                loop: fields.checkbox({
                  label: "Loop",
                  description: "Enable looping",
                  defaultValue: false,
                }),
              },
            }),
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
