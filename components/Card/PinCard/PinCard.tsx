import { type PinboardPostPrepared } from "#lib/pinboard";
import { Card } from "../Card";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

export const PinCard = ({
  description,
  extended,
  href,
}: PinboardPostPrepared) => (
  <Card
    title={description}
    description={extended}
    href={href}
    icon={ExternalLinkIcon}
    iconText="External Link"
  />
);
