import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICollectionField } from '../../../types/database';
import { fieldIcon } from '../../../utils/icons'
import IRootStore from '../../../types/store/root';
import { FaEdit, FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import EditFieldForm from './EditFieldForm';
import './styles.css';

interface CIFieldWidget {
  field: ICollectionField;
  style?: any;
}

const FieldWidget: FC<CIFieldWidget> = ({ field, style = {} }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { collection } = useSelector(({
    collections: { collection }
  }: IRootStore) => ({ collection }));

  if (!collection) {
    return <></>
  }
  
  const editFieldClick = () => {
    setShowMenu(false);
    setIsEditing(true);
  };

  return (
    <div className="field-widget">
      <div onClick={() => setShowMenu(!showMenu)}>
        <span className="icon">{fieldIcon(field.type)}</span> {field.label}
      </div>
      {showMenu &&
        <div className="menu">
          <div onClick={editFieldClick}><FaEdit /> Edit field</div>
          <div><FaSortAmountDownAlt /> Sort Ascending</div>
          <div><FaSortAmountDown /> Sort Descending</div>
        </div>
      }
      {isEditing &&
        <EditFieldForm
          collectionId={collection.id}
          field={field}
          setIsEditing={setIsEditing}
        />
      }
    </div>
  )
}

export default FieldWidget;
