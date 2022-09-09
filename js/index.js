var notes = []
var notesContainer = document.getElementById("notesContainer")
var fab = document.getElementById("btnFab")

populateSavedNotes()

function populateSavedNotes(){
    notes = getSavedNotes()
    notes.forEach(
        (note) => renderNote(note)
    )
}

function getNote(note) {
    return `<div id = "${note.noteId}" class = "div__note">
                <h3 class = "note__title" >${note.title}</h3>
                <p class = "note__body" >${note.body}</p>
            </div>`
}

function createNoteFromId(i){
    return {
        noteId: i,
        title: `Title ${i}`,
        body: `This is a test note ${i}`
    }
}

function createRandomNote(){
    var randNum = Math.round(Math.random()*10)
    var newNode = createNoteFromId(randNum)
    console.log(newNode)
    addNewNote(newNode)
}

function addNewNote(note){
    notes.push(note)
    console.log(notes.length)
    reSaveAllNotesLocally()
    renderNote(note)
}

function renderNote(note){
    notesContainer.innerHTML+=getNote(note)+"\n"
}

function reSaveAllNotesLocally(){
    window.localStorage.setItem("notes", JSON.stringify(notes))
}

function getSavedNotes(){
    return JSON.parse(window.localStorage.getItem("notes"))
}

fab.addEventListener('click', createRandomNote)