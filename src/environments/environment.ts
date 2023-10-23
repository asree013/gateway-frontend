const nginx = 'http://localhost:8080'
const apace = 'http://localhost:8888'
export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  wooUrl: nginx,
  postAuthe: 'wp-json/jwt-auth/v1/token',
  validateAuthen: 'wp-json/jwt-auth/v1/token/validate',
  upLoadImage: 'wp-json/wp/v2/media',
  noImgae: 'assets/images/noImage.png'
};

