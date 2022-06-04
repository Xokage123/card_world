import { Theme } from "const/theme";

import { Status, StatusTournament } from "reacoil/atoms/tournament/types";

export const statusTournament: StatusTournament = {
  [Status.preparation]: {
    text: 'Идет формирование игроков',
    theme: Theme.information,
  },
  [Status.main]: {
    text: 'Сейчас идет турнир',
    theme: Theme.success,
  },
  [Status.completed]: {
    text: 'Турнир оцицально закончен',
    theme: Theme.information,
  },
}