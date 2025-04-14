class NotesSection extends HTMLElement {
    constructor() {
        super()


        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="content-mynotes" style="color: gray">
        your notes...
        </div>
        `
    }
}

customElements.define('notes-section', NotesSection);
