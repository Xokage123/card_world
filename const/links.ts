export enum LINKS {
  home = '/',
  auth = '/auth',
  news = '/news',
  cards = '/cards',
  tournament = '/tournament',
  tournament_schedule = '/tournament_schedule',
  registration = '/registration',
  reset_password = '/reset_password',
}

interface ObjectString {
  [key: string]: string
}

export const namesNavigateItem: ObjectString = {
  [LINKS.news]: 'Новости',
  [LINKS.tournament]: 'Турнир',
  [LINKS.cards]: 'База карт',
  [LINKS.tournament_schedule]: 'Расписание турниров'
}

export const linksWithoutLayout: string[] = [
  LINKS.auth,
  LINKS.registration,
  LINKS.reset_password,
  '/404',
  '/500'
]

export const startPageLink: LINKS = LINKS.tournament

export interface NavigateItem {
  name: string;
  url: string
}

export const navigateItems: NavigateItem[] = Object.keys(namesNavigateItem).map(url => ({
  name: namesNavigateItem[url],
  url
}))
