let siteName = document.getElementById('siteName');
let siteURL = document.getElementById('siteURL');
let submitBtn = document.getElementById('submitBtn');
let tableBody = document.getElementById('tableBody');
let bookmarksList = [];
if (localStorage.getItem("bookmarksList") === null)
    bookmarksList = [];
else {
    bookmarksList = JSON.parse(localStorage.getItem('bookmarksList'));
    display();
}
submitBtn.addEventListener("click", addBookmark);
function addBookmark() {
    if (nameValidation() && urlValidation() && searchRepeatedName()) {
        clearIcon();
        let bookmark = {
            sName: siteName.value,
            sURL: siteURL.value,
        }
        bookmarksList.push(bookmark);
        localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
        reset();
        display();
    }
    else {
        showIconNameInput();
        showIconURLInput();
        sweetAlert();
    }
}
function reset() {
    siteName.value = '';
    siteURL.value = '';
}
function display() {
    let showResult = '';
    for (let i = 0; i < bookmarksList.length; i++) {
        showResult += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarksList[i].sName}</td>
            <td><button class="btn btn-visit" id="btn-visit-${i}" onclick="visitBookmark(${i})"><span class="fa-solid fa-eye"></span> Visit</button>
            </td>
            <td><button class="btn btn-delete" id="btn-delete-${i}" onclick="deleteBookmark(${i})"><span class="fa-solid fa-trash"></span> Delete</button>
            </td>
        </tr>
        `;
    }
    tableBody.innerHTML = showResult;
}
function visitBookmark(index) {
    window.open(bookmarksList[index].sURL, '_blank');
}
function deleteBookmark(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    display();
}
siteName.addEventListener('input', nameValidation);
siteName.addEventListener('blur', nameValidation);

function nameValidation() {
    let regexName = /^[A-Za-z]{3}/;//To start with capital or small 3 letters at least.
    return regexName.test(siteName.value);
}
siteURL.addEventListener('input', urlValidation);
siteURL.addEventListener('blur', urlValidation);

function urlValidation() {
    let regexURL = /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    /* is designed to match and validate URLs that start with https:// and have a domain name consisting of letters (both upper and lower case), numbers, hyphens, and periods. It also allows for optional "www." at the beginning of the domain.*/
    return regexURL.test(siteURL.value);
}
siteName.addEventListener('input', searchRepeatedName);
siteName.addEventListener('blur', searchRepeatedName);

function searchRepeatedName() {
    for (let i = 0; i < bookmarksList.length; i++)
        if (bookmarksList[i].sName.includes(siteName.value))
            return false;//mans invalid
    return true;//means valid
}
siteName.addEventListener('input', showIconNameInput);
siteName.addEventListener('blur', showIconNameInput);
siteURL.addEventListener('input', showIconURLInput);
siteURL.addEventListener('blur', showIconURLInput);
function showIconNameInput() {
    if (nameValidation() && searchRepeatedName()) {
        siteName.classList.add('valid');
        siteName.classList.remove('invalid');
        siteName.style.borderColor = '#198754';
        siteName.style.boxShadow = '0 0 0 0.25rem rgba(25,135,84,.25)';
    }
    else {
        siteName.classList.add('invalid');
        siteName.classList.remove('valid');
        siteName.style.borderColor = '#dc3545';
        siteName.style.boxShadow = '0 0 0 0.25rem rgba(220,53,69,.25)';
    }
}
function showIconURLInput() {
    if (urlValidation()) {
        siteURL.classList.add('valid');
        siteURL.classList.remove('invalid');
        siteURL.style.borderColor = '#198754';
        siteURL.style.boxShadow = '0 0 0 0.25rem rgba(25,135,84,.25)';
    }
    else {
        siteURL.classList.add('invalid');
        siteURL.classList.remove('valid');
        siteURL.style.borderColor = '#dc3545';
        siteURL.style.boxShadow = '0 0 0 0.25rem rgba(220,53,69,.25)';
    }
}
function clearIcon() {
    siteName.classList.remove('valid');
    siteName.style.borderColor = '#d99c39';
    siteName.style.boxShadow = '0 0 0 0.25rem #fec26055';
    siteURL.classList.remove('valid');
    siteURL.style.borderColor = '#d99c39';
    siteURL.style.boxShadow = '0 0 0 0.25rem #fec26055';
}

function sweetAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Site Name or Url is not valid',
        html: `
           <p>Please follow the rules below :</p>
        <div class="sweetAlert-rules">
        <p class="text-left"><span class="fa fa-arrow-right"></span> Site name must contain at least 3 characters</p>
        <p class="text-left"><span class="fa fa-arrow-right"></span> Site URL must be a valid one</p>
         </div>
        `,
    });
}
