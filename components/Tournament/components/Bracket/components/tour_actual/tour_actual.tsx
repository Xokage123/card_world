import { FC } from "react";
import { useRecoilState } from "recoil";

import { selector_statusTournament, selector_tourActual } from "reacoil/atoms/tournament";
import { Status } from "reacoil/atoms/tournament/type";

import styles from './tour_actual.module.scss';
import { TournamentTours } from "../tours";

const TourActual: FC = () => {
  const [tour, setTour] = useRecoilState(selector_tourActual);
  const [statusTournament, setStatusTournament] = useRecoilState(
    selector_statusTournament,
  );

  // if (statusTournament === Status.preparation) {
  //   return (
  //     <span>
  //       Вы не составили сетку игроков! Добавьте игроков, и мы автоматически сгенерируем раунды
  //     </span>
  //   )
  // }

  if (statusTournament === Status.completed) {
    return (
      <span>
       Турнир завершен!
      </span>
    )
  }
  
  return (
  <section>
      <TournamentTours active tours={[tour]} />
  </section>
  )
}

export default TourActual;