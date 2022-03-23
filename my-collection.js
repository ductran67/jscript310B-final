// Create an empty quote array
let quoteArray = [];
// Get my favorite quotes from local storage
const myLocalStorage = JSON.parse(localStorage.getItem("myQuoteCollection"));
// If the local storage has some quotes
if (myLocalStorage) {
  // Store quotes in quote array
  quoteArray = myLocalStorage;
}
// Call function viewQuoteCollection to display the quote collection in HTML page
viewQuoteCollection();

// Create a function called viewQuoteColletion
function viewQuoteCollection() {
  if (document.getElementById('quote-collection') !== null) {
    // Show quote table
    showQuoteTable(quoteArray);
  }
  // Create quote group element
  createQuoteGroup(quoteArray);
}

// Display all quotes on quote header container
function quoteSlideShow() {

  // Get the group of quotes
  let quoteList = document.getElementsByClassName('my-quotes');

  let slideIndex = 0;
  const timeOut = 5000;

  showSlides();
  
  function showSlides() {
    // Set invisisble for all the quote elements
    for (let i = 0; i < quoteList.length; i++) {
      quoteList[i].style.display = "none";
    }
    slideIndex++;
    // Reset slideIndex if it is greater than slides length
    if (slideIndex > quoteList.length) {slideIndex = 1}
    // Display the current quote <div> element
    quoteList[slideIndex-1].style.display = "block";
    setTimeout(showSlides, timeOut); // Change quote every 'timeOut' miliseconds
  }  
}

function createQuoteGroup(quotes) {
  // Get quote header element
  const quoteHeader = document.getElementById('quote-header');
  // Empty quote header content
  quoteHeader.innerHTML = '';
  // Check if the quotes array is empty or not
  if (quotes.length > 0) {
    // Looping through quotes array
    for (let i = 0; i < quotes.length; i++) {
      // Create a new div
      const quoteDiv = document.createElement('div');
      quoteDiv.className = 'my-quotes animated fadeInDown';
      // Create a new <p> for quote content
      const content = document.createElement('p');
      content.className = 'content';
      content.innerHTML = quotes[i].quote;

      // Create a new <p> for citation
      const citation = document.createElement('p');
      citation.className = 'citation';
      citation.innerHTML = quotes[i].citation;
      // Append these content & citation elements to quote div
      quoteDiv.appendChild(content);
      quoteDiv.appendChild(citation);
      // Append quote div to quote header
      quoteHeader.appendChild(quoteDiv);
    }
  } else {
    // Create a default quote div element
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'my-quotes animated fadeInDown';
    // Create a new <p> for default quote content
    const content = document.createElement('p');
    content.className = 'content';
    content.innerHTML = 'It is during our darkest moments that we must focus to see the light.';

    // Create a new <p> for default citation
    const citation = document.createElement('p');
    citation.className = 'citation';
    citation.innerHTML = 'Aristotle';
    // Append these content & citation elements to quote div
    quoteDiv.appendChild(content);
    quoteDiv.appendChild(citation);
    // Append quote div to quote header
    quoteHeader.appendChild(quoteDiv);
  }
  // Display quote slide show
  quoteSlideShow();
}

function showQuoteTable(quotes) {
  // Get quote collection table element
  const quoteCollection = document.getElementById('quote-collection');
  // Toggle displaying quote table
  quoteCollection.style.display = quoteArray.length > 0? 'block': 'none';
  // Get the body element of quote table
  const tbody = document.getElementById('quote-tbody');
  // Empty table body content
  tbody.innerHTML = '';
  // Looping through the list of quotes
  for (let i = 0; i < quotes.length; i++) {
    // Create a new table row
    const quoteRow = document.createElement('tr');
    // Create 3 columns for this quote
    for (let j = 0; j < 3; j++) {
      const quoteCol = document.createElement('td');
      switch (j) {
        case 0:
          // Adding a checkbox to the first column
          quoteCol.innerHTML = `<input type="checkbox" name="quoteCheckBox">`;
          break;
        case 1:
          // Adding quote content to the second column
          quoteCol.innerHTML = quotes[i].quote;
          break;
        case 2:
          // Adding citation to the third column
          quoteCol.innerHTML = quotes[i].citation;
          break;
        
        default:
          break;
      }
      // Adding the current column element to the current row element
      quoteRow.appendChild(quoteCol);
    }
    // Append this row to the table body above
    tbody.appendChild(quoteRow);
  }
};

const aboutMe = document.getElementById('about');
if (aboutMe !== null) {
  aboutMe.innerHTML = `
  My name is Duc Tran. I go by Joseph. I graduated from the University of Science
  with a Bachelor's Degree in computer science major in Saigon, Vietnam, in 1994.
  Since then, I have built many projects, such as Hotel Management system,
  Accounting system, Trade Manager, Cyber Station Manager, etc. 
  by many programming languages, including FoxPro, Visual Basic, Visual C,
  and database management systems, especially MS SQL Server, MySQL for over twenty years.
  <br>
  <br>
  In 2017, my family moved to America, and I started my new life here as a warehouse worker.
  However, I think I can improve my life by coming back to the field of computer science.
  Therefore, I decided to learn by myself about web development. After four months of
  self-learning and practicing HTML, CSS, JavaScript, jQuery, especially Python, 
  I launched two websites: https://ductran67.pythonanywhere.com and https://fruit.pythonanywhere.com.
  The second one looks more professional than the first one.
  <br>
  <br>
  Now, while working for Amazon warehouse, I am studying at the University of Washington to get the certificate program 
  in full-stack development with JavaScript to broaden my career opportunities 
  in software development and improve my life. I hope you would give me a chance to get it.
  <br>
  <br>
  Thank you.`;
};
