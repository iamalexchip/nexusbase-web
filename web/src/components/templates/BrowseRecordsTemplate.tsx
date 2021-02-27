import React from 'react';
import RecordActionBar from '../organisms/RecordActionBar';
import RecordForm from '../organisms/RecordForm';

const BrowseRecordsTemplate = ({ breadcrumbs, header, children }: any) => {
  return (
    <div>
      <div>
        <div className="header-link">{breadcrumbs}</div>
      </div>
      <h1>{header}</h1>
      <RecordActionBar />
      <div>{children}</div>
      <RecordForm />
    </div>
  )
};

export default BrowseRecordsTemplate;
