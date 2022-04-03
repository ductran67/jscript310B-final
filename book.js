const formEl = document.getElementById('best-books-form');
const yearEl = document.getElementById('year');
const monthEl = document.getElementById('month');
const dateEl = document.getElementById('date');
// Get select button element
const selectBtn = document.getElementById('select');

// Define book array
let bookArray = [];

const myBookCollection = JSON.parse(localStorage.getItem("myBookCollection"));

if (myBookCollection) {
  bookArray = myBookCollection;
}


formEl.addEventListener('submit', function(e) {
  e.preventDefault();

  const year = yearEl.value;
  const month = monthEl.value;
  const date = dateEl.value;

  // Define some input vars
  const dateInput = `${year}-${month}-${date}`;
  const list = 'hardcover-fiction';  
  const BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/${dateInput}/${list}.json`;

  const url = `${BASE_URL}?api-key=${API_KEY}`;

  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(responseJson) {

      let books = responseJson.results.books;
      if (books !== undefined) {
        const bookTable = document.getElementById('book-table');
        bookTable.innerHTML = '';
        const fields = [
          {name: 'checkbox', type: 'checkbox', value: '&check;'},
          {name: 'title', type: 'string', value: 'Title'},
          {name: 'image', type: 'image', value: 'Image'},
          {name: 'description', type: 'string', value: 'Description'},
          {name: 'author', type: 'string', value: 'Author'}
        ];
        // Display book collection on tabular form
        showTabularForm(fields, books, bookTable);
        // Call this function to show the list of books in the book table body
      }
    }).catch((error) => {
      console.log('Cannot find any books:', error);
    });  
});


selectBtn.addEventListener('click', () => {
  // Get all checkbox elements
  const bookCheckBox = document.getElementsByName("checkbox");
  // Convert the collection of checkboxes above to an array 
  const checkList = Array.from(bookCheckBox, chk => chk.checked);
  // Filter selected checkbox
  const selectedBook = checkList.filter(selected => selected === true);

  if (selectedBook.length === 0) {
    alert('Please select your favorite books!');
  } else {
    const bookList = document.getElementsByTagName('tbody')[0].children;
    for (let i = 0; i < bookList.length; i++) {
      if (bookCheckBox[i].checked) {

        const title = bookList[i].children[1].textContent;
        const image = bookList[i].children[2].firstChild.src;
        const desc = bookList[i].children[3].textContent;
        const author = bookList[i].children[4].textContent
        // Check if this book is already exist or not in the book collection
        if (bookArray.length > 0) {
          let existBook = false;
          for (book of bookArray) {
            if (book.title === title && book.author === author) {
              existBook = true;
              break;
            }
          }
          if (!existBook) {
            // Get the current date
            const date = new Date().toLocaleString();
            bookArray.push({title, image, desc, author, date});
          }
        } else {
          const date = new Date().toLocaleString();
          bookArray.push({title, image, desc, author, date});
        }
      }
    }
    // Store this book array to my local storage 'myBookCollection'
    localStorage.setItem("myBookCollection",JSON.stringify(bookArray));
    // Message alert when done.
    alert('The task has been done!'); 

    // Reset all checkboxes of the checkbox list in book table
    for (let checkbox of bookCheckBox) {
      checkbox.checked = false;
    }
  };
});