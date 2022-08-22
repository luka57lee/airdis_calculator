import axios from 'axios'
const airportCodesAPI = 'https://www.air-port-codes.com/api/v1/multi'
const APC_AUTH = process.env.APC_Auth
const APC_AUTH_SECRET = process.env.APC_AUTH_SECRET

export const getAirports = (search: string, limit: number): Promise<any> => {
  return axios.post(airportCodesAPI, {
    method: 'post', // default
    headers: { 'APC-Auth': APC_AUTH, 'APC-Auth-Secret': APC_AUTH_SECRET },
    data: {
      tern: search,
      limit,
    },
  })
}
