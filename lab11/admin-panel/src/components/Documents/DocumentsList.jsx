import React from 'react'
import { DocumentLinear } from './DocumentLinear'
import { DocumentGrid } from './DocumentGrid'
import { Row } from 'react-grid-system'

const getListByType = props => {
  if (props.type === 'line')
    return props.list.map(d => <DocumentLinear key={d.id} {...d} {...props} />)
  else if (props.type === 'grid')
    return props.list.map(d => (
      <DocumentGrid key={d.id} to={`${props.url}/${d.id}`} {...d} {...props} />
    ))
  else return
}

const getWrapperByType = type => {
  if (type === 'line') return TableWrapper
  else if (type === 'grid') return Row
  else return DefaultComponent
}

const TableWrapper = ({ children }) => (
  <table width="100%" cellSpacing={0}>
    <tbody>{children}</tbody>
  </table>
)
const DefaultComponent = ({ children }) => <div>{children}</div>

export const DocumentsList = props => {
  const Component = getWrapperByType(props.type)
  return <Component>{getListByType(props)}</Component>
}
