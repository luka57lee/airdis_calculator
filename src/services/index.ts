import axios, { AxiosResponse } from 'axios'
import { AirportCodeAPIResponse } from '../types'
const airportCodesAPI = 'https://www.air-port-codes.com/api/v1/multi'
const APC_AUTH = process.env.REACT_APP_APC_AUTH
const APC_AUTH_SECRET = process.env.REACT_APP_APC_AUTH_SECRET

export const getAirports = (
  search: string,
): Promise<AxiosResponse<AirportCodeAPIResponse>> => {
  const formData = new FormData()

  search = search.toLocaleLowerCase()
  if (search.endsWith('international airport')) {
    search = search.substring(0, search.length - 21)
  }
  if (search.endsWith('airport')) {
    search = search.substring(0, search.length - 7)
  }
  formData.append('term', search)

  return axios.post(airportCodesAPI, formData, {
    method: 'post',
    headers: {
      'APC-Auth': APC_AUTH as string,
      'APC-Auth-Secret': APC_AUTH_SECRET as string,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  })
}
