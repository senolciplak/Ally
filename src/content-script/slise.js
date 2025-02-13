/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-empty */
/* eslint-disable require-yield */
export default () => {
  'use strict';
  const t = {
      965: (_t, e) => {
        function n() {
          return {
            origin: window.location.origin,
            path: window.location.pathname,
          };
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Analytics = void 0);
        const i = () => Math.floor(Date.now() / 1e3);
        e.Analytics = class {
          constructor(t) {
            (this._sendEvent = t),
              (this.QUEUE = [
                { event: '#slise.internal.page_load', time: i() },
                { event: '#slise.internal.analytics_inited' },
              ]),
              this.initAdvIdFromScriptTag();
          }
          initAdvIdFromScriptTag() {
            if (this.ADVERTISER_ID) return;
            const t = (function () {
              try {
                const t = 'data-slise-adv-id',
                  e = 'slise-pix3l',
                  n = 'https://v1.slise.xyz/scripts/pix3l.js';
                let i = document.getElementById(e);
                if (
                  (i || (i = document.querySelector(`script[src='${n}']`)), !i)
                )
                  return;
                const o = i.getAttribute(t);
                if (!o) return;
                return o;
              } catch (t) {
                return;
              }
            })();
            t && this.setAdvertiserId(t);
          }
          setAdvertiserId(t) {
            'string' == typeof t &&
              (t.startsWith('adv-') && (t = t.slice(4)), (t = parseInt(t))),
              (this.ADVERTISER_ID = t),
              this.flushQueue();
          }
          setClientId(t) {
            (this.CLIENT_ID = t), this.flushQueue();
          }
          isReady() {
            return (
              !!this.ADVERTISER_ID &&
              !!this.CLIENT_ID && {
                adv: this.ADVERTISER_ID,
                client: this.CLIENT_ID,
              }
            );
          }
          sendEvent(t) {
            this.QUEUE.push(
              Object.assign(Object.assign(Object.assign({}, t), n()), {
                time: i(),
              })
            ),
              this.flushQueue();
          }
          flushQueue() {
            const t = this.isReady();
            if (!t) return;
            const e = this.QUEUE;
            this.QUEUE = [];
            for (const o of e)
              this._sendEvent(
                Object.assign(
                  Object.assign(Object.assign({ time: i() }, n()), o),
                  t
                )
              );
          }
        };
      },
      249: function (_t, e, n) {
        const i =
          (this && this.__awaiter) ||
          function (t, e, n, i) {
            return new (n || (n = Promise))(function (o, s) {
              function r(t) {
                try {
                  l(i.next(t));
                } catch (t) {
                  s(t);
                }
              }
              function a(t) {
                try {
                  l(i.throw(t));
                } catch (t) {
                  s(t);
                }
              }
              function l(t) {
                let e;
                t.done
                  ? o(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(r, a);
              }
              l((i = i.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.SliseApi = void 0);
        const o = n(737);
        e.SliseApi = class {
          constructor() {
            this.apiURL = (0, o.getSliseAPIUrl)();
          }
          getAdServeURL(t, e, n, i) {
            'string' != typeof e && (e = e.join(',')),
              (n = encodeURIComponent(n)),
              (i = encodeURIComponent(i));
            const o = encodeURIComponent(window.location.pathname);
            return `${this.apiURL}/serve?pub=${t}&size=${e}&slot=${n}&path=${o}&rnd=${i}`;
          }
          post(t, e) {
            return i(this, void 0, void 0, function* () {
              return fetch(`${this.apiURL}${t}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(e),
              });
            });
          }
          sendTrackingEvent(t) {
            return i(this, void 0, void 0, function* () {
              yield this.post('/analytics', t);
            });
          }
          sendTrackingData(t) {
            return i(this, void 0, void 0, function* () {
              const e = yield this.post('/track', t);
              return yield e.json();
            });
          }
          sendThirdPartyEvent(t) {
            return i(this, void 0, void 0, function* () {
              yield this.post('/analytics/tpe', t);
            });
          }
        };
      },
      737: (_t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getSliseAPIUrl = void 0),
          (e.getSliseAPIUrl = () => 'https://v1.slise.xyz');
      },
      356: (_t, e) => {
        function n(...t) {
          return function (e) {
            e.apply(null, t);
          };
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.EventClass = e.callWithArgsInForEach = void 0),
          (e.callWithArgsInForEach = n),
          (e.EventClass = class {
            constructor() {
              (this.listeners = []), (this.count = 0);
            }
            raise(...t) {
              this.count++, this.listeners.forEach(n(...t));
            }
            on(t) {
              return this.listeners.push(t), () => this.off(t);
            }
            once(t) {
              var e = this,
                n = function (...i) {
                  e.off(n), t(...i);
                };
              this.listeners.push(n);
            }
            off(t) {
              this.listeners = this.listeners.filter(function (e) {
                return e != t;
              });
            }
            removeAllListeners() {
              this.listeners = [];
            }
          });
      },
      64: (_t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.subscribeToPeraWalletChange = e.getPeraInfo = e.getPeraAccounts = void 0);
        const i = n(315);
        function o() {
          try {
            const t = localStorage.getItem('PeraWallet.Wallet');
            if (!t) return [];
            const e = JSON.parse(t),
              n = null == e ? void 0 : e.accounts;
            return n && Array.isArray(n) && n.length ? e.accounts : [];
          } catch (t) {
            return [];
          }
        }
        (e.getPeraAccounts = o),
          (e.getPeraInfo = function () {
            const t = o();
            return { pera_accounts: t, pera_connected: t.length > 0 };
          }),
          (e.subscribeToPeraWalletChange = function () {
            return (0, i.pollForChange)(o, 1e3, i.compareArrays, 1.1).event;
          });
      },
      375: function (_t, e, n) {
        const i =
          (this && this.__awaiter) ||
          function (t, e, n, i) {
            return new (n || (n = Promise))(function (o, s) {
              function r(t) {
                try {
                  l(i.next(t));
                } catch (t) {
                  s(t);
                }
              }
              function a(t) {
                try {
                  l(i.throw(t));
                } catch (t) {
                  s(t);
                }
              }
              function l(t) {
                let e;
                t.done
                  ? o(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(r, a);
              }
              l((i = i.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Pix3lData = void 0);
        const o = n(965),
          s = n(64),
          r = n(630),
          a = 'slise:client:id';
        function l() {
          return i(this, void 0, void 0, function* () {
            return localStorage.getItem(a);
          });
        }
        function c() {
          let t;
          return i(this, void 0, void 0, function* () {
            let e = window.ethereum;
            if (void 0 === window.ethereum || !e)
              return Promise.resolve({
                metamask_installed: !1,
                phantom_installed: !1,
              });
            const n = void 0 !== window.phantom;
            n &&
              (null === (t = window.phantom) || void 0 === t
                ? void 0
                : t.ethereum) &&
              (e = window.phantom.ethereum);
            const i = yield e.request({ method: 'eth_accounts' });
            return {
              metamask_installed: !0,
              metamask_connected: i.length > 0,
              phantom_installed: n,
              accounts: i,
            };
          });
        }
        e.Pix3lData = class {
          constructor(t) {
            (this.sliseAPI = t),
              (this.collectData = () =>
                i(this, void 0, void 0, function* () {
                  const t =
                      (navigator.languages && navigator.languages[0]) ||
                      navigator.language,
                    e = (0, r.getSolanaInfo)(),
                    n = (0, s.getPeraInfo)(),
                    i = (function () {
                      const t = /(\w+)\/([\d.]+)/g.exec(navigator.userAgent),
                        e = t ? t[1] : 'Unknown',
                        n = t ? t[2] : 'Unknown';
                      return {
                        screen_resolution_height: window.screen.height,
                        screen_resolution_width: window.screen.width,
                        window_size_width: window.innerWidth,
                        window_size_height: window.innerHeight,
                        language: navigator.language,
                        platform: navigator.platform,
                        timezone_offset: new Date().getTimezoneOffset(),
                        cookies_enabled: navigator.cookieEnabled,
                        browser_name: e,
                        browser_version: n,
                        device_pixel_ratio: window.devicePixelRatio,
                        touchSupport:
                          'ontouchstart' in window ||
                          navigator.maxTouchPoints > 0,
                      };
                    })(),
                    [o, a] = yield Promise.all([l(), c()]);
                  return this.sendData(
                    Object.assign(
                      Object.assign(
                        { locale: t, lstorage: o, clientBrowserData: i },
                        a
                      ),
                      { algorand: n, solana: e }
                    )
                  );
                })),
              (this.sendData = (t) =>
                i(this, void 0, void 0, function* () {
                  const { clientId: e } = yield this.sliseAPI.sendTrackingData(
                    t
                  );
                  e &&
                    ((function (t) {
                      i(this, void 0, void 0, function* () {
                        localStorage.setItem(a, t);
                      });
                    })(e),
                    this.analytics.setClientId(e));
                })),
              (this.thirdPartyEvent = (t, e) =>
                i(this, void 0, void 0, function* () {
                  return (
                    this.analytics.initAdvIdFromScriptTag(),
                    this.analytics.sendEvent({ event: t, args: e })
                  );
                })),
              (this.analytics = new o.Analytics((e) =>
                t.sendThirdPartyEvent(e)
              ));
          }
          init() {
            return i(this, void 0, void 0, function* () {
              l().then((t) => t && this.analytics.setClientId(t)),
                this.subscribeToWalletChange();
              try {
                (0, s.subscribeToPeraWalletChange)().on(this.collectData),
                  (0, r.subscribeToSolanaWalletChange)().on(this.collectData);
              } catch (t) {}
              return this.collectData();
            });
          }
          subscribeToWalletChange() {
            let t;
            void 0 !== window.ethereum &&
              (null === (t = window.ethereum) ||
                void 0 === t ||
                t.on('accountsChanged', this.collectData));
          }
          INIT_GLOBALS(t = !1) {
            let e, n;
            const i = (function (t) {
              const e = { event: t };
              return function (t, ...n) {
                const i = e[t];
                if ('function' == typeof i) return i(...n);
              };
            })(this.thirdPartyEvent);
            if (
              !(null === (e = window.slq) || void 0 === e ? void 0 : e.exe) ||
              t
            ) {
              const t =
                null === (n = window.slq) || void 0 === n ? void 0 : n.queue;
              if (((window.slq = i), (window.slq.exe = i), t))
                for (const e of t) i(...e);
            }
            return this;
          }
        };
      },
      630: (_t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.subscribeToSolanaWalletChange = e.getSolanaInfo = void 0);
        const i = n(315),
          o = () => {
            let t;
            const e =
              null === (t = window.solana) || void 0 === t
                ? void 0
                : t.publicKey;
            return e ? [e.toString()] : [];
          };
        (e.getSolanaInfo = () => {
          const t = o();
          return { solana_connected: t.length > 0, solana_accounts: t };
        }),
          (e.subscribeToSolanaWalletChange = function () {
            return (0, i.pollForChange)(o, 1e3, i.compareArrays, 1.1).event;
          });
      },
      315: (_t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.compareArrays = e.pollForChange = void 0);
        const i = n(356);
        (e.pollForChange = function (t, e, n, o = 1) {
          let s = new i.EventClass(),
            r = t(),
            a = e,
            l = function () {
              const i = t();
              (n ? n(r, i) : r == i) || ((a = e), (r = i), s.raise(i)),
                1 != o && ((a *= o), clearInterval(c), (c = setInterval(l, a)));
            },
            c = setInterval(l, a);
          return { event: s, stop: () => clearInterval(c) };
        }),
          (e.compareArrays = function (t, e) {
            if (t.length != e.length) return !1;
            for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
            return !0;
          });
      },
    },
    e = {};
  function n(i) {
    const o = e[i];
    if (void 0 !== o) return o.exports;
    const s = (e[i] = { exports: {} });
    return t[i].call(s.exports, s, s.exports, n), s.exports;
  }
  (() => {
    const t = n(249),
      e = n(356),
      i = n(375);
    !(function () {
      const n = new t.SliseApi();
      function o(t, e) {
        const n = t.style.width,
          i = t.style.height,
          o = document.createElement('iframe');
        (o.src = e),
          (o.width = n),
          (o.height = i),
          (o.style.backgroundColor = 'transparent'),
          (o.style.border = 'none'),
          (o.style.colorScheme = 'normal'),
          (t.innerHTML = ''),
          t.appendChild(o);
      }
      function s(t, e) {
        t.innerHTML = e;
      }
      function r() {
        return Math.random().toString(36).substring(2, 15);
      }
      function a() {
        return `${r()}${r()}${r()}${r()}`;
      }
      new i.Pix3lData(n).init(),
        window.adsbyslisernd || (window.adsbyslisernd = a()),
        (function () {
          let t = new e.EventClass(),
            n = window.location.href;
          return (
            setInterval(function () {
              window.location.href != n &&
                ((n = window.location.href), t.raise());
            }, 1e3),
            t
          );
        })().on(() => (window.adsbyslisernd = a())),
        (window.adsbyslisesync =
          window.adsbyslisesync ||
          function () {
            const t = window.adsbyslise;
            t &&
              t.length &&
              ((window.adsbyslise = []),
              (function (t) {
                let e, i, r;
                for (let a = 0; a < t.length; a++) {
                  const l = t[a],
                    c = document.querySelectorAll(
                      'ins[data-ad-slot="' + l.slot + '"]'
                    );
                  if (null == c ? void 0 : c.length)
                    for (let t = 0; t < c.length; t++) {
                      const a = c[t],
                        d = a.getAttribute('data-ad-pub'),
                        u =
                          null === (e = a.getAttribute('data-ad-format')) ||
                          void 0 === e
                            ? void 0
                            : e.split(',');
                      (d && u) ||
                        console.error(
                          `[SLISE] ad slot #${l.slot} is embedded incorrectly`
                        ),
                        d
                          ? u
                            ? 'iframe' ==
                                (null ===
                                  (r =
                                    null === (i = a.children[0]) || void 0 === i
                                      ? void 0
                                      : i.tagName) || void 0 === r
                                  ? void 0
                                  : r.toLowerCase()) ||
                              o(
                                a,
                                n.getAdServeURL(
                                  d,
                                  u,
                                  l.slot + '',
                                  window.adsbyslisernd || ''
                                )
                              )
                            : s(a, 'Embed error: slot formats are missing')
                          : s(a, 'Embed error: publisher id is missing');
                    }
                  else
                    console.error('[SLISE] ad slot #' + l.slot + ' not found');
                }
              })(t));
          }),
        window.adsbyslisesync();
    })();
  })();
};
