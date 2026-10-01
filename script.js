const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_CHARS = 200;

let notes = [];

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
  render();
}

// Rebuild the whole list from the notes array
function render() {
  notesList.replaceChildren();

  for (const note of notes) {
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
  noteInput.value = "";
  render();
});

render();
