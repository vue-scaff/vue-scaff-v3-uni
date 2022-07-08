"use strict";
var route = [
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "404"
    }
  },
  {
    path: "/",
    redirect: {
      name: "start"
    }
  }
];
var __glob_2_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": route
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_2_16 = __glob_2_16;
