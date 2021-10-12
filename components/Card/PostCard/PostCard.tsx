import { PostMetadata } from '../../../utils/mdx';
import { Link } from '../../Link/Link';
import { Card } from '../Card';

interface PostCardProps extends PostMetadata {}

export const PostCard: React.FC<PostCardProps> = (props) => {
  const title = props.frontmatter.title;
  const href = props.slug;
  const description = props.frontmatter.description;
  return <Card title={title} description={description} href={href} />;
};
