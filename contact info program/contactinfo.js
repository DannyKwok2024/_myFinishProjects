// declaring dom variables
const firstName = document.getElementById('txtFirstName');
const lastName = document.getElementById('txtLastName');
const phoneNumber = document.getElementById('txtPhone');
const eMail = document.getElementById('txtEmail');
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');
const tableContactInfo = document.getElementById('tableContacts');

// using event listener to keep all the code inside JavaScript file
// and not call a function in the HTML onclick attribute
btnAdd.addEventListener(
  'click',
  function (element) {
    let contactFirstName = '';
    let contactLastName = '';
    let contactPhoneNumber = '';
    let contactEmail = '';

    const divFullName =
      element.target.parentElement.parentElement.getElementsByClassName(
        'container-fullname'
      );
    const divPhoneEmail =
      element.target.parentElement.parentElement.getElementsByClassName(
        'container-phone-email'
      );

    // check get the first and last name from the DOM value
    // for every child in this divFullName
    for (let i = 0; i < divFullName.length; i++) {
      // for every children
      for (
        let x = 0;
        x <
        element.target.parentElement.parentElement.getElementsByClassName(
          'container-fullname'
        )[i].children.length;
        x++
      ) {
        // there is only to children which is the textFirstName and txtLastName
        switch (x) {
          case 0:
            contactFirstName =
              element.target.parentElement.parentElement.getElementsByClassName(
                'container-fullname'
              )[i].children[x].value;
            break;
          case 1:
            contactLastName =
              element.target.parentElement.parentElement.getElementsByClassName(
                'container-fullname'
              )[i].children[x].value;
            break;
        }
      }
    }

    // if user does enter a firstname or lastname then
    if (contactFirstName !== '' && contactLastName !== '') {
      // for every child in this divFullName
      for (let i = 0; i < divPhoneEmail.length; i++) {
        // for every children
        for (
          let x = 0;
          x <
          element.target.parentElement.parentElement.getElementsByClassName(
            'container-phone-email'
          )[i].children.length;
          x++
        ) {
          // there is only to children which is the textPhoneNumber and txtEmail
          switch (x) {
            case 0:
              contactPhoneNumber =
                element.target.parentElement.parentElement.getElementsByClassName(
                  'container-phone-email'
                )[i].children[x].value;
              break;
            case 1:
              contactEmail =
                element.target.parentElement.parentElement.getElementsByClassName(
                  'container-phone-email'
                )[i].children[x].value;
              break;
          }
        }
      }
      addContact(
        contactFirstName,
        contactLastName,
        contactPhoneNumber,
        contactEmail
      );
    }
    // alert user for informations
    else {
      alert('Please complete the contact informations.');
    }
  },
  false
);

// declaring function addPerson
function addContact(firstName, lastName, phoneNumber, email) {
  //---dinamically creating table row, and table data
  const trContactInfo = document.createElement('tr');
  const tdFirstName = document.createElement('td');
  const tdLastName = document.createElement('td');
  const tdPhoneNumber = document.createElement('td');
  const tdEmail = document.createElement('td');
  const spanE = document.createElement('span');
  const spanX = document.createElement('span');
  const s = document.getElementsByTagName;

  //---add the table row into the table
  tableContactInfo.appendChild(trContactInfo);

  //-----adding table data
  trContactInfo.appendChild(tdFirstName);
  tdFirstName.textContent = firstName;
  tdFirstName.setAttribute('id', 'idContacts');

  trContactInfo.appendChild(tdLastName);
  tdLastName.textContent = lastName;
  tdLastName.setAttribute('id', 'idContacts');

  trContactInfo.appendChild(tdPhoneNumber);
  tdPhoneNumber.textContent = phoneNumber;
  tdPhoneNumber.setAttribute('id', 'idContacts');

  trContactInfo.appendChild(tdEmail);
  tdEmail.textContent = email;
  trContactInfo.setAttribute('id', 'idContacts');

  // adding a span delete "x" using unicode "\u00d7"
  trContactInfo.appendChild(spanX);
  spanX.setAttribute('id', 'spanX');
  spanX.innerHTML = '\u00d7';

  // adding a span edit "e" using unicode "\u0065"
  trContactInfo.appendChild(spanE);
  spanE.setAttribute('id', 'spanE');
  spanE.innerHTML = '\u0065';

  clearAll();
  checkTableVisibility();
}

// using addEvenListener to listen to the click on the span tag
tableContactInfo.addEventListener(
  'click',
  function (element) {
    // if click on x and the tagName = "SPAN" then remove the parent element
    // which is the TD
    if (
      element.target.innerHTML === '\u00d7' &&
      element.target.tagName === 'SPAN'
    ) {
      element.target.parentElement.remove();
    }

    // if click on "e"(edit) and the tagName is "SPAN" then ...
    if (
      element.target.innerHTML === '\u0065' &&
      element.target.tagName === 'SPAN'
    ) {
      //element.target.parentElement.remove();

      // iterate move contacts information from the table row to the DOM textbox
      // iterate through base on the number childrens
      for (let e = 0; e < element.target.parentElement.children.length; e++) {
        // if the children tagName is not a "SPAN" tag then continue
        if (element.target.parentElement.children[e].tagName !== 'SPAN') {
          // check to see which table column these items belong to
          switch (e) {
            case 0:
              firstName.value =
                element.target.parentElement.children[e].textContent;
              break;
            case 1:
              lastName.value =
                element.target.parentElement.children[e].textContent;
            case 2:
              phoneNumber.value =
                element.target.parentElement.children[e].textContent;
            case 3:
              eMail.value =
                element.target.parentElement.children[e].textContent;
          }
        }
      }
      // after add all the contact to the DOM textbox then
      // remove the table row and table data
      element.target.parentElement.remove();
    }
    checkTableVisibility();
  },
  false
);

// check to see if the table is visible
function checkTableVisibility() {
  // if there is value in the table the make it visible
  if (tableContactInfo.childElementCount > 1) {
    tableContactInfo.style.visibility = 'visible';
  } else {
    // else hide it
    tableContactInfo.style.visibility = 'hidden';
  }
}

// checking for the phone number and format it to (555)555-5555
phoneNumber.addEventListener('change', function (element) {
  if (element.target.value.length === 10) {
    const correctFormat = element.target.value
      .replace(/\D/g, '')
      .match(/(\d{3})(\d{3})(\d{4})/);
    element.target.value =
      '(' + correctFormat[1] + ')' + correctFormat[2] + '-' + correctFormat[3];
  } else {
    alert('Please enter a valid phone number with area code.');
  }
});

// call clearAll on Clear button click
btnClear.addEventListener('click', clearAll);

// function clearAll() clear all the input values from the DOM
function clearAll() {
  firstName.value = '';
  lastName.value = '';
  phoneNumber.value = '';
  eMail.value = '';
}
