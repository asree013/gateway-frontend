export class BranchUsersCreate {
  title: string;
  user_id: number;
}
export class CreateWareHouse {
  title: string;
  address: string
  city: string;
  province: string;
  postcode: string;
  country: string;
  email: string;
  phone: string
  user_id: number;
}

export class BranchCreate {
  title: string;
  address: string;
  city: string;
  province: string;
  postcode: number;
  country: string;
  email: string;
  phone: string;
}

export class BranchCreateForUser {
  branch_id: number;
  user_id: number;
  role?: number;
}
export class BranchForUser {
  title: string
  id: number;
  branch_id: number;
  role: number;
  user_id: number;
  create_at: Date;
  update_at: Date;
}

export class Branch {
  id: number;
  title: string;
  address: string;
  city: string;
  province: string;
  postcode: number;
  country: string;
  email: string;
  phone: string;
  create_at: Date;
  update_at: Date;
}

export class WarehouseUser {
  id: number;
  user_id: number;
  branch_id: number;
  role: number;
  first_name: string;
  last_name: string;
  email: string;
  create_at: Date;
  update_at: Date;
}
