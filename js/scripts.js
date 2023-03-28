// UI Handles

const noteInputHandle = document.getElementById("new-note");

// Core Variables

let notes = [];

// Core Logic

function saveNotes(){
    localStorage.notes = JSON.stringify(notes);
}

function refreshList(){
    document.getElementById("note-list").innerHTML = "";

    for(let noteIndex in notes){
        let noteText = notes[noteIndex].note;

        let newNote = document.createElement("li");        
        let noteContent = document.createElement("span");
        let buttonWrapper = document.createElement("div");
        let completeButton = document.createElement("span");        
        let removeButton = document.createElement("span");

        newNote.classList.add("note");
        newNote.setAttribute("id", noteIndex);
        noteContent.innerText = noteText;
        if(notes[noteIndex].done){
            noteContent.style.textDecoration = "line-through";
            completeButton.style.backgroundColor = "yellow";
        }
        else
        completeButton.style.backgroundColor = "lightgreen";
        completeButton.classList.add("btn");
        completeButton.innerText = "✔";
        removeButton.classList.add("btn");
        removeButton.innerText = "x";

        newNote.appendChild(noteContent);
        buttonWrapper.appendChild(completeButton);
        buttonWrapper.appendChild(removeButton);
        newNote.appendChild(buttonWrapper);
        document.getElementById("note-list").appendChild(newNote);

        noteInputHandle.value = "";

        completeButton.addEventListener("click", function(){
            changeNoteState(noteIndex);
        });

        removeButton.addEventListener("click", function(){
            rewmoveNote(this);
        });
    }
}

function addNote(){
    if(noteInputHandle.value != ""){
        notes.push({
            note: noteInputHandle.value,
            done: false
        });
        
        saveNotes();
        refreshList();
    }
}

function changeNoteState(noteID){
    if(notes[noteID].done)
        notes[noteID].done = false;
    else
    notes[noteID].done = true;

    saveNotes();
    refreshList();
}

function rewmoveNote(pressedItem){
    notes.splice(pressedItem.parentNode.parentNode.id, 1);

    saveNotes();
    refreshList();
}

// Event Listeners

if(localStorage.notes){
    notes = JSON.parse(localStorage.notes);
    refreshList();
}

document.getElementById("btn-new").addEventListener("click", () => {
    addNote();
});

noteInputHandle.addEventListener("keypress", (event) => {
    if(event.code === "Enter"){
        addNote();
    }
});