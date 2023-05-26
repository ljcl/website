import { PostMetadata } from '../../../../lib/posts';
import { Card } from '../Card';

interface PostCardProps extends PostMetadata {}

export const PostCard: React.FC<PostCardProps> = (props) => {
  const title = props.meta.title;
  const href = props.slug;
  const description = props.meta.description;
  return <Card title={title} description={description} href={href} />;
};
