export type APIAirport = {
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

export type Point = {
  lat: number
  lng: number
}

export type Airport = Point & {
  name: string
  idata: string
}

export type AirportCodeAPIResponse = {
  airports?: APIAirport[]
  message: string
  status: boolean
  statusCode: number
  term: string
  cached?: boolean
  limit?: string
}
