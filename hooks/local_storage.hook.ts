import { useState } from "react";
import { useRecoilValue } from 'recoil';

import { LocalKeys } from 'api/const';

import { atom_isServer } from 'reacoil/atoms/environment';
import { Nullable } from "types/global";

const useLocalStorage = <T>(key: LocalKeys) => {
  const isServer = useRecoilValue(atom_isServer)
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
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
    if (!isServer) {
      window.localStorage.removeItem(key);
    }
  }

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      if (!isServer) {
        window.localStorage.setItem(key, JSON.stringify(value));
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
