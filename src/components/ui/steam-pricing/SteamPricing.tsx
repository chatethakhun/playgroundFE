import FlexboxGrid from 'rsuite/FlexboxGrid'

interface Props {
  name: string
  steam_db_url: string
  onClick?: () => void
}
const SteamPricing = (props: Props) => {
  return (
    <FlexboxGrid.Item
      colspan={8}
      className="border p-3 rounded-md"
      onClick={props.onClick}
    >
      <h1>{props.name}</h1>
    </FlexboxGrid.Item>
  )
}

export default SteamPricing
