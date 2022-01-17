import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Attribute } from '../../interfaces/store/collections';
import {
  getCollections,
  setEditAttribute,
  updateCollectionAttribute,
} from '../../store/slices/collections';
import EditAttributeForm from '../forms/EditAttributeForm';
import Modal from '../Modal';

const AttributeModal: FC = () => {
  const dispatch = useAppDispatch();
  const { collections, editAttribute } = useAppSelector(({ collections }) => ({
    collections: collections.data.collections,
    editAttribute: collections.data.editAttribute,
  }));
  const collection = collections?.find(
    (collection) => collection.id === editAttribute?.colId
  );

  const attribute = collection?.attributes.find(
    (attribute) => attribute.id === editAttribute?.attrId
  );

  useEffect(() => {
    if (editAttribute && collections === null) {
      dispatch(getCollections(() => {}));
    }
  }, [dispatch, editAttribute, collections]);

  const handleSubmit = (values: Attribute) => {
    if (collection && attribute) {
      dispatch(
        updateCollectionAttribute(collection.id, attribute.id, values, () => {})
      );
    }
  };

  if (!editAttribute) {
    return <></>;
  }

  if (!collections) {
    return (
      <Modal show={true} onClose={() => dispatch(setEditAttribute(null))}>
        Loading...
      </Modal>
    );
  }

  if (!collection || !attribute) {
    return (
      <Modal show={true} onClose={() => dispatch(setEditAttribute(null))}>
        Error fetching attribute
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={() => dispatch(setEditAttribute(null))}>
      <EditAttributeForm
        initialValues={attribute}
        onSubmit={handleSubmit}
        isLoading={false}
      />
    </Modal>
  );
};

export default AttributeModal;
