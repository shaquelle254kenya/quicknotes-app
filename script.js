const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const MAX_CHARS = 200;
const STORAGE_KEY = "quicknotes";

let notes = loadNotes();

// Load notes from localStorage (empty array if nothing saved or data is broken)
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Show the right count message
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Remove one note by its id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Return only the notes that match the search words (not case-sensitive)
function getVisibleNotes() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") {
    return notes;
  }
  const words = query.split(/\s+/);
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

// Rebuild the whole list from the notes array
function render() {
  notesList.replaceChildren();

  const visibleNotes = getVisibleNotes();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No notes match your search.";
    notesList.append(empty);
  }

  for (const note of visibleNotes) {
    const li = document.createElement("li");
    li.classList.add("note", "category-" + note.category);

    const text = document.createElement("p");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("meta");

    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = " · " + note.createdAt;

    meta.append(label, date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.append(text, meta, deleteBtn);
    notesList.append(li);
  }

  updateCount();
}

// Add a new note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > MAX_CHARS) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  noteInput.value = "";
  const clearAllBtn = document.querySelector("#clear-all");

clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
  render();
});

// Filter the list as the user types in the search box
searchInput.addEventListener("input", render);

render();
