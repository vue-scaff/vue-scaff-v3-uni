export default {
  userName: /^[a-zA-Z0-9]\w{5,12}$/,
  realName: /^(([\u4E00-\u9FA5]+)(·[\u4E00-\u9FA5]+)*([0-9]*$))$/,
  phone: /^1[3|4|5|6|7|8|9]\d{9}$/,
  code: /^\d+$/,
  clinicName: /^\s+$/,
  selectCity: /^\s+$/,
  address: /^\s+$/,
  certNumber: /^[a-zA-Z0-9]+$/,
  password: /^[a-zA-Z0-9]\w{5,16}$/,
  confirmPassword: /^[a-zA-Z0-9]\w{5,16}$/,
};
