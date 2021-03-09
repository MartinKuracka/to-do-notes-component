const showmodal = document.getElementById('show');
const modalEl = document.getElementById('modal');
const addbookmark = document.getElementById('modal-add');
const closemodal = document.getElementById('close-modal');
const inputfield = document.getElementById('form-input');
const datefield = document.getElementById('date-field');
const linkfield = document.getElementById('link-field');
const form = document.getElementById('bookmark-form');
const bookmarksField = document.getElementById('bookmarks-container');
const deleteConfirm = document.getElementById('delete-modal');
const confirmBtn = document.getElementById('delete-btn');
const closeDeleteModal = document.getElementById('delete-close-modal');

let bookmarks = [];

//  Show modal window
const openmodal = () => {
    showmodal.classList.add('show-modal');
    inputfield.focus();
}

// Url validation
const checkUrl = (urlValue, bookmarkValue, bookmarkDate) => {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if (bookmarkValue === '' || bookmarkDate === '') {
        alert('Please fill all the fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address')
        return false;
    }
    // Validate OK
    return true;
}
// Build Bookamarks DOM
buildBookmarks = () => {
    // clear HTML elements from the DOM before rendering
    bookmarksField.textContent = '';
    // Build items
    bookmarks.map((bookmark) => {
        const { name, date, url} = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('todo-item')
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('far', 'fa-window-close', 'position');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick',`deleteBookmark('${name}')`);
        // Item data text
        const itemData = document.createElement('div');
        itemData.classList.add('item-data');
        itemData.setAttribute('id','item-data');
        // Item bookmark icon
        const bookmarkIcon = document.createElement('i');
        bookmarkIcon.classList.add('far', 'fa-bookmark');
        // bookmark text
        const bookmarkText = document.createElement('h5');
        bookmarkText.textContent = `${name}`;
        // Date element
        const dueDate = document.createElement('p');
        dueDate.textContent = `${date}`;
        // link element
        const link = document.createElement('a')
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = 'link';
        // Append to bookmarks container
        itemData.append(bookmarkIcon, bookmarkText);
        item.append(closeIcon, itemData, dueDate, link);
        bookmarksField.appendChild(item);
    });
}

// Check local storage for bookamrks
fetchBookmarks = () => {
    // Get bookamrks if there re any
    if (JSON.parse(localStorage.getItem('bookmarks')).length >= 1) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        console.log('je to tu',bookmarks);
        // Create bookmarks array in localstrage
        bookmarks = [
            {
                name: 'Sample bookmark',
                date: '2022-01-01',
                url: 'www.webmark-design.com'
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
}

// Confirm delete bookmark
const confirmDelete = (confirm) => {



}

// Delete bookmark
const deleteBookmark = (name) => {
    deleteConfirm.classList.add('show-delete');
    confirmBtn.addEventListener('click', () => {
        deleteConfirm.classList.remove('show-delete');
        bookmarks.map((bookmark, i) => {
            if (bookmark.name === name) {
                bookmarks.splice(i, 1);
            }
        })
        // Update bookmarks array n local storage, repopulate the DOM
        localStorage.setItem('bookmarks', JSON. stringify(bookmarks));
        fetchBookmarks();
    });
    closeDeleteModal.addEventListener('click', () => {
        deleteConfirm.classList.remove('show-delete');
        confirmBtn.removeEventListener('click');
}
    );
}

// Store bookmark
const storeBookmark = (data) => {
    data.preventDefault();
    const bookmarkValue = inputfield.value;
    const bookmarkDate = datefield.value;
    let urlValue = linkfield.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
    }
    checkUrl(urlValue, bookmarkValue, bookmarkDate);
    if (!checkUrl(urlValue,bookmarkValue,bookmarkDate)) {
        return false
    }
    const bookmarkEl = {
        name: bookmarkValue,
        date: bookmarkDate,
        url: urlValue
    };
    bookmarks.push(bookmarkEl)
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    form.reset();
    inputfield.focus();
    buildBookmarks();
}

// Event listeners
addbookmark.addEventListener('click', openmodal);
closemodal.addEventListener('click', () => showmodal.classList.remove('show-modal'));
window.addEventListener('click', (e) => e.target === show ? showmodal.classList.remove('show-modal') : false)

// Bookmark Form Event listeners
form.addEventListener('submit', storeBookmark);

//  On Load - fetch bokmarks
fetchBookmarks();
