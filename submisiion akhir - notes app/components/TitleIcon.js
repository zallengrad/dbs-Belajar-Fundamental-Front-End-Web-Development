class TitleIcon extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["icon", "text"]; // Atribut yang dipantau perubahan
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const icon = this.getAttribute("icon") || "fa-note-sticky"; // Default icon
    const text = this.getAttribute("text") || "My Notes"; // Default text

    this.innerHTML = `
            <div class="title-side">
                <i class="fa-solid ${icon}"></i>
                <div class="mynotes">${text}</div>
            </div>
        `;
  }
}

customElements.define("title-icon", TitleIcon);
