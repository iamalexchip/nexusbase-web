import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import IRootStore from '../../../types/store/root';
import ReactHtmlParser from "react-html-parser";
import Modal from '../../molecules/Modal';
import './styles.css';
import Button from '../../atoms/Button';
import { IDialogAction } from '../../../types/store/notifications';

const Dialog: FC = () => {
  const dialogs = useSelector(({
    notifications: { dialogs }
  }: IRootStore) => dialogs);

  if (dialogs.length === 0) {
    return <></>
  }

  const dialog = dialogs[0];
  const defaultAction: IDialogAction = { type: 'close', text: 'Ok' };
  const actions = dialog.actions && dialog.actions.length ? dialog.actions: [defaultAction];
  
  return (
    <Modal>
      {ReactHtmlParser(dialog.content)}
      <hr />
      {actions.map((action, index) =>
        <Button key={index} >{action.text}</Button>
      )}
    </Modal>
  )
}

export default Dialog;
