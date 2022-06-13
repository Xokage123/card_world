import { FC } from 'react';
import cn from 'classnames';

import { Modal } from 'ui/components/modal';
import { H3 } from 'ui/components/title';

import CloseIcon from '@mui/icons-material/Close';

import useModal from 'hooks/modal.hook';

import { Button } from '@mui/material';

import { NotificationProps } from './type';

import { Theme } from 'const/theme';

import styles from './notification.module.scss';

export const Notification: FC<NotificationProps> = (props) => {
  const {
    theme = Theme.information,
    isShowButtons = true,
    name,
    title = 'Подтвердите действие',
    text,
    textButtons = {
      cancel: 'Отмена',
      apply: 'Подтверждаю',
    },
    successCallback,
    cancelCallback,
  } = props;

  const { handleCloseModal } = useModal();

  const handleCancel = () => {
    handleCloseModal(name)();

    if (cancelCallback) {
      cancelCallback();
    }
  };

  const handleSuccess = () => {
    handleCloseModal(name)();

    successCallback();
  };

  return (
    <Modal isNotification name={name}>
      <div className={styles.container}>
        {!isShowButtons && (
          <button onClick={handleCancel} className={styles.icon_close}>
            <CloseIcon />
          </button>
        )}

        <div className={cn(`theme-background--${theme}`, styles.top)}>
          <H3 className={styles.title}>{title}</H3>
        </div>

        <div className={styles.main}>
          <span className={styles.text}>{text}</span>
        </div>

        {isShowButtons && (
          <div className={styles.buttons}>
            <Button variant="outlined" onClick={handleCancel}>
              {textButtons.cancel}
            </Button>
            <Button variant="contained" onClick={handleSuccess}>
              {textButtons.apply}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
