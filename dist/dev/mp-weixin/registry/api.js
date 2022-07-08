"use strict";
var api = ({ host }, replace) => {
  return {
    mock: `${host}/path/to/api`,
    test: replace(`${host}/path/{param}/to`)
  };
};
var __glob_2_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": api
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_13 = __glob_2_13;
