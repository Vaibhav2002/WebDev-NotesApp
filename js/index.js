function getNote(note) {
    return `<div id = "${note.id}" class = "div__note">
                <h3 class = "note__title" >${note.title}</h3>
                <p class = "note__body" >${note.body}</p>
            </div>`
}

var notes = [...Array(10).keys()].map(
    (i) => {
        return {
            id: i,
            title: `Title ${i}`,
            body: `This is a test note ${i}`
        }
    }
)

var notesContainer = document.getElementById("notesContainer")

notes.forEach(
    (note)=>{
        notesContainer.innerHTML+=getNote(note)+"\n"
    }
)