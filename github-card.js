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
      show_extended: true,
      ...config
    };
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    const baseSize = 3.5;
    const reposSize = this.config.entites * (this.config.show_extended ? 2 : 1);
    return Math.round(baseSize * reposSize);
  }

  static get styles() {
    return html`
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

        .github-card__body .name .property {
          display:flex;
          font-size: 1.1em;
          cursor: pointer;
        }

        .github-card__body .issue-name {
          padding-left: 5px;
        	padding-top: 2px;
        }

        .github-card__body .links {
          display:flex;
          justify-content: space-evenly;
          padding-left: 5px;
        }
        
        .github-card__body .links .property {
          display:flex;
          flex-direction: column;
        }

        .github-card__body .links .property .hidden {
          display:none;
        }

        .github-card__body .links .property > span {
          padding-bottom: 5px;
        }
        
        .github-card__body .property > span {
          padding-right: 10px;
          cursor: pointer;
        }

        .github-card__body ha-icon {
          color: var(--primary-color);
          font-size: 1.2em;
        }
    `;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {

    const github = this.issues.map(issue => {
      return html`
        <div class='issue'>
          <div class="name">
            <span class='property' @click=${e => this.openLink(`${issue.attributes.path}`)}  title='Open repository'>
              <ha-icon icon="${issue.attributes.icon}"></ha-icon>
              <span class='issue-name'>${issue.attributes.path}</span>
            </span>
          </div>

          <div></div>

          <div class="links">
            <div class='property'>
              <span @click=${e => this.openLink(`${issue.attributes.path}/issues`)} title='Open issues'>
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>${issue.attributes.open_issues}</span>
              </span>
              <span 
              	class='${this.config.show_extended ? '' : 'hidden'}' 
              	@click=${e => this.openLink(`${issue.attributes.path}/releases`)} 
              	title='Open releases'
              >
                <ha-icon icon="mdi:tag-outline"></ha-icon>
              </span>
            </div>

            <div class='property'>
              <span @click=${e => this.openLink(`${issue.attributes.path}/pulls`)} title='Open pulls'>
                <ha-icon icon="mdi:source-pull"></ha-icon>
                <span>${issue.attributes.open_pull_requests}</span>
              </span>
              <span 
              	class='${this.config.show_extended ? '' : 'hidden'}' 
              	@click=${e => this.openLink(`${issue.attributes.path}/network/members`)} 
              	title='Open forks'
              >
                <ha-icon icon="mdi:source-fork"></ha-icon>
              </span>
            </div>

            <div class='property'>
              <span @click=${e => this.openLink(`${issue.attributes.path}/stargazers`)} title='Open stargazers'>
                <ha-icon icon="mdi:star"></ha-icon>
                <span>${issue.attributes.stargazers}</span>
              </span>
              <span 
              	class='${this.config.show_extended ? '' : 'hidden'}' 
              	@click=${e => this.openLink(`${issue.attributes.path}/commits`)} 
              	title='Open commits'
              >
                <ha-icon icon="mdi:clock-outline"></ha-icon>
              </span>
            </div>

          </div>
        </div>
      `;
    });

    return html`
      <ha-card class='github-card'>
        <style>${GithubCard.styles}</style>
        <div class='header'>
          ${this.config.title}
        </div>
        <div class='github-card__body'>
          ${github}
        </div>
      </ha-card>
    `;
  }

  /**
   * open a link in github
   * @param {string} link 
   */
  openLink(link) {
    window.open(`${this.githubBaseUrl}/${link}`);
  }

  /**
   * get amtching issue sensors
   */
  get issues(){
    return this.config.entities
      .map(entity => this.hass.states[entity])
      .filter(issue => issue);
  }
}

customElements.define('github-card', GithubCard);