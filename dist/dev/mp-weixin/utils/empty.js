"use strict";
var empty = (target) => {
  if (["undefined", void 0, "null", null, ""].includes(target)) {
    return true;
  }
  for (let i in target) {
    return false;
  }
  return true;
};
var __glob_2_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": empty
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_21 = __glob_2_21;
