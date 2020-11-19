import React, { useState, useRef, useEffect } from 'react'
import classes from './style.scss'
import { SidebarControl } from './SidebarControl'

export const Sidebar = ({ children, full, onClickControl }) => {
  const refScroll = useRef()
  const [scrollWidth, setScrollWidth] = useState(18)

  useEffect(() => {
    setScrollWidth(
      refScroll.current.offsetWidth - refScroll.current.clientWidth
    )
  }, [setScrollWidth])

  const cls = [classes.containerSidebar, full ? classes.full : ''].join(' ')

  let wrapperWidth = 270
  if (!full) wrapperWidth = 100

  return (
    <div className={cls}>
      <div
        style={{ maxWidth: wrapperWidth }}
        className={classes.scrollContainer}
      >
        <div
          style={{ width: wrapperWidth + scrollWidth }}
          ref={refScroll}
          className={classes.menuContainer}
        >
          {children}
        </div>
      </div>
      <SidebarControl full={full} setFull={onClickControl} />
    </div>
  )
}
