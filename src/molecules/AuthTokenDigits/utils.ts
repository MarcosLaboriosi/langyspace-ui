export const getEmptyDigits = (length: number) =>
  Array.from({ length }, () => '')

export const getTokenDigits = (token: string, length: number) => {
  const normalizedToken = token.replace(/\D/g, '').slice(0, length)
  return Array.from({ length }, (_, index) => normalizedToken[index] ?? '')
}
