"use strict";
var Main = ({ app, util, route, store, style, i18n, $http, md, custom }, next) => {
  console.log(9222, app.config.globalProperties);
  console.log(1, app, 2, util, 3, route, 4, store, 5, style, 6, i18n, 7, $http, 8, md, 9, custom);
  next();
  console.log(`\u{1F145}\u{1F144}\u{1F134} \xAD\xAD\u{1F142}\u{1F132}\u{1F130}\u{1F135}\u{1F135}`);
};
var __glob_2_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Main
}, Symbol.toStringTag, { value: "Module" }));
exports.Main = Main;
exports.__glob_2_4 = __glob_2_4;
