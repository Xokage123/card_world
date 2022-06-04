import { FC } from 'react';
import { useUnmount } from 'react-use';
import { useRecoilValue } from 'recoil';
import cn from 'classnames';

import { Modal as ModalMaterial } from '@mui/material';

import useModal from 'hooks/modal.hook';

import {
  atom_modals
} from 'reacoil/atoms/modal'

import { Props } from './type';

import styles from './modal.module.scss';

export const Modal: FC<Props> = (props) => {
  const {
    children,
    name,
    isNotification = false
  } = props;

  useUnmount(() => {
    onClose();
  })

  const modals = useRecoilValue(atom_modals);

  const { handleCloseModal } = useModal();

  const onClose = handleCloseModal(name)

  const isOpen = modals[name] ? !!modals[name] : false;

  const classContainer = cn(styles.backdrop, {
    [styles.backdrop_notification]: isNotification
  });

  return (
    <ModalMaterial
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classContainer}>
        {children}
      </div>
    </ModalMaterial>
  );
}