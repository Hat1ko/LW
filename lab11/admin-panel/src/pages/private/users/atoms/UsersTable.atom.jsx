import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ButtonIcon,
  ButtonGroup,
  UserAvatar,
  Link,
} from '@/components'
import { USERS } from '@/config/routes'
import { tableUsersHead } from '@/config/usersTableFieldsConfig'
import { useHistory } from 'react-router-dom'

export const UsersTable = ({
  users,
  handleLock,
  handleUnlock,
  handleDelete,
}) => {
  const history = useHistory()

  return (
    <Table topIndent={30}>
      <TableHead>
        <TableRow>
          {tableUsersHead.map((label, index) => (
            <TableCell key={index} component="th">
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow color={!user.isActive ? 'disabled' : null} key={user.id}>
            <TableCell justify="start">
              <UserAvatar size={50} indentRight={40} photo={user.photo} />
              <Link
                variant={!user.isActive ? 'disabled' : null}
                to={`${USERS}/${user.id}`}
                anchor={`${user.firstName} ${user.lastName}`}
              />
            </TableCell>
            <TableCell>{user.typeActivity}</TableCell>
            <TableCell width={260}>{user.email}</TableCell>
            <TableCell width={150}>{user.country.name}</TableCell>
            <TableCell>
              <ButtonGroup justify="center">
                <ButtonIcon
                  title="Просмотерть"
                  indent={{ right: 25 }}
                  icon="View"
                  variant="action"
                  height={15}
                  onClick={() => history.push(`${USERS}/${user.id}`)}
                />
                {user.isActive ? (
                  <ButtonIcon
                    title="Заблокровать"
                    indent={{ right: 25 }}
                    icon="Block"
                    onClick={() => handleLock(user)}
                    variant="error"
                    height={19}
                  />
                ) : (
                  <ButtonIcon
                    title="Разблокировать"
                    indent={{ right: 25 }}
                    icon="Blocked"
                    onClick={() => handleUnlock(user)}
                    variant="error"
                    height={19}
                  />
                )}

                <ButtonIcon
                  title="Удалить"
                  icon="Delete"
                  variant="primary"
                  onClick={() => handleDelete(user)}
                  height={19}
                />
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
