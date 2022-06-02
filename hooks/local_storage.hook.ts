import { useState } from "react";
import { useRecoilValue, RecoilState, useSetRecoilState } from 'recoil';

import { LocalKeys } from 'api/const';

import { atom_isServer } from 'reacoil/atoms/environment';
import { Nullable } from "types/global";

const useLocalStorage = <T>(key: LocalKeys, atom: RecoilState<Nullable<T>>) => {
  const isServer = useRecoilValue(atom_isServer)

  const setAtomValue = useSetRecoilState(atom)

  const [storedValue, setStoredValue] = useState<Nullable<T>>(() => {
    if (isServer) return null;

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  });

  const resetValue = () => {
    setStoredValue(null);
    setAtomValue(null);

    if (!isServer) {
      window.localStorage.removeItem(key);
    }
  }

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      setAtomValue(value);

      if (!isServer) {
        window.localStorage.setItem(key, value ? JSON.stringify(value) : '');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    storedValue,
    setValue,
    resetValue
  };
}

export default useLocalStorage
