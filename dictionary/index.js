// small project created 03/03/2024
// 1. getting input from HTML input tag
// 2. when button submit click fetch data from api url get difinition 
// 3. if no error and have data return a json() format object
// 4. deconstruct object and set value to label and paragraph tags

// declaring reference to the free apiUrl
const apiUrl ="https://api.dictionaryapi.dev/api/v2/entries/en/";  

// declaring reference
const inputWord = document.getElementById('inputWord');
const btnSubmit = document.getElementById('btnSubmit');
const clDifinition = document.querySelector('.cl-difinition');
const lblType = document.getElementById('lblType');
const clSynonym = document.querySelector('.cl-synonym')
const lblSynonyms = document.getElementById('lblSynonyms');

btnSubmit.addEventListener('click', async event => {
  
  const word = inputWord.value;
  event.preventDefault();
  // user enter anything
  if(word){
    try{
      const wordData = await getDictionary(word);
      translateWord(wordData)
    }
    catch(error){
      displayError(error);
    }
  }
  else {
    displayError("Please enter a word.")
  }
});

async function getDictionary(word){

  // concatenate the apiUrl with the search word
  const urlWord = apiUrl + word;
  
  // fetch apiUrl and word
  const response = await fetch(urlWord);
  
  // response not ok
  if (!response.ok){
    // if not ok throw a custom error
    throw new Error("Could not find this data...")
  }
  else{
    // return an object in JSON format
    return response.json();
  }
}


function translateWord(wordData){
  // declaring variable
  let countElements = 1;

  // clear paragraph tag
  clSynonym.textContent = "";

  // deconstruction object wordData
  const [{ meanings: [{ partOfSpeech, definitions: [{ definition }] , synonyms }] }] = wordData;

  // type noun, adjective
  lblType.textContent = partOfSpeech;

  // definition
  clDifinition.textContent = definition; 

  // synonyms exist
  if (synonyms.length > 0){
    lblSynonyms.textContent = "Synonyms:";
    // iterate throught synonyms object
    Object.values(synonyms).forEach(val => {
      // setting textContent with synonyms values with counter
      clSynonym.textContent += `${countElements}. ${val} `;      
      countElements++;
    })
  }
  else {
    lblSynonyms.textContent = "";
  }
}

function displayError(errorMsg){
  clDifinition.textContent = errorMsg;

  // clear input box
  inputWord.value = "";
  lblType.textContent = "";
  lblSynonyms.textContent = "";
  clSynonym.textContent = "";
}

