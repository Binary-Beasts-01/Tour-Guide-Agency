(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (e.Dexie = t());
})(this, function () {
  'use strict';
  var m = function () {
    return (m =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }).apply(this, arguments);
  };
  function O() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
      e += arguments[t].length;
    for (var r = Array(e), i = 0, t = 0; t < n; t++)
      for (var o = arguments[t], u = 0, a = o.length; u < a; u++, i++)
        r[i] = o[u];
    return r;
  }
  var _ = Object.keys,
    d = Array.isArray,
    h =
      'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : global;
  function s(t, n) {
    return (
      'object' != typeof n ||
        _(n).forEach(function (e) {
          t[e] = n[e];
        }),
      t
    );
  }
  'undefined' == typeof Promise || h.Promise || (h.Promise = Promise);
  var r = Object.getPrototypeOf,
    n = {}.hasOwnProperty;
  function g(e, t) {
    return n.call(e, t);
  }
  function i(t, n) {
    'function' == typeof n && (n = n(r(t))),
      _(n).forEach(function (e) {
        a(t, e, n[e]);
      });
  }
  var u = Object.defineProperty;
  function a(e, t, n, r) {
    u(
      e,
      t,
      s(
        n && g(n, 'get') && 'function' == typeof n.get
          ? { get: n.get, set: n.set, configurable: !0 }
          : { value: n, configurable: !0, writable: !0 },
        r
      )
    );
  }
  function o(t) {
    return {
      from: function (e) {
        return (
          (t.prototype = Object.create(e.prototype)),
          a(t.prototype, 'constructor', t),
          { extend: i.bind(null, t.prototype) }
        );
      },
    };
  }
  var c = Object.getOwnPropertyDescriptor;
  function l(e, t) {
    var n;
    return c(e, t) || ((n = r(e)) && l(n, t));
  }
  var f = [].slice;
  function p(e, t, n) {
    return f.call(e, t, n);
  }
  function y(e, t) {
    return t(e);
  }
  function v(e) {
    if (!e) throw new Error('Assertion Failed');
  }
  function b(e) {
    h.setImmediate ? setImmediate(e) : setTimeout(e, 0);
  }
  function w(e, i) {
    return e.reduce(function (e, t, n) {
      var r = i(t, n);
      return r && (e[r[0]] = r[1]), e;
    }, {});
  }
  function x(e, t) {
    if (g(e, t)) return e[t];
    if (!t) return e;
    if ('string' != typeof t) {
      for (var n = [], r = 0, i = t.length; r < i; ++r) {
        var o = x(e, t[r]);
        n.push(o);
      }
      return n;
    }
    var u = t.indexOf('.');
    if (-1 !== u) {
      var a = e[t.substr(0, u)];
      return void 0 === a ? void 0 : x(a, t.substr(u + 1));
    }
  }
  function k(e, t, n) {
    if (e && void 0 !== t && !('isFrozen' in Object && Object.isFrozen(e)))
      if ('string' != typeof t && 'length' in t) {
        v('string' != typeof n && 'length' in n);
        for (var r = 0, i = t.length; r < i; ++r) k(e, t[r], n[r]);
      } else {
        var o,
          u,
          a = t.indexOf('.');
        -1 !== a
          ? ((o = t.substr(0, a)),
            '' === (u = t.substr(a + 1))
              ? void 0 === n
                ? d(e) && !isNaN(parseInt(o))
                  ? e.splice(o, 1)
                  : delete e[o]
                : (e[o] = n)
              : k(e[o] || (e[o] = {}), u, n))
          : void 0 === n
          ? d(e) && !isNaN(parseInt(t))
            ? e.splice(t, 1)
            : delete e[t]
          : (e[t] = n);
      }
  }
  function P(t, e) {
    'string' == typeof e
      ? k(t, e, void 0)
      : 'length' in e &&
        [].map.call(e, function (e) {
          k(t, e, void 0);
        });
  }
  function E(e) {
    var t = {};
    for (var n in e) g(e, n) && (t[n] = e[n]);
    return t;
  }
  var t = [].concat;
  function j(e) {
    return t.apply([], e);
  }
  var e = 'Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set'
      .split(',')
      .concat(
        j(
          [8, 16, 32, 64].map(function (t) {
            return ['Int', 'Uint', 'Float'].map(function (e) {
              return e + t + 'Array';
            });
          })
        )
      )
      .filter(function (e) {
        return h[e];
      }),
    S = e.map(function (e) {
      return h[e];
    }),
    A = w(e, function (e) {
      return [e, !0];
    });
  function K(e) {
    if (!e || 'object' != typeof e) return e;
    var t;
    if (d(e)) {
      t = [];
      for (var n = 0, r = e.length; n < r; ++n) t.push(K(e[n]));
    } else if (0 <= S.indexOf(e.constructor)) t = e;
    else
      for (var i in ((t = e.constructor
        ? Object.create(e.constructor.prototype)
        : {}),
      e))
        g(e, i) && (t[i] = K(e[i]));
    return t;
  }
  var C = {}.toString;
  function I(e) {
    return C.call(e).slice(8, -1);
  }
  var T = function (e, t) {
    return 'Array' === t
      ? '' +
          e.map(function (e) {
            return T(e, I(e));
          })
      : 'ArrayBuffer' === t
      ? '' + new Uint8Array(e)
      : 'Date' === t
      ? e.getTime()
      : ArrayBuffer.isView(e)
      ? '' + new Uint8Array(e.buffer)
      : e;
  };
  function D(o, u, a, s) {
    return (
      (a = a || {}),
      (s = s || ''),
      _(o).forEach(function (e) {
        var t, n, r, i;
        g(u, e)
          ? ((t = o[e]),
            (n = u[e]),
            'object' == typeof t && 'object' == typeof n && t && n
              ? (r = I(t)) === (i = I(n))
                ? A[r]
                  ? T(t, r) !== T(n, i) && (a[s + e] = u[e])
                  : D(t, n, a, s + e + '.')
                : (a[s + e] = u[e])
              : t !== n && (a[s + e] = u[e]))
          : (a[s + e] = void 0);
      }),
      _(u).forEach(function (e) {
        g(o, e) || (a[s + e] = u[e]);
      }),
      a
    );
  }
  var B = 'undefined' != typeof Symbol && Symbol.iterator,
    R = B
      ? function (e) {
          var t;
          return null != e && (t = e[B]) && t.apply(e);
        }
      : function () {
          return null;
        },
    F = {};
  function q(e) {
    var t, n, r, i;
    if (1 === arguments.length) {
      if (d(e)) return e.slice();
      if (this === F && 'string' == typeof e) return [e];
      if ((i = R(e))) {
        for (n = []; !(r = i.next()).done; ) n.push(r.value);
        return n;
      }
      if (null == e) return [e];
      if ('number' != typeof (t = e.length)) return [e];
      for (n = new Array(t); t--; ) n[t] = e[t];
      return n;
    }
    for (t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t];
    return n;
  }
  var M =
      'undefined' != typeof Symbol
        ? function (e) {
            return 'AsyncFunction' === e[Symbol.toStringTag];
          }
        : function () {
            return !1;
          },
    N =
      'undefined' != typeof location &&
      /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
  function U(e, t) {
    (N = e), (V = t);
  }
  var V = function () {
      return !0;
    },
    W = !new Error('').stack;
  function z() {
    if (W)
      try {
        throw new Error();
      } catch (e) {
        return e;
      }
    return new Error();
  }
  function L(e, t) {
    var n = e.stack;
    return n
      ? ((t = t || 0),
        0 === n.indexOf(e.name) &&
          (t += (e.name + e.message).split('\n').length),
        n
          .split('\n')
          .slice(t)
          .filter(V)
          .map(function (e) {
            return '\n' + e;
          })
          .join(''))
      : '';
  }
  var Y = [
      'Unknown',
      'Constraint',
      'Data',
      'TransactionInactive',
      'ReadOnly',
      'Version',
      'NotFound',
      'InvalidState',
      'InvalidAccess',
      'Abort',
      'Timeout',
      'QuotaExceeded',
      'Syntax',
      'DataClone',
    ],
    G = [
      'Modify',
      'Bulk',
      'OpenFailed',
      'VersionChange',
      'Schema',
      'Upgrade',
      'InvalidTable',
      'MissingAPI',
      'NoSuchDatabase',
      'InvalidArgument',
      'SubTransaction',
      'Unsupported',
      'Internal',
      'DatabaseClosed',
      'PrematureCommit',
      'ForeignAwait',
    ].concat(Y),
    H = {
      VersionChanged: 'Database version changed by other database connection',
      DatabaseClosed: 'Database has been closed',
      Abort: 'Transaction aborted',
      TransactionInactive: 'Transaction has already completed or failed',
    };
  function Q(e, t) {
    (this._e = z()), (this.name = e), (this.message = t);
  }
  function X(e, t) {
    return (
      e +
      '. Errors: ' +
      Object.keys(t)
        .map(function (e) {
          return t[e].toString();
        })
        .filter(function (e, t, n) {
          return n.indexOf(e) === t;
        })
        .join('\n')
    );
  }
  function J(e, t, n, r) {
    (this._e = z()),
      (this.failures = t),
      (this.failedKeys = r),
      (this.successCount = n),
      (this.message = X(e, t));
  }
  function $(e, t) {
    (this._e = z()),
      (this.name = 'BulkError'),
      (this.failures = t),
      (this.message = X(e, t));
  }
  o(Q)
    .from(Error)
    .extend({
      stack: {
        get: function () {
          return (
            this._stack ||
            (this._stack = this.name + ': ' + this.message + L(this._e, 2))
          );
        },
      },
      toString: function () {
        return this.name + ': ' + this.message;
      },
    }),
    o(J).from(Q),
    o($).from(Q);
  var Z = G.reduce(function (e, t) {
      return (e[t] = t + 'Error'), e;
    }, {}),
    ee = Q,
    te = G.reduce(function (e, n) {
      var r = n + 'Error';
      function t(e, t) {
        (this._e = z()),
          (this.name = r),
          e
            ? 'string' == typeof e
              ? ((this.message = e + (t ? '\n ' + t : '')),
                (this.inner = t || null))
              : 'object' == typeof e &&
                ((this.message = e.name + ' ' + e.message), (this.inner = e))
            : ((this.message = H[n] || r), (this.inner = null));
      }
      return o(t).from(ee), (e[n] = t), e;
    }, {});
  (te.Syntax = SyntaxError), (te.Type = TypeError), (te.Range = RangeError);
  var ne = Y.reduce(function (e, t) {
    return (e[t + 'Error'] = te[t]), e;
  }, {});
  var re = G.reduce(function (e, t) {
    return (
      -1 === ['Syntax', 'Type', 'Range'].indexOf(t) && (e[t + 'Error'] = te[t]),
      e
    );
  }, {});
  function ie() {}
  function oe(e) {
    return e;
  }
  function ue(t, n) {
    return null == t || t === oe
      ? n
      : function (e) {
          return n(t(e));
        };
  }
  function ae(e, t) {
    return function () {
      e.apply(this, arguments), t.apply(this, arguments);
    };
  }
  function se(i, o) {
    return i === ie
      ? o
      : function () {
          var e = i.apply(this, arguments);
          void 0 !== e && (arguments[0] = e);
          var t = this.onsuccess,
            n = this.onerror;
          (this.onsuccess = null), (this.onerror = null);
          var r = o.apply(this, arguments);
          return (
            t && (this.onsuccess = this.onsuccess ? ae(t, this.onsuccess) : t),
            n && (this.onerror = this.onerror ? ae(n, this.onerror) : n),
            void 0 !== r ? r : e
          );
        };
  }
  function ce(n, r) {
    return n === ie
      ? r
      : function () {
          n.apply(this, arguments);
          var e = this.onsuccess,
            t = this.onerror;
          (this.onsuccess = this.onerror = null),
            r.apply(this, arguments),
            e && (this.onsuccess = this.onsuccess ? ae(e, this.onsuccess) : e),
            t && (this.onerror = this.onerror ? ae(t, this.onerror) : t);
        };
  }
  function le(o, u) {
    return o === ie
      ? u
      : function (e) {
          var t = o.apply(this, arguments);
          s(e, t);
          var n = this.onsuccess,
            r = this.onerror;
          (this.onsuccess = null), (this.onerror = null);
          var i = u.apply(this, arguments);
          return (
            n && (this.onsuccess = this.onsuccess ? ae(n, this.onsuccess) : n),
            r && (this.onerror = this.onerror ? ae(r, this.onerror) : r),
            void 0 === t ? (void 0 === i ? void 0 : i) : s(t, i)
          );
        };
  }
  function fe(e, t) {
    return e === ie
      ? t
      : function () {
          return !1 !== t.apply(this, arguments) && e.apply(this, arguments);
        };
  }
  function he(i, o) {
    return i === ie
      ? o
      : function () {
          var e = i.apply(this, arguments);
          if (e && 'function' == typeof e.then) {
            for (var t = this, n = arguments.length, r = new Array(n); n--; )
              r[n] = arguments[n];
            return e.then(function () {
              return o.apply(t, r);
            });
          }
          return o.apply(this, arguments);
        };
  }
  (re.ModifyError = J), (re.DexieError = Q), (re.BulkError = $);
  var pe = {},
    de = 100,
    ye = 100,
    ve =
      'undefined' == typeof Promise
        ? []
        : (function () {
            var e = Promise.resolve();
            if ('undefined' == typeof crypto || !crypto.subtle)
              return [e, e.__proto__, e];
            var t = crypto.subtle.digest('SHA-512', new Uint8Array([0]));
            return [t, t.__proto__, e];
          })(),
    me = ve[0],
    ge = ve[1],
    be = ve[2],
    _e = ge && ge.then,
    we = me && me.constructor,
    xe = !!be,
    ke = !1,
    Pe = be
      ? function () {
          be.then(Le);
        }
      : h.setImmediate
      ? setImmediate.bind(null, Le)
      : h.MutationObserver
      ? function () {
          var e = document.createElement('div');
          new MutationObserver(function () {
            Le(), (e = null);
          }).observe(e, { attributes: !0 }),
            e.setAttribute('i', '1');
        }
      : function () {
          setTimeout(Le, 0);
        },
    Ee = function (e, t) {
      De.push([e, t]), je && (Pe(), (je = !1));
    },
    Oe = !0,
    je = !0,
    Se = [],
    Ae = [],
    Ke = null,
    Ce = oe,
    Ie = {
      id: 'global',
      global: !0,
      ref: 0,
      unhandleds: [],
      onunhandled: yt,
      pgp: !1,
      env: {},
      finalize: function () {
        this.unhandleds.forEach(function (e) {
          try {
            yt(e[0], e[1]);
          } catch (e) {}
        });
      },
    },
    Te = Ie,
    De = [],
    Be = 0,
    Re = [];
  function Fe(e) {
    if ('object' != typeof this)
      throw new TypeError('Promises must be constructed via new');
    (this._listeners = []), (this.onuncatched = ie), (this._lib = !1);
    var t = (this._PSD = Te);
    if (
      (N &&
        ((this._stackHolder = z()), (this._prev = null), (this._numPrev = 0)),
      'function' != typeof e)
    ) {
      if (e !== pe) throw new TypeError('Not a function');
      return (
        (this._state = arguments[1]),
        (this._value = arguments[2]),
        void (!1 === this._state && Ne(this, this._value))
      );
    }
    (this._state = null),
      (this._value = null),
      ++t.ref,
      (function t(r, e) {
        try {
          e(function (n) {
            if (null === r._state) {
              if (n === r)
                throw new TypeError(
                  'A promise cannot be resolved with itself.'
                );
              var e = r._lib && Ye();
              n && 'function' == typeof n.then
                ? t(r, function (e, t) {
                    n instanceof Fe ? n._then(e, t) : n.then(e, t);
                  })
                : ((r._state = !0), (r._value = n), Ue(r)),
                e && Ge();
            }
          }, Ne.bind(null, r));
        } catch (e) {
          Ne(r, e);
        }
      })(this, e);
  }
  var qe = {
    get: function () {
      var a = Te,
        t = tt;
      function e(n, r) {
        var i = this,
          o = !a.global && (a !== Te || t !== tt),
          u = o && !ot(),
          e = new Fe(function (e, t) {
            Ve(i, new Me(ht(n, a, o, u), ht(r, a, o, u), e, t, a));
          });
        return N && ze(e, this), e;
      }
      return (e.prototype = pe), e;
    },
    set: function (e) {
      a(
        this,
        'then',
        e && e.prototype === pe
          ? qe
          : {
              get: function () {
                return e;
              },
              set: qe.set,
            }
      );
    },
  };
  function Me(e, t, n, r, i) {
    (this.onFulfilled = 'function' == typeof e ? e : null),
      (this.onRejected = 'function' == typeof t ? t : null),
      (this.resolve = n),
      (this.reject = r),
      (this.psd = i);
  }
  function Ne(t, n) {
    var e, r;
    Ae.push(n),
      null === t._state &&
        ((e = t._lib && Ye()),
        (n = Ce(n)),
        (t._state = !1),
        (t._value = n),
        N &&
          null !== n &&
          'object' == typeof n &&
          !n._promise &&
          (function (e, t, n) {
            try {
              e.apply(null, n);
            } catch (e) {
              t && t(e);
            }
          })(function () {
            var e = l(n, 'stack');
            (n._promise = t),
              a(n, 'stack', {
                get: function () {
                  return ke ? e && (e.get ? e.get.apply(n) : e.value) : t.stack;
                },
              });
          }),
        (r = t),
        Se.some(function (e) {
          return e._value === r._value;
        }) || Se.push(r),
        Ue(t),
        e && Ge());
  }
  function Ue(e) {
    var t = e._listeners;
    e._listeners = [];
    for (var n = 0, r = t.length; n < r; ++n) Ve(e, t[n]);
    var i = e._PSD;
    --i.ref || i.finalize(),
      0 === Be &&
        (++Be,
        Ee(function () {
          0 == --Be && He();
        }, []));
  }
  function Ve(e, t) {
    if (null !== e._state) {
      var n = e._state ? t.onFulfilled : t.onRejected;
      if (null === n) return (e._state ? t.resolve : t.reject)(e._value);
      ++t.psd.ref, ++Be, Ee(We, [n, e, t]);
    } else e._listeners.push(t);
  }
  function We(e, t, n) {
    try {
      var r,
        i = (Ke = t)._value;
      t._state
        ? (r = e(i))
        : (Ae.length && (Ae = []),
          (r = e(i)),
          -1 === Ae.indexOf(i) &&
            (function (e) {
              var t = Se.length;
              for (; t; )
                if (Se[--t]._value === e._value) return Se.splice(t, 1);
            })(t)),
        n.resolve(r);
    } catch (e) {
      n.reject(e);
    } finally {
      (Ke = null), 0 == --Be && He(), --n.psd.ref || n.psd.finalize();
    }
  }
  function ze(e, t) {
    var n = t ? t._numPrev + 1 : 0;
    n < de && ((e._prev = t), (e._numPrev = n));
  }
  function Le() {
    Ye() && Ge();
  }
  function Ye() {
    var e = Oe;
    return (je = Oe = !1), e;
  }
  function Ge() {
    var e, t, n;
    do {
      for (; 0 < De.length; )
        for (e = De, De = [], n = e.length, t = 0; t < n; ++t) {
          var r = e[t];
          r[0].apply(null, r[1]);
        }
    } while (0 < De.length);
    je = Oe = !0;
  }
  function He() {
    var e = Se;
    (Se = []),
      e.forEach(function (e) {
        e._PSD.onunhandled.call(null, e._value, e);
      });
    for (var t = Re.slice(0), n = t.length; n; ) t[--n]();
  }
  function Qe(e) {
    return new Fe(pe, !1, e);
  }
  function Xe(n, r) {
    var i = Te;
    return function () {
      var e = Ye(),
        t = Te;
      try {
        return st(i, !0), n.apply(this, arguments);
      } catch (e) {
        r && r(e);
      } finally {
        st(t, !1), e && Ge();
      }
    };
  }
  i(Fe.prototype, {
    then: qe,
    _then: function (e, t) {
      Ve(this, new Me(null, null, e, t, Te));
    },
    catch: function (e) {
      if (1 === arguments.length) return this.then(null, e);
      var t = e,
        n = arguments[1];
      return 'function' == typeof t
        ? this.then(null, function (e) {
            return (e instanceof t ? n : Qe)(e);
          })
        : this.then(null, function (e) {
            return (e && e.name === t ? n : Qe)(e);
          });
    },
    finally: function (t) {
      return this.then(
        function (e) {
          return t(), e;
        },
        function (e) {
          return t(), Qe(e);
        }
      );
    },
    stack: {
      get: function () {
        if (this._stack) return this._stack;
        try {
          ke = !0;
          var e = (function e(t, n, r) {
            if (n.length === r) return n;
            var i = '';
            {
              var o, u, a;
              !1 === t._state &&
                (null != (o = t._value)
                  ? ((u = o.name || 'Error'),
                    (a = o.message || o),
                    (i = L(o, 0)))
                  : ((u = o), (a = '')),
                n.push(u + (a ? ': ' + a : '') + i));
            }
            N &&
              ((i = L(t._stackHolder, 2)) && -1 === n.indexOf(i) && n.push(i),
              t._prev && e(t._prev, n, r));
            return n;
          })(this, [], 20).join('\nFrom previous: ');
          return null !== this._state && (this._stack = e), e;
        } finally {
          ke = !1;
        }
      },
    },
    timeout: function (r, i) {
      var o = this;
      return r < 1 / 0
        ? new Fe(function (e, t) {
            var n = setTimeout(function () {
              return t(new te.Timeout(i));
            }, r);
            o.then(e, t).finally(clearTimeout.bind(null, n));
          })
        : this;
    },
  }),
    'undefined' != typeof Symbol &&
      Symbol.toStringTag &&
      a(Fe.prototype, Symbol.toStringTag, 'Dexie.Promise'),
    (Ie.env = ct()),
    i(Fe, {
      all: function () {
        var o = q.apply(null, arguments).map(ut);
        return new Fe(function (n, r) {
          0 === o.length && n([]);
          var i = o.length;
          o.forEach(function (e, t) {
            return Fe.resolve(e).then(function (e) {
              (o[t] = e), --i || n(o);
            }, r);
          });
        });
      },
      resolve: function (n) {
        if (n instanceof Fe) return n;
        if (n && 'function' == typeof n.then)
          return new Fe(function (e, t) {
            n.then(e, t);
          });
        var e = new Fe(pe, !0, n);
        return ze(e, Ke), e;
      },
      reject: Qe,
      race: function () {
        var e = q.apply(null, arguments).map(ut);
        return new Fe(function (t, n) {
          e.map(function (e) {
            return Fe.resolve(e).then(t, n);
          });
        });
      },
      PSD: {
        get: function () {
          return Te;
        },
        set: function (e) {
          return (Te = e);
        },
      },
      totalEchoes: {
        get: function () {
          return tt;
        },
      },
      newPSD: rt,
      usePSD: lt,
      scheduler: {
        get: function () {
          return Ee;
        },
        set: function (e) {
          Ee = e;
        },
      },
      rejectionMapper: {
        get: function () {
          return Ce;
        },
        set: function (e) {
          Ce = e;
        },
      },
      follow: function (i, n) {
        return new Fe(function (e, t) {
          return rt(
            function (n, r) {
              var e = Te;
              (e.unhandleds = []),
                (e.onunhandled = r),
                (e.finalize = ae(function () {
                  var t,
                    e = this;
                  (t = function () {
                    0 === e.unhandleds.length ? n() : r(e.unhandleds[0]);
                  }),
                    Re.push(function e() {
                      t(), Re.splice(Re.indexOf(e), 1);
                    }),
                    ++Be,
                    Ee(function () {
                      0 == --Be && He();
                    }, []);
                }, e.finalize)),
                i();
            },
            n,
            e,
            t
          );
        });
      },
    }),
    we &&
      (we.allSettled &&
        a(Fe, 'allSettled', function () {
          var e = q.apply(null, arguments).map(ut);
          return new Fe(function (n) {
            0 === e.length && n([]);
            var r = e.length,
              i = new Array(r);
            e.forEach(function (e, t) {
              return Fe.resolve(e)
                .then(
                  function (e) {
                    return (i[t] = { status: 'fulfilled', value: e });
                  },
                  function (e) {
                    return (i[t] = { status: 'rejected', reason: e });
                  }
                )
                .then(function () {
                  return --r || n(i);
                });
            });
          });
        }),
      we.any &&
        'undefined' != typeof AggregateError &&
        a(Fe, 'any', function () {
          var e = q.apply(null, arguments).map(ut);
          return new Fe(function (n, r) {
            0 === e.length && r(new AggregateError([]));
            var i = e.length,
              o = new Array(i);
            e.forEach(function (e, t) {
              return Fe.resolve(e).then(
                function (e) {
                  return n(e);
                },
                function (e) {
                  (o[t] = e), --i || r(new AggregateError(o));
                }
              );
            });
          });
        }));
  var Je = { awaits: 0, echoes: 0, id: 0 },
    $e = 0,
    Ze = [],
    et = 0,
    tt = 0,
    nt = 0;
  function rt(e, t, n, r) {
    var i = Te,
      o = Object.create(i);
    (o.parent = i), (o.ref = 0), (o.global = !1), (o.id = ++nt);
    var u = Ie.env;
    (o.env = xe
      ? {
          Promise: Fe,
          PromiseProp: { value: Fe, configurable: !0, writable: !0 },
          all: Fe.all,
          race: Fe.race,
          allSettled: Fe.allSettled,
          any: Fe.any,
          resolve: Fe.resolve,
          reject: Fe.reject,
          nthen: pt(u.nthen, o),
          gthen: pt(u.gthen, o),
        }
      : {}),
      t && s(o, t),
      ++i.ref,
      (o.finalize = function () {
        --this.parent.ref || this.parent.finalize();
      });
    var a = lt(o, e, n, r);
    return 0 === o.ref && o.finalize(), a;
  }
  function it() {
    return Je.id || (Je.id = ++$e), ++Je.awaits, (Je.echoes += ye), Je.id;
  }
  function ot() {
    return (
      !!Je.awaits &&
      (0 == --Je.awaits && (Je.id = 0), (Je.echoes = Je.awaits * ye), !0)
    );
  }
  function ut(e) {
    return Je.echoes && e && e.constructor === we
      ? (it(),
        e.then(
          function (e) {
            return ot(), e;
          },
          function (e) {
            return ot(), vt(e);
          }
        ))
      : e;
  }
  function at() {
    var e = Ze[Ze.length - 1];
    Ze.pop(), st(e, !1);
  }
  function st(e, t) {
    var n,
      r,
      i = Te;
    (t ? !Je.echoes || (et++ && e === Te) : !et || (--et && e === Te)) ||
      ft(
        t
          ? function (e) {
              ++tt,
                (Je.echoes && 0 != --Je.echoes) || (Je.echoes = Je.id = 0),
                Ze.push(Te),
                st(e, !0);
            }.bind(null, e)
          : at
      ),
      e !== Te &&
        ((Te = e),
        i === Ie && (Ie.env = ct()),
        xe &&
          ((n = Ie.env.Promise),
          (r = e.env),
          (ge.then = r.nthen),
          (n.prototype.then = r.gthen),
          (i.global || e.global) &&
            (Object.defineProperty(h, 'Promise', r.PromiseProp),
            (n.all = r.all),
            (n.race = r.race),
            (n.resolve = r.resolve),
            (n.reject = r.reject),
            r.allSettled && (n.allSettled = r.allSettled),
            r.any && (n.any = r.any))));
  }
  function ct() {
    var e = h.Promise;
    return xe
      ? {
          Promise: e,
          PromiseProp: Object.getOwnPropertyDescriptor(h, 'Promise'),
          all: e.all,
          race: e.race,
          allSettled: e.allSettled,
          any: e.any,
          resolve: e.resolve,
          reject: e.reject,
          nthen: ge.then,
          gthen: e.prototype.then,
        }
      : {};
  }
  function lt(e, t, n, r, i) {
    var o = Te;
    try {
      return st(e, !0), t(n, r, i);
    } finally {
      st(o, !1);
    }
  }
  function ft(e) {
    _e.call(me, e);
  }
  function ht(t, n, r, i) {
    return 'function' != typeof t
      ? t
      : function () {
          var e = Te;
          r && it(), st(n, !0);
          try {
            return t.apply(this, arguments);
          } finally {
            st(e, !1), i && ft(ot);
          }
        };
  }
  function pt(n, r) {
    return function (e, t) {
      return n.call(this, ht(e, r), ht(t, r));
    };
  }
  -1 === ('' + _e).indexOf('[native code]') && (it = ot = ie);
  var dt = 'unhandledrejection';
  function yt(e, t) {
    var n;
    try {
      n = t.onuncatched(e);
    } catch (e) {}
    if (!1 !== n)
      try {
        var r,
          i = { promise: t, reason: e };
        if (
          (h.document && document.createEvent
            ? ((r = document.createEvent('Event')).initEvent(dt, !0, !0),
              s(r, i))
            : h.CustomEvent && s((r = new CustomEvent(dt, { detail: i })), i),
          r &&
            h.dispatchEvent &&
            (dispatchEvent(r),
            !h.PromiseRejectionEvent && h.onunhandledrejection))
        )
          try {
            h.onunhandledrejection(r);
          } catch (e) {}
        N &&
          r &&
          !r.defaultPrevented &&
          console.warn('Unhandled rejection: ' + (e.stack || e));
      } catch (e) {}
  }
  var vt = Fe.reject;
  function mt(e) {
    return !/(dexie\.js|dexie\.min\.js)/.test(e);
  }
  var gt = String.fromCharCode(65535),
    bt =
      'Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.',
    _t = 'String expected.',
    wt = [],
    xt =
      'undefined' != typeof navigator &&
      /(MSIE|Trident|Edge)/.test(navigator.userAgent),
    kt = xt,
    Pt = xt,
    Et = '__dbnames',
    Ot = 'readonly',
    jt = 'readwrite';
  function St(e, t) {
    return e
      ? t
        ? function () {
            return e.apply(this, arguments) && t.apply(this, arguments);
          }
        : e
      : t;
  }
  var At = {
    type: 3,
    lower: -1 / 0,
    lowerOpen: !1,
    upper: [[]],
    upperOpen: !1,
  };
  function Kt(t) {
    return function (e) {
      return void 0 === x(e, t) && P((e = K(e)), t), e;
    };
  }
  var Ct =
    ((It.prototype._trans = function (e, r, t) {
      var n = this._tx || Te.trans,
        i = this.name;
      function o(e, t, n) {
        if (!n.schema[i])
          throw new te.NotFound('Table ' + i + ' not part of transaction');
        return r(n.idbtrans, n);
      }
      var u = Ye();
      try {
        return n && n.db === this.db
          ? n === Te.trans
            ? n._promise(e, o, t)
            : rt(
                function () {
                  return n._promise(e, o, t);
                },
                { trans: n, transless: Te.transless || Te }
              )
          : (function e(t, n, r, i) {
              if (t._state.openComplete || Te.letThrough) {
                var o = t._createTransaction(n, r, t._dbSchema);
                try {
                  o.create();
                } catch (e) {
                  return vt(e);
                }
                return o
                  ._promise(n, function (e, t) {
                    return rt(function () {
                      return (Te.trans = o), i(e, t, o);
                    });
                  })
                  .then(function (e) {
                    return o._completion.then(function () {
                      return e;
                    });
                  });
              }
              if (!t._state.isBeingOpened) {
                if (!t._options.autoOpen) return vt(new te.DatabaseClosed());
                t.open().catch(ie);
              }
              return t._state.dbReadyPromise.then(function () {
                return e(t, n, r, i);
              });
            })(this.db, e, [this.name], o);
      } finally {
        u && Ge();
      }
    }),
    (It.prototype.get = function (t, e) {
      var n = this;
      return t && t.constructor === Object
        ? this.where(t).first(e)
        : this._trans('readonly', function (e) {
            return n.core.get({ trans: e, key: t }).then(function (e) {
              return n.hook.reading.fire(e);
            });
          }).then(e);
    }),
    (It.prototype.where = function (u) {
      if ('string' == typeof u) return new this.db.WhereClause(this, u);
      if (d(u)) return new this.db.WhereClause(this, '[' + u.join('+') + ']');
      var n = _(u);
      if (1 === n.length) return this.where(n[0]).equals(u[n[0]]);
      var e = this.schema.indexes
        .concat(this.schema.primKey)
        .filter(function (t) {
          return (
            t.compound &&
            n.every(function (e) {
              return 0 <= t.keyPath.indexOf(e);
            }) &&
            t.keyPath.every(function (e) {
              return 0 <= n.indexOf(e);
            })
          );
        })[0];
      if (e && this.db._maxKey !== gt)
        return this.where(e.name).equals(
          e.keyPath.map(function (e) {
            return u[e];
          })
        );
      !e &&
        N &&
        console.warn(
          'The query ' +
            JSON.stringify(u) +
            ' on ' +
            this.name +
            ' would benefit of a compound index [' +
            n.join('+') +
            ']'
        );
      var a = this.schema.idxByName,
        r = this.db._deps.indexedDB;
      function s(e, t) {
        try {
          return 0 === r.cmp(e, t);
        } catch (e) {
          return !1;
        }
      }
      var t = n.reduce(
          function (e, n) {
            var t = e[0],
              r = e[1],
              i = a[n],
              o = u[n];
            return [
              t || i,
              t || !i
                ? St(
                    r,
                    i && i.multi
                      ? function (e) {
                          var t = x(e, n);
                          return (
                            d(t) &&
                            t.some(function (e) {
                              return s(o, e);
                            })
                          );
                        }
                      : function (e) {
                          return s(o, x(e, n));
                        }
                  )
                : r,
            ];
          },
          [null, null]
        ),
        i = t[0],
        o = t[1];
      return i
        ? this.where(i.name).equals(u[i.keyPath]).filter(o)
        : e
        ? this.filter(o)
        : this.where(n).equals('');
    }),
    (It.prototype.filter = function (e) {
      return this.toCollection().and(e);
    }),
    (It.prototype.count = function (e) {
      return this.toCollection().count(e);
    }),
    (It.prototype.offset = function (e) {
      return this.toCollection().offset(e);
    }),
    (It.prototype.limit = function (e) {
      return this.toCollection().limit(e);
    }),
    (It.prototype.each = function (e) {
      return this.toCollection().each(e);
    }),
    (It.prototype.toArray = function (e) {
      return this.toCollection().toArray(e);
    }),
    (It.prototype.toCollection = function () {
      return new this.db.Collection(new this.db.WhereClause(this));
    }),
    (It.prototype.orderBy = function (e) {
      return new this.db.Collection(
        new this.db.WhereClause(this, d(e) ? '[' + e.join('+') + ']' : e)
      );
    }),
    (It.prototype.reverse = function () {
      return this.toCollection().reverse();
    }),
    (It.prototype.mapToClass = function (r) {
      function e(e) {
        if (!e) return e;
        var t = Object.create(r.prototype);
        for (var n in e)
          if (g(e, n))
            try {
              t[n] = e[n];
            } catch (e) {}
        return t;
      }
      return (
        (this.schema.mappedClass = r),
        this.schema.readHook &&
          this.hook.reading.unsubscribe(this.schema.readHook),
        (this.schema.readHook = e),
        this.hook('reading', e),
        r
      );
    }),
    (It.prototype.defineClass = function () {
      return this.mapToClass(function (e) {
        s(this, e);
      });
    }),
    (It.prototype.add = function (t, n) {
      var r = this,
        e = this.schema.primKey,
        i = e.auto,
        o = e.keyPath,
        u = t;
      return (
        o && i && (u = Kt(o)(t)),
        this._trans('readwrite', function (e) {
          return r.core.mutate({
            trans: e,
            type: 'add',
            keys: null != n ? [n] : null,
            values: [u],
          });
        })
          .then(function (e) {
            return e.numFailures ? Fe.reject(e.failures[0]) : e.lastResult;
          })
          .then(function (e) {
            if (o)
              try {
                k(t, o, e);
              } catch (e) {}
            return e;
          })
      );
    }),
    (It.prototype.update = function (t, n) {
      if ('object' != typeof n || d(n))
        throw new te.InvalidArgument('Modifications must be an object.');
      if ('object' != typeof t || d(t))
        return this.where(':id').equals(t).modify(n);
      _(n).forEach(function (e) {
        k(t, e, n[e]);
      });
      var e = x(t, this.schema.primKey.keyPath);
      return void 0 === e
        ? vt(
            new te.InvalidArgument(
              'Given object does not contain its primary key'
            )
          )
        : this.where(':id').equals(e).modify(n);
    }),
    (It.prototype.put = function (t, n) {
      var r = this,
        e = this.schema.primKey,
        i = e.auto,
        o = e.keyPath,
        u = t;
      return (
        o && i && (u = Kt(o)(t)),
        this._trans('readwrite', function (e) {
          return r.core.mutate({
            trans: e,
            type: 'put',
            values: [u],
            keys: null != n ? [n] : null,
          });
        })
          .then(function (e) {
            return e.numFailures ? Fe.reject(e.failures[0]) : e.lastResult;
          })
          .then(function (e) {
            if (o)
              try {
                k(t, o, e);
              } catch (e) {}
            return e;
          })
      );
    }),
    (It.prototype.delete = function (t) {
      var n = this;
      return this._trans('readwrite', function (e) {
        return n.core.mutate({ trans: e, type: 'delete', keys: [t] });
      }).then(function (e) {
        return e.numFailures ? Fe.reject(e.failures[0]) : void 0;
      });
    }),
    (It.prototype.clear = function () {
      var t = this;
      return this._trans('readwrite', function (e) {
        return t.core.mutate({ trans: e, type: 'deleteRange', range: At });
      }).then(function (e) {
        return e.numFailures ? Fe.reject(e.failures[0]) : void 0;
      });
    }),
    (It.prototype.bulkGet = function (t) {
      var n = this;
      return this._trans('readonly', function (e) {
        return n.core.getMany({ keys: t, trans: e }).then(function (e) {
          return e.map(function (e) {
            return n.hook.reading.fire(e);
          });
        });
      });
    }),
    (It.prototype.bulkAdd = function (u, e, t) {
      var a = this,
        s = Array.isArray(e) ? e : void 0,
        c = (t = t || (s ? void 0 : e)) ? t.allKeys : void 0;
      return this._trans('readwrite', function (e) {
        var t = a.schema.primKey,
          n = t.auto,
          r = t.keyPath;
        if (r && s)
          throw new te.InvalidArgument(
            'bulkAdd(): keys argument invalid on tables with inbound keys'
          );
        if (s && s.length !== u.length)
          throw new te.InvalidArgument(
            'Arguments objects and keys must have the same length'
          );
        var o = u.length,
          i = r && n ? u.map(Kt(r)) : u;
        return a.core
          .mutate({ trans: e, type: 'add', keys: s, values: i, wantResults: c })
          .then(function (e) {
            var t = e.numFailures,
              n = e.results,
              r = e.lastResult,
              i = e.failures;
            if (0 === t) return c ? n : r;
            throw new $(
              a.name + '.bulkAdd(): ' + t + ' of ' + o + ' operations failed',
              Object.keys(i).map(function (e) {
                return i[e];
              })
            );
          });
      });
    }),
    (It.prototype.bulkPut = function (u, e, t) {
      var a = this,
        s = Array.isArray(e) ? e : void 0,
        c = (t = t || (s ? void 0 : e)) ? t.allKeys : void 0;
      return this._trans('readwrite', function (e) {
        var t = a.schema.primKey,
          n = t.auto,
          r = t.keyPath;
        if (r && s)
          throw new te.InvalidArgument(
            'bulkPut(): keys argument invalid on tables with inbound keys'
          );
        if (s && s.length !== u.length)
          throw new te.InvalidArgument(
            'Arguments objects and keys must have the same length'
          );
        var o = u.length,
          i = r && n ? u.map(Kt(r)) : u;
        return a.core
          .mutate({ trans: e, type: 'put', keys: s, values: i, wantResults: c })
          .then(function (e) {
            var t = e.numFailures,
              n = e.results,
              r = e.lastResult,
              i = e.failures;
            if (0 === t) return c ? n : r;
            throw new $(
              a.name + '.bulkPut(): ' + t + ' of ' + o + ' operations failed',
              Object.keys(i).map(function (e) {
                return i[e];
              })
            );
          });
      });
    }),
    (It.prototype.bulkDelete = function (t) {
      var i = this,
        o = t.length;
      return this._trans('readwrite', function (e) {
        return i.core.mutate({ trans: e, type: 'delete', keys: t });
      }).then(function (e) {
        var t = e.numFailures,
          n = e.lastResult,
          r = e.failures;
        if (0 === t) return n;
        throw new $(
          i.name + '.bulkDelete(): ' + t + ' of ' + o + ' operations failed',
          r
        );
      });
    }),
    It);
  function It() {}
  function Tt(i) {
    var u = {},
      t = function (e, t) {
        if (t) {
          for (var n = arguments.length, r = new Array(n - 1); --n; )
            r[n - 1] = arguments[n];
          return u[e].subscribe.apply(null, r), i;
        }
        if ('string' == typeof e) return u[e];
      };
    t.addEventType = a;
    for (var e = 1, n = arguments.length; e < n; ++e) a(arguments[e]);
    return t;
    function a(e, n, r) {
      if ('object' != typeof e) {
        var i;
        n = n || fe;
        var o = {
          subscribers: [],
          fire: (r = r || ie),
          subscribe: function (e) {
            -1 === o.subscribers.indexOf(e) &&
              (o.subscribers.push(e), (o.fire = n(o.fire, e)));
          },
          unsubscribe: function (t) {
            (o.subscribers = o.subscribers.filter(function (e) {
              return e !== t;
            })),
              (o.fire = o.subscribers.reduce(n, r));
          },
        };
        return (u[e] = t[e] = o), o;
      }
      _((i = e)).forEach(function (e) {
        var t = i[e];
        if (d(t)) a(e, i[e][0], i[e][1]);
        else {
          if ('asap' !== t)
            throw new te.InvalidArgument('Invalid event config');
          var n = a(e, oe, function () {
            for (var e = arguments.length, t = new Array(e); e--; )
              t[e] = arguments[e];
            n.subscribers.forEach(function (e) {
              b(function () {
                e.apply(null, t);
              });
            });
          });
        }
      });
    }
  }
  function Dt(e, t) {
    return o(t).from({ prototype: e }), t;
  }
  function Bt(e, t) {
    return (
      !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter)
    );
  }
  function Rt(e, t) {
    e.filter = St(e.filter, t);
  }
  function Ft(e, t, n) {
    var r = e.replayFilter;
    (e.replayFilter = r
      ? function () {
          return St(r(), t());
        }
      : t),
      (e.justLimit = n && !r);
  }
  function qt(e, t) {
    if (e.isPrimKey) return t.primaryKey;
    var n = t.getIndexByKeyPath(e.index);
    if (!n)
      throw new te.Schema(
        'KeyPath ' + e.index + ' on object store ' + t.name + ' is not indexed'
      );
    return n;
  }
  function Mt(e, t, n) {
    var r = qt(e, t.schema);
    return t.openCursor({
      trans: n,
      values: !e.keysOnly,
      reverse: 'prev' === e.dir,
      unique: !!e.unique,
      query: { index: r, range: e.range },
    });
  }
  function Nt(e, o, t, n) {
    var u = e.replayFilter ? St(e.filter, e.replayFilter()) : e.filter;
    if (e.or) {
      var a = {},
        r = function (e, t, n) {
          var r, i;
          (u &&
            !u(
              t,
              n,
              function (e) {
                return t.stop(e);
              },
              function (e) {
                return t.fail(e);
              }
            )) ||
            ('[object ArrayBuffer]' === (i = '' + (r = t.primaryKey)) &&
              (i = '' + new Uint8Array(r)),
            g(a, i) || ((a[i] = !0), o(e, t, n)));
        };
      return Promise.all([
        e.or._iterate(r, t),
        Ut(Mt(e, n, t), e.algorithm, r, !e.keysOnly && e.valueMapper),
      ]);
    }
    return Ut(Mt(e, n, t), St(e.algorithm, u), o, !e.keysOnly && e.valueMapper);
  }
  function Ut(e, r, i, o) {
    var u = Xe(
      o
        ? function (e, t, n) {
            return i(o(e), t, n);
          }
        : i
    );
    return e.then(function (n) {
      if (n)
        return n.start(function () {
          var t = function () {
            return n.continue();
          };
          (r &&
            !r(
              n,
              function (e) {
                return (t = e);
              },
              function (e) {
                n.stop(e), (t = ie);
              },
              function (e) {
                n.fail(e), (t = ie);
              }
            )) ||
            u(n.value, n, function (e) {
              return (t = e);
            }),
            t();
        });
    });
  }
  var Vt =
    ((Wt.prototype._read = function (e, t) {
      var n = this._ctx;
      return n.error
        ? n.table._trans(null, vt.bind(null, n.error))
        : n.table._trans('readonly', e).then(t);
    }),
    (Wt.prototype._write = function (e) {
      var t = this._ctx;
      return t.error
        ? t.table._trans(null, vt.bind(null, t.error))
        : t.table._trans('readwrite', e, 'locked');
    }),
    (Wt.prototype._addAlgorithm = function (e) {
      var t = this._ctx;
      t.algorithm = St(t.algorithm, e);
    }),
    (Wt.prototype._iterate = function (e, t) {
      return Nt(this._ctx, e, t, this._ctx.table.core);
    }),
    (Wt.prototype.clone = function (e) {
      var t = Object.create(this.constructor.prototype),
        n = Object.create(this._ctx);
      return e && s(n, e), (t._ctx = n), t;
    }),
    (Wt.prototype.raw = function () {
      return (this._ctx.valueMapper = null), this;
    }),
    (Wt.prototype.each = function (t) {
      var n = this._ctx;
      return this._read(function (e) {
        return Nt(n, t, e, n.table.core);
      });
    }),
    (Wt.prototype.count = function (e) {
      var i = this;
      return this._read(function (e) {
        var t = i._ctx,
          n = t.table.core;
        if (Bt(t, !0))
          return n
            .count({
              trans: e,
              query: { index: qt(t, n.schema), range: t.range },
            })
            .then(function (e) {
              return Math.min(e, t.limit);
            });
        var r = 0;
        return Nt(
          t,
          function () {
            return ++r, !1;
          },
          e,
          n
        ).then(function () {
          return r;
        });
      }).then(e);
    }),
    (Wt.prototype.sortBy = function (e, t) {
      var n = e.split('.').reverse(),
        r = n[0],
        i = n.length - 1;
      function o(e, t) {
        return t ? o(e[n[t]], t - 1) : e[r];
      }
      var u = 'next' === this._ctx.dir ? 1 : -1;
      function a(e, t) {
        var n = o(e, i),
          r = o(t, i);
        return n < r ? -u : r < n ? u : 0;
      }
      return this.toArray(function (e) {
        return e.sort(a);
      }).then(t);
    }),
    (Wt.prototype.toArray = function (e) {
      var o = this;
      return this._read(function (e) {
        var t = o._ctx;
        if ('next' === t.dir && Bt(t, !0) && 0 < t.limit) {
          var n = t.valueMapper,
            r = qt(t, t.table.core.schema);
          return t.table.core
            .query({
              trans: e,
              limit: t.limit,
              values: !0,
              query: { index: r, range: t.range },
            })
            .then(function (e) {
              var t = e.result;
              return n ? t.map(n) : t;
            });
        }
        var i = [];
        return Nt(
          t,
          function (e) {
            return i.push(e);
          },
          e,
          t.table.core
        ).then(function () {
          return i;
        });
      }, e);
    }),
    (Wt.prototype.offset = function (t) {
      var e = this._ctx;
      return (
        t <= 0 ||
          ((e.offset += t),
          Bt(e)
            ? Ft(e, function () {
                var n = t;
                return function (e, t) {
                  return (
                    0 === n ||
                    (1 === n
                      ? --n
                      : t(function () {
                          e.advance(n), (n = 0);
                        }),
                    !1)
                  );
                };
              })
            : Ft(e, function () {
                var e = t;
                return function () {
                  return --e < 0;
                };
              })),
        this
      );
    }),
    (Wt.prototype.limit = function (e) {
      return (
        (this._ctx.limit = Math.min(this._ctx.limit, e)),
        Ft(
          this._ctx,
          function () {
            var r = e;
            return function (e, t, n) {
              return --r <= 0 && t(n), 0 <= r;
            };
          },
          !0
        ),
        this
      );
    }),
    (Wt.prototype.until = function (r, i) {
      return (
        Rt(this._ctx, function (e, t, n) {
          return !r(e.value) || (t(n), i);
        }),
        this
      );
    }),
    (Wt.prototype.first = function (e) {
      return this.limit(1)
        .toArray(function (e) {
          return e[0];
        })
        .then(e);
    }),
    (Wt.prototype.last = function (e) {
      return this.reverse().first(e);
    }),
    (Wt.prototype.filter = function (t) {
      var e, n;
      return (
        Rt(this._ctx, function (e) {
          return t(e.value);
        }),
        (e = this._ctx),
        (n = t),
        (e.isMatch = St(e.isMatch, n)),
        this
      );
    }),
    (Wt.prototype.and = function (e) {
      return this.filter(e);
    }),
    (Wt.prototype.or = function (e) {
      return new this.db.WhereClause(this._ctx.table, e, this);
    }),
    (Wt.prototype.reverse = function () {
      return (
        (this._ctx.dir = 'prev' === this._ctx.dir ? 'next' : 'prev'),
        this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
        this
      );
    }),
    (Wt.prototype.desc = function () {
      return this.reverse();
    }),
    (Wt.prototype.eachKey = function (n) {
      var e = this._ctx;
      return (
        (e.keysOnly = !e.isMatch),
        this.each(function (e, t) {
          n(t.key, t);
        })
      );
    }),
    (Wt.prototype.eachUniqueKey = function (e) {
      return (this._ctx.unique = 'unique'), this.eachKey(e);
    }),
    (Wt.prototype.eachPrimaryKey = function (n) {
      var e = this._ctx;
      return (
        (e.keysOnly = !e.isMatch),
        this.each(function (e, t) {
          n(t.primaryKey, t);
        })
      );
    }),
    (Wt.prototype.keys = function (e) {
      var t = this._ctx;
      t.keysOnly = !t.isMatch;
      var n = [];
      return this.each(function (e, t) {
        n.push(t.key);
      })
        .then(function () {
          return n;
        })
        .then(e);
    }),
    (Wt.prototype.primaryKeys = function (e) {
      var n = this._ctx;
      if ('next' === n.dir && Bt(n, !0) && 0 < n.limit)
        return this._read(function (e) {
          var t = qt(n, n.table.core.schema);
          return n.table.core.query({
            trans: e,
            values: !1,
            limit: n.limit,
            query: { index: t, range: n.range },
          });
        })
          .then(function (e) {
            return e.result;
          })
          .then(e);
      n.keysOnly = !n.isMatch;
      var r = [];
      return this.each(function (e, t) {
        r.push(t.primaryKey);
      })
        .then(function () {
          return r;
        })
        .then(e);
    }),
    (Wt.prototype.uniqueKeys = function (e) {
      return (this._ctx.unique = 'unique'), this.keys(e);
    }),
    (Wt.prototype.firstKey = function (e) {
      return this.limit(1)
        .keys(function (e) {
          return e[0];
        })
        .then(e);
    }),
    (Wt.prototype.lastKey = function (e) {
      return this.reverse().firstKey(e);
    }),
    (Wt.prototype.distinct = function () {
      var e = this._ctx,
        t = e.index && e.table.schema.idxByName[e.index];
      if (!t || !t.multi) return this;
      var r = {};
      return (
        Rt(this._ctx, function (e) {
          var t = e.primaryKey.toString(),
            n = g(r, t);
          return (r[t] = !0), !n;
        }),
        this
      );
    }),
    (Wt.prototype.modify = function (c) {
      var n = this,
        r = this._ctx;
      return this._write(function (h) {
        var o, u, p;
        function d(e, t) {
          var n = t.failures,
            r = t.numFailures;
          s += e - r;
          for (var i = 0, o = _(n); i < o.length; i++) {
            var u = o[i];
            a.push(n[u]);
          }
        }
        p =
          'function' == typeof c
            ? c
            : ((o = _(c)),
              (u = o.length),
              function (e) {
                for (var t = !1, n = 0; n < u; ++n) {
                  var r = o[n],
                    i = c[r];
                  x(e, r) !== i && (k(e, r, i), (t = !0));
                }
                return t;
              });
        var y = r.table.core,
          e = y.schema.primaryKey,
          v = e.outbound,
          m = e.extractKey,
          g = 'testmode' in Rn ? 1 : 2e3,
          b = n.db.core.cmp,
          a = [],
          s = 0,
          t = [];
        return n
          .clone()
          .primaryKeys()
          .then(function (l) {
            var f = function (s) {
              var c = Math.min(g, l.length - s);
              return y
                .getMany({ trans: h, keys: l.slice(s, s + c) })
                .then(function (e) {
                  for (
                    var n = [], t = [], r = v ? [] : null, i = [], o = 0;
                    o < c;
                    ++o
                  ) {
                    var u = e[o],
                      a = { value: K(u), primKey: l[s + o] };
                    !1 !== p.call(a, a.value, a) &&
                      (null == a.value
                        ? i.push(l[s + o])
                        : v || 0 === b(m(u), m(a.value))
                        ? (t.push(a.value), v && r.push(l[s + o]))
                        : (i.push(l[s + o]), n.push(a.value)));
                  }
                  return Promise.resolve(
                    0 < n.length &&
                      y
                        .mutate({ trans: h, type: 'add', values: n })
                        .then(function (e) {
                          for (var t in e.failures) i.splice(parseInt(t), 1);
                          d(n.length, e);
                        })
                  )
                    .then(function (e) {
                      return (
                        0 < t.length &&
                        y
                          .mutate({ trans: h, type: 'put', keys: r, values: t })
                          .then(function (e) {
                            return d(t.length, e);
                          })
                      );
                    })
                    .then(function () {
                      return (
                        0 < i.length &&
                        y
                          .mutate({ trans: h, type: 'delete', keys: i })
                          .then(function (e) {
                            return d(i.length, e);
                          })
                      );
                    })
                    .then(function () {
                      return l.length > s + c && f(s + g);
                    });
                });
            };
            return f(0).then(function () {
              if (0 < a.length)
                throw new J('Error modifying one or more objects', a, s, t);
              return l.length;
            });
          });
      });
    }),
    (Wt.prototype.delete = function () {
      var i = this._ctx,
        r = i.range;
      return Bt(i) && ((i.isPrimKey && !Pt) || 3 === r.type)
        ? this._write(function (e) {
            var t = i.table.core.schema.primaryKey,
              n = r;
            return i.table.core
              .count({ trans: e, query: { index: t, range: n } })
              .then(function (r) {
                return i.table.core
                  .mutate({ trans: e, type: 'deleteRange', range: n })
                  .then(function (e) {
                    var t = e.failures,
                      n = (e.lastResult, e.results, e.numFailures);
                    if (n)
                      throw new J(
                        'Could not delete some values',
                        Object.keys(t).map(function (e) {
                          return t[e];
                        }),
                        r - n
                      );
                    return r - n;
                  });
              });
          })
        : this.modify(function (e, t) {
            return (t.value = null);
          });
    }),
    Wt);
  function Wt() {}
  function zt(e, t) {
    return e < t ? -1 : e === t ? 0 : 1;
  }
  function Lt(e, t) {
    return t < e ? -1 : e === t ? 0 : 1;
  }
  function Yt(e, t, n) {
    var r = e instanceof $t ? new e.Collection(e) : e;
    return (r._ctx.error = new (n || TypeError)(t)), r;
  }
  function Gt(e) {
    return new e.Collection(e, function () {
      return Jt('');
    }).limit(0);
  }
  function Ht(e, t, n, r, i, o) {
    for (var u = Math.min(e.length, r.length), a = -1, s = 0; s < u; ++s) {
      var c = t[s];
      if (c !== r[s])
        return i(e[s], n[s]) < 0
          ? e.substr(0, s) + n[s] + n.substr(s + 1)
          : i(e[s], r[s]) < 0
          ? e.substr(0, s) + r[s] + n.substr(s + 1)
          : 0 <= a
          ? e.substr(0, a) + t[a] + n.substr(a + 1)
          : null;
      i(e[s], c) < 0 && (a = s);
    }
    return u < r.length && 'next' === o
      ? e + n.substr(e.length)
      : u < e.length && 'prev' === o
      ? e.substr(0, n.length)
      : a < 0
      ? null
      : e.substr(0, a) + r[a] + n.substr(a + 1);
  }
  function Qt(e, s, n, r) {
    var i,
      c,
      l,
      f,
      h,
      p,
      d,
      y = n.length;
    if (
      !n.every(function (e) {
        return 'string' == typeof e;
      })
    )
      return Yt(e, _t);
    function t(e) {
      (i =
        'next' === e
          ? function (e) {
              return e.toUpperCase();
            }
          : function (e) {
              return e.toLowerCase();
            }),
        (c =
          'next' === e
            ? function (e) {
                return e.toLowerCase();
              }
            : function (e) {
                return e.toUpperCase();
              }),
        (l = 'next' === e ? zt : Lt);
      var t = n
        .map(function (e) {
          return { lower: c(e), upper: i(e) };
        })
        .sort(function (e, t) {
          return l(e.lower, t.lower);
        });
      (f = t.map(function (e) {
        return e.upper;
      })),
        (h = t.map(function (e) {
          return e.lower;
        })),
        (d = 'next' === (p = e) ? '' : r);
    }
    t('next');
    var o = new e.Collection(e, function () {
      return Xt(f[0], h[y - 1] + r);
    });
    o._ondirectionchange = function (e) {
      t(e);
    };
    var v = 0;
    return (
      o._addAlgorithm(function (e, t, n) {
        var r = e.key;
        if ('string' != typeof r) return !1;
        var i = c(r);
        if (s(i, h, v)) return !0;
        for (var o = null, u = v; u < y; ++u) {
          var a = Ht(r, i, f[u], h[u], l, p);
          null === a && null === o
            ? (v = u + 1)
            : (null === o || 0 < l(o, a)) && (o = a);
        }
        return (
          t(
            null !== o
              ? function () {
                  e.continue(o + d);
                }
              : n
          ),
          !1
        );
      }),
      o
    );
  }
  function Xt(e, t, n, r) {
    return { type: 2, lower: e, upper: t, lowerOpen: n, upperOpen: r };
  }
  function Jt(e) {
    return { type: 1, lower: e, upper: e };
  }
  var $t =
    (Object.defineProperty(Zt.prototype, 'Collection', {
      get: function () {
        return this._ctx.table.db.Collection;
      },
      enumerable: !0,
      configurable: !0,
    }),
    (Zt.prototype.between = function (e, t, n, r) {
      (n = !1 !== n), (r = !0 === r);
      try {
        return 0 < this._cmp(e, t) ||
          (0 === this._cmp(e, t) && (n || r) && (!n || !r))
          ? Gt(this)
          : new this.Collection(this, function () {
              return Xt(e, t, !n, !r);
            });
      } catch (e) {
        return Yt(this, bt);
      }
    }),
    (Zt.prototype.equals = function (e) {
      return null == e
        ? Yt(this, bt)
        : new this.Collection(this, function () {
            return Jt(e);
          });
    }),
    (Zt.prototype.above = function (e) {
      return null == e
        ? Yt(this, bt)
        : new this.Collection(this, function () {
            return Xt(e, void 0, !0);
          });
    }),
    (Zt.prototype.aboveOrEqual = function (e) {
      return null == e
        ? Yt(this, bt)
        : new this.Collection(this, function () {
            return Xt(e, void 0, !1);
          });
    }),
    (Zt.prototype.below = function (e) {
      return null == e
        ? Yt(this, bt)
        : new this.Collection(this, function () {
            return Xt(void 0, e, !1, !0);
          });
    }),
    (Zt.prototype.belowOrEqual = function (e) {
      return null == e
        ? Yt(this, bt)
        : new this.Collection(this, function () {
            return Xt(void 0, e);
          });
    }),
    (Zt.prototype.startsWith = function (e) {
      return 'string' != typeof e
        ? Yt(this, _t)
        : this.between(e, e + gt, !0, !0);
    }),
    (Zt.prototype.startsWithIgnoreCase = function (e) {
      return '' === e
        ? this.startsWith(e)
        : Qt(
            this,
            function (e, t) {
              return 0 === e.indexOf(t[0]);
            },
            [e],
            gt
          );
    }),
    (Zt.prototype.equalsIgnoreCase = function (e) {
      return Qt(
        this,
        function (e, t) {
          return e === t[0];
        },
        [e],
        ''
      );
    }),
    (Zt.prototype.anyOfIgnoreCase = function () {
      var e = q.apply(F, arguments);
      return 0 === e.length
        ? Gt(this)
        : Qt(
            this,
            function (e, t) {
              return -1 !== t.indexOf(e);
            },
            e,
            ''
          );
    }),
    (Zt.prototype.startsWithAnyOfIgnoreCase = function () {
      var e = q.apply(F, arguments);
      return 0 === e.length
        ? Gt(this)
        : Qt(
            this,
            function (t, e) {
              return e.some(function (e) {
                return 0 === t.indexOf(e);
              });
            },
            e,
            gt
          );
    }),
    (Zt.prototype.anyOf = function () {
      var t = this,
        i = q.apply(F, arguments),
        o = this._cmp;
      try {
        i.sort(o);
      } catch (e) {
        return Yt(this, bt);
      }
      if (0 === i.length) return Gt(this);
      var e = new this.Collection(this, function () {
        return Xt(i[0], i[i.length - 1]);
      });
      e._ondirectionchange = function (e) {
        (o = 'next' === e ? t._ascending : t._descending), i.sort(o);
      };
      var u = 0;
      return (
        e._addAlgorithm(function (e, t, n) {
          for (var r = e.key; 0 < o(r, i[u]); )
            if (++u === i.length) return t(n), !1;
          return (
            0 === o(r, i[u]) ||
            (t(function () {
              e.continue(i[u]);
            }),
            !1)
          );
        }),
        e
      );
    }),
    (Zt.prototype.notEqual = function (e) {
      return this.inAnyRange(
        [
          [-1 / 0, e],
          [e, this.db._maxKey],
        ],
        { includeLowers: !1, includeUppers: !1 }
      );
    }),
    (Zt.prototype.noneOf = function () {
      var e = q.apply(F, arguments);
      if (0 === e.length) return new this.Collection(this);
      try {
        e.sort(this._ascending);
      } catch (e) {
        return Yt(this, bt);
      }
      var t = e.reduce(function (e, t) {
        return e ? e.concat([[e[e.length - 1][1], t]]) : [[-1 / 0, t]];
      }, null);
      return (
        t.push([e[e.length - 1], this.db._maxKey]),
        this.inAnyRange(t, { includeLowers: !1, includeUppers: !1 })
      );
    }),
    (Zt.prototype.inAnyRange = function (e, t) {
      var o = this,
        u = this._cmp,
        a = this._ascending,
        n = this._descending,
        s = this._min,
        c = this._max;
      if (0 === e.length) return Gt(this);
      if (
        !e.every(function (e) {
          return void 0 !== e[0] && void 0 !== e[1] && a(e[0], e[1]) <= 0;
        })
      )
        return Yt(
          this,
          'First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower',
          te.InvalidArgument
        );
      var l,
        r = !t || !1 !== t.includeLowers,
        i = t && !0 === t.includeUppers,
        f = a;
      function h(e, t) {
        return f(e[0], t[0]);
      }
      try {
        (l = e.reduce(function (e, t) {
          for (var n = 0, r = e.length; n < r; ++n) {
            var i = e[n];
            if (u(t[0], i[1]) < 0 && 0 < u(t[1], i[0])) {
              (i[0] = s(i[0], t[0])), (i[1] = c(i[1], t[1]));
              break;
            }
          }
          return n === r && e.push(t), e;
        }, [])).sort(h);
      } catch (e) {
        return Yt(this, bt);
      }
      var p = 0,
        d = i
          ? function (e) {
              return 0 < a(e, l[p][1]);
            }
          : function (e) {
              return 0 <= a(e, l[p][1]);
            },
        y = r
          ? function (e) {
              return 0 < n(e, l[p][0]);
            }
          : function (e) {
              return 0 <= n(e, l[p][0]);
            },
        v = d,
        m = new this.Collection(this, function () {
          return Xt(l[0][0], l[l.length - 1][1], !r, !i);
        });
      return (
        (m._ondirectionchange = function (e) {
          (f = 'next' === e ? ((v = d), a) : ((v = y), n)), l.sort(h);
        }),
        m._addAlgorithm(function (e, t, n) {
          for (var r, i = e.key; v(i); ) if (++p === l.length) return t(n), !1;
          return (
            (!d((r = i)) && !y(r)) ||
            (0 === o._cmp(i, l[p][1]) ||
              0 === o._cmp(i, l[p][0]) ||
              t(function () {
                f === a ? e.continue(l[p][0]) : e.continue(l[p][1]);
              }),
            !1)
          );
        }),
        m
      );
    }),
    (Zt.prototype.startsWithAnyOf = function () {
      var e = q.apply(F, arguments);
      return e.every(function (e) {
        return 'string' == typeof e;
      })
        ? 0 === e.length
          ? Gt(this)
          : this.inAnyRange(
              e.map(function (e) {
                return [e, e + gt];
              })
            )
        : Yt(this, 'startsWithAnyOf() only works with strings');
    }),
    Zt);
  function Zt() {}
  function en(e) {
    return 1 === e.length ? e[0] : e;
  }
  function tn(e) {
    try {
      return e.only([[]]), [[]];
    } catch (e) {
      return gt;
    }
  }
  function nn(t) {
    return Xe(function (e) {
      return rn(e), t(e.target.error), !1;
    });
  }
  function rn(e) {
    e.stopPropagation && e.stopPropagation(),
      e.preventDefault && e.preventDefault();
  }
  var on =
    ((un.prototype._lock = function () {
      return (
        v(!Te.global),
        ++this._reculock,
        1 !== this._reculock || Te.global || (Te.lockOwnerFor = this),
        this
      );
    }),
    (un.prototype._unlock = function () {
      if ((v(!Te.global), 0 == --this._reculock))
        for (
          Te.global || (Te.lockOwnerFor = null);
          0 < this._blockedFuncs.length && !this._locked();

        ) {
          var e = this._blockedFuncs.shift();
          try {
            lt(e[1], e[0]);
          } catch (e) {}
        }
      return this;
    }),
    (un.prototype._locked = function () {
      return this._reculock && Te.lockOwnerFor !== this;
    }),
    (un.prototype.create = function (t) {
      var n = this;
      if (!this.mode) return this;
      var e = this.db.idbdb,
        r = this.db._state.dbOpenError;
      if ((v(!this.idbtrans), !t && !e))
        switch (r && r.name) {
          case 'DatabaseClosedError':
            throw new te.DatabaseClosed(r);
          case 'MissingAPIError':
            throw new te.MissingAPI(r.message, r);
          default:
            throw new te.OpenFailed(r);
        }
      if (!this.active) throw new te.TransactionInactive();
      return (
        v(null === this._completion._state),
        ((t = this.idbtrans =
          t || e.transaction(en(this.storeNames), this.mode)).onerror = Xe(
          function (e) {
            rn(e), n._reject(t.error);
          }
        )),
        (t.onabort = Xe(function (e) {
          rn(e),
            n.active && n._reject(new te.Abort(t.error)),
            (n.active = !1),
            n.on('abort').fire(e);
        })),
        (t.oncomplete = Xe(function () {
          (n.active = !1), n._resolve();
        })),
        this
      );
    }),
    (un.prototype._promise = function (n, r, i) {
      var o = this;
      if ('readwrite' === n && 'readwrite' !== this.mode)
        return vt(new te.ReadOnly('Transaction is readonly'));
      if (!this.active) return vt(new te.TransactionInactive());
      if (this._locked())
        return new Fe(function (e, t) {
          o._blockedFuncs.push([
            function () {
              o._promise(n, r, i).then(e, t);
            },
            Te,
          ]);
        });
      if (i)
        return rt(function () {
          var e = new Fe(function (e, t) {
            o._lock();
            var n = r(e, t, o);
            n && n.then && n.then(e, t);
          });
          return (
            e.finally(function () {
              return o._unlock();
            }),
            (e._lib = !0),
            e
          );
        });
      var e = new Fe(function (e, t) {
        var n = r(e, t, o);
        n && n.then && n.then(e, t);
      });
      return (e._lib = !0), e;
    }),
    (un.prototype._root = function () {
      return this.parent ? this.parent._root() : this;
    }),
    (un.prototype.waitFor = function (e) {
      var t,
        r = this._root(),
        i = Fe.resolve(e);
      r._waitingFor
        ? (r._waitingFor = r._waitingFor.then(function () {
            return i;
          }))
        : ((r._waitingFor = i),
          (r._waitingQueue = []),
          (t = r.idbtrans.objectStore(r.storeNames[0])),
          (function e() {
            for (++r._spinCount; r._waitingQueue.length; )
              r._waitingQueue.shift()();
            r._waitingFor && (t.get(-1 / 0).onsuccess = e);
          })());
      var o = r._waitingFor;
      return new Fe(function (t, n) {
        i.then(
          function (e) {
            return r._waitingQueue.push(Xe(t.bind(null, e)));
          },
          function (e) {
            return r._waitingQueue.push(Xe(n.bind(null, e)));
          }
        ).finally(function () {
          r._waitingFor === o && (r._waitingFor = null);
        });
      });
    }),
    (un.prototype.abort = function () {
      this.active && this._reject(new te.Abort()), (this.active = !1);
    }),
    (un.prototype.table = function (e) {
      var t = this._memoizedTables || (this._memoizedTables = {});
      if (g(t, e)) return t[e];
      var n = this.schema[e];
      if (!n) throw new te.NotFound('Table ' + e + ' not part of transaction');
      var r = new this.db.Table(e, n, this);
      return (r.core = this.db.core.table(e)), (t[e] = r);
    }),
    un);
  function un() {}
  function an(e, t, n, r, i, o, u) {
    return {
      name: e,
      keyPath: t,
      unique: n,
      multi: r,
      auto: i,
      compound: o,
      src: (n && !u ? '&' : '') + (r ? '*' : '') + (i ? '++' : '') + sn(t),
    };
  }
  function sn(e) {
    return 'string' == typeof e ? e : e ? '[' + [].join.call(e, '+') + ']' : '';
  }
  function cn(e, t, n) {
    return {
      name: e,
      primKey: t,
      indexes: n,
      mappedClass: null,
      idxByName: w(n, function (e) {
        return [e.name, e];
      }),
    };
  }
  function ln(t) {
    return null == t
      ? function () {}
      : 'string' == typeof t
      ? 1 === (n = t).split('.').length
        ? function (e) {
            return e[n];
          }
        : function (e) {
            return x(e, n);
          }
      : function (e) {
          return x(e, t);
        };
    var n;
  }
  function fn(e, t) {
    return 'delete' === t.type ? t.keys : t.keys || t.values.map(e.extractKey);
  }
  function hn(e) {
    return [].slice.call(e);
  }
  var pn = 0;
  function dn(e) {
    return null == e
      ? ':id'
      : 'string' == typeof e
      ? e
      : '[' + e.join('+') + ']';
  }
  function yn(e, t, o, n) {
    var r = t.cmp.bind(t);
    function E(e) {
      if (3 === e.type) return null;
      if (4 === e.type)
        throw new Error('Cannot convert never type to IDBKeyRange');
      var t = e.lower,
        n = e.upper,
        r = e.lowerOpen,
        i = e.upperOpen;
      return void 0 === t
        ? void 0 === n
          ? null
          : o.upperBound(n, !!i)
        : void 0 === n
        ? o.lowerBound(t, !!r)
        : o.bound(t, n, !!r, !!i);
    }
    function i(k) {
      var m,
        P = k.name;
      return {
        name: P,
        schema: k,
        mutate: function (e) {
          var m = e.trans,
            g = e.type,
            b = e.keys,
            _ = e.values,
            w = e.range,
            x = e.wantResults;
          return new Promise(function (n, e) {
            n = Xe(n);
            var t = m.objectStore(P),
              r = null == t.keyPath,
              i = 'put' === g || 'add' === g;
            if (!i && 'delete' !== g && 'deleteRange' !== g)
              throw new Error('Invalid operation type: ' + g);
            var o = (b || _ || { length: 1 }).length;
            if (b && _ && b.length !== _.length)
              throw new Error(
                'Given keys array must have same length as given values array.'
              );
            if (0 === o)
              return n({
                numFailures: 0,
                failures: {},
                results: [],
                lastResult: void 0,
              });
            function u(e) {
              ++f,
                rn(e),
                c && (c[e.target._reqno] = void 0),
                (l[e.target._reqno] = e.target.error);
            }
            function a(e) {
              var t = e.target;
              c[t._reqno] = t.result;
            }
            var s,
              c =
                x && O(b || fn(k.primaryKey, { type: g, keys: b, values: _ })),
              l = [],
              f = 0;
            if ('deleteRange' === g) {
              if (4 === w.type)
                return n({
                  numFailures: f,
                  failures: l,
                  results: c,
                  lastResult: void 0,
                });
              s = 3 === w.type ? t.clear() : t.delete(E(w));
            } else {
              var h = i ? (r ? [_, b] : [_, null]) : [b, null],
                p = h[0],
                d = h[1];
              if (i)
                for (var y = 0; y < o; ++y)
                  ((s =
                    d && void 0 !== d[y]
                      ? t[g](p[y], d[y])
                      : t[g](p[y]))._reqno = y),
                    c && void 0 === c[y] && (s.onsuccess = a),
                    (s.onerror = u);
              else
                for (y = 0; y < o; ++y)
                  ((s = t[g](p[y]))._reqno = y), (s.onerror = u);
            }
            function v(e) {
              var t = e.target.result;
              c && (c[o - 1] = t),
                n({ numFailures: f, failures: l, results: c, lastResult: t });
            }
            (s.onerror = function (e) {
              u(e), v(e);
            }),
              (s.onsuccess = v);
          });
        },
        getMany: function (e) {
          var f = e.trans,
            h = e.keys;
          return new Promise(function (n, e) {
            n = Xe(n);
            for (
              var t,
                r = f.objectStore(P),
                i = h.length,
                o = new Array(i),
                u = 0,
                a = 0,
                s = function (e) {
                  var t = e.target;
                  null != (o[t._pos] = t.result) && 0, ++a === u && n(o);
                },
                c = nn(e),
                l = 0;
              l < i;
              ++l
            ) {
              null != h[l] &&
                (((t = r.get(h[l]))._pos = l),
                (t.onsuccess = s),
                (t.onerror = c),
                ++u);
            }
            0 === u && n(o);
          });
        },
        get: function (e) {
          var r = e.trans,
            i = e.key;
          return new Promise(function (t, e) {
            t = Xe(t);
            var n = r.objectStore(P).get(i);
            (n.onsuccess = function (e) {
              return t(e.target.result);
            }),
              (n.onerror = nn(e));
          });
        },
        query:
          ((m = f),
          function (v) {
            return new Promise(function (n, e) {
              n = Xe(n);
              var t,
                r,
                i,
                o,
                u = v.trans,
                a = v.values,
                s = v.limit,
                c = v.query,
                l = s === 1 / 0 ? void 0 : s,
                f = c.index,
                h = c.range,
                p = u.objectStore(P),
                d = f.isPrimaryKey ? p : p.index(f.name),
                y = E(h);
              if (0 === s) return n({ result: [] });
              m
                ? (((t = a
                    ? d.getAll(y, l)
                    : d.getAllKeys(y, l)).onsuccess = function (e) {
                    return n({ result: e.target.result });
                  }),
                  (t.onerror = nn(e)))
                : ((r = 0),
                  (i =
                    !a && 'openKeyCursor' in d
                      ? d.openKeyCursor(y)
                      : d.openCursor(y)),
                  (o = []),
                  (i.onsuccess = function (e) {
                    var t = i.result;
                    return t
                      ? (o.push(a ? t.value : t.primaryKey),
                        ++r === s ? n({ result: o }) : void t.continue())
                      : n({ result: o });
                  }),
                  (i.onerror = nn(e)));
            });
          }),
        openCursor: function (e) {
          var c = e.trans,
            a = e.values,
            l = e.query,
            f = e.reverse,
            h = e.unique;
          return new Promise(function (t, n) {
            t = Xe(t);
            var e = l.index,
              r = l.range,
              i = c.objectStore(P),
              o = e.isPrimaryKey ? i : i.index(e.name),
              u = f ? (h ? 'prevunique' : 'prev') : h ? 'nextunique' : 'next',
              s =
                !a && 'openKeyCursor' in o
                  ? o.openKeyCursor(E(r), u)
                  : o.openCursor(E(r), u);
            (s.onerror = nn(n)),
              (s.onsuccess = Xe(function (e) {
                var r,
                  i,
                  o,
                  u,
                  a = s.result;
                a
                  ? ((a.___id = ++pn),
                    (a.done = !1),
                    (r = a.continue.bind(a)),
                    (i = (i = a.continuePrimaryKey) && i.bind(a)),
                    (o = a.advance.bind(a)),
                    (u = function () {
                      throw new Error('Cursor not stopped');
                    }),
                    (a.trans = c),
                    (a.stop = a.continue = a.continuePrimaryKey = a.advance = function () {
                      throw new Error('Cursor not started');
                    }),
                    (a.fail = Xe(n)),
                    (a.next = function () {
                      var e = this,
                        t = 1;
                      return this.start(function () {
                        return t-- ? e.continue() : e.stop();
                      }).then(function () {
                        return e;
                      });
                    }),
                    (a.start = function (e) {
                      function t() {
                        if (s.result)
                          try {
                            e();
                          } catch (e) {
                            a.fail(e);
                          }
                        else
                          (a.done = !0),
                            (a.start = function () {
                              throw new Error('Cursor behind last entry');
                            }),
                            a.stop();
                      }
                      var n = new Promise(function (t, e) {
                        (t = Xe(t)),
                          (s.onerror = nn(e)),
                          (a.fail = e),
                          (a.stop = function (e) {
                            (a.stop = a.continue = a.continuePrimaryKey = a.advance = u),
                              t(e);
                          });
                      });
                      return (
                        (s.onsuccess = Xe(function (e) {
                          (s.onsuccess = t)();
                        })),
                        (a.continue = r),
                        (a.continuePrimaryKey = i),
                        (a.advance = o),
                        t(),
                        n
                      );
                    }),
                    t(a))
                  : t(null);
              }, n));
          });
        },
        count: function (e) {
          var t = e.query,
            u = e.trans,
            a = t.index,
            s = t.range;
          return new Promise(function (t, e) {
            var n = u.objectStore(P),
              r = a.isPrimaryKey ? n : n.index(a.name),
              i = E(s),
              o = i ? r.count(i) : r.count();
            (o.onsuccess = Xe(function (e) {
              return t(e.target.result);
            })),
              (o.onerror = nn(e));
          });
        },
      };
    }
    var u,
      a,
      s,
      c =
        ((a = n),
        (s = hn((u = e).objectStoreNames)),
        {
          schema: {
            name: u.name,
            tables: s
              .map(function (e) {
                return a.objectStore(e);
              })
              .map(function (t) {
                var e = t.keyPath,
                  n = t.autoIncrement,
                  r = d(e),
                  i = null == e,
                  u = {},
                  o = {
                    name: t.name,
                    primaryKey: {
                      name: null,
                      isPrimaryKey: !0,
                      outbound: i,
                      compound: r,
                      keyPath: e,
                      autoIncrement: n,
                      unique: !0,
                      extractKey: ln(e),
                    },
                    indexes: hn(t.indexNames)
                      .map(function (e) {
                        return t.index(e);
                      })
                      .map(function (e) {
                        var t = e.name,
                          n = e.unique,
                          r = e.multiEntry,
                          i = e.keyPath,
                          o = {
                            name: t,
                            compound: d(i),
                            keyPath: i,
                            unique: n,
                            multiEntry: r,
                            extractKey: ln(i),
                          };
                        return (u[dn(i)] = o);
                      }),
                    getIndexByKeyPath: function (e) {
                      return u[dn(e)];
                    },
                  };
                return (
                  (u[':id'] = o.primaryKey),
                  null != e && (u[dn(e)] = o.primaryKey),
                  o
                );
              }),
          },
          hasGetAll:
            0 < s.length &&
            'getAll' in a.objectStore(s[0]) &&
            !(
              'undefined' != typeof navigator &&
              /Safari/.test(navigator.userAgent) &&
              !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
              [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
            ),
        }),
      l = c.schema,
      f = c.hasGetAll,
      h = l.tables.map(i),
      p = {};
    return (
      h.forEach(function (e) {
        return (p[e.name] = e);
      }),
      {
        stack: 'dbcore',
        transaction: e.transaction.bind(e),
        table: function (e) {
          if (!p[e]) throw new Error("Table '" + e + "' not found");
          return p[e];
        },
        cmp: r,
        MIN_KEY: -1 / 0,
        MAX_KEY: tn(o),
        schema: l,
      }
    );
  }
  function vn(e, t, n, r) {
    var i,
      o = n.IDBKeyRange,
      u = n.indexedDB;
    return {
      dbcore:
        ((i = yn(t, u, o, r)),
        e.dbcore.reduce(function (e, t) {
          var n = t.create;
          return m(m({}, e), n(e));
        }, i)),
    };
  }
  function mn(n, e) {
    var t = e.db,
      r = vn(n._middlewares, t, n._deps, e);
    (n.core = r.dbcore),
      n.tables.forEach(function (e) {
        var t = e.name;
        n.core.schema.tables.some(function (e) {
          return e.name === t;
        }) &&
          ((e.core = n.core.table(t)),
          n[t] instanceof n.Table && (n[t].core = e.core));
      });
  }
  function gn(i, e, t, o) {
    t.forEach(function (n) {
      var r = o[n];
      e.forEach(function (e) {
        var t = l(e, n);
        (!t || ('value' in t && void 0 === t.value)) &&
          (e === i.Transaction.prototype || e instanceof i.Transaction
            ? a(e, n, {
                get: function () {
                  return this.table(n);
                },
                set: function (e) {
                  u(this, n, {
                    value: e,
                    writable: !0,
                    configurable: !0,
                    enumerable: !0,
                  });
                },
              })
            : (e[n] = new i.Table(n, r)));
      });
    });
  }
  function bn(n, e) {
    e.forEach(function (e) {
      for (var t in e) e[t] instanceof n.Table && delete e[t];
    });
  }
  function _n(e, t) {
    return e._cfg.version - t._cfg.version;
  }
  function wn(n, r, i, e) {
    var o = n._dbSchema,
      u = n._createTransaction('readwrite', n._storeNames, o);
    u.create(i), u._completion.catch(e);
    var a = u._reject.bind(u),
      s = Te.transless || Te;
    rt(function () {
      var c, l, f, h, t, e, p, d;
      (Te.trans = u),
        (Te.transless = s),
        0 === r
          ? (_(o).forEach(function (e) {
              kn(i, e, o[e].primKey, o[e].indexes);
            }),
            mn(n, i),
            Fe.follow(function () {
              return n.on.populate.fire(u);
            }).catch(a))
          : ((l = r),
            (f = u),
            (h = i),
            (t = []),
            (e = (c = n)._versions),
            (p = c._dbSchema = En(0, c.idbdb, h)),
            (d = !1),
            e
              .filter(function (e) {
                return e._cfg.version >= l;
              })
              .forEach(function (s) {
                t.push(function () {
                  var t = p,
                    e = s._cfg.dbschema;
                  On(c, t, h), On(c, e, h), (p = c._dbSchema = e);
                  var n = xn(t, e);
                  n.add.forEach(function (e) {
                    kn(h, e[0], e[1].primKey, e[1].indexes);
                  }),
                    n.change.forEach(function (e) {
                      if (e.recreate)
                        throw new te.Upgrade(
                          'Not yet support for changing primary key'
                        );
                      var t = h.objectStore(e.name);
                      e.add.forEach(function (e) {
                        return Pn(t, e);
                      }),
                        e.change.forEach(function (e) {
                          t.deleteIndex(e.name), Pn(t, e);
                        }),
                        e.del.forEach(function (e) {
                          return t.deleteIndex(e);
                        });
                    });
                  var r = s._cfg.contentUpgrade;
                  if (r && s._cfg.version > l) {
                    mn(c, h), (f._memoizedTables = {}), (d = !0);
                    var i = E(e);
                    n.del.forEach(function (e) {
                      i[e] = t[e];
                    }),
                      bn(c, [c.Transaction.prototype]),
                      gn(c, [c.Transaction.prototype], _(i), i),
                      (f.schema = i);
                    var o,
                      u = M(r);
                    u && it();
                    var a = Fe.follow(function () {
                      var e;
                      (o = r(f)) &&
                        u &&
                        ((e = ot.bind(null, null)), o.then(e, e));
                    });
                    return o && 'function' == typeof o.then
                      ? Fe.resolve(o)
                      : a.then(function () {
                          return o;
                        });
                  }
                }),
                  t.push(function (e) {
                    (d && kt) ||
                      (function (e, t) {
                        for (var n = 0; n < t.db.objectStoreNames.length; ++n) {
                          var r = t.db.objectStoreNames[n];
                          null == e[r] && t.db.deleteObjectStore(r);
                        }
                      })(s._cfg.dbschema, e),
                      bn(c, [c.Transaction.prototype]),
                      gn(
                        c,
                        [c.Transaction.prototype],
                        c._storeNames,
                        c._dbSchema
                      ),
                      (f.schema = c._dbSchema);
                  });
              }),
            (function e() {
              return t.length
                ? Fe.resolve(t.shift()(f.idbtrans)).then(e)
                : Fe.resolve();
            })()
              .then(function () {
                var t, n;
                (n = h),
                  _((t = p)).forEach(function (e) {
                    n.db.objectStoreNames.contains(e) ||
                      kn(n, e, t[e].primKey, t[e].indexes);
                  });
              })
              .catch(a));
    });
  }
  function xn(e, t) {
    var n,
      r = { del: [], add: [], change: [] };
    for (n in e) t[n] || r.del.push(n);
    for (n in t) {
      var i = e[n],
        o = t[n];
      if (i) {
        var u = { name: n, def: o, recreate: !1, del: [], add: [], change: [] };
        if (
          '' + (i.primKey.keyPath || '') != '' + (o.primKey.keyPath || '') ||
          (i.primKey.auto !== o.primKey.auto && !xt)
        )
          (u.recreate = !0), r.change.push(u);
        else {
          var a = i.idxByName,
            s = o.idxByName,
            c = void 0;
          for (c in a) s[c] || u.del.push(c);
          for (c in s) {
            var l = a[c],
              f = s[c];
            l ? l.src !== f.src && u.change.push(f) : u.add.push(f);
          }
          (0 < u.del.length || 0 < u.add.length || 0 < u.change.length) &&
            r.change.push(u);
        }
      } else r.add.push([n, o]);
    }
    return r;
  }
  function kn(e, t, n, r) {
    var i = e.db.createObjectStore(
      t,
      n.keyPath
        ? { keyPath: n.keyPath, autoIncrement: n.auto }
        : { autoIncrement: n.auto }
    );
    return (
      r.forEach(function (e) {
        return Pn(i, e);
      }),
      i
    );
  }
  function Pn(e, t) {
    e.createIndex(t.name, t.keyPath, { unique: t.unique, multiEntry: t.multi });
  }
  function En(e, t, s) {
    var c = {};
    return (
      p(t.objectStoreNames, 0).forEach(function (e) {
        for (
          var t = s.objectStore(e),
            n = an(
              sn((u = t.keyPath)),
              u || '',
              !1,
              !1,
              !!t.autoIncrement,
              u && 'string' != typeof u,
              !0
            ),
            r = [],
            i = 0;
          i < t.indexNames.length;
          ++i
        ) {
          var o = t.index(t.indexNames[i]),
            u = o.keyPath,
            a = an(
              o.name,
              u,
              !!o.unique,
              !!o.multiEntry,
              !1,
              u && 'string' != typeof u,
              !1
            );
          r.push(a);
        }
        c[e] = cn(e, n, r);
      }),
      c
    );
  }
  function On(e, t, n) {
    for (var r = n.db.objectStoreNames, i = 0; i < r.length; ++i) {
      var o = r[i],
        u = n.objectStore(o);
      e._hasGetAll = 'getAll' in u;
      for (var a = 0; a < u.indexNames.length; ++a) {
        var s,
          c = u.indexNames[a],
          l = u.index(c).keyPath,
          f = 'string' == typeof l ? l : '[' + p(l).join('+') + ']';
        !t[o] ||
          ((s = t[o].idxByName[f]) &&
            ((s.name = c), delete t[o].idxByName[f], (t[o].idxByName[c] = s)));
      }
    }
    'undefined' != typeof navigator &&
      /Safari/.test(navigator.userAgent) &&
      !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
      h.WorkerGlobalScope &&
      h instanceof h.WorkerGlobalScope &&
      [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
      (e._hasGetAll = !1);
  }
  var jn,
    Sn =
      ((An.prototype._parseStoresSpec = function (r, i) {
        _(r).forEach(function (e) {
          if (null !== r[e]) {
            var t = r[e].split(',').map(function (e, t) {
                var n = (e = e.trim()).replace(/([&*]|\+\+)/g, ''),
                  r = /^\[/.test(n) ? n.match(/^\[(.*)\]$/)[1].split('+') : n;
                return an(
                  n,
                  r || null,
                  /\&/.test(e),
                  /\*/.test(e),
                  /\+\+/.test(e),
                  d(r),
                  0 === t
                );
              }),
              n = t.shift();
            if (n.multi)
              throw new te.Schema('Primary key cannot be multi-valued');
            t.forEach(function (e) {
              if (e.auto)
                throw new te.Schema(
                  'Only primary key can be marked as autoIncrement (++)'
                );
              if (!e.keyPath)
                throw new te.Schema(
                  'Index must have a name and cannot be an empty string'
                );
            }),
              (i[e] = cn(e, n, t));
          }
        });
      }),
      (An.prototype.stores = function (e) {
        var t = this.db;
        this._cfg.storesSource = this._cfg.storesSource
          ? s(this._cfg.storesSource, e)
          : e;
        var n = t._versions,
          r = {},
          i = {};
        return (
          n.forEach(function (e) {
            s(r, e._cfg.storesSource),
              (i = e._cfg.dbschema = {}),
              e._parseStoresSpec(r, i);
          }),
          (t._dbSchema = i),
          bn(t, [t._allTables, t, t.Transaction.prototype]),
          gn(
            t,
            [t._allTables, t, t.Transaction.prototype, this._cfg.tables],
            _(i),
            i
          ),
          (t._storeNames = _(i)),
          this
        );
      }),
      (An.prototype.upgrade = function (e) {
        return (this._cfg.contentUpgrade = e), this;
      }),
      An);
  function An() {}
  function Kn(e) {
    return rt(function () {
      return (Te.letThrough = !0), e();
    });
  }
  function Cn(c) {
    var l = c._state,
      i = c._deps.indexedDB;
    if (l.isBeingOpened || c.idbdb)
      return l.dbReadyPromise.then(function () {
        return l.dbOpenError ? vt(l.dbOpenError) : c;
      });
    N && (l.openCanceller._stackHolder = z()),
      (l.isBeingOpened = !0),
      (l.dbOpenError = null),
      (l.openComplete = !1);
    var e = l.dbReadyResolve,
      f = null;
    return Fe.race([
      l.openCanceller,
      new Fe(function (u, r) {
        if (!i)
          throw new te.MissingAPI(
            'indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using old Safari versions, make sure to include indexedDB polyfill.'
          );
        var a = c.name,
          s = l.autoSchema ? i.open(a) : i.open(a, Math.round(10 * c.verno));
        if (!s) throw new te.MissingAPI('IndexedDB API not available');
        (s.onerror = nn(r)),
          (s.onblocked = Xe(c._fireOnBlocked)),
          (s.onupgradeneeded = Xe(function (e) {
            var t, n;
            (f = s.transaction),
              l.autoSchema && !c._options.allowEmptyDB
                ? ((s.onerror = rn),
                  f.abort(),
                  s.result.close(),
                  ((t = i.deleteDatabase(a)).onsuccess = t.onerror = Xe(
                    function () {
                      r(
                        new te.NoSuchDatabase('Database ' + a + ' doesnt exist')
                      );
                    }
                  )))
                : ((f.onerror = nn(r)),
                  (n = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion),
                  (c.idbdb = s.result),
                  wn(c, n / 10, f, r));
          }, r)),
          (s.onsuccess = Xe(function () {
            f = null;
            var e,
              t,
              n,
              r = (c.idbdb = s.result),
              i = p(r.objectStoreNames);
            if (0 < i.length)
              try {
                var o = r.transaction(en(i), 'readonly');
                l.autoSchema
                  ? (function (e, t, n) {
                      e.verno = t.version / 10;
                      var r = (e._dbSchema = En(0, t, n));
                      (e._storeNames = p(t.objectStoreNames, 0)),
                        gn(e, [e._allTables], _(r), r);
                    })(c, r, o)
                  : (On(c, c._dbSchema, o),
                    (t = o),
                    ((n = xn(En(0, (e = c).idbdb, t), e._dbSchema)).add
                      .length ||
                      n.change.some(function (e) {
                        return e.add.length || e.change.length;
                      })) &&
                      console.warn(
                        'Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.'
                      )),
                  mn(c, o);
              } catch (e) {}
            wt.push(c),
              (r.onversionchange = Xe(function (e) {
                (l.vcFired = !0), c.on('versionchange').fire(e);
              })),
              jn.add(a),
              u();
          }, r));
      }),
    ])
      .then(function () {
        return (
          (l.onReadyBeingFired = []),
          Fe.resolve(Kn(c.on.ready.fire)).then(function e() {
            if (0 < l.onReadyBeingFired.length) {
              var t = l.onReadyBeingFired.reduce(he, ie);
              return (l.onReadyBeingFired = []), Fe.resolve(Kn(t)).then(e);
            }
          })
        );
      })
      .finally(function () {
        l.onReadyBeingFired = null;
      })
      .then(function () {
        return (l.isBeingOpened = !1), c;
      })
      .catch(function (e) {
        try {
          f && f.abort();
        } catch (e) {}
        return (
          (l.isBeingOpened = !1),
          c.close(),
          (l.dbOpenError = e),
          vt(l.dbOpenError)
        );
      })
      .finally(function () {
        (l.openComplete = !0), e();
      });
  }
  function In(t) {
    function e(e) {
      return t.next(e);
    }
    var i = n(e),
      o = n(function (e) {
        return t.throw(e);
      });
    function n(r) {
      return function (e) {
        var t = r(e),
          n = t.value;
        return t.done
          ? n
          : n && 'function' == typeof n.then
          ? n.then(i, o)
          : d(n)
          ? Promise.all(n).then(i, o)
          : i(n);
      };
    }
    return n(e)();
  }
  function Tn(e, t, n) {
    for (var r = d(e) ? e.slice() : [e], i = 0; i < n; ++i) r.push(t);
    return r;
  }
  var Dn = {
      stack: 'dbcore',
      name: 'VirtualIndexMiddleware',
      level: 1,
      create: function (f) {
        return m(m({}, f), {
          table: function (e) {
            var u = f.table(e),
              t = u.schema,
              s = {},
              c = [];
            function l(e, t, n) {
              var r = dn(e),
                i = (s[r] = s[r] || []),
                o = null == e ? 0 : 'string' == typeof e ? 1 : e.length,
                u = 0 < t,
                a = m(m({}, n), {
                  isVirtual: u,
                  isPrimaryKey: !u && n.isPrimaryKey,
                  keyTail: t,
                  keyLength: o,
                  extractKey: ln(e),
                  unique: !u && n.unique,
                });
              return (
                i.push(a),
                a.isPrimaryKey || c.push(a),
                1 < o && l(2 === o ? e[0] : e.slice(0, o - 1), t + 1, n),
                i.sort(function (e, t) {
                  return e.keyTail - t.keyTail;
                }),
                a
              );
            }
            var n = l(t.primaryKey.keyPath, 0, t.primaryKey);
            s[':id'] = [n];
            for (var r = 0, i = t.indexes; r < i.length; r++) {
              var o = i[r];
              l(o.keyPath, 0, o);
            }
            function a(e) {
              var t,
                n,
                r = e.query.index;
              return r.isVirtual
                ? m(m({}, e), {
                    query: {
                      index: r,
                      range:
                        ((t = e.query.range),
                        (n = r.keyTail),
                        {
                          type: 1 === t.type ? 2 : t.type,
                          lower: Tn(
                            t.lower,
                            t.lowerOpen ? f.MAX_KEY : f.MIN_KEY,
                            n
                          ),
                          lowerOpen: !0,
                          upper: Tn(
                            t.upper,
                            t.upperOpen ? f.MIN_KEY : f.MAX_KEY,
                            n
                          ),
                          upperOpen: !0,
                        }),
                    },
                  })
                : e;
            }
            return m(m({}, u), {
              schema: m(m({}, t), {
                primaryKey: n,
                indexes: c,
                getIndexByKeyPath: function (e) {
                  var t = s[dn(e)];
                  return t && t[0];
                },
              }),
              count: function (e) {
                return u.count(a(e));
              },
              query: function (e) {
                return u.query(a(e));
              },
              openCursor: function (t) {
                var e = t.query.index,
                  r = e.keyTail,
                  n = e.isVirtual,
                  i = e.keyLength;
                if (!n) return u.openCursor(t);
                function o(n) {
                  return Object.create(n, {
                    continue: {
                      value: function (e) {
                        null != e
                          ? n.continue(
                              Tn(e, t.reverse ? f.MAX_KEY : f.MIN_KEY, r)
                            )
                          : t.unique
                          ? n.continue(
                              Tn(n.key, t.reverse ? f.MIN_KEY : f.MAX_KEY, r)
                            )
                          : n.continue();
                      },
                    },
                    continuePrimaryKey: {
                      value: function (e, t) {
                        n.continuePrimaryKey(Tn(e, f.MAX_KEY, r), t);
                      },
                    },
                    key: {
                      get: function () {
                        var e = n.key;
                        return 1 === i ? e[0] : e.slice(0, i);
                      },
                    },
                    value: {
                      get: function () {
                        return n.value;
                      },
                    },
                  });
                }
                return u.openCursor(a(t)).then(function (e) {
                  return e && o(e);
                });
              },
            });
          },
        });
      },
    },
    Bn = {
      stack: 'dbcore',
      name: 'HooksMiddleware',
      level: 2,
      create: function (e) {
        return m(m({}, e), {
          table: function (r) {
            var a = e.table(r),
              v = a.schema.primaryKey;
            return m(m({}, a), {
              mutate: function (t) {
                var e = Te.trans,
                  n = e.table(r).hook,
                  p = n.deleting,
                  d = n.creating,
                  y = n.updating;
                switch (t.type) {
                  case 'add':
                    if (d.fire === ie) break;
                    return e._promise(
                      'readwrite',
                      function () {
                        return u(t);
                      },
                      !0
                    );
                  case 'put':
                    if (d.fire === ie && y.fire === ie) break;
                    return e._promise(
                      'readwrite',
                      function () {
                        return u(t);
                      },
                      !0
                    );
                  case 'delete':
                    if (p.fire === ie) break;
                    return e._promise(
                      'readwrite',
                      function () {
                        return u(t);
                      },
                      !0
                    );
                  case 'deleteRange':
                    if (p.fire === ie) break;
                    return e._promise(
                      'readwrite',
                      function () {
                        return (function n(r, i, o) {
                          return a
                            .query({
                              trans: r,
                              values: !1,
                              query: { index: v, range: i },
                              limit: o,
                            })
                            .then(function (e) {
                              var t = e.result;
                              return u({
                                type: 'delete',
                                keys: t,
                                trans: r,
                              }).then(function (e) {
                                return 0 < e.numFailures
                                  ? Promise.reject(e.failures[0])
                                  : t.length < o
                                  ? {
                                      failures: [],
                                      numFailures: 0,
                                      lastResult: void 0,
                                    }
                                  : n(
                                      r,
                                      m(m({}, i), {
                                        lower: t[t.length - 1],
                                        lowerOpen: !0,
                                      }),
                                      o
                                    );
                              });
                            });
                        })((e = t).trans, e.range, 1e4);
                        var e;
                      },
                      !0
                    );
                }
                return a.mutate(t);
                function u(l) {
                  var e,
                    t,
                    n,
                    f = Te.trans,
                    h = l.keys || fn(v, l);
                  if (!h) throw new Error('Keys missing');
                  return (
                    'delete' !==
                      (l =
                        'add' === l.type || 'put' === l.type
                          ? m(m({}, l), { keys: h, wantResults: !0 })
                          : m({}, l)).type && (l.values = O(l.values)),
                    l.keys && (l.keys = O(l.keys)),
                    (e = a),
                    (n = h),
                    ('add' === (t = l).type
                      ? Promise.resolve(new Array(t.values.length))
                      : e.getMany({ trans: t.trans, keys: n })
                    ).then(function (s) {
                      var c = h.map(function (e, t) {
                        var n,
                          r,
                          i,
                          o,
                          u = s[t],
                          a = { onerror: null, onsuccess: null };
                        return (
                          'delete' === l.type
                            ? p.fire.call(a, e, u, f)
                            : 'add' === l.type || void 0 === u
                            ? ((n = d.fire.call(a, e, l.values[t], f)),
                              null == e &&
                                null != n &&
                                ((e = n),
                                (l.keys[t] = e),
                                v.outbound || k(l.values[t], v.keyPath, e)))
                            : ((r = D(u, l.values[t])),
                              (i = y.fire.call(a, r, e, u, f)) &&
                                ((o = l.values[t]),
                                Object.keys(i).forEach(function (e) {
                                  g(o, e) ? (o[e] = i[e]) : k(o, e, i[e]);
                                }))),
                          a
                        );
                      });
                      return a
                        .mutate(l)
                        .then(function (e) {
                          for (
                            var t = e.failures,
                              n = e.results,
                              r = e.numFailures,
                              i = e.lastResult,
                              o = 0;
                            o < h.length;
                            ++o
                          ) {
                            var u = n ? n[o] : h[o],
                              a = c[o];
                            null == u
                              ? a.onerror && a.onerror(t[o])
                              : a.onsuccess &&
                                a.onsuccess(
                                  'put' === l.type && s[o] ? l.values[o] : u
                                );
                          }
                          return {
                            failures: t,
                            results: n,
                            numFailures: r,
                            lastResult: i,
                          };
                        })
                        .catch(function (t) {
                          return (
                            c.forEach(function (e) {
                              return e.onerror && e.onerror(t);
                            }),
                            Promise.reject(t)
                          );
                        });
                    })
                  );
                }
              },
            });
          },
        });
      },
    },
    Rn =
      ((Fn.prototype.version = function (t) {
        if (isNaN(t) || t < 0.1)
          throw new te.Type('Given version is not a positive number');
        if (
          ((t = Math.round(10 * t) / 10),
          this.idbdb || this._state.isBeingOpened)
        )
          throw new te.Schema('Cannot add version when database is open');
        this.verno = Math.max(this.verno, t);
        var e = this._versions,
          n = e.filter(function (e) {
            return e._cfg.version === t;
          })[0];
        return (
          n ||
          ((n = new this.Version(t)),
          e.push(n),
          e.sort(_n),
          n.stores({}),
          (this._state.autoSchema = !1),
          n)
        );
      }),
      (Fn.prototype._whenReady = function (e) {
        var n = this;
        return this._state.openComplete || Te.letThrough
          ? e()
          : new Fe(function (e, t) {
              if (!n._state.isBeingOpened) {
                if (!n._options.autoOpen)
                  return void t(new te.DatabaseClosed());
                n.open().catch(ie);
              }
              n._state.dbReadyPromise.then(e, t);
            }).then(e);
      }),
      (Fn.prototype.use = function (e) {
        var t = e.stack,
          n = e.create,
          r = e.level,
          i = e.name;
        i && this.unuse({ stack: t, name: i });
        var o = this._middlewares[t] || (this._middlewares[t] = []);
        return (
          o.push({ stack: t, create: n, level: null == r ? 10 : r, name: i }),
          o.sort(function (e, t) {
            return e.level - t.level;
          }),
          this
        );
      }),
      (Fn.prototype.unuse = function (e) {
        var t = e.stack,
          n = e.name,
          r = e.create;
        return (
          t &&
            this._middlewares[t] &&
            (this._middlewares[t] = this._middlewares[t].filter(function (e) {
              return r ? e.create !== r : !!n && e.name !== n;
            })),
          this
        );
      }),
      (Fn.prototype.open = function () {
        return Cn(this);
      }),
      (Fn.prototype.close = function () {
        var e = wt.indexOf(this),
          n = this._state;
        if ((0 <= e && wt.splice(e, 1), this.idbdb)) {
          try {
            this.idbdb.close();
          } catch (e) {}
          this.idbdb = null;
        }
        (this._options.autoOpen = !1),
          (n.dbOpenError = new te.DatabaseClosed()),
          n.isBeingOpened && n.cancelOpen(n.dbOpenError),
          (n.dbReadyPromise = new Fe(function (e) {
            n.dbReadyResolve = e;
          })),
          (n.openCanceller = new Fe(function (e, t) {
            n.cancelOpen = t;
          }));
      }),
      (Fn.prototype.delete = function () {
        var r = this,
          i = 0 < arguments.length,
          o = this._state;
        return new Fe(function (t, n) {
          function e() {
            r.close();
            var e = r._deps.indexedDB.deleteDatabase(r.name);
            (e.onsuccess = Xe(function () {
              jn.remove(r.name), t();
            })),
              (e.onerror = nn(n)),
              (e.onblocked = r._fireOnBlocked);
          }
          if (i)
            throw new te.InvalidArgument(
              'Arguments not allowed in db.delete()'
            );
          o.isBeingOpened ? o.dbReadyPromise.then(e) : e();
        });
      }),
      (Fn.prototype.backendDB = function () {
        return this.idbdb;
      }),
      (Fn.prototype.isOpen = function () {
        return null !== this.idbdb;
      }),
      (Fn.prototype.hasBeenClosed = function () {
        var e = this._state.dbOpenError;
        return e && 'DatabaseClosed' === e.name;
      }),
      (Fn.prototype.hasFailed = function () {
        return null !== this._state.dbOpenError;
      }),
      (Fn.prototype.dynamicallyOpened = function () {
        return this._state.autoSchema;
      }),
      Object.defineProperty(Fn.prototype, 'tables', {
        get: function () {
          var t = this;
          return _(this._allTables).map(function (e) {
            return t._allTables[e];
          });
        },
        enumerable: !0,
        configurable: !0,
      }),
      (Fn.prototype.transaction = function () {
        var e = function (e, t, n) {
          var r = arguments.length;
          if (r < 2) throw new te.InvalidArgument('Too few arguments');
          for (var i = new Array(r - 1); --r; ) i[r - 1] = arguments[r];
          return (n = i.pop()), [e, j(i), n];
        }.apply(this, arguments);
        return this._transaction.apply(this, e);
      }),
      (Fn.prototype._transaction = function (e, t, n) {
        var r = this,
          i = Te.trans;
        (i && i.db === this && -1 === e.indexOf('!')) || (i = null);
        var o,
          u,
          a = -1 !== e.indexOf('?');
        e = e.replace('!', '').replace('?', '');
        try {
          if (
            ((u = t.map(function (e) {
              var t = e instanceof r.Table ? e.name : e;
              if ('string' != typeof t)
                throw new TypeError(
                  'Invalid table argument to Dexie.transaction(). Only Table or String are allowed'
                );
              return t;
            })),
            'r' == e || e === Ot)
          )
            o = Ot;
          else {
            if ('rw' != e && e != jt)
              throw new te.InvalidArgument('Invalid transaction mode: ' + e);
            o = jt;
          }
          if (i) {
            if (i.mode === Ot && o === jt) {
              if (!a)
                throw new te.SubTransaction(
                  'Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY'
                );
              i = null;
            }
            i &&
              u.forEach(function (e) {
                if (i && -1 === i.storeNames.indexOf(e)) {
                  if (!a)
                    throw new te.SubTransaction(
                      'Table ' + e + ' not included in parent transaction.'
                    );
                  i = null;
                }
              }),
              a && i && !i.active && (i = null);
          }
        } catch (n) {
          return i
            ? i._promise(null, function (e, t) {
                t(n);
              })
            : vt(n);
        }
        var s = function (u, a, s, c, l) {
          return Fe.resolve().then(function () {
            var e = Te.transless || Te,
              t = u._createTransaction(a, s, u._dbSchema, c),
              n = { trans: t, transless: e };
            c ? (t.idbtrans = c.idbtrans) : t.create();
            var r,
              i = M(l);
            i && it();
            var o = Fe.follow(function () {
              var e;
              (r = l.call(t, t)) &&
                (i
                  ? ((e = ot.bind(null, null)), r.then(e, e))
                  : 'function' == typeof r.next &&
                    'function' == typeof r.throw &&
                    (r = In(r)));
            }, n);
            return (r && 'function' == typeof r.then
              ? Fe.resolve(r).then(function (e) {
                  return t.active
                    ? e
                    : vt(
                        new te.PrematureCommit(
                          'Transaction committed too early. See http://bit.ly/2kdckMn'
                        )
                      );
                })
              : o.then(function () {
                  return r;
                })
            )
              .then(function (e) {
                return (
                  c && t._resolve(),
                  t._completion.then(function () {
                    return e;
                  })
                );
              })
              .catch(function (e) {
                return t._reject(e), vt(e);
              });
          });
        }.bind(null, this, o, u, i, n);
        return i
          ? i._promise(o, s, 'lock')
          : Te.trans
          ? lt(Te.transless, function () {
              return r._whenReady(s);
            })
          : this._whenReady(s);
      }),
      (Fn.prototype.table = function (e) {
        if (!g(this._allTables, e))
          throw new te.InvalidTable('Table ' + e + ' does not exist');
        return this._allTables[e];
      }),
      Fn);
  function Fn(e, t) {
    var o = this;
    (this._middlewares = {}), (this.verno = 0);
    var n = Fn.dependencies;
    (this._options = t = m(
      {
        addons: Fn.addons,
        autoOpen: !0,
        indexedDB: n.indexedDB,
        IDBKeyRange: n.IDBKeyRange,
      },
      t
    )),
      (this._deps = { indexedDB: t.indexedDB, IDBKeyRange: t.IDBKeyRange });
    var r = t.addons;
    (this._dbSchema = {}),
      (this._versions = []),
      (this._storeNames = []),
      (this._allTables = {});
    var a,
      i,
      u,
      s,
      c,
      l = {
        dbOpenError: (this.idbdb = null),
        isBeingOpened: !1,
        onReadyBeingFired: null,
        openComplete: !1,
        dbReadyResolve: ie,
        dbReadyPromise: null,
        cancelOpen: ie,
        openCanceller: null,
        autoSchema: !0,
      };
    (l.dbReadyPromise = new Fe(function (e) {
      l.dbReadyResolve = e;
    })),
      (l.openCanceller = new Fe(function (e, t) {
        l.cancelOpen = t;
      })),
      (this._state = l),
      (this.name = e),
      (this.on = Tt(this, 'populate', 'blocked', 'versionchange', {
        ready: [he, ie],
      })),
      (this.on.ready.subscribe = y(this.on.ready.subscribe, function (i) {
        return function (n, r) {
          Fn.vip(function () {
            var t,
              e = o._state;
            e.openComplete
              ? (e.dbOpenError || Fe.resolve().then(n), r && i(n))
              : e.onReadyBeingFired
              ? (e.onReadyBeingFired.push(n), r && i(n))
              : (i(n),
                (t = o),
                r ||
                  i(function e() {
                    t.on.ready.unsubscribe(n), t.on.ready.unsubscribe(e);
                  }));
          });
        };
      })),
      (this.Collection =
        ((a = this),
        Dt(Vt.prototype, function (e, t) {
          this.db = a;
          var n = At,
            r = null;
          if (t)
            try {
              n = t();
            } catch (e) {
              r = e;
            }
          var i = e._ctx,
            o = i.table,
            u = o.hook.reading.fire;
          this._ctx = {
            table: o,
            index: i.index,
            isPrimKey:
              !i.index ||
              (o.schema.primKey.keyPath && i.index === o.schema.primKey.name),
            range: n,
            keysOnly: !1,
            dir: 'next',
            unique: '',
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: !0,
            isMatch: null,
            offset: 0,
            limit: 1 / 0,
            error: r,
            or: i.or,
            valueMapper: u !== oe ? u : null,
          };
        }))),
      (this.Table =
        ((i = this),
        Dt(Ct.prototype, function (e, t, n) {
          (this.db = i),
            (this._tx = n),
            (this.name = e),
            (this.schema = t),
            (this.hook = i._allTables[e]
              ? i._allTables[e].hook
              : Tt(null, {
                  creating: [se, ie],
                  reading: [ue, oe],
                  updating: [le, ie],
                  deleting: [ce, ie],
                }));
        }))),
      (this.Transaction =
        ((u = this),
        Dt(on.prototype, function (e, t, n, r) {
          var i = this;
          (this.db = u),
            (this.mode = e),
            (this.storeNames = t),
            (this.schema = n),
            (this.idbtrans = null),
            (this.on = Tt(this, 'complete', 'error', 'abort')),
            (this.parent = r || null),
            (this.active = !0),
            (this._reculock = 0),
            (this._blockedFuncs = []),
            (this._resolve = null),
            (this._reject = null),
            (this._waitingFor = null),
            (this._waitingQueue = null),
            (this._spinCount = 0),
            (this._completion = new Fe(function (e, t) {
              (i._resolve = e), (i._reject = t);
            })),
            this._completion.then(
              function () {
                (i.active = !1), i.on.complete.fire();
              },
              function (e) {
                var t = i.active;
                return (
                  (i.active = !1),
                  i.on.error.fire(e),
                  i.parent
                    ? i.parent._reject(e)
                    : t && i.idbtrans && i.idbtrans.abort(),
                  vt(e)
                );
              }
            );
        }))),
      (this.Version =
        ((s = this),
        Dt(Sn.prototype, function (e) {
          (this.db = s),
            (this._cfg = {
              version: e,
              storesSource: null,
              dbschema: {},
              tables: {},
              contentUpgrade: null,
            });
        }))),
      (this.WhereClause =
        ((c = this),
        Dt($t.prototype, function (e, t, n) {
          (this.db = c),
            (this._ctx = { table: e, index: ':id' === t ? null : t, or: n });
          var r = c._deps.indexedDB;
          if (!r) throw new te.MissingAPI('indexedDB API missing');
          (this._cmp = this._ascending = r.cmp.bind(r)),
            (this._descending = function (e, t) {
              return r.cmp(t, e);
            }),
            (this._max = function (e, t) {
              return 0 < r.cmp(e, t) ? e : t;
            }),
            (this._min = function (e, t) {
              return r.cmp(e, t) < 0 ? e : t;
            }),
            (this._IDBKeyRange = c._deps.IDBKeyRange);
        }))),
      this.on('versionchange', function (e) {
        0 < e.newVersion
          ? console.warn(
              "Another connection wants to upgrade database '" +
                o.name +
                "'. Closing db now to resume the upgrade."
            )
          : console.warn(
              "Another connection wants to delete database '" +
                o.name +
                "'. Closing db now to resume the delete request."
            ),
          o.close();
      }),
      this.on('blocked', function (e) {
        !e.newVersion || e.newVersion < e.oldVersion
          ? console.warn("Dexie.delete('" + o.name + "') was blocked")
          : console.warn(
              "Upgrade '" +
                o.name +
                "' blocked by other connection holding version " +
                e.oldVersion / 10
            );
      }),
      (this._maxKey = tn(t.IDBKeyRange)),
      (this._createTransaction = function (e, t, n, r) {
        return new o.Transaction(e, t, n, r);
      }),
      (this._fireOnBlocked = function (t) {
        o.on('blocked').fire(t),
          wt
            .filter(function (e) {
              return e.name === o.name && e !== o && !e._state.vcFired;
            })
            .map(function (e) {
              return e.on('versionchange').fire(t);
            });
      }),
      this.use(Dn),
      this.use(Bn),
      r.forEach(function (e) {
        return e(o);
      });
  }
  var qn = Rn;
  return (
    i(
      qn,
      m(m({}, re), {
        delete: function (e) {
          return new qn(e).delete();
        },
        exists: function (e) {
          return new qn(e, { addons: [] })
            .open()
            .then(function (e) {
              return e.close(), !0;
            })
            .catch('NoSuchDatabaseError', function () {
              return !1;
            });
        },
        getDatabaseNames: function (e) {
          return jn ? jn.getDatabaseNames().then(e) : Fe.resolve([]);
        },
        defineClass: function () {
          return function (e) {
            s(this, e);
          };
        },
        ignoreTransaction: function (e) {
          return Te.trans ? lt(Te.transless, e) : e();
        },
        vip: Kn,
        async: function (t) {
          return function () {
            try {
              var e = In(t.apply(this, arguments));
              return e && 'function' == typeof e.then ? e : Fe.resolve(e);
            } catch (e) {
              return vt(e);
            }
          };
        },
        spawn: function (e, t, n) {
          try {
            var r = In(e.apply(n, t || []));
            return r && 'function' == typeof r.then ? r : Fe.resolve(r);
          } catch (e) {
            return vt(e);
          }
        },
        currentTransaction: {
          get: function () {
            return Te.trans || null;
          },
        },
        waitFor: function (e, t) {
          var n = Fe.resolve(
            'function' == typeof e ? qn.ignoreTransaction(e) : e
          ).timeout(t || 6e4);
          return Te.trans ? Te.trans.waitFor(n) : n;
        },
        Promise: Fe,
        debug: {
          get: function () {
            return N;
          },
          set: function (e) {
            U(
              e,
              'dexie' === e
                ? function () {
                    return !0;
                  }
                : mt
            );
          },
        },
        derive: o,
        extend: s,
        props: i,
        override: y,
        Events: Tt,
        getByKeyPath: x,
        setByKeyPath: k,
        delByKeyPath: P,
        shallowClone: E,
        deepClone: K,
        getObjectDiff: D,
        asap: b,
        minKey: -1 / 0,
        addons: [],
        connections: wt,
        errnames: Z,
        dependencies: (function () {
          try {
            return {
              indexedDB:
                h.indexedDB ||
                h.mozIndexedDB ||
                h.webkitIndexedDB ||
                h.msIndexedDB,
              IDBKeyRange: h.IDBKeyRange || h.webkitIDBKeyRange,
            };
          } catch (e) {
            return { indexedDB: null, IDBKeyRange: null };
          }
        })(),
        semVer: '3.0.3',
        version: '3.0.3'
          .split('.')
          .map(function (e) {
            return parseInt(e);
          })
          .reduce(function (e, t, n) {
            return e + t / Math.pow(10, 2 * n);
          }),
        default: qn,
        Dexie: qn,
      })
    ),
    (qn.maxKey = tn(qn.dependencies.IDBKeyRange)),
    (function (e) {
      try {
        (i = (t = e) && 'function' == typeof t.databases) ||
          ((r = new Rn(Et, { addons: [] }))
            .version(1)
            .stores({ dbnames: 'name' }),
          (n = r.table('dbnames'))),
          (jn = {
            getDatabaseNames: function () {
              return i
                ? Fe.resolve(t.databases()).then(function (e) {
                    return e
                      .map(function (e) {
                        return e.name;
                      })
                      .filter(function (e) {
                        return e !== Et;
                      });
                  })
                : n.toCollection().primaryKeys();
            },
            add: function (e) {
              return !i && e !== Et && n.put({ name: e }).catch(ie);
            },
            remove: function (e) {
              return !i && e !== Et && n.delete(e).catch(ie);
            },
          });
      } catch (e) {}
      var t, n, r, i;
    })(Rn.dependencies.indexedDB),
    (Fe.rejectionMapper = function (e, t) {
      if (
        !e ||
        e instanceof Q ||
        e instanceof TypeError ||
        e instanceof SyntaxError ||
        !e.name ||
        !ne[e.name]
      )
        return e;
      var n = new ne[e.name](t || e.message, e);
      return (
        'stack' in e &&
          a(n, 'stack', {
            get: function () {
              return this.inner.stack;
            },
          }),
        n
      );
    }),
    U(N, mt),
    Rn
  );
});
