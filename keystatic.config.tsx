import { config, fields, collection } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
import VideoPlayer from "./src/components/VideoPlayer";

/**
 * Sanitizes an uploaded filename so it is safe to commit to Git and reference
 * from Markdoc. Spaces, parentheses and non-ASCII characters (e.g. accents)
 * otherwise produce paths that break Keystatic's GitHub save round-trip with
 * "A path was requested for deletion which does not exist".
 */
function sanitizeFilename(originalFilename: string): string {
  const lastDot = originalFilename.lastIndexOf(".");
  const hasExtension = lastDot > 0;
  const name = hasExtension
    ? originalFilename.slice(0, lastDot)
    : originalFilename;
  const extension = hasExtension
    ? originalFilename.slice(lastDot + 1).toLowerCase()
    : "";

  const cleanName = name
    .normalize("NFKD") // split accented letters into base letter + diacritic
    .replace(/[\u0300-\u036f]/g, "") // drop the diacritics (é -> e)
    .replace(/[^a-zA-Z0-9]+/g, "-") // any other unsafe char -> single dash
    .replace(/^-+|-+$/g, "") // trim leading/trailing dashes
    .toLowerCase();

  const safeName = cleanName || "file";

  return extension ? `${safeName}.${extension}` : safeName;
}

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
              transformFilename: sanitizeFilename,
            },
          },
          components: {
            video: block({
              label: "Video",
              description: "Upload a video",
              ContentView: ({
                value: { src, autoplay, controls, loop, description },
              }) => {
                if (src === null) {
                  return null;
                }

                const blob = new Blob([src.data as BlobPart], {
                  type: "video/mp4",
                });

                const url = URL.createObjectURL(blob);

                return (
                  <figure>
                    <VideoPlayer
                      src={url}
                      autoPlay={autoplay}
                      controls={controls}
                      loop={loop}
                    />
                    {description ? (
                      <figcaption>{description}</figcaption>
                    ) : null}
                  </figure>
                );
              },
              schema: {
                src: fields.file({
                  label: "Video file",
                  description: "Select a video file",
                  directory: "public/videos",
                  publicPath: "/videos/",
                  transformFilename: sanitizeFilename,
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
                description: fields.text({
                  label: "Description",
                  description: "Caption displayed below the video",
                }),
              },
            }),
          },
        }),
        primaryImage: fields.image({
          label: "Image principale",
          directory: "src/assets/images/posts",
          publicPath: "/src/assets/images/posts/",
          transformFilename: sanitizeFilename,
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
