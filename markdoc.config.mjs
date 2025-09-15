import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component("./src/components/ImageContent.astro"),
    },
  },
  tags: {
    video: {
      render: component("./src/components/VideoPlayer.tsx"),
      attributes: {
        src: {
          type: String,
          required: true,
        },
        controls: {
          type: Boolean,
          required: false,
        },
        autoplay: {
          type: Boolean,
          required: false,
        },
        loop: {
          type: Boolean,
          required: false,
        },
      },
    },
  },
});
