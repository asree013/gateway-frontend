export class BranchCreate {
  title: string;
  user_id: number;
}

export class BranchCreateForUser {
  branch_id: number;
  user_id: number;
}
export class Branch {
  id: number;
  branch_id: number;
  user_id: number;
  create_at: Date;
  update_at: Date;
}
