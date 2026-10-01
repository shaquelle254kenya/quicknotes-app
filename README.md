# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and JavaScript. You can write short notes, sort them into Personal, Work or Study categories, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Validation: empty notes and notes over 200 characters show an error message
- Delete any note with its own Delete button
- Live search that filters notes as you type (not case-sensitive)
- Note counter: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes saved with localStorage, so they survive a page refresh
- Colour-coded note cards for each category
- Responsive layout that stacks the form on small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/shaquelle254kenya/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or just double-click `index.html` to open it in your browser.

No installation is needed.

## What I learned

- How to build a page with semantic HTML (header, main, section, footer) and link labels to inputs using `for` and `id`.
- How to rebuild a list from an array with a `render()` function, using `createElement` and `textContent` instead of `innerHTML` to keep user text safe.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How to use Flexbox for the form layout and a media query to make it work on small screens.
- How to commit small, clear changes to Git, one feature at a time.
