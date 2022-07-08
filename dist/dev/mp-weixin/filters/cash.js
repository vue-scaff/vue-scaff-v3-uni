"use strict";
var cash = (value, mode) => {
  switch (mode) {
    case "dollar":
      return `$${value}.00`;
    case "euro":
      return `\u20AC${value}.00`;
    default:
      return value;
  }
};
var __glob_2_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": cash
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_10 = __glob_2_10;
