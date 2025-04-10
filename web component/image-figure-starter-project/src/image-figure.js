class ImageFigure extends HTMLElement {
    constructor() {
        super();

        // Ambil atribut terlebih dahulu
        this._srcImg = this.getAttribute('src-img');
        this._altImg = this.getAttribute('alt-img');
        this._caption = this.getAttribute('caption');

        // Panggil render setelah atribut diambil
        this.render();
    }

    render() {
        this.innerHTML = `
            <figure>
                <img src="${this._srcImg}" alt="${this._altImg}" width="200" />
                <figcaption>${this._caption}</figcaption>
            </figure>
        `;
    }
}

customElements.define('image-figure', ImageFigure);
