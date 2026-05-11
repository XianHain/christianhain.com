class XianPolaroid extends HTMLElement {
  constructor() {
    super();
  }

  _injectStyles() {
    const styleId = 'xian-polaroid-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        xian-polaroid {
          background: var(--white-shadow);
          border-bottom-color: hsl(0, 0%, 80%);
          border-radius: .25em;
          border-top-color: hsl(0, 0%, 100%);
          border: .0625em solid hsl(0, 0%, 90%);
          box-shadow: 0 .125em .125em hsla(0, 0%, 0%, .05);
          display: block;
          inline-size: fit-content;
          max-inline-size: 100%;
          margin: 1em auto;
          padding: .5em;
          rotate: var(--xian-polaroid-rotation, 0deg);
          transition: rotate .5s ease-out;
        }
        xian-polaroid:hover {
          rotate: 0deg;
        }
        
        xian-polaroid figure {
          margin: 0;
        }
        
        xian-polaroid figure > iframe {
          background: hsl(0, 0%, 0%);
          border: 0;
          display: block;
          width: 100%;
        }

        xian-polaroid figcaption {
          color: hsla(0, 0%, 0%, .7);
          font-family: var(--monolisa), monospace;
          font-size: .75em;
          margin: .5em 0 0;
          text-align: center;
        }
        
        xian-polaroid a {
          color: var(--blue-ink);
        }
        
        xian-polaroid a:focus,
        xian-polaroid a:hover {
          color: var(--pink-bright);
        }
      `;
      document.head.appendChild(style);
    }
  }

  _setRandomRotation() {
    const rotation = (Math.random() * 4 - 2).toFixed(2);
    this.style.setProperty('--xian-polaroid-rotation', `${rotation}deg`);
  }

  connectedCallback() {
    if (!this.querySelector('figure')) {
      console.warn(
        'xian-polaroid: No child <figure> element found. This component requires a <figure> to apply polaroid styling correctly.',
        this
      );
    }

    this._injectStyles();
    this.style.setProperty('--xian-polaroid-rotation', '0deg');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                this._setRandomRotation();
              });
            });
            observer.unobserve(this);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this);
  }
}

if ('customElements' in window) {
  customElements.define('xian-polaroid', XianPolaroid);
}
