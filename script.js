const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Přidání poznámky
addBtn.addEventListener("click", addNote);

function addNote(noteText = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="fas fa-save"></i>
        <i class="fas fa-trash"></i>
    </div>
    <textarea>${noteText}</textarea>
    `;

    const save = note.querySelector(".fa-save");
    const trash = note.querySelector(".fa-trash");
    const textarea = note.querySelector("textarea");

    // Uložení poznámky
    save.addEventListener("click", saveNotes);

    // Odstranění poznámky
    trash.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    // Automatické ukládání při změně textu
    textarea.addEventListener("input", saveNotes);

    main.appendChild(note);
}

// Uložení všech poznámek do localStorage
function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

// Načtení poznámek z localStorage
function loadNotes() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    if (lsNotes) {
        lsNotes.forEach(noteText => {
            addNote(noteText);
        });
    } else {
        addNote(); // Přidá prázdnou poznámku, pokud není nic uložené
    }
}

// Načtení poznámek při načtení stránky
loadNotes();
