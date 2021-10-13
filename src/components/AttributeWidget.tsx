import React, { FC, useState } from 'react';
import { Attribute } from '../interfaces/store/collections';
import EditAttributeForm, { iFormData } from './forms/EditAttributeForm';
import Modal from './Modal';

type Props = {
  data: Attribute;
};

const AttributeWidget: FC<Props> = ({ data: attribute }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (values: iFormData) => {
    console.log({ values });
  };

  return (
    <>
      <div onClick={() => setShowModal(true)}>{attribute.label}</div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <EditAttributeForm
          initialValues={{ label: attribute.label }}
          onSubmit={handleSubmit}
          isLoading={false}
        />
      </Modal>
    </>
  );
};

export default AttributeWidget;
