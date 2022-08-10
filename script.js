const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')





let apiQuotes = [];
// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;

}

// Delay Function to display loader

function delay(time){
    return new Promise(resolve => setTimeout=(resolve, time));
}
///Place before function to slow it down
//delay(1000).then(() => console.log('ran after 1 second1 passed'));




// Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes arrau
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author field is blank and replace it with 'Unknown'
    // !quote.quthor means "if quote quote author is null."
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;           
    }
    
    // Check Quote length to determin styling
    if (quote.text.length >50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
        quoteText.textContent = quote.text;
        complete();
        
}



// Get Quotes From API
async function getQuotes()  {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        // Catch Error Here
    }
    
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//https://academy.zerotomastery.io/courses/1007166/lectures/24246132

// On Load
getQuotes();

