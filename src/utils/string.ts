export const toCamelCase = (str: string) => {
  const camelCase = str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
  alert(camelCase)
  return camelCase
}

export const toPascalCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // MyGunpla -> My_Gunpla
    .replace(/[\s\-]+/g, '_') // space, dash -> _
    .toLowerCase()
}
