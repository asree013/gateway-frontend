export class AccoutCreate {
  type_accout: string;
  title: string;
  detail: string;
  total: string;
  user_id: number;
  branch_id: number;
}

export class Accout {
    id: number
    br_title: string
    detai: string
    create_at: Date
    update_at: Date
    type_accout: string
    user_nicename: string
    branch_id: number
    title: string
    total: number
    user_id: number
    pic_accout: Pic_accout[]
}

type Pic_accout = {
  image: string
}

export class AccoutAll {
  user_nicename: string;
  id: number;
  type_accout: string;
  title: string;
  detail: string;
  total: number;
  user_id: number;
  branch_id: number;
  create_at: Date;
  update_at: Date;
  br_title: string;
  pic_accout: Pic_accout[]
}

export class AccoutUpdate {
  type_accout: string;
  title: string;
  detail: string;
  total: string;
}

export class ImagesCreate {
  accout_id: number;
  image: string;
}

export class AccoutOnDateAndBranch {
  date: string;
  branch_id: number;
}
export class AccoutOnDate {
  date: string;
}

export class AccoutSearchAdmin {
  date: Date | string;
  branch_id: string | string[];
}

