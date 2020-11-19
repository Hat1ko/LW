import { DOCUMENTS, USERS, PROFILE } from './urlsConfig'

export const baseMenu = [
  {
    link: '/',
    name: 'Главная',
    icon: 'Home',
    exact: true,
  },
  {
    link: DOCUMENTS,
    name: 'Документы',
    icon: 'Doc',
  },
  {
    link: USERS,
    name: 'Пользователи',
    icon: 'Users',
  },
  {
    link: PROFILE,
    name: 'Мой профиль',
    icon: 'Profile',
  },
]
