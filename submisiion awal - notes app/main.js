import './components/AppBar.js';
import './components/PlaceholderNotes.js';
import './components/PlaceholderArsip.js';
import './components/FormItem.js';
import './components/TitleIcon.js';
import notesData from './notes.js';

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('notesForm');
    submitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNotes();
        submitForm.reset(); // Mereset form setelah submit
    });

    document.dispatchEvent(new Event(RENDER_EVENT)); // Menampilkan data dumi saat halaman dimuat
});

const array_notes = [...notesData]; // Menggunakan data dari notes.js
const RENDER_EVENT = 'render-program';

function addNotes() {
    const title = document.getElementById('judul').value;
    const body = document.getElementById('catatan').value;
    const archived = false;
    const createdAt = dateTime();
    const id = generateId();

    const object = generateObject(id, title, body, createdAt, archived);
    array_notes.push(object);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return Math.floor(Math.random() * 1000000) + Date.now();
}

function dateTime() {
    const now = new Date();
    return now.toLocaleString();
}

function generateObject(id, title, body, createdAt, archived) {
    return { id, title, body, createdAt, archived };
}

function makeNotes(object) {
    const notesTitle = document.createElement('span');
    notesTitle.innerText = `Judul : ${object.title}`;

    const notesBody = document.createElement('p');
    notesBody.innerText = object.body;

    const notesDate = document.createElement('span');
    notesDate.classList.add('tanggal-note');
    notesDate.innerText = `Tanggal : ${object.createdAt}`;

    const notesBtnArchieve = document.createElement('button');
    notesBtnArchieve.classList.add('btn-arsip');
    notesBtnArchieve.innerText = 'arsipkan';

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('footer-notes');
    footerContainer.append(notesDate, notesBtnArchieve);

    const containerNotes = document.createElement('div');
    containerNotes.classList.add('content-mynotes');
    containerNotes.append(notesTitle, notesBody, footerContainer);

    notesBtnArchieve.addEventListener('click', () => {
        archiveNote(object.id);
    });

    if (object.archived === true) {
        notesBtnArchieve.remove();
        notesBody.style.display = 'none'; 
    }

    return containerNotes;
}

function archiveNote(id) {
    const noteTarget = array_notes.find(note => note.id === id);
    
    if (noteTarget) {
        noteTarget.archived = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

document.addEventListener(RENDER_EVENT, function() {
    const notesContainer = document.querySelector('.container-content');
    const archieveContainer = document.querySelector('.container-archieve');

    notesContainer.innerHTML = ''; 
    archieveContainer.innerHTML = '';

    const placeholderNotes = document.querySelector('notes-section');
    const placeholderArsip = document.querySelector('archieve-section');
    
    if (array_notes.length > 0) {
        if (placeholderNotes) placeholderNotes.remove();
        if (placeholderArsip) placeholderArsip.remove();
    }

    for (const list_notes of array_notes) {
        const newElement = makeNotes(list_notes);
        if (!list_notes.archived) {
            notesContainer.append(newElement);
        } else {
            archieveContainer.append(newElement);
        }
    }
});
