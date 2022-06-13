import { atom, selector, DefaultValue } from 'recoil';

import { LocalKeys } from 'api/const';

import {
  getLocalStorageArray,
  getLocalStorageValue,
  setLocalStorageValue,
  removeLocalStorageValue,
} from 'helpers/local_storage';

import { Nullable } from 'types/global';

import {
  Player,
  PlayerStatus,
  Status,
  Tour,
  TournamentInformation,
} from './types';

const atom_players = atom<Player[]>({
  key: 'atom_players',
  default: getLocalStorageArray(LocalKeys.tournament_players),
});
const selector_players = selector<Player[]>({
  key: 'selector_players',
  get: ({ get }) => {
    const players = get(atom_players);

    return players;
  },
  set: ({ set }, newValue) => {
    setLocalStorageValue(LocalKeys.tournament_players, newValue);

    const defaultValue = getLocalStorageArray<Player>(
      LocalKeys.tournament_players,
    );

    set(
      atom_players,
      newValue instanceof DefaultValue ? defaultValue : newValue,
    );
  },
});

const atom_selectedIndex = atom<number>({
  key: 'atom_selectedIndex',
  default: 0,
});
const selector_selectedIndex = selector<number>({
  key: 'selector_selectedIndex',
  get: ({ get }) => {
    const selectedIndex = get(atom_selectedIndex);

    return selectedIndex;
  },
  set: ({ set }, newValue) => {
    set(atom_selectedIndex, newValue instanceof DefaultValue ? 0 : newValue);
  },
});

const atom_tournamentInformation = atom<Nullable<TournamentInformation>>({
  key: 'atom_tournamentInformation',
  default: getLocalStorageValue(LocalKeys.user_information_tournament),
});
const selector_tournamentInformation = selector<
  Nullable<TournamentInformation>
>({
  key: 'selector_tournamentInformation',
  get: ({ get }) => {
    const gameInformation = get(atom_tournamentInformation);

    return gameInformation;
  },
  set: ({ set }, newValue) => {
    setLocalStorageValue(LocalKeys.user_information_tournament, newValue);

    set(
      atom_tournamentInformation,
      newValue instanceof DefaultValue ? null : newValue,
    );
  },
});

const atom_isTournamentStart = atom<Nullable<boolean>>({
  key: 'atom_isTournamentStart',
  default: getLocalStorageValue<boolean>(LocalKeys.isTournamentStar),
});
const selector_isTournamentStart = selector<Nullable<boolean>>({
  key: 'selector_isTournamentStart',
  get: ({ get }) => {
    return get(atom_isTournamentStart);
  },
  set: ({ set }, newValue) => {
    setLocalStorageValue(LocalKeys.isTournamentStar, newValue);

    if (!newValue) {
      set(atom_statusTournament, null);
      removeLocalStorageValue(LocalKeys.tournament_status);
    } else {
      const status = getLocalStorageValue<Status>(LocalKeys.tournament_status);

      if (!status) {
        setLocalStorageValue(LocalKeys.tournament_status, Status.preparation);
      }

      set(atom_statusTournament, status ? status : Status.preparation);
    }

    set(
      atom_isTournamentStart,
      newValue instanceof DefaultValue
        ? getLocalStorageValue<boolean>(LocalKeys.isTournamentStar)
        : newValue,
    );
  },
});

const atom_statusTournament = atom<Nullable<Status>>({
  key: 'atom_statusTournament',
  default: getLocalStorageValue<Status>(LocalKeys.tournament_status),
});
const selector_statusTournament = selector<Nullable<Status>>({
  key: 'selector_statusTournament',
  get: ({ get }) => {
    return get(atom_statusTournament);
  },
  set: ({ set }, newValue) => {
    setLocalStorageValue(LocalKeys.tournament_status, newValue);

    set(
      atom_statusTournament,
      newValue instanceof DefaultValue
        ? getLocalStorageValue<Status>(LocalKeys.tournament_status)
        : newValue,
    );
  },
});

const TEST_DATA: Tour[] = [
  // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ],
  // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ],
  // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ], // 1st round
  [
    // 1st pair
    [
      // 1st person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 2nd person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
    // 2nd pair
    [
      // 3rd person
      {
        name: 'yankouskia',
        nameLink: 'https://github.com/yankouskia',
        points: 0,
        status: PlayerStatus.winner,
      },
      // 4th person
      {
        name: 'Alex',
        nameLink: 'https://github.com/yankouskia',
        points: 2,
      },
    ],
  ],
];

const atom_tours = atom<Tour[]>({
  key: 'atom_tours',
  default: TEST_DATA,
});

const selector_tours = selector<Tour[]>({
  key: 'selector_toyrs',
  get: ({ get }) => {
    const tours = get(atom_tours);

    return tours;
  },
});

export {
  selector_players,
  selector_selectedIndex,
  selector_tournamentInformation,
  selector_isTournamentStart,
  selector_statusTournament,
  selector_tours,
};
