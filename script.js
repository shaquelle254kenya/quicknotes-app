const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

// Rebuild the whole list from the notes array
function render() {
  notesList.innerHTML = "";

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

    li.append(text, meta, deleteBtn);
    notesList.append(li);
  }
}

// Add a new note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = "";
  render();
});

render();
