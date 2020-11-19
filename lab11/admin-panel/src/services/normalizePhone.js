const clearSymbols = ['\\(', '\\)', '\\s', '-']

export const normalizePhone = number => {
  if (!number) return ''
  clearSymbols.map(p => {
    const pattern = new RegExp(p, 'g')
    number = number.replace(pattern, '')
    return false
  })
  return number
}
