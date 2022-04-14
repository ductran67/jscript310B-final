// Get delete-buttons elements
const delSelectedBook = document.getElementById('del-selected-book');
const delAllBook = document.getElementById('del-collection');

// Define my book collection array
let myBook = [];
const myBookCol = JSON.parse(localStorage.getItem("myBookCollection"));

if (myBookCol) {
  myBook = myBookCol;
  const bookTable = document.getElementById('book-table');
  bookTable.innerHTML = '';
  const fields = [
    {name: 'checkbox', type: 'checkbox', value: '&check;'},
    {name: 'title', type: 'string', value: 'Title'},
    {name: 'image', type: 'image', value: 'Image'},
    {name: 'desc', type: 'string', value: 'Description'},
    {name: 'author', type: 'string', value: 'Author'},
    {name: 'date', type: 'date', value: 'Collection Date'}
  ];
  showTabularForm(fields, myBook, bookTable);
};

// Delete all books from the local storage and clear HTML page
delAllBook.addEventListener('click', () => {
  if (myBook.length > 0) {
    if (confirm('Are you sure to delete all your favorite books?')) {
      // Remove book collection from the local storage
      localStorage.removeItem('myBookCollection');
      // Empty myBook array
      myBook = [];
      // Clear tabular form body
      // Get the book table element
      const bookTb = document.getElementById('book-table');
      // Get the table body element  
      const tbody = document.getElementsByTagName('tbody')[0];
      if (tbody !== undefined) {
        // Remove book table body from book table element
        bookTb.removeChild(tbody);
      }
    }
  } else {
    alert('There is nothing to delete!');
  }
});

// Delete any selected books from the local storage and remove them away from the book-collection
delSelectedBook.addEventListener('click', () => {
  // Get the length of the myBook array
  let bookArrayLen = myBook.length;
  if (bookArrayLen > 0) {
    // Get all checkbox elements
    let bookCheckBox = document.getElementsByName("checkbox");
    // Convert the collection of checkboxes above to an array 
    const checkList = Array.from(bookCheckBox, chk => chk.checked);
    // Filter selected checkbox
    const checked = checkList.filter(checked => checked);

    if (checked.length === 0) {
      alert('Please select any books that you want to delete!');
    } else {
      // Create a new array to store unchecked-books
      const newBookArray = myBook.filter((item, index) => !bookCheckBox[index].checked);
      // Set book array = new book array
      myBook = newBookArray;
      // Remove item "myBookCollection" from the localStorage
      localStorage.removeItem("myBookCollection");
      // Store new book list to local storage
      localStorage.setItem("myBookCollection",JSON.stringify(myBook));
      // Get the book body element
      const tbody = document.getElementsByTagName('tbody')[0];
      // Get the book table element
      const bookTable = document.getElementById('book-table');
      // Remove the table body from the book table
      bookTable.removeChild(tbody);
      // Define fields object
      const fields = [
        {name: 'checkbox', type: 'checkbox', value: '&check;'},
        {name: 'title', type: 'string', value: 'Title'},
        {name: 'image', type: 'image', value: 'Image'},
        {name: 'desc', type: 'string', value: 'Description'},
        {name: 'author', type: 'string', value: 'Author'},
        {name: 'date', type: 'date', value: 'Collection Date'}
      ];
      // Display book data on tabular form
      showTabularBody(fields, myBook, bookTable);
    }
  } else {
    alert('There is nothing to select and delete!');
  }
});