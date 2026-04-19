import { Card } from "#components/Card/Card";

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
  description?: string;
  index?: number;
  className?: string;
}

export const PostCard = ({
  title,
  date,
  slug,
  description,
  index,
  className,
}: PostCardProps) => (
  <Card
    href={`/posts/${slug}`}
    eyebrow="Post"
    title={title}
    date={date}
    description={description}
    index={index}
    className={className}
  />
);
