interface Weight {
  imperial: string;
  metric: string;
}

interface Height {
  imperial: string;
  metric: string;
}

interface BreedInfo {
  id: number;
  name: string;
  weight: Weight;
  height: Height;
  life_span: string;
  reference_image_id: string;
  temperament?: string;
  breed_group?: string;
  bred_for?: string;
  country_code?: string;
  origin?: string;
  history?: string;
  description?: string;
}

interface BreedImages {
  id: string;
  url: string;
  width: number;
  height: number;
}

const $selectBreedsList = document.querySelector(
  '.breeds-list',
) as HTMLSelectElement;
if (!$selectBreedsList) throw new Error('$selectBreedsList does not exist');
const $imgBreedsPageImage = document.querySelector(
  '.breeds-page-image',
) as HTMLImageElement;
if (!$imgBreedsPageImage) throw new Error('$imgBreedsPageImage does not exist');
const $divBreedInfo = document.querySelector('.breed-info') as HTMLDivElement;
if (!$divBreedInfo) throw new Error('$divBreedInfo does not exist');
const $imgFavoritesPageImage = document.querySelector(
  '.favorites-page-image',
) as HTMLImageElement;
if (!$imgFavoritesPageImage)
  throw new Error('$divFavBreedInfosPageImage does not exist');
const $divFavoritesList = document.querySelector(
  '.favorites-list',
) as HTMLDivElement;
if (!$divFavoritesList) throw new Error('$divFavoritesList does not exist');
const $ulNavBarNav = document.querySelector('.navbar-nav') as HTMLUListElement;
if (!$ulNavBarNav) throw new Error('$ulNavBarNav does not exist');
const $dataViews = document.querySelectorAll('.view');
if (!$dataViews) throw new Error('$dataViews does not exist');

let breedInfo: BreedInfo = {
  id: 0,
  name: '',
  weight: {
    imperial: '',
    metric: '',
  },
  height: {
    imperial: '',
    metric: '',
  },
  life_span: '',
  reference_image_id: '',
};

let breedImages: BreedImages[] = [];

async function fetchBreedsList(): Promise<void> {
  // Clears any possible values assigned `breedList`
  ppData.breedsList.length = 0;

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
      ppData.breedsList.push({
        name: breed.name,
        id: breed.id,
      } as BreedID);
    }
    // Stores `breedList` for future use
    writeData(ppData);
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}

async function populateBreedsList(breedsList: BreedID[]): Promise<void> {
  await fetchBreedsList();
  for (const breed of breedsList) {
    // Creates 'option' element for each breed
    const $optionBreed: HTMLOptionElement = document.createElement('option');
    if (!$optionBreed) throw new Error('$optionBreed does not exist');
    $optionBreed.className = 'breeds-list-breed';
    $optionBreed.value = breed.id.toString();
    $optionBreed.textContent = breed.name;

    // Appends the `option` element to the drop-down list
    $selectBreedsList.append($optionBreed);
  }
}

