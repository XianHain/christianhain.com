class XianEmail extends HTMLElement {
  constructor() {
    super();
    this.unreadCount = Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000;
    this.attachShadow({ mode: 'open' });
  }

  _injectLightDomStyles() {
    const styleId = 'xian-email-light-dom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        xian-email a,
        xian-email a:hover {
          color: var(--white) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  _setupCountIncrement() {
    const pip = this.shadowRoot.querySelector('.email-header__unread-count');
    if (pip) {
      pip.addEventListener('animationiteration', () => {
        const increment = Math.floor(Math.random() * 10) + 1;
        this.unreadCount += increment;
        pip.textContent = `(${this.unreadCount.toLocaleString()})`;
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          border: .0625em solid hsla(0, 0%, 0%, .05);
          border-bottom-color: hsla(0, 0%, 0%, .07);
          border-top-color: hsla(0, 0%, 100%, .25);
          
          background: light-dark(var(--white-shadow), var(--black));
          border-radius: .125em;
          box-shadow: 0 .125em 1em hsla(0, 0%, 0%, .04);
          color: light-dark(var(--blue-ink), var(--white));
          display: block;
          font-family: var(--monolisa), monospace;
          margin: 1em auto;
          padding: 1em;
        }

        .email-header {
          align-items: center;
          border-bottom: .0625rem solid light-dark(hsla(0, 0%, 0%, .05), hsla(0, 0%, 100%, .1));
          display: flex;
          font-size: 1em;
          inline-size: 100%;
          padding-bottom: 0.5em;
        }
        
        @keyframes blink {
          0%, 95% {
            opacity: 1;
          }
          96%, 100% {
            opacity: 0;
          }
        }

        .email-header__unread-count {
          animation: blink 5s step-start infinite;
          color: var(--pink-bright);
          font-weight: bold;
          margin: 0 0 0 1ch;
        }

        .email-content {
          display: flex;
          flex-direction: column;
          gap: 1em;
          margin: 1em auto 0;
          max-inline-size: 80ch;
        }

        ::slotted(*) {
          color: inherit;
          font-size: 1em !important;
          margin-bottom: 0 !important;
          margin-top: 0 !important;
          max-inline-size: 100%;
        }
      </style>
      <div class="email-header">
        <span>Unread:</span>
        <span class="email-header__unread-count">
          (${this.unreadCount.toLocaleString()})
        </span>
      </div>
      <div class="email-content">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this._setupCountIncrement();
    this._injectLightDomStyles();
  }
}

if ('customElements' in window) {
  customElements.define('xian-email', XianEmail);
}
