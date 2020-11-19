import React from 'react'
import { Button, ButtonGroup } from '@/components'

export const DocumentControl = ({
  onAccept,
  onCancel,
  statusAccept,
  statusCancel,
  loader,
  status,
  id,
  size,
}) => {
  return (
    <ButtonGroup topIndent={40}>
      {statusAccept !== status ? (
        <Button
          size={size}
          disabled={loader && loader !== statusAccept}
          loader={loader === statusAccept}
          variant="action"
          onClick={() => {
            if (!loader) onAccept(id)
          }}
        >
          Подтвердить
        </Button>
      ) : (
        ''
      )}
      {statusCancel !== status ? (
        <Button
          size={size}
          disabled={loader && loader !== statusCancel}
          loader={loader === statusCancel}
          onClick={() => {
            if (!loader) onCancel(id)
          }}
        >
          Отклонить
        </Button>
      ) : (
        ''
      )}
    </ButtonGroup>
  )
}
