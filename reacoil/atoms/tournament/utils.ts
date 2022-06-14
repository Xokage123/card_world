import uuid from 'react-uuid';

import { GeneratePairsProps, Tour, Pair, Player } from './type';

export const generateTour = (props: GeneratePairsProps): Tour => {
  const { number, players } = props;

  const pair: Pair[] = [];

  for (let i=0; i < number; i++) {
    const firstPlayer = players[0 + i * 2];
    const secondPlayer = players[1 + i * 2];

    const pair_players: Player[] = [firstPlayer, secondPlayer];

    pair.push({
      id: firstPlayer.id + secondPlayer.id,
      players: pair_players,
    });
  }

  return pair;
}