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
      // console.log(responseJson);

      let books = responseJson.results.books;
      if (books !== undefined) {
        const bookTable = document.getElementById('book-tbody');
        bookTable.innerHTML = '';

        // Call this function to show the list of books in the book table body
        showBookList(books);
      }
    }).catch((error) => {
      console.log('Cannot find any books:', error);
    });  
});

function showBookList(books) {
  // check if the books array has some items
  if (books.length > 0) {
    // Get the table body element
    const bookTable = document.getElementById('book-tbody');
    // Scan through the list of books
    for (let i = 0; i < books.length; i++) {
      // Get the title, author, desc and image info of this book
      const title = books[i].title;
      const author = books[i].author;
      const desc = books[i].description;
      const image = books[i].book_image;
      // Display all these info above to the best-books.html
      const bookRow = document.createElement('tr');
      // Create 5 columns for this book
      for (let j = 0; j < 5; j++) {
        const bookCol = document.createElement('td');
        switch (j) {
          case 0:
            // Adding a checkbox to the first column
            bookCol.innerHTML = `<input type="checkbox" name="bookCheckBox">`;
            break;
          case 1:
            // Adding title to the second column
            bookCol.innerHTML = title;
            break;
          case 2:
            // Create a new image element
            const imageEl = document.createElement('img');
            imageEl.src = image;
            imageEl.style.height = 'auto';
            imageEl.style.width = '100%';
            // Adding image to the third column
            bookCol.appendChild(imageEl);
            break;
          case 3:
            // Adding description to the fourth column
            bookCol.innerHTML = desc;
            break;
          case 4:
            // Adding author to the fifth column
            bookCol.innerHTML = author;
            break;
          
          default:
            break;
        }
        // Adding the current column element to the current row element
        bookRow.appendChild(bookCol);
      }
      // Adding the book row element to the book table
      bookTable.appendChild(bookRow);
    }
  }  
};

selectBtn.addEventListener('click', () => {
  // Get all checkbox elements
  const bookCheckBox = document.getElementsByName("bookCheckBox");
  // Convert the collection of checkboxes above to an array 
  const checkList = Array.from(bookCheckBox, chk => chk.checked);
  // Filter selected checkbox
  const selectedBook = checkList.filter(selected => selected === true);

  if (selectedBook.length === 0) {
    alert('Please select your favorite books!');
  } else {
    const bookList = document.getElementById('book-tbody').children;
    for (let i = 0; i < bookList.length; i++) {
      // const element = array[i];
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
            }
          }
          if (!existBook) {
            bookArray.push({title, image, desc, author});
          }
        } else {
          bookArray.push({title, image, desc, author});
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