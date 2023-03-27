let notes = [];

document.getElementById("btn-new").addEventListener("click", () => {
    let newIndex;

    if(document.getElementById("new-note").value != ""){
        notes.push({
            note: document.getElementById("new-note").value,
            done: false
        });
        
        newIndex = notes.length - 1;

        document.getElementById("note-list").innerHTML +=
        '<li class="note" id="note-' + newIndex + '"><span class="note-text">' + notes[newIndex].note + '</span><div><span class="btn" id="btn-complete-' + newIndex + '">✔</span><span class="btn" id="btn-remove-' + newIndex + '">x</span></div>';

        document.getElementById("new-note").value = "";
    }
});