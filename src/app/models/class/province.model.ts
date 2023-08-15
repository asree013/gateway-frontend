export class Sectors {
  id: number
  name: string
}

export class Provinces {
  id: number
  name_th: string
  name_en: string
  geography_id: number
  code: string
}

export class Districts {
  id: number
  name_th: string
  name_en: string
  province_id: number
  code: string
}

export class SubDistricts {
  id: number
  name_th: string
  name_en: string
  zip_code: number
  amphure_id: number
}
