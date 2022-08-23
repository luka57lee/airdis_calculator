import { forwardRef, useEffect, useState } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import { Airport, AirportCodeAPIResponse } from '../../types'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { useDebounce } from '../../hooks/debounceHook'
import { getAirports } from '../../services'
import { AxiosResponse } from 'axios'

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

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

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
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [options, setOptions] = useState<Array<Airport>>([])
  const [limit, setLimit] = useState<string>('20')
  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const debouncedValue = useDebounce(searchValue, 500)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setShowError(false)
  }

  useEffect(() => {
    if (debouncedValue) {
      getAirports(debouncedValue, Number(limit)).then(
        (res: AxiosResponse<AirportCodeAPIResponse>) => {
          if (res.data.status === true && res.data.airports) {
            setOptions(res.data.airports)
          } else {
            setOptions([])
            if (res.data.status === false && res.data.message) {
              setShowError(true)
              setErrorMessage(res.data.message)
            } else {
              setShowError(true)
              setErrorMessage(`Couldn't find airports`)
            }
          }
        },
      )
    }
  }, [debouncedValue, limit])

  return (
    <CustomFormGroup>
      <FormLabel sx={{ width: 110 }}>{title}</FormLabel>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: Airport | null) => {
          setValue(newValue)
          if (newValue) {
            onSelect(newValue)
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
          if (event && event.type !== 'click') {
            setSearchValue(newInputValue)
          }
        }}
        options={options}
        getOptionLabel={(option) => `${option.name}`}
        sx={{ width: matches ? 300 : '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Input airport name or 3 digit code" />
        )}
      />
      <CustomTextField
        label="Max suggestion"
        type="number"
        value={limit}
        onChange={(event) => setLimit(event.target.value)}
        variant="outlined"
      />
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </CustomFormGroup>
  )
}

export default Search
