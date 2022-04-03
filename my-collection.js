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
  // Get quote collection table element
  const quoteCollection = document.getElementById('quote-collection');
  if (quoteCollection !== null) {
    const fields = [
      {name: 'checkbox', type: 'checkbox', value: '&check;'},
      {name: 'quote', type: 'string', value: 'Quote'},
      {name: 'citation', type: 'string', value: 'Citation'},
      {name: 'date', type: 'date', value: 'Collection Date'}
    ];
    // Toggle displaying quote table
    quoteCollection.style.display = quoteArray.length > 0? 'block': 'none';
    // Get the body element of quote table
    const quoteTb = document.getElementById('quote-table');
    // Empty table body content
    quoteTb.innerHTML = '';
    // Show quote table
    showTabularForm(fields, quoteArray, quoteTb);
    // showQuoteTable(quoteArray);
  }
  // Create quote group element
  createQuoteGroup(quoteArray);
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

// Recurrent display each quote from quote collection in quote header container
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

function showTabularForm(fields, dataSource, tabularForm) {
  // call function showTabularHeader() to create & display the table header on HTML page
  showTabularHeader(fields, tabularForm);

  // Call function showTabularBody() to create & show the table body on html page
  showTabularBody(fields, dataSource, tabularForm);
}

// Create tabular form header
function showTabularHeader(fields, tabularForm) {
  // Create a table header for tabular form
  const thead = document.createElement('thead');
  // Create a row for table header as a child of <thead>
  const headerRow = document.createElement('tr');

  // Looping through fields array
  for (const field of fields) {
    // Create header column <th> for each field in table header
    const headerCol = document.createElement('th');
    headerCol.innerHTML = field.value;
    // Add this header column to header row
    headerRow.appendChild(headerCol);
  }
  // Adding this header row element to <thead>
  thead.appendChild(headerRow);
  // Add this table head to tabular form
  tabularForm.appendChild(thead); 
}

function showTabularBody(fields, dataSource, tabularForm) {
  // Create a table body for tabular form
  const tbody = document.createElement('tbody');
  // Looping through data source
  for (let i = 0; i < dataSource.length; i++) {
    // Create body row element for each record of data source
    const bodyRow = document.createElement('tr');
    // loop through the fields array
    for (let col = 0; col < fields.length; col++) {
      // Create a column element for each field in body row
      const bodyCol = document.createElement('td');
      // Check field type
      if (fields[col].type === 'checkbox') {
        bodyCol.innerHTML = `<input type="checkbox" name = ${fields[col].name}>`
      } else if (fields[col].type === 'image') {
        // Create an image element
        const imageEl = document.createElement('img');
        imageEl.src = document.getElementById('select') !== null? dataSource[i].book_image : dataSource[i].image;
        imageEl.style.height = 'auto';
        imageEl.style.width = '100%';
        bodyCol.appendChild(imageEl);
      } else {
        const dataSet = dataSource[i];
        for (const key in dataSet) {
          if (key === fields[col].name) {
            // Get value from data set for this column content.
            bodyCol.innerHTML = dataSet[key];
            break;
          }
        }
      }
      // Add this column to body row element
      bodyRow.appendChild(bodyCol);
    }
    // Add this row to table body element
    tbody.appendChild(bodyRow);
  }
  tabularForm.appendChild(tbody);
}

const aboutMe = document.getElementById('about');
if (aboutMe !== null) {
  aboutMe.innerHTML = `
  Hi there,
  <br>
  <br>
  My name is Duc Tran. I go by Joseph. I graduated from the University of Science with a Bachelor's Degree in computer science major in Saigon, Vietnam, in 1994. Since then, I have cooporated with my co-workers to build many projects, such as Hotel Management system, Accounting system, Trade Manager, Cyber Station Manager, etc. by many programming languages, including FoxPro, Visual Basic, Visual C, and database management systems, especially MS SQL Server, MySQL for over twenty years.
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
  Now, while still working at an Amazon warehouse, I am studying at the University of Washington to get the certificate program in “Full-stack Development with JavaScript” to broaden my career opportunities in software development and improve my life. I hope I will have it this year.
  <br>
  <br>
  This website is my final project for the first part of the program - Jscript 310B class. I hope you enjoy trying it.
  <br>
  <br>
  Best regards,
  <br>
  <br>
  Joseph Tran
  `;
};
