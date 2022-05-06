import { atom } from "recoil";

const atom_statusAuth = atom({
  key: 'atom_statusAuth',
  default: true
})

const atom_userSchema = atom({
  key: 'atom_userSchema',
  default: false
})

export { atom_statusAuth, atom_userSchema }