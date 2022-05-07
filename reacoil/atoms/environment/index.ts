import { atom } from "recoil";

const atom_isServer = atom<boolean>({
  key: 'atom_isServer',
  default: typeof window === "undefined"
})

export {
  atom_isServer
}
