const sortByName = (a: RunnerV2, b: RunnerV2) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sortByIsUsed = (a: RunnerV2, b: RunnerV2) => {
  if (a.is_used === b.is_used) return sortByName(a, b)
  return a.is_used ? 1 : -1
}

const sortRunners = (runners: Array<RunnerV2>) => {
  return runners.sort(sortByName).sort(sortByIsUsed)
}

export { sortRunners }
