//-------------- First small project February 7, 2024-------------//

// create reference to dom elements
const txtToDo = document.getElementById('txtToDo');
const ulToDo = document.getElementById('ulToDo');
const btnAdd = document.getElementById('btnAdd');

function addToList() {
    // check to see if there is any value in txToDo
    if (txtToDo.value !== '') {
        const li = document.createElement('li');
        const buttonDelete = document.createElement('button');
        const buttonDone = document.createElement('button');

        // create a list as a child and append to the ul
        ulToDo.appendChild(li);
        // set its id
        li.setAttribute('id', 'list' + ulToDo.children.length);
        // set it text content value to do textbox
        li.textContent = txtToDo.value;
        // clear the to do textbox
        txtToDo.value = '';

        // delete button
        li.appendChild(buttonDelete);
        buttonDelete.textContent = 'Delete';
        buttonDelete.setAttribute('id', 'btnDelete');

        // done button
        li.appendChild(buttonDone);
        buttonDone.textContent = 'Done';
        buttonDone.setAttribute('id', 'btnDone');

        // set an onclick deleteFromList(li.id) with the list id
        buttonDelete.setAttribute('onclick', `deleteFromList(${li.id})`);
        buttonDone.setAttribute('onclick', `doneFromList(${li.id})`);
    }
}

// remove an item from the ul
function deleteFromList(liId) {
    ulToDo.removeChild(liId);
}

// put a line through or remove a line through
function doneFromList(liId) {
    if (liId.style.textDecorationLine !== 'line-through') {
        liId.style.textDecorationLine = 'line-through';
    } else {
        liId.style.textDecorationLine = 'none';
    }
}
