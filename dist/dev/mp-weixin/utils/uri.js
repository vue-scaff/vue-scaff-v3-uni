"use strict";
var common_assets = require("../common/assets.js");
var uri = (link = "") => {
  return new URL({ "/src/assets/vue-scaff-fox.png": common_assets._imports_0 }[`/src/assets/${link}`], self.location);
};
var __glob_2_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": uri
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_23 = __glob_2_23;
