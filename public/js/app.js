(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/notie/dist/notie.min.js
  var require_notie_min = __commonJS({
    "node_modules/notie/dist/notie.min.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.notie = t() : e.notie = t();
      }(exports, function() {
        return function(e) {
          function t(s) {
            if (n[s])
              return n[s].exports;
            var a = n[s] = { i: s, l: false, exports: {} };
            return e[s].call(a.exports, a, a.exports, t), a.l = true, a.exports;
          }
          var n = {};
          return t.m = e, t.c = n, t.i = function(e2) {
            return e2;
          }, t.d = function(e2, n2, s) {
            t.o(e2, n2) || Object.defineProperty(e2, n2, { configurable: false, enumerable: true, get: s });
          }, t.n = function(e2) {
            var n2 = e2 && e2.__esModule ? function() {
              return e2.default;
            } : function() {
              return e2;
            };
            return t.d(n2, "a", n2), n2;
          }, t.o = function(e2, t2) {
            return Object.prototype.hasOwnProperty.call(e2, t2);
          }, t.p = "", t(t.s = 1);
        }([function(e, t) {
          e.exports = function(e2) {
            return e2.webpackPolyfill || (e2.deprecate = function() {
            }, e2.paths = [], e2.children || (e2.children = []), Object.defineProperty(e2, "loaded", { enumerable: true, get: function() {
              return e2.l;
            } }), Object.defineProperty(e2, "id", { enumerable: true, get: function() {
              return e2.i;
            } }), e2.webpackPolyfill = 1), e2;
          };
        }, function(e, t, n) {
          "use strict";
          (function(e2) {
            var n2, s, a, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
              return typeof e3;
            } : function(e3) {
              return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
            };
            !function(c, o) {
              "object" === i(t) && "object" === i(e2) ? e2.exports = o() : (s = [], n2 = o, a = "function" == typeof n2 ? n2.apply(t, s) : n2, !(void 0 !== a && (e2.exports = a)));
            }(void 0, function() {
              return function(e3) {
                function t2(s2) {
                  if (n3[s2])
                    return n3[s2].exports;
                  var a2 = n3[s2] = { i: s2, l: false, exports: {} };
                  return e3[s2].call(a2.exports, a2, a2.exports, t2), a2.l = true, a2.exports;
                }
                var n3 = {};
                return t2.m = e3, t2.c = n3, t2.i = function(e4) {
                  return e4;
                }, t2.d = function(e4, n4, s2) {
                  t2.o(e4, n4) || Object.defineProperty(e4, n4, { configurable: false, enumerable: true, get: s2 });
                }, t2.n = function(e4) {
                  var n4 = e4 && e4.__esModule ? function() {
                    return e4.default;
                  } : function() {
                    return e4;
                  };
                  return t2.d(n4, "a", n4), n4;
                }, t2.o = function(e4, t3) {
                  return Object.prototype.hasOwnProperty.call(e4, t3);
                }, t2.p = "", t2(t2.s = 0);
              }([function(e3, t2, n3) {
                function s2(e4, t3) {
                  var n4 = {};
                  for (var s3 in e4)
                    t3.indexOf(s3) >= 0 || Object.prototype.hasOwnProperty.call(e4, s3) && (n4[s3] = e4[s3]);
                  return n4;
                }
                Object.defineProperty(t2, "__esModule", { value: true });
                var a2 = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(e4) {
                  return "undefined" == typeof e4 ? "undefined" : i(e4);
                } : function(e4) {
                  return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : "undefined" == typeof e4 ? "undefined" : i(e4);
                }, c = Object.assign || function(e4) {
                  for (var t3 = 1; t3 < arguments.length; t3++) {
                    var n4 = arguments[t3];
                    for (var s3 in n4)
                      Object.prototype.hasOwnProperty.call(n4, s3) && (e4[s3] = n4[s3]);
                  }
                  return e4;
                }, o = { top: "top", bottom: "bottom" }, r = { alertTime: 3, dateMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], overlayClickDismiss: true, overlayOpacity: 0.75, transitionCurve: "ease", transitionDuration: 0.3, transitionSelector: "all", classes: { container: "notie-container", textbox: "notie-textbox", textboxInner: "notie-textbox-inner", button: "notie-button", element: "notie-element", elementHalf: "notie-element-half", elementThird: "notie-element-third", overlay: "notie-overlay", backgroundSuccess: "notie-background-success", backgroundWarning: "notie-background-warning", backgroundError: "notie-background-error", backgroundInfo: "notie-background-info", backgroundNeutral: "notie-background-neutral", backgroundOverlay: "notie-background-overlay", alert: "notie-alert", inputField: "notie-input-field", selectChoiceRepeated: "notie-select-choice-repeated", dateSelectorInner: "notie-date-selector-inner", dateSelectorUp: "notie-date-selector-up" }, ids: { overlay: "notie-overlay" }, positions: { alert: o.top, force: o.top, confirm: o.top, input: o.top, select: o.bottom, date: o.top } }, l = t2.setOptions = function(e4) {
                  r = c({}, r, e4, { classes: c({}, r.classes, e4.classes), ids: c({}, r.ids, e4.ids), positions: c({}, r.positions, e4.positions) });
                }, d = function() {
                  return new Promise(function(e4) {
                    return setTimeout(e4, 0);
                  });
                }, u = function(e4) {
                  return new Promise(function(t3) {
                    return setTimeout(t3, 1e3 * e4);
                  });
                }, p = function() {
                  document.activeElement && document.activeElement.blur();
                }, f = function() {
                  var e4 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e5) {
                    var t3 = 16 * Math.random() | 0, n4 = "x" === e5 ? t3 : 3 & t3 | 8;
                    return n4.toString(16);
                  });
                  return "notie-" + e4;
                }, m = { 1: r.classes.backgroundSuccess, success: r.classes.backgroundSuccess, 2: r.classes.backgroundWarning, warning: r.classes.backgroundWarning, 3: r.classes.backgroundError, error: r.classes.backgroundError, 4: r.classes.backgroundInfo, info: r.classes.backgroundInfo, 5: r.classes.backgroundNeutral, neutral: r.classes.backgroundNeutral }, v = function() {
                  return r.transitionSelector + " " + r.transitionDuration + "s " + r.transitionCurve;
                }, b = function(e4) {
                  return 13 === e4.keyCode;
                }, x = function(e4) {
                  return 27 === e4.keyCode;
                }, y = function(e4, t3) {
                  e4.classList.add(r.classes.container), e4.style[t3] = "-10000px", document.body.appendChild(e4), e4.style[t3] = "-" + e4.offsetHeight + "px", e4.listener && window.addEventListener("keydown", e4.listener), d().then(function() {
                    e4.style.transition = v(), e4.style[t3] = 0;
                  });
                }, L = function(e4, t3) {
                  var n4 = document.getElementById(e4);
                  n4 && (n4.style[t3] = "-" + n4.offsetHeight + "px", n4.listener && window.removeEventListener("keydown", n4.listener), u(r.transitionDuration).then(function() {
                    n4.parentNode && n4.parentNode.removeChild(n4);
                  }));
                }, g = function(e4, t3) {
                  var n4 = document.createElement("div");
                  n4.id = r.ids.overlay, n4.classList.add(r.classes.overlay), n4.classList.add(r.classes.backgroundOverlay), n4.style.opacity = 0, e4 && r.overlayClickDismiss && (n4.onclick = function() {
                    L(e4.id, t3), h();
                  }), document.body.appendChild(n4), d().then(function() {
                    n4.style.transition = v(), n4.style.opacity = r.overlayOpacity;
                  });
                }, h = function() {
                  var e4 = document.getElementById(r.ids.overlay);
                  e4.style.opacity = 0, u(r.transitionDuration).then(function() {
                    e4.parentNode && e4.parentNode.removeChild(e4);
                  });
                }, k = t2.hideAlerts = function(e4) {
                  var t3 = document.getElementsByClassName(r.classes.alert);
                  if (t3.length) {
                    for (var n4 = 0; n4 < t3.length; n4++) {
                      var s3 = t3[n4];
                      L(s3.id, s3.position);
                    }
                    e4 && u(r.transitionDuration).then(function() {
                      return e4();
                    });
                  }
                }, C = t2.alert = function(e4) {
                  var t3 = e4.type, n4 = void 0 === t3 ? 4 : t3, s3 = e4.text, a3 = e4.time, i2 = void 0 === a3 ? r.alertTime : a3, c2 = e4.stay, o2 = void 0 !== c2 && c2, l2 = e4.position, d2 = void 0 === l2 ? r.positions.alert || d2.top : l2;
                  p(), k();
                  var v2 = document.createElement("div"), g2 = f();
                  v2.id = g2, v2.position = d2, v2.classList.add(r.classes.textbox), v2.classList.add(m[n4]), v2.classList.add(r.classes.alert), v2.innerHTML = '<div class="' + r.classes.textboxInner + '">' + s3 + "</div>", v2.onclick = function() {
                    return L(g2, d2);
                  }, v2.listener = function(e5) {
                    (b(e5) || x(e5)) && k();
                  }, y(v2, d2), i2 && i2 < 1 && (i2 = 1), !o2 && i2 && u(i2).then(function() {
                    return L(g2, d2);
                  });
                }, E = t2.force = function(e4, t3) {
                  var n4 = e4.type, s3 = void 0 === n4 ? 5 : n4, a3 = e4.text, i2 = e4.buttonText, c2 = void 0 === i2 ? "OK" : i2, o2 = e4.callback, l2 = e4.position, d2 = void 0 === l2 ? r.positions.force || d2.top : l2;
                  p(), k();
                  var u2 = document.createElement("div"), v2 = f();
                  u2.id = v2;
                  var x2 = document.createElement("div");
                  x2.classList.add(r.classes.textbox), x2.classList.add(r.classes.backgroundInfo), x2.innerHTML = '<div class="' + r.classes.textboxInner + '">' + a3 + "</div>";
                  var C2 = document.createElement("div");
                  C2.classList.add(r.classes.button), C2.classList.add(m[s3]), C2.innerHTML = c2, C2.onclick = function() {
                    L(v2, d2), h(), o2 ? o2() : t3 && t3();
                  }, u2.appendChild(x2), u2.appendChild(C2), u2.listener = function(e5) {
                    b(e5) && C2.click();
                  }, y(u2, d2), g();
                }, T = t2.confirm = function(e4, t3, n4) {
                  var s3 = e4.text, a3 = e4.submitText, i2 = void 0 === a3 ? "Yes" : a3, c2 = e4.cancelText, o2 = void 0 === c2 ? "Cancel" : c2, l2 = e4.submitCallback, d2 = e4.cancelCallback, u2 = e4.position, m2 = void 0 === u2 ? r.positions.confirm || m2.top : u2;
                  p(), k();
                  var v2 = document.createElement("div"), C2 = f();
                  v2.id = C2;
                  var E2 = document.createElement("div");
                  E2.classList.add(r.classes.textbox), E2.classList.add(r.classes.backgroundInfo), E2.innerHTML = '<div class="' + r.classes.textboxInner + '">' + s3 + "</div>";
                  var T2 = document.createElement("div");
                  T2.classList.add(r.classes.button), T2.classList.add(r.classes.elementHalf), T2.classList.add(r.classes.backgroundSuccess), T2.innerHTML = i2, T2.onclick = function() {
                    L(C2, m2), h(), l2 ? l2() : t3 && t3();
                  };
                  var M2 = document.createElement("div");
                  M2.classList.add(r.classes.button), M2.classList.add(r.classes.elementHalf), M2.classList.add(r.classes.backgroundError), M2.innerHTML = o2, M2.onclick = function() {
                    L(C2, m2), h(), d2 ? d2() : n4 && n4();
                  }, v2.appendChild(E2), v2.appendChild(T2), v2.appendChild(M2), v2.listener = function(e5) {
                    b(e5) ? T2.click() : x(e5) && M2.click();
                  }, y(v2, m2), g(v2, m2);
                }, M = function(e4, t3, n4) {
                  var i2 = e4.text, c2 = e4.submitText, o2 = void 0 === c2 ? "Submit" : c2, l2 = e4.cancelText, d2 = void 0 === l2 ? "Cancel" : l2, u2 = e4.submitCallback, m2 = e4.cancelCallback, v2 = e4.position, C2 = void 0 === v2 ? r.positions.input || C2.top : v2, E2 = s2(e4, ["text", "submitText", "cancelText", "submitCallback", "cancelCallback", "position"]);
                  p(), k();
                  var T2 = document.createElement("div"), M2 = f();
                  T2.id = M2;
                  var H2 = document.createElement("div");
                  H2.classList.add(r.classes.textbox), H2.classList.add(r.classes.backgroundInfo), H2.innerHTML = '<div class="' + r.classes.textboxInner + '">' + i2 + "</div>";
                  var S2 = document.createElement("input");
                  S2.classList.add(r.classes.inputField), S2.setAttribute("autocapitalize", E2.autocapitalize || "none"), S2.setAttribute("autocomplete", E2.autocomplete || "off"), S2.setAttribute("autocorrect", E2.autocorrect || "off"), S2.setAttribute("autofocus", E2.autofocus || "true"), S2.setAttribute("inputmode", E2.inputmode || "verbatim"), S2.setAttribute("max", E2.max || ""), S2.setAttribute("maxlength", E2.maxlength || ""), S2.setAttribute("min", E2.min || ""), S2.setAttribute("minlength", E2.minlength || ""), S2.setAttribute("placeholder", E2.placeholder || ""), S2.setAttribute("spellcheck", E2.spellcheck || "default"), S2.setAttribute("step", E2.step || "any"), S2.setAttribute("type", E2.type || "text"), S2.value = E2.value || "", E2.allowed && (S2.oninput = function() {
                    var e5 = void 0;
                    if (Array.isArray(E2.allowed)) {
                      for (var t4 = "", n5 = E2.allowed, s3 = 0; s3 < n5.length; s3++)
                        "an" === n5[s3] ? t4 += "0-9a-zA-Z" : "a" === n5[s3] ? t4 += "a-zA-Z" : "n" === n5[s3] && (t4 += "0-9"), "s" === n5[s3] && (t4 += " ");
                      e5 = new RegExp("[^" + t4 + "]", "g");
                    } else
                      "object" === a2(E2.allowed) && (e5 = E2.allowed);
                    S2.value = S2.value.replace(e5, "");
                  });
                  var w = document.createElement("div");
                  w.classList.add(r.classes.button), w.classList.add(r.classes.elementHalf), w.classList.add(r.classes.backgroundSuccess), w.innerHTML = o2, w.onclick = function() {
                    L(M2, C2), h(), u2 ? u2(S2.value) : t3 && t3(S2.value);
                  };
                  var O = document.createElement("div");
                  O.classList.add(r.classes.button), O.classList.add(r.classes.elementHalf), O.classList.add(r.classes.backgroundError), O.innerHTML = d2, O.onclick = function() {
                    L(M2, C2), h(), m2 ? m2(S2.value) : n4 && n4(S2.value);
                  }, T2.appendChild(H2), T2.appendChild(S2), T2.appendChild(w), T2.appendChild(O), T2.listener = function(e5) {
                    b(e5) ? w.click() : x(e5) && O.click();
                  }, y(T2, C2), S2.focus(), g(T2, C2);
                };
                t2.input = M;
                var H = t2.select = function(e4, t3) {
                  var n4 = e4.text, s3 = e4.cancelText, a3 = void 0 === s3 ? "Cancel" : s3, i2 = e4.cancelCallback, c2 = e4.choices, o2 = e4.position, l2 = void 0 === o2 ? r.positions.select || l2.top : o2;
                  p(), k();
                  var d2 = document.createElement("div"), u2 = f();
                  d2.id = u2;
                  var v2 = document.createElement("div");
                  v2.classList.add(r.classes.textbox), v2.classList.add(r.classes.backgroundInfo), v2.innerHTML = '<div class="' + r.classes.textboxInner + '">' + n4 + "</div>", d2.appendChild(v2), c2.forEach(function(e5, t4) {
                    var n5 = e5.type, s4 = void 0 === n5 ? 1 : n5, a4 = e5.text, i3 = e5.handler, o3 = document.createElement("div");
                    o3.classList.add(m[s4]), o3.classList.add(r.classes.button), o3.classList.add(r.classes.selectChoice);
                    var p2 = c2[t4 + 1];
                    p2 && !p2.type && (p2.type = 1), p2 && p2.type === s4 && o3.classList.add(r.classes.selectChoiceRepeated), o3.innerHTML = a4, o3.onclick = function() {
                      L(u2, l2), h(), i3();
                    }, d2.appendChild(o3);
                  });
                  var b2 = document.createElement("div");
                  b2.classList.add(r.classes.backgroundNeutral), b2.classList.add(r.classes.button), b2.innerHTML = a3, b2.onclick = function() {
                    L(u2, l2), h(), i2 ? i2() : t3 && t3();
                  }, d2.appendChild(b2), d2.listener = function(e5) {
                    x(e5) && b2.click();
                  }, y(d2, l2), g(d2, l2);
                }, S = t2.date = function(e4, t3, n4) {
                  var s3 = e4.value, a3 = void 0 === s3 ? new Date() : s3, i2 = e4.submitText, c2 = void 0 === i2 ? "OK" : i2, o2 = e4.cancelText, l2 = void 0 === o2 ? "Cancel" : o2, d2 = e4.submitCallback, u2 = e4.cancelCallback, m2 = e4.position, v2 = void 0 === m2 ? r.positions.date || v2.top : m2;
                  p(), k();
                  var C2 = "&#9662", E2 = document.createElement("div"), T2 = document.createElement("div"), M2 = document.createElement("div"), H2 = function(e5) {
                    E2.innerHTML = r.dateMonths[e5.getMonth()], T2.innerHTML = e5.getDate(), M2.innerHTML = e5.getFullYear();
                  }, S2 = function(e5) {
                    var t4 = new Date(a3.getFullYear(), a3.getMonth() + 1, 0).getDate(), n5 = e5.target.textContent.replace(/^0+/, "").replace(/[^\d]/g, "").slice(0, 2);
                    Number(n5) > t4 && (n5 = t4.toString()), e5.target.textContent = n5, Number(n5) < 1 && (n5 = "1"), a3.setDate(Number(n5));
                  }, w = function(e5) {
                    var t4 = e5.target.textContent.replace(/^0+/, "").replace(/[^\d]/g, "").slice(0, 4);
                    e5.target.textContent = t4, a3.setFullYear(Number(t4));
                  }, O = function(e5) {
                    H2(a3);
                  }, A = function(e5) {
                    var t4 = new Date(a3.getFullYear(), a3.getMonth() + e5 + 1, 0).getDate();
                    a3.getDate() > t4 && a3.setDate(t4), a3.setMonth(a3.getMonth() + e5), H2(a3);
                  }, D = function(e5) {
                    a3.setDate(a3.getDate() + e5), H2(a3);
                  }, I = function(e5) {
                    var t4 = a3.getFullYear() + e5;
                    t4 < 0 ? a3.setFullYear(0) : a3.setFullYear(a3.getFullYear() + e5), H2(a3);
                  }, j = document.createElement("div"), N = f();
                  j.id = N;
                  var P = document.createElement("div");
                  P.classList.add(r.classes.backgroundInfo);
                  var F = document.createElement("div");
                  F.classList.add(r.classes.dateSelectorInner);
                  var Y = document.createElement("div");
                  Y.classList.add(r.classes.button), Y.classList.add(r.classes.elementThird), Y.classList.add(r.classes.dateSelectorUp), Y.innerHTML = C2;
                  var _ = document.createElement("div");
                  _.classList.add(r.classes.button), _.classList.add(r.classes.elementThird), _.classList.add(r.classes.dateSelectorUp), _.innerHTML = C2;
                  var z = document.createElement("div");
                  z.classList.add(r.classes.button), z.classList.add(r.classes.elementThird), z.classList.add(r.classes.dateSelectorUp), z.innerHTML = C2, E2.classList.add(r.classes.element), E2.classList.add(r.classes.elementThird), E2.innerHTML = r.dateMonths[a3.getMonth()], T2.classList.add(r.classes.element), T2.classList.add(r.classes.elementThird), T2.setAttribute("contentEditable", true), T2.addEventListener("input", S2), T2.addEventListener("blur", O), T2.innerHTML = a3.getDate(), M2.classList.add(r.classes.element), M2.classList.add(r.classes.elementThird), M2.setAttribute("contentEditable", true), M2.addEventListener("input", w), M2.addEventListener("blur", O), M2.innerHTML = a3.getFullYear();
                  var U = document.createElement("div");
                  U.classList.add(r.classes.button), U.classList.add(r.classes.elementThird), U.innerHTML = C2;
                  var B = document.createElement("div");
                  B.classList.add(r.classes.button), B.classList.add(r.classes.elementThird), B.innerHTML = C2;
                  var J = document.createElement("div");
                  J.classList.add(r.classes.button), J.classList.add(r.classes.elementThird), J.innerHTML = C2, Y.onclick = function() {
                    return A(1);
                  }, _.onclick = function() {
                    return D(1);
                  }, z.onclick = function() {
                    return I(1);
                  }, U.onclick = function() {
                    return A(-1);
                  }, B.onclick = function() {
                    return D(-1);
                  }, J.onclick = function() {
                    return I(-1);
                  };
                  var R = document.createElement("div");
                  R.classList.add(r.classes.button), R.classList.add(r.classes.elementHalf), R.classList.add(r.classes.backgroundSuccess), R.innerHTML = c2, R.onclick = function() {
                    L(N, v2), h(), d2 ? d2(a3) : t3 && t3(a3);
                  };
                  var W = document.createElement("div");
                  W.classList.add(r.classes.button), W.classList.add(r.classes.elementHalf), W.classList.add(r.classes.backgroundError), W.innerHTML = l2, W.onclick = function() {
                    L(N, v2), h(), u2 ? u2(a3) : n4 && n4(a3);
                  }, F.appendChild(Y), F.appendChild(_), F.appendChild(z), F.appendChild(E2), F.appendChild(T2), F.appendChild(M2), F.appendChild(U), F.appendChild(B), F.appendChild(J), P.appendChild(F), j.appendChild(P), j.appendChild(R), j.appendChild(W), j.listener = function(e5) {
                    b(e5) ? R.click() : x(e5) && W.click();
                  }, y(j, v2), g(j, v2);
                };
                t2.default = { alert: C, force: E, confirm: T, input: M, select: H, date: S, setOptions: l, hideAlerts: k };
              }]);
            });
          }).call(t, n(0)(e));
        }]);
      });
    }
  });

  // src/js/helpers/handleMenu.js
  var handleMenu = (nav = "", navBtn = "") => {
    document.addEventListener("click", (e) => {
      if (!e.target.matches(`${navBtn} *`))
        return;
      const $navMenu = document.querySelector(nav);
      if (!$navMenu.dataset.status)
        return console.error(
          'Para tener un men\xFA dinamico debe indicar el data-attribute "status" (data-status) igual a "open" o "close"'
        );
      if ($navMenu.dataset.status === "close") {
        $navMenu.classList.replace("p-0", "p-4");
        $navMenu.classList.replace("h-0", "h-auto");
        $navMenu.dataset.status = "open";
      } else {
        $navMenu.classList.replace("p-4", "p-0");
        $navMenu.classList.replace("h-auto", "h-0");
        $navMenu.dataset.status = "close";
      }
    });
  };
  var handleMenu_default = handleMenu;

  // src/js/helpers/handleNotification.js
  var import_notie = __toESM(require_notie_min(), 1);
  var handleNotification = (element = "", callback = Function) => callback(document.querySelector(element), import_notie.default);
  var handleNotification_default = handleNotification;

  // src/js/helpers/handleSearcher.js
  var handleSearcher = (searcher = "", searcherBtn = "") => {
    document.addEventListener("click", (e) => {
      if (!e.target.matches(`${searcherBtn} *`))
        return;
      const $searcher = document.querySelector(searcher);
      if (!$searcher.dataset.status)
        return console.error(
          'Para tener un buscador dinamico debe indicar el data-attribute "status" (data-status) igual a "open" o "close"'
        );
      if ($searcher.dataset.status === "close") {
        $searcher.classList.replace("h-0", "h-auto");
        const $input = $searcher.querySelector('input[type="text"]');
        $input.focus();
        $searcher.dataset.status = "open";
      } else {
        $searcher.classList.replace("h-auto", "h-0");
        $searcher.dataset.status = "close";
      }
    });
  };
  var handleSearcher_default = handleSearcher;

  // src/js/helpers/handlePropertyStatus.js
  var handlePropertyStatus = () => {
    const changeStatus = (target) => {
      const { parentElement } = target;
      if (parentElement.classList.contains("bg-green-100")) {
        parentElement.classList.replace("bg-green-100", "bg-yellow-100");
        parentElement.classList.replace("text-green-800", "text-yellow-800");
        target.innerHTML = "No publicado";
      } else {
        parentElement.classList.replace("bg-yellow-100", "bg-green-100");
        parentElement.classList.replace("text-yellow-800", "text-green-800");
        target.innerHTML = "Publicado";
      }
    };
    document.addEventListener("click", async (e) => {
      if (!e.target.matches("#statusBtn"))
        return;
      const { pid: propertyId } = e.target.dataset;
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
      const URL = `/properties/${propertyId}`;
      try {
        const res = await fetch(URL, {
          method: "PUT",
          headers: { "CSRF-Token": token }
        }).then((res2) => res2.json());
        res.success && changeStatus(e.target);
      } catch (error) {
        console.log(error);
      }
    });
  };
  var handlePropertyStatus_default = handlePropertyStatus;

  // src/js/app.js
  document.addEventListener("DOMContentLoaded", (e) => {
    console.log("Cargando Scripts...");
    handlePropertyStatus_default();
    handleMenu_default("#nav-menu", "#nav-menu-btn");
    handleSearcher_default("#searcher", "#searcher-btn");
    handleNotification_default("#deletePropertyAction", (element, notie2) => {
      if (!element)
        return;
      element.addEventListener("submit", (e2) => {
        e2.preventDefault();
        notie2.confirm({
          text: "\xBFEst\xE1 seguro que desea eliminar est\xE1 propiedad?",
          cancelText: "Cancelar",
          submitText: "Si, eliminar",
          cancelCallback: function() {
            notie2.alert({ type: 3, text: "Eliminaci\xF3n cancelada", time: 2 });
          },
          submitCallback: function() {
            notie2.alert({ type: 1, text: "Eliminaci\xF3n exitosa", time: 2 });
            e2.target.submit();
          }
        });
      });
    });
  });
})();
