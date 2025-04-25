(() => {
  var e = {
      142: () => {
        class e extends HTMLElement {
          constructor() {
            super(), this.render();
          }
          render() {
            this.innerHTML =
              '\n                <div class="content-mynotes" style="color: gray">your archieve...</div>\n        ';
          }
        }
        customElements.define("archieve-section", e);
      },
      497: () => {
        class e extends HTMLElement {
          constructor() {
            super(), this.render();
          }
          static get observedAttributes() {
            return ["submit-text", "rows", "cols"];
          }
          attributeChangedCallback() {
            this.render();
          }
          render() {
            const e = this.getAttribute("submit-text") || "Tambah Catatan",
              t = this.getAttribute("rows") || "15",
              n = this.getAttribute("cols") || "30";
            this.innerHTML = `\n            <form id="notesForm">\n                <div class="form-group">\n                    <label for="name">Judul</label>\n                    <input type="text" id="judul" name="name" placeholder="Masukkan judul disini..." required minlength="5" autocomplete="off" aria-describedby="nameValidation" />\n                    <p id="nameValidation" class="validation-message"></p>\n                </div>\n\n                <div class="form-group">\n                    <label for="name">Tulis Catatan</label>\n                    <textarea id="catatan" name="komentar" rows="${t}" cols="${n}" placeholder="Masukkan catatan disini..."></textarea>\n                </div>\n\n                <div class="form-group">\n                    <button class="btn">${e}</button>\n                </div>\n            </form>\n\n            <div id="notes-container"></div>\n        `;
          }
        }
        customElements.define("form-item", e);
      },
      664: () => {
        class e extends HTMLElement {
          constructor() {
            super(),
              (this._srcImg = this.getAttribute("src-img")),
              (this._altImg = this.getAttribute("alt-img")),
              this.render();
          }
          render() {
            this.innerHTML = `\n            <div class="logo">\n          <img src="${this._srcImg}" alt="${this._altImg}" width="230px" />\n        </div>\n        `;
          }
        }
        customElements.define("app-bar", e);
      },
      746: () => {
        class e extends HTMLElement {
          constructor() {
            super(), this.render();
          }
          render() {
            this.innerHTML =
              '\n        <div class="content-mynotes" style="color: gray">\n        your notes...\n        </div>\n        ';
          }
        }
        customElements.define("notes-section", e);
      },
      945: () => {
        class e extends HTMLElement {
          constructor() {
            super(), this.render();
          }
          static get observedAttributes() {
            return ["icon", "text"];
          }
          attributeChangedCallback() {
            this.render();
          }
          render() {
            const e = this.getAttribute("icon") || "fa-note-sticky",
              t = this.getAttribute("text") || "My Notes";
            this.innerHTML = `\n            <div class="title-side">\n                <i class="fa-solid ${e}"></i>\n                <div class="mynotes">${t}</div>\n            </div>\n        `;
          }
        }
        customElements.define("title-icon", e);
      },
    },
    t = {};
  function n(o) {
    var i = t[o];
    if (void 0 !== i) return i.exports;
    var a = (t[o] = { exports: {} });
    return e[o](a, a.exports, n), a.exports;
  }
  (() => {
    "use strict";
    n(664), n(746), n(142), n(497), n(945);
    const e = [
      {
        id: "notes-jT-jjsyz61J8XKiI",
        title: "Welcome to Notes, Dimas!",
        body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
        createdAt: "2022-07-28T10:03:12.594Z",
        archived: !1,
      },
      {
        id: "notes-aB-cdefg12345",
        title: "Meeting Agenda",
        body: "Discuss project updates and assign tasks for the upcoming week.",
        createdAt: "2022-08-05T15:30:00.000Z",
        archived: !1,
      },
      {
        id: "notes-XyZ-789012345",
        title: "Shopping List",
        body: "Milk, eggs, bread, fruits, and vegetables.",
        createdAt: "2022-08-10T08:45:23.120Z",
        archived: !1,
      },
      {
        id: "notes-1a-2b3c4d5e6f",
        title: "Personal Goals",
        body: "Read two books per month, exercise three times a week, learn a new language.",
        createdAt: "2022-08-15T18:12:55.789Z",
        archived: !1,
      },
      {
        id: "notes-LMN-456789",
        title: "Recipe: Spaghetti Bolognese",
        body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
        createdAt: "2022-08-20T12:30:40.200Z",
        archived: !1,
      },
      {
        id: "notes-QwErTyUiOp",
        title: "Workout Routine",
        body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
        createdAt: "2022-08-25T09:15:17.890Z",
        archived: !1,
      },
      {
        id: "notes-abcdef-987654",
        title: "Book Recommendations",
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: "2022-09-01T14:20:05.321Z",
        archived: !1,
      },
      {
        id: "notes-zyxwv-54321",
        title: "Daily Reflections",
        body: "Write down three positive things that happened today and one thing to improve tomorrow.",
        createdAt: "2022-09-07T20:40:30.150Z",
        archived: !1,
      },
      {
        id: "notes-poiuyt-987654",
        title: "Travel Bucket List",
        body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
        createdAt: "2022-09-15T11:55:44.678Z",
        archived: !1,
      },
      {
        id: "notes-asdfgh-123456",
        title: "Coding Projects",
        body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
        createdAt: "2022-09-20T17:10:12.987Z",
        archived: !1,
      },
      {
        id: "notes-5678-abcd-efgh",
        title: "Project Deadline",
        body: "Complete project tasks by the deadline on October 1st.",
        createdAt: "2022-09-28T14:00:00.000Z",
        archived: !1,
      },
      {
        id: "notes-9876-wxyz-1234",
        title: "Health Checkup",
        body: "Schedule a routine health checkup with the doctor.",
        createdAt: "2022-10-05T09:30:45.600Z",
        archived: !1,
      },
      {
        id: "notes-qwerty-8765-4321",
        title: "Financial Goals",
        body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
        createdAt: "2022-10-12T12:15:30.890Z",
        archived: !1,
      },
      {
        id: "notes-98765-54321-12345",
        title: "Holiday Plans",
        body: "Research and plan for the upcoming holiday destination.",
        createdAt: "2022-10-20T16:45:00.000Z",
        archived: !1,
      },
      {
        id: "notes-1234-abcd-5678",
        title: "Language Learning",
        body: "Practice Spanish vocabulary for 30 minutes every day.",
        createdAt: "2022-10-28T08:00:20.120Z",
        archived: !1,
      },
    ];
    console.log(e);
    const t = e;
    document.addEventListener("DOMContentLoaded", function () {
      const e = document.getElementById("notesForm");
      e.addEventListener("submit", function (t) {
        t.preventDefault(),
          (function () {
            const e = document.getElementById("judul").value,
              t = document.getElementById("catatan").value,
              n = new Date().toLocaleString(),
              a = (function (e, t, n, o) {
                return {
                  id: e,
                  title: t,
                  body: n,
                  createdAt: o,
                  archived: false,
                };
              })(Math.floor(1e6 * Math.random()) + Date.now(), e, t, n);
            o.push(a), document.dispatchEvent(new Event(i));
          })(),
          e.reset();
      }),
        document.dispatchEvent(new Event(i));
    });
    const o = [...t],
      i = "render-program";
    function a(e) {
      const t = document.createElement("span");
      t.innerText = `Judul : ${e.title}`;
      const n = document.createElement("p");
      n.innerText = e.body;
      const a = document.createElement("span");
      a.classList.add("tanggal-note"),
        (a.innerText = `Tanggal : ${e.createdAt}`);
      const r = document.createElement("button");
      r.classList.add("btn-arsip"), (r.innerText = "arsipkan");
      const s = document.createElement("div");
      s.classList.add("footer-notes"), s.append(a, r);
      const d = document.createElement("div");
      return (
        d.classList.add("content-mynotes"),
        d.append(t, n, s),
        r.addEventListener("click", () => {
          !(function (e) {
            const t = o.find((t) => t.id === e);
            t && ((t.archived = !0), document.dispatchEvent(new Event(i)));
          })(e.id);
        }),
        !0 === e.archived && (r.remove(), (n.style.display = "none")),
        d
      );
    }
    document.addEventListener(i, function () {
      const e = document.querySelector(".container-content"),
        t = document.querySelector(".container-archieve");
      (e.innerHTML = ""), (t.innerHTML = "");
      const n = document.querySelector("notes-section"),
        i = document.querySelector("archieve-section");
      o.length > 0 && (n && n.remove(), i && i.remove());
      for (const n of o) {
        const o = a(n);
        n.archived ? t.append(o) : e.append(o);
      }
    });
  })();
})();
