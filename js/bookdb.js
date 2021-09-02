// Search book by name
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    toggleCountResult('none');
    toggleErrorMessage('none');
    loadBooks(searchText);
    searchField.value = '';
}

// Load book lists
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
}

// Show Book Lists
const displayBook = books => {
    displayCount(books);
    const bookList = books.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (books.numFound == 0) {
        errorMessage();
        toggleErrorMessage('block');
    }
    else {
        bookList?.forEach(book => {
            const secondDiv = document.createElement('div');
            secondDiv.classList.add('col');
            secondDiv.innerHTML = `
    <div class="card m-auto bg-secondary text-white">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author: ${book.author_name}</p>
            <p class="card-text">Publisher: ${book.publisher}</p>
            <p class="card-text">Publishing Date: ${book.publish_date}</p>
        </div>
    </div>
`;
            searchResult.appendChild(secondDiv);
        });
    }
    toggleSpinner('none');
    toggleCountResult('block');
}

// Matched books count
const displayCount = count => {
    const bookCount = count.numFound;
    const bookCountResult = document.getElementById('count-result');
    bookCountResult.textContent = '';
    const firstDiv = document.createElement('div');
    firstDiv.innerHTML = `
    <h4 class="w-50 mx-auto text-center">Total Results Found: ${bookCount}</h4>
    `;
    bookCountResult.appendChild(firstDiv);
}

// Generate Error Message
const errorMessage = () => {
    const div = document.getElementById('error-message');
    div.textContent = '';
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <h1 class="w-50 mx-auto text-center">NO MATCHED RESULTS FOUND</h1>
    `;
    div.appendChild(newDiv);
}

// Toggle Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Toggle Count Result
const toggleCountResult = displayStyle => {
    document.getElementById('count-result').style.display = displayStyle;
}

// Toggle Error Message
const toggleErrorMessage = displayStyle => {
    document.getElementById('error-message').style.display = displayStyle;
}

