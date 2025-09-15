interface KitPart {
  _id: string
  kit: string
  subassembly: KitSubassembly
  paints: Array<string>
  requires: Array<KitRequirement>
}
