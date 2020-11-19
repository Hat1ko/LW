import React from 'react'
import classes from './style.scss'
import { Tab } from './Tab'

export const Tabs = ({ value, onChange, topIndent, bottomIndent, list }) => {
  const onClick = (params) => {
    if (onChange) onChange(params)
  }

  const TabList = list.map((tab, index) => (
    <Tab
      key={index}
      onClick={() => onClick(tab)}
      name={tab.name}
      active={value === tab.value ? true : false}
    />
  ))

  return (
    <div
      style={{ marginTop: topIndent, marginBottom: bottomIndent }}
      className={classes.tabs}
    >
      {TabList}
    </div>
  )
}
