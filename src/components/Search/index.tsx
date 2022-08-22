import { useEffect, useState } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import { Airport } from '../../types'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useDebounce } from '../../hooks/debounceHook'
import { getAirports } from '../../services'

const CustomFormGroup = styled(FormGroup)(({ theme }) => ({
  gap: '16px',
  margin: '16px',
  flexWrap: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}))

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '120px',
  },
}))

const Search = ({
  title,
  onSelect,
}: {
  title: string
  onSelect: (ap: Airport) => void
}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [value, setValue] = useState<Airport | null>()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<Array<Airport>>([])

  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    getAirports(debouncedValue, 20).then((res) => {
      console.log('res===>', res)
      setOptions(res.airports)
    })
  }, [debouncedValue])

  return (
    <CustomFormGroup>
      <FormLabel sx={{ width: 110 }}>{title}</FormLabel>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: Airport | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        options={options}
        sx={{ width: matches ? 300 : '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Input airport name or 3 digit code" />
        )}
      />
      <CustomTextField
        label="Max suggestion"
        type="number"
        defaultValue={20}
        variant="outlined"
      />
    </CustomFormGroup>
  )
}

export default Search
