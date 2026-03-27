type VideoPlayerProps = {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  description?: string;
};

export default function VideoPlayer({
  description,
  ...videoProps
}: VideoPlayerProps) {
  const videoElement = <video {...videoProps} />;

  if (!description) {
    return videoElement;
  }

  return (
    <figure>
      {videoElement}
      <figcaption>{description}</figcaption>
    </figure>
  );
}
