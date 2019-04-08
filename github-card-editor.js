(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["github-card-editor"],{

/***/ "./src/index-editor.js":
/*!*****************************!*\
  !*** ./src/index-editor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GithubCardEditor; });\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _style_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-editor */ \"./src/style-editor.js\");\n\n\n\n\nconst fireEvent = (node, type, detail = {}, options = {}) => {\n  const event = new Event(type, {\n    bubbles: options.bubbles === undefined ? true : options.bubbles,\n    cancelable: Boolean(options.cancelable),\n    composed: options.composed === undefined ? true : options.composed,\n  });\n\n  event.detail = detail;\n  node.dispatchEvent(event);\n  return event;\n};\n\n\nclass GithubCardEditor extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n  static get styles() {\n    return _style_editor__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n  }\n\n  static get properties() {\n    return { hass: {}, _config: {} };\n  }\n\n  setConfig(config) {\n    this._config = config;\n  }\n\n  get entityOptions() {\n    // get all github entities\n    const entities = Object.keys(this.hass.states).filter(eid => {\n      if(eid.substr(0, eid.indexOf('.')) !== 'sensor') return false;\n\n      const entity = this.hass.states[eid];\n      if (!entity.attributes || !entity.attributes.icon || !entity.attributes.icon.includes('github')) return false;\n\n      return true;\n    });\n\n    // convert to checkbox objects\n    return entities.map(eid => ({ name: eid, checked: this._config.entities.includes(eid) }));\n  }\n\n  firstUpdated(){\n    this._firstRendered = true;\n  }\n\n  render() {\n    if (!this.hass) {\n      return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]``;\n    }\n\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n      <div class=\"card-config\">\n\n        <div class=overall-config'>\n          <paper-input\n            label=\"Title (Optional)\"\n            .value=\"${this._config.title}\"\n            .configValue=\"${\"title\"}\"\n            @value-changed=\"${this._valueChanged}\"\n          ></paper-input>\n          <paper-checkbox\n            @checked-changed=\"${this._valueChanged}\" \n            .checked=${this._config.show_extended}\n            .configValue=\"${\"show_extended\"}\"\n          >Show Extended</paper-checkbox>\n        </div>\n\n        <div class='entities'>\n          <h3>Entities</h3>\n          ${\n            this.entityOptions.map(entity => {\n              return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<paper-checkbox \n                @checked-changed=\"${this._valueChanged}\" \n                .checked=${entity.checked}\n                .entityValue=\"${entity.name}\"\n              >${entity.name}</paper-checkbox>`;\n            })\n          }\n        </div>\n      </div>\n    `;\n  }\n\n  _valueChanged(ev) {\n    if (!this._config || !this.hass || !this._firstRendered) return;\n\n    const { target: { configValue, value, entityValue }, detail: { value: checkedValue} } = ev;\n\n    if (entityValue){\n      if (checkedValue) this._config.entities.push(entityValue);\n      else this._config.entities = this._config.entities.filter(entity => entity !== entityValue);\n\n    } else if (checkedValue !== undefined || checkedValue !== null){\n      this._config = { ...this._config, [configValue]: checkedValue };\n\n    } else {\n      this._config = { ...this._config, [configValue]: value };\n    }\n\n    fireEvent(this, 'config-changed', { config: this._config });\n  }\n}\n\ncustomElements.define('github-card-editor', GithubCardEditor);\n\n\n//# sourceURL=webpack:///./src/index-editor.js?");

/***/ }),

/***/ "./src/style-editor.js":
/*!*****************************!*\
  !*** ./src/style-editor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n\r\n\r\nconst style = lit_element__WEBPACK_IMPORTED_MODULE_0__[\"css\"]`\r\n    .entities {\r\n        padding-top: 20px;\r\n    }\r\n\r\n    .entities paper-checkbox {\r\n        display: block;\r\n        margin-bottom: 10px;\r\n        margin-left: 10px;\r\n    }\r\n`;\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (style);\r\n\n\n//# sourceURL=webpack:///./src/style-editor.js?");

/***/ })

}]);