import { useUnmount } from "react-use";
import { useRecoilState } from "recoil"

import {
  atom_modals,
} from 'reacoil/atoms/modal'
import { ModalName, NotificationName } from "reacoil/atoms/modal/const"
import { Modals } from "reacoil/atoms/modal/types";

const useModal = () => {
  const [modals, setModals] = useRecoilState(atom_modals);

  useUnmount(() => {
    handleCloseAll()
  })

  const handleCloseModal = (name: ModalName | NotificationName) => () => {
    setModals({
      ...modals,
      [name]: false
    })
  }

  const handleOpenModal = (name: ModalName | NotificationName) => () => {
    setModals({
      ...modals,
      [name]: true
    })
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