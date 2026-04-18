import { type PostMetadata } from "#lib/posts";
import { Card } from "../Card";

export const PostCard = ({ meta, slug }: PostMetadata) => (
  <Card
    title={meta.title}
    description={meta.description}
    href={`posts/${slug}`}
  />
);
