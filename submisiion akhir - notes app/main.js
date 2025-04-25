import "./components/AppBar.js";
import "./components/PlaceholderNotes.js";
import "./components/PlaceholderArsip.js";
import "./components/FormItem.js";
import "./components/TitleIcon.js";
import "./src/styles/style.css";
import "./src/styles/responsive.css";
import Swal from "sweetalert2";
import { animate } from "animejs";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("notesForm");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // addNotes();
    createNotes();
    submitForm.reset(); // Mereset form setelah submit
  });

  getNotes();
  getArchivedNotes();
});

const array_notes = [];
const array_archived_notes = [];
const RENDER_EVENT = "render-program";
const baseUrl = "https://notes-api.dicoding.dev/v2/notes";

const loadingIndicator = document.querySelector(".loading");

function showLoading() {
  loadingIndicator.style.display = "block";
}

function hideLoading() {
  loadingIndicator.style.display = "none";
}

// async
async function withMinimumLoading(promise, minTime = 500) {
  showLoading();
  const start = Date.now();

  try {
    const result = await promise;
    const elapsed = Date.now() - start;

    const remainingTime = minTime - elapsed;
    if (remainingTime > 0) {
      await delay(remainingTime);
    }

    return result;
  } finally {
    hideLoading();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getNotes = async () => {
  try {
    const response = await withMinimumLoading(fetch(`${baseUrl}`));
    const responseJson = await response.json();

    if (responseJson.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada erorr!",
      });
    } else {
      array_notes.length = 0;
      array_notes.push(...responseJson.data);
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  } catch (err) {
    console.error("gagal mendapatkan data dari API:", err);
  } finally {
    hideLoading();
  }
};

const createNotes = async () => {
  const title = document.getElementById("judul").value;
  const body = document.getElementById("catatan").value;

  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menambahkan catatan!",
      });
    } else {
      getNotes();
      Swal.fire({
        icon: "success",
        title: "Catatan Disimpan!",
        text: `"${title}" berhasil ditambahkan.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  } catch (err) {
    console.error("Gagal membuat catatan:", err);
  }
};

const editNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mengambil catatan untuk diedit!",
      });

      return;
    }

    const note = responseJson.data;

    // Tampilkan ke form
    document.getElementById("judul").value = note.title;
    document.getElementById("catatan").value = note.body;

    const submitButton = document.querySelector("#notesForm button");
    submitButton.innerText = "Update Catatan";

    // Event listener
    const form = document.getElementById("notesForm");
    const newSubmitHandler = async function updateHandler(e) {
      e.preventDefault();

      const updatedTitle = document.getElementById("judul").value;
      const updatedBody = document.getElementById("catatan").value;

      // Hapus
      await deleteNote(id);

      // Buat
      await createNotes(updatedTitle, updatedBody);

      // Reset form
      form.reset();
      submitButton.innerText = "Tambah Catatan";

      // Hapus event listener edit agar tidak dobel
      form.removeEventListener("submit", updateHandler);
    };

    form.addEventListener("submit", newSubmitHandler);
  } catch (err) {
    console.error("Gagal mengedit catatan:", err);
  }
};

const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/archived`);
    const responseJson = await response.json();

    if (responseJson.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada Error!",
      });
    } else {
      array_archived_notes.length = 0;
      array_archived_notes.push(...responseJson.data);
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  } catch (err) {
    console.error("gagal mendapatkan data dari API:", err);
  }
};

const archiveNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}/archive`, {
      method: "POST",
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mengarsipkan catatan!",
      });
    } else {
      await getNotes();
      await getArchivedNotes();
    }
  } catch (err) {
    console.error("Gagal mengarsipkan:", err);
  }
};

const deleteNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus catatan!",
      });
    } else {
      await getNotes();
      await getArchivedNotes();
    }
  } catch (err) {
    console.error("Gagal menghapus:", err);
  }
};

const unarchieveNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memulihkan catatan!",
      });
    } else {
      await getNotes();
      await getArchivedNotes();
    }
  } catch (err) {
    console.error("Gagal meng-unarchive:", err);
  }
};

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
  const notesTitle = document.createElement("span");
  notesTitle.innerText = `Judul : ${object.title}`;

  const notesBody = document.createElement("p");
  notesBody.innerText = object.body;

  const notesDate = document.createElement("span");
  notesDate.classList.add("tanggal-note");
  notesDate.innerText = `Tanggal : ${object.createdAt}`;

  const notesBtnEdit = document.createElement("button");
  notesBtnEdit.classList.add("btn-edit");
  notesBtnEdit.innerText = "edit";

  const notesBtnArchieve = document.createElement("button");
  notesBtnArchieve.classList.add("btn-arsip");
  notesBtnArchieve.innerText = "arsipkan";

  const notesBtnDelete = document.createElement("button");
  notesBtnDelete.classList.add("btn-hapus");
  notesBtnDelete.innerText = "hapus";

  const footerContainer = document.createElement("div");
  footerContainer.classList.add("footer-notes");
  footerContainer.append(
    notesDate,
    notesBtnEdit,
    notesBtnArchieve,
    notesBtnDelete,
  );

  const containerNotes = document.createElement("div");
  containerNotes.classList.add("content-mynotes");
  containerNotes.append(notesTitle, notesBody, footerContainer);

  //   animejs
  // Animasi pergerakan elemen
  animate(containerNotes, {
    scale: 1,
    opacity: [0, 1],
    duration: 700,
    easing: "easeOutCubic",
  });

  // Hover masuk (ketika mouse masuk)
  containerNotes.addEventListener("mouseenter", () => {
    animate(containerNotes, {
      scale: 1.05,
      duration: 300,
      easing: "easeInOutQuad",
    });
  });

  // Hover keluar (ketika mouse keluar)
  containerNotes.addEventListener("mouseleave", () => {
    animate(containerNotes, {
      scale: 1,
      duration: 300,
      easing: "easeInOutQuad",
    });
  });

  notesBtnArchieve.addEventListener("click", () => {
    archiveNote(object.id);
  });

  notesBtnDelete.addEventListener("click", () => {
    deleteNote(object.id);
  });

  notesBtnEdit.addEventListener("click", () => {
    editNote(object.id);
  });

  if (object.archived === true) {
    notesBtnArchieve.remove();
    const notesBtnUnarchieve = document.createElement("button");
    notesBtnUnarchieve.classList.add("btn-pulih");
    notesBtnUnarchieve.innerText = "pulihkan";
    footerContainer.append(notesDate, notesBtnUnarchieve, notesBtnDelete);

    notesBody.style.display = "none";
    notesBtnEdit.style.display = "none";

    notesBtnUnarchieve.addEventListener("click", () => {
      unarchieveNote(object.id);
    });
  }

  return containerNotes;
}

document.addEventListener(RENDER_EVENT, function () {
  const notesContainer = document.querySelector(".container-content");
  const archieveContainer = document.querySelector(".container-archieve");

  notesContainer.innerHTML = "";
  archieveContainer.innerHTML = "";

  for (const list_notes of array_notes) {
    const newElement = makeNotes(list_notes);
    notesContainer.append(newElement);

    animate(newElement, {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 400,
      easing: "easeOutExpo",
    });
  }

  for (const list_archived of array_archived_notes) {
    const newElement = makeNotes(list_archived);
    archieveContainer.append(newElement);
  }
});
