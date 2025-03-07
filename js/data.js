'use strict';
let ppData = {};
ppData = readData();
let breedsList = [];
let traitsList = [];
// Saves data to local storage for persistent data
function writeData(ppData) {
  const ppDataJSON = JSON.stringify(ppData);
  localStorage.setItem('picking-pals-storage', ppDataJSON);
}
// Retrieves the data from local storage for the application
function readData() {
  const ppDataJSON = localStorage.getItem('picking-pals-storage');
  if (!ppDataJSON) {
    return ppData;
  }
  const ppDataParsed = JSON.parse(ppDataJSON);
  return ppDataParsed;
}
async function fetchBreedsList() {
  // Clears any possible values assigned `breedList`
  breedsList = [];
  traitsList = [];
  try {
    // Initiate a fetch request and await its response
    const response = await fetch('https://api.thedogapi.com/v1/breeds/');
    // Ensure the response status indicates success
    if (!response.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Await the parsing of the response body as JSON
    const breeds = await response.json();
    for (const breed of breeds) {
      breedsList.push({
        name: breed.name,
        id: breed.id,
      });
      for (const trait in breed) {
        let listedTrait = false;
        for (let i = 0; i < traitsList.length; i++) {
          if (trait === traitsList[i]) {
            listedTrait = true;
          }
        }
        if (listedTrait === false) {
          traitsList.push(trait);
        }
      }
    }
    console.log('traitsList:', traitsList);
    // Stores `breedList` for future use
    ppData.breedsList = breedsList;
    writeData(ppData);
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}
fetchBreedsList();