async function fetchBreedInfo(breedID: number): Promise<void> {
  try {
    // Initiate a fetch request and await its response
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/${breedID}`,
    );

    // Ensure the response status indicates success
    if (!response.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Await the parsing of the response body as JSON
    breedInfo = (await response.json()) as BreedInfo;
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}

// Obtains random images of the breed
async function fetchBreedImages(breedID: number): Promise<void> {
  try {
    // Initiate a fetch request and await its response
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${breedID}&include_breeds=true&limit=25`,
    );

    // Ensure the response status indicates success
    if (!response.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Await the parsing of the response body as JSON
    breedImages = await response.json();
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}

async function populateBreedInfo(breedInfo: BreedInfo): Promise<void> {
  // Clears the div of any previous breed queries
  if (!$divBreedInfo) throw new Error('divBreedInfo does not exist');
  $divBreedInfo.innerHTML = '';

  // Adds a div element for breed name
  const $divBreedName = document.createElement('div') as HTMLDivElement;
  $divBreedName.className = 'flex breed-info-name';
  const $iBreedNameStar = document.createElement('i') as HTMLElement;
  let favoriteBreed = false;
  for (let i = 0; i < ppData.favoritesList.length; i++) {
    if (ppData.favoritesList[i].id === breedInfo.id) {
      favoriteBreed = true;
    }
  }
  if (favoriteBreed === true) {
    $iBreedNameStar.className = 'fa-solid fa-star breed-info-name-star';
  } else {
    $iBreedNameStar.className = 'fa-regular fa-star breed-info-name-star';
  }
  console.log('ppData:', ppData);
  const $divBreedNameTitle = document.createElement('div') as HTMLDivElement;
  $divBreedNameTitle.className = 'flex breed-info-name-title-div';
  const $h2BreedNameTitle = document.createElement('h2') as HTMLElement;
  $h2BreedNameTitle.className = 'breed-info-name-title-h2';
  $h2BreedNameTitle.textContent = `${breedInfo.name}`;
  $divBreedName.append($iBreedNameStar);
  $divBreedNameTitle.append($h2BreedNameTitle);
  $divBreedName.append($divBreedNameTitle);
  $divBreedInfo.append($divBreedName);

  // Adds a div element for breed weight
  const $divBreedWeight = document.createElement('div') as HTMLDivElement;
  $divBreedWeight.className = 'breed-info-details breed-info-weight';
  const $divBreedWeightLabel = document.createElement('div') as HTMLDivElement;
  $divBreedWeightLabel.className = 'breed-info-weight-label breed-info-label';
  $divBreedWeightLabel.textContent = 'Weight: ';
  const $divBreedWeightValue = document.createElement('div') as HTMLDivElement;
  $divBreedWeightValue.className = 'breed-info-weight-value';
  const $divBreedWeightImperial = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedWeightImperial.className = 'breed-info-weight-imperial';
  if (!breedInfo.weight) throw new Error('breedInfo.weight does not exist');
  $divBreedWeightImperial.textContent = `• Imperial: ${breedInfo.weight.imperial}`;
  const $divBreedWeightMetric = document.createElement('div') as HTMLDivElement;
  $divBreedWeightMetric.className = 'breed-info-weight-metric';
  $divBreedWeightMetric.textContent = `• Metric: ${breedInfo.weight.metric}`;
  $divBreedWeightValue.append($divBreedWeightImperial);
  $divBreedWeightValue.append($divBreedWeightMetric);
  $divBreedWeight.append($divBreedWeightLabel);
  $divBreedWeight.append($divBreedWeightValue);
  $divBreedInfo.append($divBreedWeight);

  // Adds a div element for breed height
  const $divBreedHeight = document.createElement('div') as HTMLDivElement;
  $divBreedHeight.className = 'breed-info-details breed-info-height';
  const $divBreedHeightLabel = document.createElement('div') as HTMLDivElement;
  $divBreedHeightLabel.className = 'breed-info-height-label breed-info-label';
  $divBreedHeightLabel.textContent = 'Height: ';
  const $divBreedHeightValue = document.createElement('div') as HTMLDivElement;
  $divBreedHeightValue.className = 'breed-info-height-value';
  const $divBreedHeightImperial = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedHeightImperial.className = 'breed-info-height-imperial';
  if (!breedInfo.height) throw new Error('$breedInfo.height does not exist');
  $divBreedHeightImperial.textContent = `• Imperial: ${breedInfo.height.imperial}`;
  const $divBreedHeightMetric = document.createElement('div') as HTMLDivElement;
  $divBreedHeightMetric.className = 'breed-info-height-metric';
  $divBreedHeightMetric.textContent = `• Metric: ${breedInfo.height.metric}`;
  $divBreedHeightValue.append($divBreedHeightImperial);
  $divBreedHeightValue.append($divBreedHeightMetric);
  $divBreedHeight.append($divBreedHeightLabel);
  $divBreedHeight.append($divBreedHeightValue);
  $divBreedInfo.append($divBreedHeight);

  // Adds a div element for breed life span
  const $divBreedLifeSpan = document.createElement('div') as HTMLDivElement;
  $divBreedLifeSpan.className = 'breed-info-details breed-info-life-span';
  const $divBreedLifeSpanLabel = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedLifeSpanLabel.className =
    'breed-info-life-span-label breed-info-label';
  $divBreedLifeSpanLabel.textContent = 'Life Span: ';
  const $divBreedLifeSpanValue = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedLifeSpanValue.className = 'breed-info-life-span-value';
  $divBreedLifeSpanValue.textContent = `${breedInfo.life_span}`;
  $divBreedLifeSpan.append($divBreedLifeSpanLabel);
  $divBreedLifeSpan.append($divBreedLifeSpanValue);
  $divBreedInfo.append($divBreedLifeSpan);

  // Adds a div element for breed temperament
  const $divBreedTemperament = document.createElement('div') as HTMLDivElement;
  $divBreedTemperament.className = 'breed-info-details breed-info-temperament';
  const $divBreedTemperamentLabel = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedTemperamentLabel.className =
    'breed-info-temperament-label breed-info-label';
  $divBreedTemperamentLabel.textContent = 'Temperament: ';
  const $divBreedTemperamentValue = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedTemperamentValue.className = 'breed-info-temperament-value';
  if (!breedInfo.temperament) {
    $divBreedTemperamentValue.textContent = 'N/A';
  } else {
    $divBreedTemperamentValue.textContent = `${breedInfo.temperament}`;
  }
  $divBreedTemperament.append($divBreedTemperamentLabel);
  $divBreedTemperament.append($divBreedTemperamentValue);
  $divBreedInfo.append($divBreedTemperament);

  // Adds a div element for breed group
  const $divBreedGroup = document.createElement('div') as HTMLDivElement;
  $divBreedGroup.className = 'breed-info-details breed-info-breed-group';
  const $divBreedGroupLabel = document.createElement('div') as HTMLDivElement;
  $divBreedGroupLabel.className =
    'breed-info-breed-group-label breed-info-label';
  $divBreedGroupLabel.textContent = 'Breed Group: ';
  const $divBreedGroupValue = document.createElement('div') as HTMLDivElement;
  $divBreedGroupValue.className = 'breed-info-breed-group-value';
  if (!breedInfo.breed_group) {
    $divBreedGroupValue.textContent = 'N/A';
  } else {
    $divBreedGroupValue.textContent = `${breedInfo.breed_group}`;
  }
  $divBreedGroup.append($divBreedGroupLabel);
  $divBreedGroup.append($divBreedGroupValue);
  $divBreedInfo.append($divBreedGroup);

  // Adds a div element for breed bred for
  const $divBreedBredFor = document.createElement('div') as HTMLDivElement;
  $divBreedBredFor.className = 'breed-info-details breed-info-breed-bred-for';
  const $divBreedBredForLabel = document.createElement('div') as HTMLDivElement;
  $divBreedBredForLabel.className =
    'breed-info-breed-bred-for-label breed-info-label';
  $divBreedBredForLabel.textContent = 'Bred For: ';
  const $divBreedBredForValue = document.createElement('div') as HTMLDivElement;
  $divBreedBredForValue.className = 'breed-info-breed-bred-for-value';
  if (!breedInfo.bred_for) {
    $divBreedBredForValue.textContent = 'N/A';
  } else {
    $divBreedBredForValue.textContent = `${breedInfo.bred_for}`;
  }
  $divBreedBredFor.append($divBreedBredForLabel);
  $divBreedBredFor.append($divBreedBredForValue);
  $divBreedInfo.append($divBreedBredFor);

  // Adds a div element for breed country code
  const $divBreedCountyCode = document.createElement('div') as HTMLDivElement;
  $divBreedCountyCode.className =
    'breed-info-details breed-info-breed-country-code';
  const $divBreedCountyCodeLabel = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedCountyCodeLabel.className =
    'breed-info-breed-country-code-label breed-info-label';
  $divBreedCountyCodeLabel.textContent = 'Country Code: ';
  const $divBreedCountyCodeValue = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedCountyCodeValue.className = 'breed-info-breed-country-code-value';
  if (!breedInfo.country_code) {
    $divBreedCountyCodeValue.textContent = 'N/A';
  } else {
    $divBreedCountyCodeValue.textContent = `${breedInfo.country_code}`;
  }
  $divBreedCountyCode.append($divBreedCountyCodeLabel);
  $divBreedCountyCode.append($divBreedCountyCodeValue);
  $divBreedInfo.append($divBreedCountyCode);

  // Adds a div element for breed origin
  const $divBreedOrigin = document.createElement('div') as HTMLDivElement;
  $divBreedOrigin.className = 'breed-info-details breed-info-breed-origin';
  const $divBreedOriginLabel = document.createElement('div') as HTMLDivElement;
  $divBreedOriginLabel.className =
    'breed-info-breed-origin-label breed-info-label';
  $divBreedOriginLabel.textContent = 'Origin: ';
  const $divBreedOriginValue = document.createElement('div') as HTMLDivElement;
  $divBreedOriginValue.className = 'breed-info-breed-origin-value';
  if (!breedInfo.origin) {
    $divBreedOriginValue.textContent = 'N/A';
  } else {
    $divBreedOriginValue.textContent = `${breedInfo.origin}`;
  }
  $divBreedOrigin.append($divBreedOriginLabel);
  $divBreedOrigin.append($divBreedOriginValue);
  $divBreedInfo.append($divBreedOrigin);

  // Adds a div element for breed history
  const $divBreedHistory = document.createElement('div') as HTMLDivElement;
  $divBreedHistory.className = 'breed-info-details breed-info-breed-history';
  const $divBreedHistoryLabel = document.createElement('div') as HTMLDivElement;
  $divBreedHistoryLabel.className =
    'breed-info-breed-history-label breed-info-label';
  $divBreedHistoryLabel.textContent = 'History: ';
  const $divBreedHistoryValue = document.createElement('div') as HTMLDivElement;
  $divBreedHistoryValue.className = 'breed-info-breed-history-value';
  if (!breedInfo.history) {
    $divBreedHistoryValue.textContent = 'N/A';
  } else {
    $divBreedHistoryValue.textContent = `${breedInfo.history}`;
  }
  $divBreedHistory.append($divBreedHistoryLabel);
  $divBreedHistory.append($divBreedHistoryValue);
  $divBreedInfo.append($divBreedHistory);

  // Adds a div element for breed description
  const $divBreedDescription = document.createElement('div') as HTMLDivElement;
  $divBreedDescription.className =
    'breed-info-details breed-info-breed-description';
  const $divBreedDescriptionLabel = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedDescriptionLabel.className =
    'breed-info-breed-description-label breed-info-label';
  $divBreedDescriptionLabel.textContent = 'Description: ';
  const $divBreedDescriptionValue = document.createElement(
    'div',
  ) as HTMLDivElement;
  $divBreedDescriptionValue.className = 'breed-info-breed-description-value';
  if (!breedInfo.description) {
    $divBreedDescriptionValue.textContent = 'N/A';
  } else {
    $divBreedDescriptionValue.textContent = `${breedInfo.description}`;
  }
  $divBreedDescription.append($divBreedDescriptionLabel);
  $divBreedDescription.append($divBreedDescriptionValue);
  $divBreedInfo.append($divBreedDescription);

  // Adds a div element for breed images
  const $divBreedImages = document.createElement('div') as HTMLDivElement;
  $divBreedImages.className = 'breed-info-breed-images';
  const $divBreedImagesLabel = document.createElement('div') as HTMLDivElement;
  $divBreedImagesLabel.className =
    'breed-info-breed-images-label breed-info-label';
  $divBreedImagesLabel.textContent = 'Additional Images: ';
  const $divBreedImagesValue = document.createElement('div') as HTMLDivElement;
  $divBreedImagesValue.className = 'breed-info-breed-images-value';

  // Adds random images of the breed
  if (!breedInfo) throw new Error('breedInfo does not exist');
  await fetchBreedImages(breedInfo.id);
  let numImg = 0;
  for (let i = 0; numImg < 6 && i < breedImages.length; i++) {
    try {
      const response = await fetch(breedImages[i].url);
      if (!response.ok) {
        throw new Error('Image is not available');
      } else {
        const $imgBreedImage = document.createElement('img');
        $imgBreedImage.src = breedImages[i].url;
        $imgBreedImage.className = 'breed-info-breed-images-additional';
        $divBreedImagesValue.append($imgBreedImage);
        numImg++;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  $divBreedImages.append($divBreedImagesLabel);
  $divBreedImages.append($divBreedImagesValue);
  $divBreedInfo.append($divBreedImages);
}

async function populateFavorites(favoritesList: BreedIDImage[]): Promise<void> {
  try {
    const response = await fetch(
      `https://cdn2.thedogapi.com/images/${favoritesList[0].reference_image_id}.jpg`,
    );
    if (!response.ok) {
      throw new Error(`Image is unavailable. Status: ${response.status}`);
    } else {
      $imgFavoritesPageImage.src = `https://cdn2.thedogapi.com/images/${favoritesList[0].reference_image_id}.jpg`;
    }
  } catch (error) {
    $imgFavoritesPageImage.src = 'images/image-unavailable-icon.avif';
    console.error('Error:', error);
  }

  // Clears the div of previous favorites list
  if (!$divFavoritesList) throw new Error('divBreedInfo does not exist');
  $divFavoritesList.innerHTML = '';

  // Create a listing for a favorite breeds
  for (let i = 0; i < favoritesList.length; i++) {
    const $divFavBreedRow = document.createElement('div') as HTMLDivElement;
    $divFavBreedRow.className = 'flex favorite-breed-row';
    const $divFavBreedInfo = document.createElement('div') as HTMLDivElement;
    $divFavBreedInfo.className = 'flex favorite-breed-info';
    const $divFavBreedInfoName = document.createElement(
      'div',
    ) as HTMLDivElement;
    $divFavBreedInfoName.className = 'favorite-breed-info-name';
    $divFavBreedInfoName.textContent = `${favoritesList[i].name}`;
    const $imgFavBreedImage = document.createElement('img') as HTMLImageElement;
    $imgFavBreedImage.className = 'favorite-breed-info-image';
    $imgFavBreedImage.src = `https://cdn2.thedogapi.com/images/${favoritesList[i].reference_image_id}.jpg`;
    $divFavBreedInfo.append($divFavBreedInfoName);
    $divFavBreedInfo.append($imgFavBreedImage);
    $divFavBreedRow.append($divFavBreedInfo);
    $divFavoritesList.append($divFavBreedRow);
  }
}

populateBreedsList(ppData.breedsList);
populateFavorites(ppData.favoritesList);
console.log(ppData);

$selectBreedsList.addEventListener('change', async (event: Event) => {
  const eventTarget = event.target as HTMLOptionElement;
  if (!eventTarget.value) {
    $imgBreedsPageImage.src = 'images/breeds-page-image.jpg';
    $divBreedInfo.innerHTML = '';
  } else {
    await fetchBreedInfo(Number(eventTarget.value));
    populateBreedInfo(breedInfo);
    try {
      const response = await fetch(
        `https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`,
      );
      if (!response.ok) {
        throw new Error(`Image is unavailable. Status: ${response.status}`);
      } else {
        $imgBreedsPageImage.src = `https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`;
      }
    } catch (error) {
      $imgBreedsPageImage.src = 'images/image-unavailable-icon.avif';
      console.error('Error:', error);
    }
  }
});

$divBreedInfo.addEventListener('click', (event: Event) => {
  // if (!ppData.favoritesList)
  //   throw new Error('ppData.favoritesList does not exist');
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.classList.contains('fa-star')) {
    if (eventTarget.classList.contains('fa-regular')) {
      eventTarget.className = 'fa-solid fa-star breed-info-name-star';
      ppData.favoritesList.push({
        name: breedInfo.name,
        id: breedInfo.id,
        reference_image_id: breedInfo.reference_image_id,
      } as BreedIDImage);
    } else {
      eventTarget.className = 'fa-regular fa-star breed-info-name-star';
      for (let i = 0; i < ppData.favoritesList.length; i++) {
        if (breedInfo.id === ppData.favoritesList[i].id) {
          ppData.favoritesList.splice(i, 1);
        }
      }
    }
  }
  writeData(ppData);
});

$ulNavBarNav.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  for (const view of $dataViews) {
    const $viewHTMLElement = view as HTMLElement;
    if ($viewHTMLElement.dataset.view === eventTarget.id) {
      $viewHTMLElement.className = 'view';
    } else {
      $viewHTMLElement.className = 'view hidden';
    }
  }
});
