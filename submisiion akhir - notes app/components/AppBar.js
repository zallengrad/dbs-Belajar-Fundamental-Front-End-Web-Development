class AppBar extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: 'open' });

    this._srcImg = this.getAttribute("src-img");
    this._altImg = this.getAttribute("alt-img");

    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="logo">
          <img src="${this._srcImg}" alt="${this._altImg}" width="230px" />
        </div>
        `;
  }
}

customElements.define("app-bar", AppBar);
