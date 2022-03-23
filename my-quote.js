// Get quote-form element
const formEl = document.getElementById('quote-form');
// Get quote & citation elements
const quoteEl = document.getElementById('quote');
const citationEl = document.getElementById('citation');

// Get button 'delete all' element
const delAllBtn = document.getElementById('del-all');
// Get button 'del-selected' element
const delSelectedBtn = document.getElementById('del-selected');

// Fires Quote form listener when submit button is clicked
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get quote & citation values
  const quote = quoteEl.value.trim();
  const citation = citationEl.value.trim();
  // Check if quote and citation are empty or not
  if (quote.length > 0 && citation.length > 0) {
    // Call function addQuote to add this new quote to quote array & store this array to my local storage
    addQuote(quote, citation);
    // Reset quote & citation values
    quoteEl.value = '';
    citationEl.value = '';
    // Display a list of quotes to HTML page
    viewQuoteCollection();
  };
});

function addQuote(quote, citation) {
  let exist = false;
  if (quoteArray.length > 0) {
    // Check if the input quote exists in quote array or not
    for (const q of quoteArray) {
      if (q.quote === quote && q.citation === citation) {
        exist = true;
        alert('This quote already exists in the quote collection. Please input another quote.')
      }
    }
  }
  if (!exist) {
    // Add this quote to quote array
    quoteArray.push({quote, citation});
    // Store this quote array to my local storage
    localStorage.setItem("myQuoteCollection",JSON.stringify(quoteArray));
  }
}

// Fires del-all button click listener
delAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure to delete all your favorite quotes?')) {
    // Remove item "myQuoteCollection" from localStorage
    localStorage.removeItem("myQuoteCollection");
    // Reset quote array
    quoteArray = [];
    // Clear quote list info in HTML page
    viewQuoteCollection();
  }
});

// Fires del-selected button click listener
delSelectedBtn.addEventListener('click', () => {
  // Get the length of the current quote array
  let quoteLen = quoteArray.length;
  // Get all checkbox elements
  let quoteCheckBox = document.getElementsByName("quoteCheckBox");
  // Convert the collection of checkboxes above to an array 
  const checkList = Array.from(quoteCheckBox, chk => chk.checked);
  // Filter selected checkbox
  const selectedQuote = checkList.filter(selected => selected === true);

  if (selectedQuote.length === 0) {
    alert('Please select any quotes that you want to delete!');
  } else {
    // Create an empty array to store unchecked-quote list
    let newQuoteArray = [];
    // Scan through the checkbox list to skip all selected items
    for (let i = 0; i < quoteLen; i++) {
      if (!quoteCheckBox[i].checked) {
        // Add unchecked item to a new array called newQuoteArray
        newQuoteArray.push(quoteArray[i]);
      }
    }
    // Set quote array = new quote array
    quoteArray = newQuoteArray;
    // Remove item "myQuoteCollection" from localStorage
    localStorage.removeItem("myQuoteCollection");
    // Store new quote list to local storage
    localStorage.setItem("myQuoteCollection",JSON.stringify(quoteArray));
    // call the function to show the list Info
    viewQuoteCollection();
  }
});