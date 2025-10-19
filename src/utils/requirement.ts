const sortRequirementsByRunnerCode = (
  a: KitRequirementWithRunnerAndColor,
  b: KitRequirementWithRunnerAndColor,
) => {
  if (a.runner.name < b.runner.name) {
    return -1
  }
  if (a.runner.name > b.runner.name) {
    return 1
  }
  return 0
}

const sortGateByCharacterCode = (gateA: string, gateB: string) => {
  const numberA = parseInt(gateA)
  const numberB = parseInt(gateB)
  if (numberA < numberB) {
    return -1
  }
  if (numberA > numberB) {
    return 1
  }
  return 0
}

const sortRequirements = (requirements: KitRequirementWithRunnerAndColor[]) => {
  return requirements.sort(sortRequirementsByRunnerCode)
}

const sortGates = (gates: Array<string>) => {
  return gates.sort(sortGateByCharacterCode)
}

export { sortRequirements, sortGates }
