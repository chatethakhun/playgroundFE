interface Article {
  work: {
    title: string
    key: string
    author_keys: Array<string>
    author_names: Array<string>
    first_publish_year: nummber
    lending_edition_s: string | null
    edition_key: Array<string>
    cover_id: number
    cover_edition_key: string
  }
}
