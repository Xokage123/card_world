import { atom } from "recoil";

import { UserPublic } from "backend/models/User";

import { Nullable } from "types/global";

const atom_userInformation = atom<Nullable<UserPublic>>({
  key: 'atom_userSchema',
  default: null
})

export {
  atom_userInformation
}
