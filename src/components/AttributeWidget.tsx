import React, { FC } from 'react';
import { Attribute } from '../interfaces/store/collections';

type Props = {
  data: Attribute;
};

const AttributeWidget: FC<Props> = ({ data: attribute }) => {
  return <div>{attribute.label}</div>;
};

export default AttributeWidget;
