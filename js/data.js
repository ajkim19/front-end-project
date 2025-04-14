'use strict';
let ppData = {
  breedsList: [],
  favoritesList: [],
  view: 'home',
};
ppData = readData();
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
  } else {
    const ppDataParsed = JSON.parse(ppDataJSON);
    return ppDataParsed;
  }
}
writeData(ppData);
