import { Nullable } from 'types/global';

import { LocalKeys } from 'api/const'

const isWindow = typeof window !== "undefined"

const getLocalStorageValue = <T>(key: LocalKeys): Nullable<T> => {
  if (isWindow) {
    const valueJSON = localStorage.getItem(key)

    if (!valueJSON) return null

    const value: T = JSON.parse(valueJSON)

    return value
  }

  return null
}

export const getLocalStorageArray = <T>(key: LocalKeys): T[] => {
  if (isWindow) {
    const valueJSON = localStorage.getItem(key)

    if (!valueJSON) return []

    const value: T[] = JSON.parse(valueJSON)

    return value
  }

  return []
}

const setLocalStorageValue = <T>(key: LocalKeys, value: Nullable<T>): void => {
  if (isWindow) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      removeLocalStorageValue(key)
    }
  }
}

const removeLocalStorageValue = <T>(key: LocalKeys): void => {
  if (isWindow) {
    localStorage.removeItem(key)
  }
}

export {
  getLocalStorageValue,
  setLocalStorageValue,
  removeLocalStorageValue
}
