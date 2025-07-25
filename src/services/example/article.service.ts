import axios from 'axios'

export const getArticles = async () => {
  try {
    const { data } = await axios.get<{ reading_log_entries: Array<Article> }>(
      'https://openlibrary.org/people/mekBot/books/want-to-read.json',
    )

    return data.reading_log_entries
  } catch (e) {
    console.error(e)
  }
}
