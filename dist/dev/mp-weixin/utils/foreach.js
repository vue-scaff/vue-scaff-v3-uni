"use strict";
var foreach = (target = {}, callback = () => {
}) => {
  const group = {};
  Object.keys(target).every((key) => {
    const result = callback(target[key], key);
    if (result === false) {
      return result;
    }
    group[key] = result;
    return true;
  });
  return group;
};
var __glob_2_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": foreach
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_22 = __glob_2_22;
