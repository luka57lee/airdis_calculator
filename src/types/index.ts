export type Airport = {
  name: string
  city: string
  idata: string
  latitude: string
  longitude: string
  country: {
    name: string
    iso: string
  }
  state: {
    name: string
    abbr: string
    type: string
  }
}

export type InternalAirport = {
  name: string
  idata: string
  lat: number
  lng: number
}

export type AirportSearch = {
  origin: InternalAirport | undefined
  destination: InternalAirport | undefined
}

export type AirportCodeAPIResponse = {
  airports?: Airport[]
  message: string
  status: boolean
  statusCode: number
  term: string
  cached?: boolean
  limit?: string
}
