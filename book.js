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
  // Get selected checkboxes 
  const checkList = Array.from(bookCheckBox, chk => chk.checked).filter(checked => checked);

  if (checkList.length === 0) {
    alert('Please select your favorite books!');
  } else {
    // Get book's list from book's tabular-form
    const booktableCollection = Array.from(document.getElementsByTagName('tbody')[0].children);
    const selectedBook = booktableCollection
      .filter((item,index) => bookCheckBox[index].checked)
      .map(book => book.children);
    if (bookArray.length > 0) {
      selectedBook.forEach(item => {
        const title = item[1].innerHTML;
        const image = item[2].firstChild.src;
        const desc = item[3].innerHTML;
        const author = item[4].innerHTML;
        const exist = bookArray.filter(book => (book.title === title && book.author === author));
        if (exist.length === 0) {
          // Get the current date
          const date = new Date().toLocaleString();
          bookArray.push({title, image, desc, author, date});          
        }
      });
    } else {
      selectedBook.forEach(item => {
        const title = item[1].innerHTML;
        const image = item[2].firstChild.src;
        const desc = item[3].innerHTML;
        const author = item[4].innerHTML;
        // Get the current date
        const date = new Date().toLocaleString();
        bookArray.push({title, image, desc, author, date});          
      });      
    }

    // Store this book array to my local storage 'myBookCollection'
    localStorage.setItem("myBookCollection",JSON.stringify(bookArray));
    // Message alert when done.
    alert('The task has been done!'); 

    // Reset all checkboxes of the checkbox list in book table
    for (let checkbox of bookCheckBox) {checkbox.checked = false;}
  };
});