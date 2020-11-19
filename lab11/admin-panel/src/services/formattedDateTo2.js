export const formattedDateTo2 = (date) => {
  date = new Date(date)
  const month = To2(date.getMonth() + 1)
  const day = To2(date.getDate())
  const year = date.getFullYear()

  return [day, month, year]
}

const To2 = (number) => {
  return number < 10 ? `0${number}` : number
}
