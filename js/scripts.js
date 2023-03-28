let notes = [];

if(localStorage.notes){
    notes = JSON.parse(localStorage.notes);
    refreshList();
}

document.getElementById("btn-new").addEventListener("click", () => {
    addNote();
});

document.getElementById("new-note").addEventListener("keypress", (event) => {
    if(event.code === "Enter"){
        addNote();
    }
});

function addNote(){
    if(document.getElementById("new-note").value != ""){
        notes.push({
            note: document.getElementById("new-note").value,
            done: false
        });
        localStorage.notes = JSON.stringify(notes);
        refreshList();
    }
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

        document.getElementById("new-note").value = "";

        completeButton.addEventListener("click", function(){
            if(notes[noteIndex].done)
                notes[noteIndex].done = false;
            else
            notes[noteIndex].done = true;

            localStorage.notes = JSON.stringify(notes);
            refreshList();
        });

        removeButton.addEventListener("click", function(){
            notes.splice(this.parentNode.parentNode.id, 1);

            localStorage.notes = JSON.stringify(notes);
            refreshList();
        });
    }
}