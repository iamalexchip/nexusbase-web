import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IRootStore from '../../../types/store/root';
import { ICollectionField } from '../../../types/database';
import fieldsData from '../../../config/fields';
import Select from 'react-select';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';
import { updateField } from '../../../actions/collections';

interface CIEditFieldForm {
  collectionId: string;
  field: ICollectionField;
  setIsEditing: any;
}

const EditFieldForm: FC<CIEditFieldForm> = ({ collectionId, field, setIsEditing }) => {
  const dispatch = useDispatch();
  const { collection, isUpdating } = useSelector(({
    collections: { collection, isUpdating }
  }: IRootStore) => ({ collection, isUpdating }));
  const fieldTypeOptions = fieldsData.map((type: any) => ({ value: type.name, label: type.label }));
  const [fieldForm, setFieldForm] = useState(field);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  const selectedFieldTypeOption = fieldTypeOptions.find((option) => option.value === fieldForm.type);

  // check if field was updated
  useEffect(() => {
    if (!isUpdating && !isFirstUpdate) {
      //setIsEditing(false);
    }
    setIsFirstUpdate(false);
  }, [collection, isUpdating, isFirstUpdate, setIsFirstUpdate, setIsEditing]);

  const onFieldTypeChange = (selectedOption: any) => {
    if (selectedOption.value === field.type) {
      setFieldForm(field);
    } else {
      setFieldForm({
        id: fieldForm.id,
        label: fieldForm.label,
        type: selectedOption.value,
        options: {}
      });
    }
  };

  const submitForm = () => {
    dispatch(updateField(collectionId, field.id, fieldForm));
  };

  return (
    <div className="form">
      <TextInput
        value={fieldForm.label}
        onChange={(e: FormEvent<HTMLInputElement>) => setFieldForm({ ...fieldForm, label: e.currentTarget.value })}
      />
      {field.id !== 'f1' &&
        <Select
          value={selectedFieldTypeOption}
          options={fieldTypeOptions}
          onChange={onFieldTypeChange}
        />
      }
      <div className="footer">
        {isUpdating?
          <p>Saving...</p>
          :
          <>
            <span style={{ marginRight: '30px' }} onClick={() => setIsEditing(false)}>Cancel</span>
            <Button onClick={submitForm}>Save</Button>
          </>
        }
      </div>
    </div>
  )
}

export default EditFieldForm;
