(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/index-editor.js":
/*!*****************************!*\
  !*** ./src/index-editor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RokuCardEditor; });\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n\n\n\nconst fireEvent = (node, type, detail = {}, options = {}) => {\n  const event = new Event(type, {\n    bubbles: options.bubbles === undefined ? true : options.bubbles,\n    cancelable: Boolean(options.cancelable),\n    composed: options.composed === undefined ? true : options.composed,\n  });\n\n  event.detail = detail;\n  node.dispatchEvent(event);\n  return event;\n};\n\n\nclass RokuCardEditor extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n  setConfig(config) {\n    this._config = config;\n  }\n\n  static get properties() {\n    return { hass: {}, _config: {} };\n  }\n\n  get _name() {\n    return this._config.name || '';\n  }\n\n  get _entity() {\n    return this._config.entity || '';\n  }\n\n  get _remote() {\n    return this._config.remote || '';\n  }\n\n  get _theme() {\n    return this._config.theme;\n  }\n\n  render() {\n    if (!this.hass) {\n      return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]``;\n    }\n\n    const themes = ['Backend-selected', 'default'].concat(\n      Object.keys(this.hass.themes.themes).sort(),\n    );\n\n    const entities = Object.keys(this.hass.states).filter(\n      eid => eid.substr(0, eid.indexOf('.')) === 'github',\n    );\n\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n      ${themes}\n      ${entities}\n    `;\n  }\n\n  _valueChanged(ev) {\n    if (!this._config || !this.hass) {\n      return;\n    }\n\n    const { target } = ev;\n    if (this[`_${target.configValue}`] === target.value) {\n      return;\n    }\n\n    if (target.configValue) {\n      if (target.value === '') {\n        delete this._config[target.configValue];\n      } else {\n        this._config = {\n          ...this._config,\n          [target.configValue]: target.checked !== undefined ? target.checked : target.value,\n        };\n      }\n    }\n\n    fireEvent(this, 'config-changed', { config: this._config });\n  }\n}\n\ncustomElements.define('github-card-editor', RokuCardEditor);\n\n\n//# sourceURL=webpack:///./src/index-editor.js?");

/***/ })

}]);