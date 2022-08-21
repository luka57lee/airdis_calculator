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

export type AirportSearch = {
  origin: Airport | undefined
  destination: Airport | undefined
}
