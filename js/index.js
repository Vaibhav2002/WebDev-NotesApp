var notes = []
var notesContainer = document.getElementById("notesContainer")
var fab = document.getElementById("btnFab")
var modal = document.getElementById("createNoteModal")

populateSavedNotes()

function populateSavedNotes() {
    notes = getSavedNotes().sort((n1, n2) => n1.noteId - n2.noteId)
    notesContainer.innerHTML = ""
    notes.forEach(
        (note) => renderNote(note)
    )
}

function getNote(note) {
    return `<div id = "${note.noteId}" onClick = "onNoteClicked(${note.noteId})" class = "div__note">
                <h3 class = "note__title" >${note.title}</h3>
                <p class = "note__body" >${note.body}</p>
            </div>`
}

function createNoteFromId(i) {
    return {
        noteId: i,
        title: ``,
        body: ``
    }
}

function createNewNote() {
    var id = 0
    if (notes.length == 0) id = 0;
    else id = notes[notes.length - 1].noteId + 1
    var newNode = createNoteFromId(id)
    return newNode
}

function addNewNote(note) {
    var index = notes.findIndex((n) => n.noteId === note.noteId )
    if (index == -1) notes.push(note)
    else notes[index] = note
    console.log(note.noteId)
    reSaveAllNotesLocally()
}

function renderNote(note) {
    notesContainer.innerHTML += getNote(note) + "\n"
}

function reSaveAllNotesLocally() {
    window.localStorage.setItem("notes", JSON.stringify(notes))
    populateSavedNotes()
}

function getSavedNotes() {
    var notes = JSON.parse(window.localStorage.getItem("notes"))
    return (notes == null) ? [] : notes
}

var openedNote = null

function openModal(note) {
    openedNote = note
    document.getElementById("noteTitle").value = note.title
    document.getElementById("noteContent").value = note.body
    modal.style.display = "block"
}

function closeModal() {
    modal.style.display = "none"
    openedNote = null
}

fab.addEventListener('click', () => {
    openModal(createNewNote())
})

document.getElementById("saveNoteBtn").addEventListener(`click`, onSaveBtnPressed)

window.onclick = function (event) {
    if (event.target == modal)
        closeModal()
}

function onNoteClicked(noteId) {
    var note = notes.find((n) => n.noteId === noteId)
    openModal(note)
}

function onSaveBtnPressed() {
    title = document.getElementById("noteTitle").value.trim()
    content = document.getElementById("noteContent").value.trim()
    if (title.length === 0 || content.length === 0)
        alert("Values cannot be empty")
    else {
        openedNote.title = title
        openedNote.body = content
        addNewNote(openedNote)
        closeModal()
    }
}