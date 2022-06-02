import type { NextPage } from 'next'
import Head from 'next/head'

import { TournamentSchedule } from 'components/TournamentSchedule'

const TournamentSchedulePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Расписание турниров</title>
      </Head>

      <TournamentSchedule />
    </>
  )
}

export default TournamentSchedulePage
