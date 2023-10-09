export class UsersCreate{
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class Username{
  first_name: string;
  last_name: string;
}

export class Users {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: string;
  user_activation_key: string;
  user_status: string;
  display_name: string;
}
