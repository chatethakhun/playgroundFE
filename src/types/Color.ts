interface Color {
  _id: string
  name: string
  hex: string
  multiple: boolean
  clearColor: boolean
  code?: string
}

interface ColorV2 {
  id: string
  name: string
  hex: string
  is_multiple: boolean
  is_clear: boolean
}

interface CreateColorPayload {
  name: string
  hex: string
  is_multiple: boolean
  is_clear: boolean
}

interface ColorsResponse {
  data: Array<Color>
}

interface UpdateColorPayload {
  name: string
  hex: string
  is_multiple: boolean
  is_clear: boolean
}
