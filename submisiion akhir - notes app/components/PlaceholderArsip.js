class ArsipSection extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
                <div class="content-mynotes" style="color: gray">your archieve...</div>
        `;
  }
}

customElements.define("archieve-section", ArsipSection);
