export const generateMask = (rawValue) => {
  const patternUkraine = new RegExp(/^\+?3\d*/, 'ig')
  const patternRussiaAndKazakhstan = new RegExp(/^\+?7\d*/, 'ig')
  if (patternUkraine.test(rawValue)) {
    return [
      '+',
      /3/,
      /8/,
      '(',
      /0/,
      /\d/,
      /\d/,
      ')',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ]
  }
  if (patternRussiaAndKazakhstan.test(rawValue)) {
    return [
      '+',
      /7/,
      '(',
      /\d/,
      /\d/,
      /\d/,
      ')',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ]
  }

  return [/\+/]
}
