var LitElement = LitElement || Object.getPrototypeOf(customElements.get("hui-error-entity-row"));
var html = LitElement.prototype.html;

class GithubCard extends LitElement {

  static get properties() {
    return {
      hass: Object,
      config: Object,
    };
  }

  constructor() {
    super();

    this.githubBaseUrl = `https://github.com`;
  }

  setConfig(config) {
    if (!config.entities) throw Error(`entities required.`);

    this.config = {
      title: 'Github',
      ...config
    };
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    return 2;
  }

  static get styles() {
    return html`
        ha-card {
          display: flex;
          padding: 0 16px 4px;
          flex-direction: column;
        }

        .header {
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

        table {
          border-spacing: 0;
          margin-bottom: 10px;
          margin-top: 10px;
          display: flex;
        }

        .issue td {
          padding-top: 5px;
          padding-bottom: 5px;
        }
        
        .issue .overview > span {
          padding-right: 5px;
          cursor: pointer;
        }

        .issue .overview ha-icon {
          width: 1.2em;
          color: var(--primary-color);
        }
    `;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {
    console.log(this.issues);

    const github = this.issues.map(issue => {
      return html`
        <tr class='issue'>
          <td class="overview name">
            <span @click=${e => this.openLink(`${issue.attributes.path}`)}  title='Open repository'>
              <ha-icon icon="${issue.attributes.icon}"></ha-icon>
              ${issue.attributes.path}
            </span>
          </td>

          <td class="overview">
            <span @click=${e => this.openLink(`${issue.attributes.path}/issues`)} title='Open issues'>
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <span>${issue.attributes.open_issues}</span>
            </span>

            <span @click=${e => this.openLink(`${issue.attributes.path}/pulls`)} title='Open pulls'>
              <ha-icon icon="mdi:source-pull"></ha-icon>
              <span>${issue.attributes.open_pull_requests}</span>
            </span>

            <span @click=${e => this.openLink(`${issue.attributes.path}/stargazers`)} title='Open stargazers'>
              <ha-icon icon="mdi:star"></ha-icon>
              <span>${issue.attributes.stargazers}</span>
            </span>

            <span @click=${e => this.openLink(`${issue.attributes.path}/releases`)} title='Open releases'>
              <ha-icon icon="mdi:tag-outline"></ha-icon>
            </span>

            <span @click=${e => this.openLink(`${issue.attributes.path}/network/members`)} title='Open forks'>
              <ha-icon icon="mdi:source-fork"></ha-icon>
            </span>

            <span @click=${e => this.openLink(`${issue.attributes.path}/commits`)} title='Open commits'>
              <ha-icon icon="mdi:clock-outline"></ha-icon>
            </span>
          </td>
        </tr>
      `;
    });

    return html`
      <ha-card>
        <style>${GithubCard.styles}</style>
        <div class='header'>
          ${this.config.title}
        </div>
        <table>
          <tbody>
            ${github}
          </tbody>
        </table>
      </ha-card>
    `;
  }

  openLink(link) {
    window.open(`${this.githubBaseUrl}/${link}`);
  }

  get issues(){
    return this.config.entities.map(entity => this.hass.states[entity])
  }

  createHeader() {
    return html`

    `;
  }
}

customElements.define('github-card', GithubCard);