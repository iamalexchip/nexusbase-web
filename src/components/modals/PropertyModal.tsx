import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Property } from '../../interfaces/store/collections';
import {
  getCollections,
  setEditProperty,
  updateCollectionProperty,
} from '../../store/slices/collections';
import EditPropertyForm from '../forms/EditPropertyForm';
import Modal from '../Modal';

const PropertyModal: FC = () => {
  const dispatch = useAppDispatch();
  const { collections, editProperty } = useAppSelector(({ collections }) => ({
    collections: collections.data.collections,
    editProperty: collections.data.editProperty,
  }));
  const collection = collections?.find(
    (collection) => collection.id === editProperty?.colId
  );

  const property = collection?.properties.find(
    (property) => property.id === editProperty?.propId
  );

  useEffect(() => {
    if (editProperty && collections === null) {
      dispatch(getCollections(() => {}));
    }
  }, [dispatch, editProperty, collections]);

  const handleSubmit = (values: Property) => {
    if (collection && property) {
      dispatch(
        updateCollectionProperty(collection.id, property.id, values, () => {})
      );
    }
  };

  if (!editProperty) {
    return <></>;
  }

  if (!collections) {
    return (
      <Modal show={true} onClose={() => dispatch(setEditProperty(null))}>
        Loading...
      </Modal>
    );
  }

  if (!collection || !property) {
    return (
      <Modal show={true} onClose={() => dispatch(setEditProperty(null))}>
        Error fetching property
      </Modal>
    );
  }

  return (
    <Modal show={true} onClose={() => dispatch(setEditProperty(null))}>
      <EditPropertyForm
        initialValues={property}
        onSubmit={handleSubmit}
        isLoading={false}
      />
    </Modal>
  );
};

export default PropertyModal;
