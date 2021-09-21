import React, { FC, Fragment } from 'react';
import { Crumb } from '../interfaces/components';

const LinkWrapper: FC<{ url: string }> = ({ children, url }) => (
  <a href={url}>{children}</a>
);

const BreadCrumbs: FC<{ data: Crumb[] }> = ({ data }) => {
  return (
    <div>
      {data.map(({ text, url }, index) => (
        <Fragment key={index}>
          {' > '}
          <span>
            {url ? <LinkWrapper url={url}>{text}</LinkWrapper> : text}
          </span>
        </Fragment>
      ))}
      <hr />
    </div>
  );
};

export default BreadCrumbs;
