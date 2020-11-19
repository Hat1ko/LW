import { useEffect } from 'react'

/**
 * Hook that handles a click outside the element area
 * @param {*} ref ref element whose area is being processed
 * @param {function} onClickOutside function what to do when clicking outside the area
 */
export const useClickOutside = (ref, onClickOutside) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
