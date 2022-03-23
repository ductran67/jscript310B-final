// Get delete-buttons elements
const delSelectedBook = document.getElementById('del-selected-book');
const delAllBook = document.getElementById('del-collection');

// Define my book collection array
let myBook = [];
const myBookCol = JSON.parse(localStorage.getItem("myBookCollection"));

if (myBookCol) {
  myBook = myBookCol;
  showMyBookCol(myBook);
};

function showMyBookCol(books) {
  // Get the table body element
  const bookTable = document.getElementById('book-tbody');
  // Clear book-table content
  bookTable.innerHTML = '';
  // Scan through the list of books
  for (let i = 0; i < books.length; i++) {
    // Get the title, author, desc and image info of this book
    const title = books[i].title;
    const author = books[i].author;
    const desc = books[i].desc;
    const image = books[i].image;
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
};
// Delete all books from the local storage and clear HTML page
delAllBook.addEventListener('click', () => {
  if (confirm('Are you sure to delete all your favorite books?')) {
    // Remove book collection from the local storage
    localStorage.removeItem('myBookCollection');
    // Empty myBook array
    myBook = [];
    showMyBookCol(myBook);
  }
});

// Delete any selected books from the local storage and remove them away from the book-collection
delSelectedBook.addEventListener('click', () => {
  // Get the length of the myBook array
  let bookArrayLen = myBook.length;
  // Get all checkbox elements
  let bookCheckBox = document.getElementsByName("bookCheckBox");
  // Convert the collection of checkboxes above to an array 
  const checkList = Array.from(bookCheckBox, chk => chk.checked);
  // Filter selected checkbox
  const selectedBook = checkList.filter(selected => selected === true);

  if (selectedBook.length === 0) {
    alert('Please select any books that you want to delete!');
  } else {
    // Create an empty array to store unchecked-book list
    let newBookArray = [];
    // Scan through the checkbox list to skip all selected items
    for (let i = 0; i < bookArrayLen; i++) {
      if (!bookCheckBox[i].checked) {
        // Add the unchecked item to a new array called newBookArray
        newBookArray.push(myBook[i]);
      }
    }
    // Set book array = new book array
    myBook = newBookArray;
    // Remove item "myBookCollection" from the localStorage
    localStorage.removeItem("myBookCollection");
    // Store new book list to local storage
    localStorage.setItem("myBookCollection",JSON.stringify(myBook));
    // call the function to show the list Info
    showMyBookCol(myBook);
  }
});