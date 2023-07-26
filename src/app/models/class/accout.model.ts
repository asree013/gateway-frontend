export class AccoutCreate {
  type_accout: string;
  title: string;
  detail: string;
  total: string;
  user_id: number;
  branch_id: number;
}

export class Accout {
  id: number;
  type_accout: string;
  title: string;
  detail: string;
  total: string;
  user_id: number;
  branch_id: number;
  create_at: Date;
  update_at: Date;
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
