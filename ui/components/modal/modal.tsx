import { FC } from 'react';
import { useUnmount } from 'react-use';
import { useRecoilValue } from 'recoil';

import { Modal as ModalMaterial } from '@mui/material';

import useModal from 'hooks/modal.hook';

import {
  atom_modals
} from 'reacoil/atoms/modal'

import { Props } from './type';

import styles from './modal.module.scss';

export const Modal: FC<Props> = (props) => {
  const { children, name } = props;

  useUnmount(() => {
    onClose();
  })

  const modals = useRecoilValue(atom_modals);

  const { handleCloseModal } = useModal();

  const onClose = handleCloseModal(name)

  const isOpen = modals[name] ? !!modals[name] : false;

  return (
    <ModalMaterial
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.backdrop}>
        {children}
      </div>
    </ModalMaterial>
  );
}