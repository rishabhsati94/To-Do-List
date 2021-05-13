showNotes();
function check() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
}

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTitl = document.getElementById('addTitl');
    let addtitlVal = addTitl.value;

    if (addtitlVal === '') {
        alert('Please Enter The Title')
    }

    else {

        let addTxt = document.getElementById('addTxt');
        let addTxtlVal = addTxt.value;

        if (addTxtlVal === '') {
            alert('Please Enter The Note');
        }

        else {
            let addTxt = document.getElementById('addTxt');
            let addTitl = document.getElementById('addTitl');
            check();
            let myObj = {
                title: addTitl.value,
                text: addTxt.value
            }
            notesObj.push(myObj);
            localStorage.setItem('notes', JSON.stringify(notesObj));
            addTxt.value = '';
            addTitl.value = '';
            console.log(notesObj);
            showNotes();
        }
    }
});

function showNotes() {

    check();
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
    <div class="noteCard card my-3" style="width: 18rem; float: left; margin: 0 10px 0 10px;">
      <div class="card-body my-3">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id='${index}' onclick='delNote(this.id)' class="btn btn-primary my-3">Delete Note</button>
      </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h2> Nothing to show! Use "Add Note."</h2>`;
    }
}

function delNote(index) {
    check();
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));// update again storage
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(typeof(noteCards));
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});