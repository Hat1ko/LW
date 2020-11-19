export const statusAccept = 'accepted'
export const statusCancel = 'rejected'
export const statusOnReview = 'onReview'

export const statusInfo = [
  {
    description: 'Ожидание',
    icon: 'Clock',
    variant: 'primary',
    status: statusOnReview,
  },
  {
    description: 'Подтвержден',
    icon: 'Approved',
    variant: 'success',
    status: statusAccept,
  },
  {
    description: 'Отклонен',
    icon: 'Block',
    variant: 'error',
    status: statusCancel,
  },
]
