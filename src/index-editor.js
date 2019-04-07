import { LitElement, html } from 'lit-element';


const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });

  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};


export default class RokuCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _name() {
    return this._config.name || '';
  }

  get _entity() {
    return this._config.entity || '';
  }

  get _remote() {
    return this._config.remote || '';
  }

  get _theme() {
    return this._config.theme;
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    const themes = ['Backend-selected', 'default'].concat(
      Object.keys(this.hass.themes.themes).sort(),
    );

    const entities = Object.keys(this.hass.states).filter(
      eid => eid.substr(0, eid.indexOf('.')) === 'github',
    );

    return html`
      ${themes}
      ${entities}
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }

    const { target } = ev;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }
}

customElements.define('github-card-editor', RokuCardEditor);
