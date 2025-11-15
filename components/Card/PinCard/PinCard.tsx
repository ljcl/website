import type { PinboardPostPrepared } from "#lib/pinboard";
import { Card } from "../Card";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

interface PinCardProps extends PinboardPostPrepared {}

export const PinCard: React.FC<PinCardProps> = (props) => (
  <Card
    title={props.description}
    description={props.extended}
    href={props.href}
    icon={ExternalLinkIcon}
    iconText="External Link"
  />
);
