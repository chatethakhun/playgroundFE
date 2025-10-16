interface KitPart {
  _id: string
  kit: string
  subassembly: KitSubassembly
  paints: Array<string>
  requires: Array<KitRequirement>
  isCut: boolean
}

interface KitPartV2 {
  id: number
  code: string
  is_cut: boolean
  kit_id: number
  sub_assembly_id: number
  user_id: number
  created_at: string
  updated_at: string
  sub_assembly?: KitSubassemblyV2
}
