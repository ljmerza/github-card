!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define(e) : e();
}(0, function () {
  "use strict";

  const t = new WeakMap(),
        e = e => "function" == typeof e && t.has(e),
        s = void 0 !== window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
        i = (t, e, s = null) => {
    let i = e;

    for (; i !== s;) {
      const e = i.nextSibling;
      t.removeChild(i), i = e;
    }
  },
        n = {},
        r = {},
        o = `{{lit-${String(Math.random()).slice(2)}}}`,
        a = `\x3c!--${o}--\x3e`,
        l = new RegExp(`${o}|${a}`),
        h = "$lit$";

  class c {
    constructor(t, e) {
      this.parts = [], this.element = e;
      let s = -1,
          i = 0;

      const n = [],
            r = e => {
        const a = e.content,
              c = document.createTreeWalker(a, 133, null, !1);
        let d = 0;

        for (; c.nextNode();) {
          s++;
          const e = c.currentNode;

          if (1 === e.nodeType) {
            if (e.hasAttributes()) {
              const n = e.attributes;
              let r = 0;

              for (let t = 0; t < n.length; t++) n[t].value.indexOf(o) >= 0 && r++;

              for (; r-- > 0;) {
                const n = t.strings[i],
                      r = u.exec(n)[2],
                      o = r.toLowerCase() + h,
                      a = e.getAttribute(o).split(l);
                this.parts.push({
                  type: "attribute",
                  index: s,
                  name: r,
                  strings: a
                }), e.removeAttribute(o), i += a.length - 1;
              }
            }

            "TEMPLATE" === e.tagName && r(e);
          } else if (3 === e.nodeType) {
            const t = e.data;

            if (t.indexOf(o) >= 0) {
              const r = e.parentNode,
                    o = t.split(l),
                    a = o.length - 1;

              for (let t = 0; t < a; t++) r.insertBefore("" === o[t] ? p() : document.createTextNode(o[t]), e), this.parts.push({
                type: "node",
                index: ++s
              });

              "" === o[a] ? (r.insertBefore(p(), e), n.push(e)) : e.data = o[a], i += a;
            }
          } else if (8 === e.nodeType) if (e.data === o) {
            const t = e.parentNode;
            null !== e.previousSibling && s !== d || (s++, t.insertBefore(p(), e)), d = s, this.parts.push({
              type: "node",
              index: s
            }), null === e.nextSibling ? e.data = "" : (n.push(e), s--), i++;
          } else {
            let t = -1;

            for (; -1 !== (t = e.data.indexOf(o, t + 1));) this.parts.push({
              type: "node",
              index: -1
            });
          }
        }
      };

      r(e);

      for (const t of n) t.parentNode.removeChild(t);
    }

  }

  const d = t => -1 !== t.index,
        p = () => document.createComment(""),
        u = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  class m {
    constructor(t, e, s) {
      this._parts = [], this.template = t, this.processor = e, this.options = s;
    }

    update(t) {
      let e = 0;

      for (const s of this._parts) void 0 !== s && s.setValue(t[e]), e++;

      for (const t of this._parts) void 0 !== t && t.commit();
    }

    _clone() {
      const t = s ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
            e = this.template.parts;
      let i = 0,
          n = 0;

      const r = t => {
        const s = document.createTreeWalker(t, 133, null, !1);
        let o = s.nextNode();

        for (; i < e.length && null !== o;) {
          const t = e[i];
          if (d(t)) {
            if (n === t.index) {
              if ("node" === t.type) {
                const t = this.processor.handleTextExpression(this.options);
                t.insertAfterNode(o.previousSibling), this._parts.push(t);
              } else this._parts.push(...this.processor.handleAttributeExpressions(o, t.name, t.strings, this.options));

              i++;
            } else n++, "TEMPLATE" === o.nodeName && r(o.content), o = s.nextNode();
          } else this._parts.push(void 0), i++;
        }
      };

      return r(t), s && (document.adoptNode(t), customElements.upgrade(t)), t;
    }

  }

  class f {
    constructor(t, e, s, i) {
      this.strings = t, this.values = e, this.type = s, this.processor = i;
    }

    getHTML() {
      const t = this.strings.length - 1;
      let e = "";

      for (let s = 0; s < t; s++) {
        const t = this.strings[s],
              i = u.exec(t);
        e += i ? t.substr(0, i.index) + i[1] + i[2] + h + i[3] + o : t + a;
      }

      return e + this.strings[t];
    }

    getTemplateElement() {
      const t = document.createElement("template");
      return t.innerHTML = this.getHTML(), t;
    }

  }

  const _ = t => null === t || !("object" == typeof t || "function" == typeof t);

  class g {
    constructor(t, e, s) {
      this.dirty = !0, this.element = t, this.name = e, this.strings = s, this.parts = [];

      for (let t = 0; t < s.length - 1; t++) this.parts[t] = this._createPart();
    }

    _createPart() {
      return new y(this);
    }

    _getValue() {
      const t = this.strings,
            e = t.length - 1;
      let s = "";

      for (let i = 0; i < e; i++) {
        s += t[i];
        const e = this.parts[i];

        if (void 0 !== e) {
          const t = e.value;
          if (null != t && (Array.isArray(t) || "string" != typeof t && t[Symbol.iterator])) for (const e of t) s += "string" == typeof e ? e : String(e);else s += "string" == typeof t ? t : String(t);
        }
      }

      return s += t[e];
    }

    commit() {
      this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
    }

  }

  class y {
    constructor(t) {
      this.value = void 0, this.committer = t;
    }

    setValue(t) {
      t === n || _(t) && t === this.value || (this.value = t, e(t) || (this.committer.dirty = !0));
    }

    commit() {
      for (; e(this.value);) {
        const t = this.value;
        this.value = n, t(this);
      }

      this.value !== n && this.committer.commit();
    }

  }

  class v {
    constructor(t) {
      this.value = void 0, this._pendingValue = void 0, this.options = t;
    }

    appendInto(t) {
      this.startNode = t.appendChild(p()), this.endNode = t.appendChild(p());
    }

    insertAfterNode(t) {
      this.startNode = t, this.endNode = t.nextSibling;
    }

    appendIntoPart(t) {
      t._insert(this.startNode = p()), t._insert(this.endNode = p());
    }

    insertAfterPart(t) {
      t._insert(this.startNode = p()), this.endNode = t.endNode, t.endNode = this.startNode;
    }

    setValue(t) {
      this._pendingValue = t;
    }

    commit() {
      for (; e(this._pendingValue);) {
        const t = this._pendingValue;
        this._pendingValue = n, t(this);
      }

      const t = this._pendingValue;
      t !== n && (_(t) ? t !== this.value && this._commitText(t) : t instanceof f ? this._commitTemplateResult(t) : t instanceof Node ? this._commitNode(t) : Array.isArray(t) || t[Symbol.iterator] ? this._commitIterable(t) : t === r ? (this.value = r, this.clear()) : this._commitText(t));
    }

    _insert(t) {
      this.endNode.parentNode.insertBefore(t, this.endNode);
    }

    _commitNode(t) {
      this.value !== t && (this.clear(), this._insert(t), this.value = t);
    }

    _commitText(t) {
      const e = this.startNode.nextSibling;
      t = null == t ? "" : t, e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = t : this._commitNode(document.createTextNode("string" == typeof t ? t : String(t))), this.value = t;
    }

    _commitTemplateResult(t) {
      const e = this.options.templateFactory(t);
      if (this.value instanceof m && this.value.template === e) this.value.update(t.values);else {
        const s = new m(e, t.processor, this.options),
              i = s._clone();

        s.update(t.values), this._commitNode(i), this.value = s;
      }
    }

    _commitIterable(t) {
      Array.isArray(this.value) || (this.value = [], this.clear());
      const e = this.value;
      let s,
          i = 0;

      for (const n of t) void 0 === (s = e[i]) && (s = new v(this.options), e.push(s), 0 === i ? s.appendIntoPart(this) : s.insertAfterPart(e[i - 1])), s.setValue(n), s.commit(), i++;

      i < e.length && (e.length = i, this.clear(s && s.endNode));
    }

    clear(t = this.startNode) {
      i(this.startNode.parentNode, t.nextSibling, this.endNode);
    }

  }

  class S {
    constructor(t, e, s) {
      if (this.value = void 0, this._pendingValue = void 0, 2 !== s.length || "" !== s[0] || "" !== s[1]) throw new Error("Boolean attributes can only contain a single expression");
      this.element = t, this.name = e, this.strings = s;
    }

    setValue(t) {
      this._pendingValue = t;
    }

    commit() {
      for (; e(this._pendingValue);) {
        const t = this._pendingValue;
        this._pendingValue = n, t(this);
      }

      if (this._pendingValue === n) return;
      const t = !!this._pendingValue;
      this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name)), this.value = t, this._pendingValue = n;
    }

  }

  class b extends g {
    constructor(t, e, s) {
      super(t, e, s), this.single = 2 === s.length && "" === s[0] && "" === s[1];
    }

    _createPart() {
      return new w(this);
    }

    _getValue() {
      return this.single ? this.parts[0].value : super._getValue();
    }

    commit() {
      this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
    }

  }

  class w extends y {}

  let x = !1;

  try {
    const t = {
      get capture() {
        return x = !0, !1;
      }

    };
    window.addEventListener("test", t, t), window.removeEventListener("test", t, t);
  } catch (t) {}

  class P {
    constructor(t, e, s) {
      this.value = void 0, this._pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = s, this._boundHandleEvent = t => this.handleEvent(t);
    }

    setValue(t) {
      this._pendingValue = t;
    }

    commit() {
      for (; e(this._pendingValue);) {
        const t = this._pendingValue;
        this._pendingValue = n, t(this);
      }

      if (this._pendingValue === n) return;
      const t = this._pendingValue,
            s = this.value,
            i = null == t || null != s && (t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive),
            r = null != t && (null == s || i);
      i && this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options), r && (this._options = C(t), this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options)), this.value = t, this._pendingValue = n;
    }

    handleEvent(t) {
      "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
    }

  }

  const C = t => t && (x ? {
    capture: t.capture,
    passive: t.passive,
    once: t.once
  } : t.capture);

  const N = new class {
    handleAttributeExpressions(t, e, s, i) {
      const n = e[0];
      return "." === n ? new b(t, e.slice(1), s).parts : "@" === n ? [new P(t, e.slice(1), i.eventContext)] : "?" === n ? [new S(t, e.slice(1), s)] : new g(t, e, s).parts;
    }

    handleTextExpression(t) {
      return new v(t);
    }

  }();

  function k(t) {
    let e = A.get(t.type);
    void 0 === e && (e = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    }, A.set(t.type, e));
    let s = e.stringsArray.get(t.strings);
    if (void 0 !== s) return s;
    const i = t.strings.join(o);
    return void 0 === (s = e.keyString.get(i)) && (s = new c(t, t.getTemplateElement()), e.keyString.set(i, s)), e.stringsArray.set(t.strings, s), s;
  }

  const A = new Map(),
        T = new WeakMap();
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.0.0");

  const E = (t, ...e) => new f(t, e, "html", N),
        V = 133;

  function $(t, e) {
    const {
      element: {
        content: s
      },
      parts: i
    } = t,
          n = document.createTreeWalker(s, V, null, !1);
    let r = U(i),
        o = i[r],
        a = -1,
        l = 0;
    const h = [];
    let c = null;

    for (; n.nextNode();) {
      a++;
      const t = n.currentNode;

      for (t.previousSibling === c && (c = null), e.has(t) && (h.push(t), null === c && (c = t)), null !== c && l++; void 0 !== o && o.index === a;) o.index = null !== c ? -1 : o.index - l, o = i[r = U(i, r)];
    }

    h.forEach(t => t.parentNode.removeChild(t));
  }

  const O = t => {
    let e = 11 === t.nodeType ? 0 : 1;
    const s = document.createTreeWalker(t, V, null, !1);

    for (; s.nextNode();) e++;

    return e;
  },
        U = (t, e = -1) => {
    for (let s = e + 1; s < t.length; s++) {
      const e = t[s];
      if (d(e)) return s;
    }

    return -1;
  };

  const R = (t, e) => `${t}--${e}`;

  let z = !0;
  void 0 === window.ShadyCSS ? z = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."), z = !1);

  const M = t => e => {
    const s = R(e.type, t);
    let i = A.get(s);
    void 0 === i && (i = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    }, A.set(s, i));
    let n = i.stringsArray.get(e.strings);
    if (void 0 !== n) return n;
    const r = e.strings.join(o);

    if (void 0 === (n = i.keyString.get(r))) {
      const s = e.getTemplateElement();
      z && window.ShadyCSS.prepareTemplateDom(s, t), n = new c(e, s), i.keyString.set(r, n);
    }

    return i.stringsArray.set(e.strings, n), n;
  },
        L = ["html", "svg"],
        j = new Set(),
        q = (t, e, s) => {
    j.add(s);
    const i = t.querySelectorAll("style");
    if (0 === i.length) return void window.ShadyCSS.prepareTemplateStyles(e.element, s);
    const n = document.createElement("style");

    for (let t = 0; t < i.length; t++) {
      const e = i[t];
      e.parentNode.removeChild(e), n.textContent += e.textContent;
    }

    if ((t => {
      L.forEach(e => {
        const s = A.get(R(e, t));
        void 0 !== s && s.keyString.forEach(t => {
          const {
            element: {
              content: e
            }
          } = t,
                s = new Set();
          Array.from(e.querySelectorAll("style")).forEach(t => {
            s.add(t);
          }), $(t, s);
        });
      });
    })(s), function (t, e, s = null) {
      const {
        element: {
          content: i
        },
        parts: n
      } = t;
      if (null == s) return void i.appendChild(e);
      const r = document.createTreeWalker(i, V, null, !1);
      let o = U(n),
          a = 0,
          l = -1;

      for (; r.nextNode();) for (l++, r.currentNode === s && (a = O(e), s.parentNode.insertBefore(e, s)); -1 !== o && n[o].index === l;) {
        if (a > 0) {
          for (; -1 !== o;) n[o].index += a, o = U(n, o);

          return;
        }

        o = U(n, o);
      }
    }(e, n, e.element.content.firstChild), window.ShadyCSS.prepareTemplateStyles(e.element, s), window.ShadyCSS.nativeShadow) {
      const s = e.element.content.querySelector("style");
      t.insertBefore(s.cloneNode(!0), t.firstChild);
    } else {
      e.element.content.insertBefore(n, e.element.content.firstChild);
      const t = new Set();
      t.add(n), $(e, t);
    }
  };

  window.JSCompiler_renameProperty = (t, e) => t;

  const F = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          return t ? "" : null;

        case Object:
        case Array:
          return null == t ? t : JSON.stringify(t);
      }

      return t;
    },

    fromAttribute(t, e) {
      switch (e) {
        case Boolean:
          return null !== t;

        case Number:
          return null === t ? null : Number(t);

        case Object:
        case Array:
          return JSON.parse(t);
      }

      return t;
    }

  },
        B = (t, e) => e !== t && (e == e || t == t),
        H = {
    attribute: !0,
    type: String,
    converter: F,
    reflect: !1,
    hasChanged: B
  },
        I = Promise.resolve(!0),
        W = 1,
        J = 4,
        D = 8,
        G = 16,
        K = 32;

  class Q extends HTMLElement {
    constructor() {
      super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = I, this._hasConnectedResolver = void 0, this._changedProperties = new Map(), this._reflectingProperties = void 0, this.initialize();
    }

    static get observedAttributes() {
      this.finalize();
      const t = [];
      return this._classProperties.forEach((e, s) => {
        const i = this._attributeNameForProperty(s, e);

        void 0 !== i && (this._attributeToPropertyMap.set(i, s), t.push(i));
      }), t;
    }

    static _ensureClassProperties() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
        this._classProperties = new Map();

        const t = Object.getPrototypeOf(this)._classProperties;

        void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
      }
    }

    static createProperty(t, e = H) {
      if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
      const s = "symbol" == typeof t ? Symbol() : `__${t}`;
      Object.defineProperty(this.prototype, t, {
        get() {
          return this[s];
        },

        set(e) {
          const i = this[t];
          this[s] = e, this._requestUpdate(t, i);
        },

        configurable: !0,
        enumerable: !0
      });
    }

    static finalize() {
      if (this.hasOwnProperty(JSCompiler_renameProperty("finalized", this)) && this.finalized) return;
      const t = Object.getPrototypeOf(this);

      if ("function" == typeof t.finalize && t.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
        const t = this.properties,
              e = [...Object.getOwnPropertyNames(t), ...("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])];

        for (const s of e) this.createProperty(s, t[s]);
      }
    }

    static _attributeNameForProperty(t, e) {
      const s = e.attribute;
      return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }

    static _valueHasChanged(t, e, s = B) {
      return s(t, e);
    }

    static _propertyValueFromAttribute(t, e) {
      const s = e.type,
            i = e.converter || F,
            n = "function" == typeof i ? i : i.fromAttribute;
      return n ? n(t, s) : t;
    }

    static _propertyValueToAttribute(t, e) {
      if (void 0 === e.reflect) return;
      const s = e.type,
            i = e.converter;
      return (i && i.toAttribute || F.toAttribute)(t, s);
    }

    initialize() {
      this._saveInstanceProperties(), this._requestUpdate();
    }

    _saveInstanceProperties() {
      this.constructor._classProperties.forEach((t, e) => {
        if (this.hasOwnProperty(e)) {
          const t = this[e];
          delete this[e], this._instanceProperties || (this._instanceProperties = new Map()), this._instanceProperties.set(e, t);
        }
      });
    }

    _applyInstanceProperties() {
      this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
    }

    connectedCallback() {
      this._updateState = this._updateState | K, this._hasConnectedResolver && (this._hasConnectedResolver(), this._hasConnectedResolver = void 0);
    }

    disconnectedCallback() {}

    attributeChangedCallback(t, e, s) {
      e !== s && this._attributeToProperty(t, s);
    }

    _propertyToAttribute(t, e, s = H) {
      const i = this.constructor,
            n = i._attributeNameForProperty(t, s);

      if (void 0 !== n) {
        const t = i._propertyValueToAttribute(e, s);

        if (void 0 === t) return;
        this._updateState = this._updateState | D, null == t ? this.removeAttribute(n) : this.setAttribute(n, t), this._updateState = this._updateState & ~D;
      }
    }

    _attributeToProperty(t, e) {
      if (this._updateState & D) return;

      const s = this.constructor,
            i = s._attributeToPropertyMap.get(t);

      if (void 0 !== i) {
        const t = s._classProperties.get(i) || H;
        this._updateState = this._updateState | G, this[i] = s._propertyValueFromAttribute(e, t), this._updateState = this._updateState & ~G;
      }
    }

    _requestUpdate(t, e) {
      let s = !0;

      if (void 0 !== t) {
        const i = this.constructor,
              n = i._classProperties.get(t) || H;
        i._valueHasChanged(this[t], e, n.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== n.reflect || this._updateState & G || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, n))) : s = !1;
      }

      !this._hasRequestedUpdate && s && this._enqueueUpdate();
    }

    requestUpdate(t, e) {
      return this._requestUpdate(t, e), this.updateComplete;
    }

    async _enqueueUpdate() {
      let t, e;
      this._updateState = this._updateState | J;
      const s = this._updatePromise;
      this._updatePromise = new Promise((s, i) => {
        t = s, e = i;
      });

      try {
        await s;
      } catch (t) {}

      this._hasConnected || (await new Promise(t => this._hasConnectedResolver = t));

      try {
        const t = this.performUpdate();
        null != t && (await t);
      } catch (t) {
        e(t);
      }

      t(!this._hasRequestedUpdate);
    }

    get _hasConnected() {
      return this._updateState & K;
    }

    get _hasRequestedUpdate() {
      return this._updateState & J;
    }

    get hasUpdated() {
      return this._updateState & W;
    }

    performUpdate() {
      this._instanceProperties && this._applyInstanceProperties();
      let t = !1;
      const e = this._changedProperties;

      try {
        (t = this.shouldUpdate(e)) && this.update(e);
      } catch (e) {
        throw t = !1, e;
      } finally {
        this._markUpdated();
      }

      t && (this._updateState & W || (this._updateState = this._updateState | W, this.firstUpdated(e)), this.updated(e));
    }

    _markUpdated() {
      this._changedProperties = new Map(), this._updateState = this._updateState & ~J;
    }

    get updateComplete() {
      return this._updatePromise;
    }

    shouldUpdate(t) {
      return !0;
    }

    update(t) {
      void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0);
    }

    updated(t) {}

    firstUpdated(t) {}

  }

  Q.finalized = !0;
  const X = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
        Y = Symbol();

  class Z {
    constructor(t, e) {
      if (e !== Y) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t;
    }

    get styleSheet() {
      return void 0 === this._styleSheet && (X ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
    }

    toString() {
      return this.cssText;
    }

  }

  (window.litElementVersions || (window.litElementVersions = [])).push("2.0.1");

  const tt = t => t.flat ? t.flat(1 / 0) : function t(e, s = []) {
    for (let i = 0, n = e.length; i < n; i++) {
      const n = e[i];
      Array.isArray(n) ? t(n, s) : s.push(n);
    }

    return s;
  }(t);

  class et extends Q {
    static finalize() {
      super.finalize(), this._styles = this.hasOwnProperty(JSCompiler_renameProperty("styles", this)) ? this._getUniqueStyles() : this._styles || [];
    }

    static _getUniqueStyles() {
      const t = this.styles,
            e = [];

      if (Array.isArray(t)) {
        tt(t).reduceRight((t, e) => (t.add(e), t), new Set()).forEach(t => e.unshift(t));
      } else t && e.push(t);

      return e;
    }

    initialize() {
      super.initialize(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
    }

    createRenderRoot() {
      return this.attachShadow({
        mode: "open"
      });
    }

    adoptStyles() {
      const t = this.constructor._styles;
      0 !== t.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? X ? this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t => t.cssText), this.localName));
    }

    connectedCallback() {
      super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
    }

    update(t) {
      super.update(t);
      const e = this.render();
      e instanceof f && this.constructor.render(e, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(t => {
        const e = document.createElement("style");
        e.textContent = t.cssText, this.renderRoot.appendChild(e);
      }));
    }

    render() {}

  }

  et.finalized = !0, et.render = (t, e, s) => {
    const n = s.scopeName,
          r = T.has(e),
          o = e instanceof ShadowRoot && z && t instanceof f,
          a = o && !j.has(n),
          l = a ? document.createDocumentFragment() : e;

    if (((t, e, s) => {
      let n = T.get(e);
      void 0 === n && (i(e, e.firstChild), T.set(e, n = new v(Object.assign({
        templateFactory: k
      }, s))), n.appendInto(e)), n.setValue(t), n.commit();
    })(t, l, Object.assign({
      templateFactory: M(n)
    }, s)), a) {
      const t = T.get(l);
      T.delete(l), t.value instanceof m && q(l, t.value.template, n), i(e, e.firstChild), e.appendChild(l), T.set(e, t);
    }

    !r && o && window.ShadyCSS.styleElement(e.host);
  };
  const st = ((t, ...e) => {
    const s = e.reduce((e, s, i) => e + (t => {
      if (t instanceof Z) return t.cssText;
      throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);
    })(s) + t[i + 1], t[0]);
    return new Z(s, Y);
  })`
    .github-card {
        display: flex;
        padding: 0 16px 4px;
        flex-direction: column;
    }

    .github-card .header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
        opacity: var(--dark-primary-opacity);
        padding: 24px 0px 0px;    
    }

    .github-card__body {
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .github-card__body .issue {
        display:flex;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    
    .github-card__body .issue .name {
        min-width: 40%;
        word-break: break-all;
    }

    .github-card__body .issue .name .property {
        display:flex;
        font-size: 1.1em;
        cursor: pointer;
    }

    .github-card__body .issue .name .property .issue-name {
        padding-left: 5px;
        padding-top: 2px;
    }

    .github-card__body .issue .links {
        display:flex;
        justify-content: flex-end;
        padding-left: 5px;
        min-width: 50%;
        max-width: 200px;
    }
    
    .github-card__body .links .property {
        display:flex;
        cursor: pointer;
        flex-direction: column;
        padding-right: 5px;
    }

    .github-card__body .links .property:last-child {
        padding-right: 0px;
    }

    .github-card__body .links .property .hidden {
        display:none;
    }

    .github-card__body .links .property > span {
        padding-bottom: 5px;
    }

    .github-card__body ha-icon {
        color: var(--primary-color);
        font-size: 1.2em;
    }
`;

  class it extends et {
    static get properties() {
      return {
        hass: Object,
        config: Object
      };
    }

    constructor() {
      super(), this.githubBaseUrl = "https://github.com";
    }

    setConfig(t) {
      if (!t.entities) throw Error("entities required.");
      this.config = {
        title: "Github",
        show_extended: !0,
        ...t
      };
    }

    getCardSize() {
      const t = this.config.entites * (this.config.show_extended ? 2 : 1);
      return Math.round(3.5 * t);
    }

    static get styles() {
      return st;
    }

    render() {
      const t = this.issues.map(t => E`
        <div class='issue'>
          <div class="name">
            <span class='property' @click=${() => this.openLink(`${t.attributes.path}`)}  title='Open repository'>
              <ha-icon icon="${t.attributes.icon}"></ha-icon>
              <span class='issue-name'>${t.attributes.name}</span>
            </span>
          </div>

          <div></div>

          <div class="links">
            <div class='property'>
              <span @click=${() => this.openLink(`${t.attributes.path}/issues`)} title='Open issues'>
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>${t.attributes.open_issues}</span>
              </span>
              <span 
                class='${this.config.show_extended ? "" : "hidden"}' 
                @click=${() => this.openLink(`${t.attributes.path}/releases`)} 
                title='Open releases'
              >
                <ha-icon icon="mdi:tag-outline"></ha-icon>
              </span>
            </div>

            <div class='property'>
              <span @click=${() => this.openLink(`${t.attributes.path}/pulls`)} title='Open pulls'>
                <ha-icon icon="mdi:source-pull"></ha-icon>
                <span>${t.attributes.open_pull_requests}</span>
              </span>
              <span 
                class='${this.config.show_extended ? "" : "hidden"}' 
                @click=${() => this.openLink(`${t.attributes.path}/network/members`)} 
                title='Open forks'
              >
                <ha-icon icon="mdi:source-fork"></ha-icon>
              </span>
            </div>

            <div class='property'>
              <span @click=${() => this.openLink(`${t.attributes.path}/stargazers`)} title='Open stargazers'>
                <ha-icon icon="mdi:star"></ha-icon>
                <span>${t.attributes.stargazers}</span>
              </span>
              <span 
                class='${this.config.show_extended ? "" : "hidden"}' 
                @click=${() => this.openLink(`${t.attributes.path}/commits`)} 
                title='Open commits'
              >
                <ha-icon icon="mdi:clock-outline"></ha-icon>
              </span>
            </div>

          </div>
        </div>
      `);
      return E`
      <ha-card class='github-card'>
        <style>${it.styles}</style>
        <div class='header'>
          ${this.config.title}
        </div>
        <div class='github-card__body'>
          ${t}
        </div>
      </ha-card>
    `;
    }

    openLink(t) {
      window.open(`${this.githubBaseUrl}/${t}`);
    }

    get issues() {
      return this.config.entities.map(t => this.hass.states[t]).filter(t => t);
    }

  }

  customElements.define("github-card", it);
});
