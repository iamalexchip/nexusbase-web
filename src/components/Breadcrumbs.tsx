import React, { FC, Fragment } from 'react';
import { Crumb } from '../interfaces/components';
import routes from '../utils/routes';

const LinkWrapper: FC<{ url: string }> = ({ children, url }) => (
  <a href={url}>{children}</a>
);

type Props = { data?: Crumb[] };

const BreadCrumbs: FC<Props> = ({ data = [] }) => {
  const crumbs = [{ text: 'Home', url: routes.home() }, ...data];
  return (
    <div>
      {crumbs.map(({ text, url }, index) => (
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
