// Creates the data type that will be used for data
interface Data {
  breedList?: object[];
  favoritesList?: object[];
}

// Initializes the data that will be stored in local storage
let data: Data = {};

// // Saves data to local storage for persistent data
// function writeData(data: Data): void {
//   const dataJSON = JSON.stringify(data);
//   localStorage.setItem('data-storage', dataJSON);
// }

// Retrieves the data from local storage for the application
function readData(): Data {
  const dataJSON = localStorage.getItem('data-storage');
  if (!dataJSON) {
    return data;
  }
  const dataParsed = JSON.parse(dataJSON) as Data;
  return dataParsed;
}

data = readData();
