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
  // let exist = false;
  if (quoteArray.length > 0) {
    // Check if the input quote exists in quote array or not
    const checkExist = quoteArray.filter(q => (q.quote === quote && q.citation === citation));
    if (checkExist.length > 0) {
      alert('This quote already exists in the quote collection. Please input another quote.');
      return;
    } else {
      const date = new Date().toLocaleString();
      // Add this quote to quote array
      quoteArray.push({quote, citation, date});
    }
  } else {
    const date = new Date().toLocaleString();
    // Add this quote to quote array
    quoteArray.push({quote, citation, date});  
  }
  // Store this quote array to my local storage
  localStorage.setItem("myQuoteCollection",JSON.stringify(quoteArray));
}

// Fires del-all button click listener
delAllBtn.addEventListener('click', () => {
  if (quoteArray.length > 0) {
    if (confirm('Are you sure to delete all your favorite quotes?')) {
      // Remove item "myQuoteCollection" from localStorage
      localStorage.removeItem("myQuoteCollection");
      // Reset quote array
      quoteArray = [];
      // Get quote table element
      const quoteTb = document.getElementById('quote-table');
      // Get quote table body element
      const tbody = document.getElementsByTagName('tbody')[0];
      if (tbody !== undefined) {
        // Remove quote body from quote table page
        quoteTb.removeChild(tbody);
      }
      // Run quotes slideshow
      createQuoteGroup(quoteArray);
    }    
  } else {
    alert('There is nothing to delete!');
  }
});

// Fires del-selected button click listener
delSelectedBtn.addEventListener('click', () => {
  // Get the length of the current quote array
  let quoteLen = quoteArray.length;
  if (quoteLen > 0) {
    // Get all checkbox elements
    let quoteCheckBox = document.getElementsByName("checkbox");
    // Get all selected quotes
    const selectedQuote = quoteArray.filter((item, index) => quoteCheckBox[index].checked);

    if (selectedQuote.length === 0) {
      alert('Please select any quotes that you want to delete!');
    } else {
      // Create a new quote array to store unchecked quotes
      let newQuoteArray = quoteArray.filter((item, index) => !quoteCheckBox[index].checked);

      // Set quote array = new quote array
      quoteArray = newQuoteArray;
      // Remove item "myQuoteCollection" from localStorage
      localStorage.removeItem("myQuoteCollection");
      // Store new quote list to local storage
      localStorage.setItem("myQuoteCollection",JSON.stringify(quoteArray));
      // Get quote table element
      const quoteTb = document.getElementById('quote-table');
      // Get the quote table body element
      const tbody = document.getElementsByTagName('tbody')[0];
      // Remove quote table body from quote table
      quoteTb.removeChild(tbody);
      // call the function to show the quote table body content
      const fields = [
        {name: 'checkbox', type: 'checkbox', value: '&check;'},
        {name: 'quote', type: 'string', value: 'Quote'},
        {name: 'citation', type: 'string', value: 'Citation'},
        {name: 'date', type: 'date', value: 'Collection Date'}
      ];
      // Show quote table body on the page
      showTabularBody(fields, quoteArray, quoteTb);
      // Update quote slide show
      createQuoteGroup(quoteArray);
    }
  } else {
    alert('There is nothing to select and delete!');
  }
});