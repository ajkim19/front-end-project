// Creates the data type that will be used for data
interface BreedID {
  name: string;
  id: number;
}

interface BreedIDImage {
  name: string;
  id: number;
  reference_image_id: string;
}

interface PPData {
  breedList?: BreedID[];
  favoritesList?: BreedIDImage[];
}

// Initializes the data that will be stored in local storage
let ppData: PPData = {};

// // Saves data to local storage for persistent data
// function writeData(ppData: PPData): void {
//   const ppDataJSON = JSON.stringify(ppData);
//   localStorage.setItem('picking-pals-storage', ppDataJSON);
// }

// Retrieves the data from local storage for the application
function readData(): PPData {
  const ppDataJSON = localStorage.getItem('picking-pals-storage');
  if (!ppDataJSON) {
    return ppData;
  }
  const ppDataParsed = JSON.parse(ppDataJSON) as PPData;
  return ppDataParsed;
}

ppData = readData();
