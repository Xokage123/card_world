import { useUnmount } from "react-use";
import { useRecoilState } from "recoil"

import {
  atom_modals,
} from 'reacoil/atoms/modal'
import { ModalName, NotificationName } from "reacoil/atoms/modal/const"
import { Modals } from "reacoil/atoms/modal/types";
import { Nullable } from "types/global";

let tokenClear: Nullable<NodeJS.Timeout> = null;

const useModal = () => {
  const [modals, setModals] = useRecoilState(atom_modals);

  useUnmount(() => {
    handleCloseAll();

    if (tokenClear) {
      clearInterval(tokenClear);
    }
  })

  const handleCloseModal = (name: ModalName | NotificationName) => () => {
    setModals({
      ...modals,
      [name]: false
    })

    if (tokenClear) {
      clearInterval(tokenClear);
    }
  }

  const handleOpenModal = (name: ModalName | NotificationName, isAutoClose: boolean = false) => () => {
    setModals({
      ...modals,
      [name]: true
    })

    if (isAutoClose) {
      tokenClear = setTimeout(() => {
        handleCloseModal(name)();
      }, 5000)
    }
  }

  const handleCloseAll = () => {
    const keys = Object.keys(modals)

    const closeModals = keys.reduce((keys: Modals, key) => {
      return {
        ...keys,
        [key]: false
      }
    }, {})

    setModals(closeModals);
  }

  return {
    handleCloseModal,
    handleOpenModal
  }
}

export default useModal