const sortByName = (a: RunnerV2, b: RunnerV2) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sortRunners = (runners: Array<RunnerV2>) => {
  return runners.sort(sortByName)
}

export { sortRunners }
