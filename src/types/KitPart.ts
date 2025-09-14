interface KitPart {
  _id: string
  kit: string
  subassembly: KitSubassembly
  name: string
  paints: Array<string>
  requires: Array<KitRequirement>
}
