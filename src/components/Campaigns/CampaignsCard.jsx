import Icon from "../Icon/Icon";

import { HeadingXL, BodyBase, LabelSmall } from "../Typography/Headlines&Texts";

import "./CampaignsCard.scss";

export default function CampaingsCard({ title, data, info, icon, stroke }) {
  return (
    <div className="campaings-card">
      <div className="campaings-card__title">
        <BodyBase>{title}</BodyBase>
        <Icon className="icon" name={icon} stroke={stroke} />
      </div>
      <div className="campaings-card__body">
        <HeadingXL>{data}</HeadingXL>
        <LabelSmall>{info}</LabelSmall>
      </div>
    </div>
  );
}
