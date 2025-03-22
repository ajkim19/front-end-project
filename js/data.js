'use strict';
let ppData = {
  breedsList: [],
  favoritesList: [],
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
ppData.favoritesList = [
  { name: 'German Shepherd Dog', id: 115, reference_image_id: 'SJyBfg5NX' },
  { name: 'Belgian Malinois', id: 36, reference_image_id: 'r1f_ll5VX' },
  { name: 'Golden Retriever', id: 121, reference_image_id: 'HJ7Pzg5EQ' },
];
writeData(ppData);
