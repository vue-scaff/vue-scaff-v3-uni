/**
 * Scaffold by Joenix
 * ========== ========== ==========
 */
export default ({ app, util, route, store, style, i18n, $http, md, regs }: object, next: void) => {
  // Interceptor Http -  the `result` is wrap by `uni-app`
  $http.interceptor.request = (data, header) => {
    return { data, header };
  };

  $http.interceptor.response = result => {
    // Success if Status is 200
    if (result.status === 200) {
      return result.data;
    }

    // Errors
    uni.$u.toast(result.message);

    // Any
    return result;
  };

  // Running
  next();

  // Special Console
  console.log(`🅅🅄🄴 ­­🅂🄲🄰🄵🄵`);
};
