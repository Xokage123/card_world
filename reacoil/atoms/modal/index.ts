import { atom, selector, DefaultValue } from "recoil";

import { Modals } from "./types";

const atom_modals = atom<Modals>({
  key: 'atom_modals',
  default: {}
})

export {
  atom_modals
}