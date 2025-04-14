class FormItem extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    static get observedAttributes() {
        return ['submit-text', 'rows', 'cols']; // Atribut yang dipantau
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const submitText = this.getAttribute('submit-text') || 'Tambah Catatan'; 
        const rows = this.getAttribute('rows') || '15'; 
        const cols = this.getAttribute('cols') || '30'; 

        this.innerHTML = `
            <form id="notesForm">
                <div class="form-group">
                    <label for="name">Judul</label>
                    <input type="text" id="judul" name="name" placeholder="Masukkan judul disini..." required minlength="5" autocomplete="off" aria-describedby="nameValidation" />
                    <p id="nameValidation" class="validation-message"></p>
                </div>

                <div class="form-group">
                    <label for="name">Tulis Catatan</label>
                    <textarea id="catatan" name="komentar" rows="${rows}" cols="${cols}" placeholder="Masukkan catatan disini..."></textarea>
                </div>

                <div class="form-group">
                    <button class="btn">${submitText}</button>
                </div>
            </form>

            <div id="notes-container"></div>
        `;
    }
}

customElements.define('form-item', FormItem);
