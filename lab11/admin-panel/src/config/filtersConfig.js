import {
  statusAccept,
  statusCancel,
  statusOnReview,
} from './documentStatusInfoConfig'

export const documentFilters = [
  {
    label: 'Все',
    value: false,
  },
  {
    label: 'Ожидающие подтверждения',
    value: statusOnReview,
  },
  {
    label: 'Подтвержденные',
    value: statusAccept,
  },
  {
    label: 'Отклоненные',
    value: statusCancel,
  },
]

export const usersFilters = [
  {
    label: 'Недавно добавленные',
    value: 1,
    sortField: 'id',
    sort: 'DESC',
  },
  {
    label: 'По имени',
    value: 2,
    sortField: 'firstName',
    sort: 'ASC',
  },
]

export const usersBlocked = [
  {
    label: 'Фото пользователя не соответствует правилам',
    value: 1,
  },
  {
    label: 'В сертификате указана неправдивая информация',
    value: 2,
  },
  {
    label: 'Другое',
    value: 3,
  },
]

export const FILTER_DOCUMENTS = 'documents'
export const FILTER_USERS = 'users'
