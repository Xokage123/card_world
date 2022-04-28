export enum LINKS {
  home = '/',
  auth = '/auth',
  news = '/news',
  registration = '/registration',
  reset_password = '/reset_password',
}

export const linksWithoutLayout: string[] = [
  LINKS.auth,
  LINKS.registration,
  LINKS.reset_password,
  '/404',
  '/500'
]