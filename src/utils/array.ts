const sortStringArray = (arr: string[]) => {

  return arr.sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })
}

export const sortNumberArray = (arr: number[]) => {
  return arr.sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })
}

export const convertStringArrayToNumberArray = (arr: string[]) => {
  return arr.map((a) => Number(a))
}

export { sortStringArray }
