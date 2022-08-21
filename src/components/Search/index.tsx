import { Airport } from '../../types'

const Search = ({
  title,
  onSelect,
}: {
  title: string
  onSelect: (ap: Airport) => void
}) => {
  return (
    <div
      onClick={() => {
        // onSelect()
      }}
    >
      search {title}
    </div>
  )
}

export default Search
