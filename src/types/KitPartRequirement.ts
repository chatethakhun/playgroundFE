interface KitPartRequirement {
  id: number
  runner_id: number
  gate: Array<string>
  qty: number
  is_cut: boolean
  kit_part_id: number
  user_id: number
}
interface BulkUpdateKitPartRequirement {
  id: KitPartRequirement['id']
  runner_id: KitPartRequirement['runner_id']
  gate: Array<string>
  qty: number
  kit_part_id: KitPartRequirement['kit_part_id']
}

interface CompareSyncPayload {
  id?: KitPartRequirement['id']
  runner_id: KitPartRequirement['runner_id']
  gate: KitPartRequirement['gate']
  qty: KitPartRequirement['qty']
  kit_part_id: KitPartRequirement['kit_part_id']
}
