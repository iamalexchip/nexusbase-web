import React, { FC } from 'react';
import RecordSorter from '../../molecules/RecordSorter';
import RecordGroupDropdown from '../../molecules/RecordGroupDropdown';
import NewRecordDropdown from '../../molecules/NewRecordDropdown';
import { useSelector } from 'react-redux';
import IRootStore from '../../../types/store/root';

const RecordActionsBar: FC = () => {
  const { view } = useSelector(({
    views: { view },
    records: { isSorting, query: { sorts} }
  }: IRootStore) => ({ view }));

  if (!view) {
    return <div>Loading RecordActionsBar....</div>
  }

  const groupable = ['list'];

  return (
    <div className="action-bar" style={{ display: 'flex' }}>
      <div style={{
        margin: '0px 10px 10px 0px',
        padding: '2.5px 5px'
      }}>
        {view.title || 'Untitled'}
      </div>
      {groupable.includes(view.type) &&
        <RecordGroupDropdown />
      }
      <RecordSorter />
      <NewRecordDropdown />
    </div>
  )
}

export default RecordActionsBar;
