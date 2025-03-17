'use strict';
const $selectBreedsList = document.querySelector('.breeds-list');
if (!$selectBreedsList) throw new Error('$selectBreedsList does not exist');
const $imgBreedsPageImage = document.querySelector('.breeds-page-image');
if (!$imgBreedsPageImage) throw new Error('$imgBreedsPageImage does not exist');
const $divBreedInfo = document.querySelector('.breed-info');
let breedInfo = {
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
};
let breedImages = [];
function populateBreedsList(breedsList) {
  for (const breed of breedsList) {
    // Creates 'option' element for each breed
    const $optionBreed = document.createElement('option');
    if (!$optionBreed) throw new Error('$optionBreed does not exist');
    $optionBreed.className = 'breeds-list-breed';
    $optionBreed.value = breed.id.toString();
    $optionBreed.textContent = breed.name;
    // Appends the `option` element to the drop-down list
    $selectBreedsList.append($optionBreed);
  }
}
async function fetchBreedInfo(breedID) {
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
    breedInfo = await response.json();
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}
// Obtains random images of the breed
async function fetchBreedImages(breedID) {
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
    console.log('breedImages:', breedImages);
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}
async function populateBreedInfo(breedInfo) {
  // Clears the div of any previous breed queries
  if (!$divBreedInfo) throw new Error('divBreedInfo does not exist');
  $divBreedInfo.innerHTML = '';
  // Adds a div element for breed name
  const $h2BreedName = document.createElement('h2');
  $h2BreedName.className = 'breed-info-name';
  $h2BreedName.textContent = `${breedInfo.name}`;
  $divBreedInfo.append($h2BreedName);
  // Adds a div element for breed weight
  const $divBreedWeight = document.createElement('div');
  $divBreedWeight.className = 'breed-info-details breed-info-weight';
  const $divBreedWeightLabel = document.createElement('div');
  $divBreedWeightLabel.className = 'breed-info-weight-label breed-info-label';
  $divBreedWeightLabel.textContent = 'Weight: ';
  const $divBreedWeightValue = document.createElement('div');
  $divBreedWeightValue.className = 'breed-info-weight-value';
  const $divBreedWeightImperial = document.createElement('div');
  $divBreedWeightImperial.className = 'breed-info-weight-imperial';
  if (!breedInfo.weight) throw new Error('breedInfo.weight does not exist');
  $divBreedWeightImperial.textContent = `• Imperial: ${breedInfo.weight.imperial}`;
  const $divBreedWeightMetric = document.createElement('div');
  $divBreedWeightMetric.className = 'breed-info-weight-metric';
  $divBreedWeightMetric.textContent = `• Metric: ${breedInfo.weight.metric}`;
  $divBreedWeightValue.append($divBreedWeightImperial);
  $divBreedWeightValue.append($divBreedWeightMetric);
  $divBreedWeight.append($divBreedWeightLabel);
  $divBreedWeight.append($divBreedWeightValue);
  $divBreedInfo.append($divBreedWeight);
  // Adds a div element for breed height
  const $divBreedHeight = document.createElement('div');
  $divBreedHeight.className = 'breed-info-details breed-info-height';
  const $divBreedHeightLabel = document.createElement('div');
  $divBreedHeightLabel.className = 'breed-info-height-label breed-info-label';
  $divBreedHeightLabel.textContent = 'Height: ';
  const $divBreedHeightValue = document.createElement('div');
  $divBreedHeightValue.className = 'breed-info-height-value';
  const $divBreedHeightImperial = document.createElement('div');
  $divBreedHeightImperial.className = 'breed-info-height-imperial';
  if (!breedInfo.height) throw new Error('$breedInfo.height does not exist');
  $divBreedHeightImperial.textContent = `• Imperial: ${breedInfo.height.imperial}`;
  const $divBreedHeightMetric = document.createElement('div');
  $divBreedHeightMetric.className = 'breed-info-height-metric';
  $divBreedHeightMetric.textContent = `• Metric: ${breedInfo.height.metric}`;
  $divBreedHeightValue.append($divBreedHeightImperial);
  $divBreedHeightValue.append($divBreedHeightMetric);
  $divBreedHeight.append($divBreedHeightLabel);
  $divBreedHeight.append($divBreedHeightValue);
  $divBreedInfo.append($divBreedHeight);
  // Adds a div element for breed life span
  const $divBreedLifeSpan = document.createElement('div');
  $divBreedLifeSpan.className = 'breed-info-details breed-info-life-span';
  const $divBreedLifeSpanLabel = document.createElement('div');
  $divBreedLifeSpanLabel.className =
    'breed-info-life-span-label breed-info-label';
  $divBreedLifeSpanLabel.textContent = 'Life Span: ';
  const $divBreedLifeSpanValue = document.createElement('div');
  $divBreedLifeSpanValue.className = 'breed-info-life-span-value';
  $divBreedLifeSpanValue.textContent = `${breedInfo.life_span}`;
  $divBreedLifeSpan.append($divBreedLifeSpanLabel);
  $divBreedLifeSpan.append($divBreedLifeSpanValue);
  $divBreedInfo.append($divBreedLifeSpan);
  // Adds a div element for breed temperament
  const $divBreedTemperament = document.createElement('div');
  $divBreedTemperament.className = 'breed-info-details breed-info-temperament';
  const $divBreedTemperamentLabel = document.createElement('div');
  $divBreedTemperamentLabel.className =
    'breed-info-temperament-label breed-info-label';
  $divBreedTemperamentLabel.textContent = 'Temperament: ';
  const $divBreedTemperamentValue = document.createElement('div');
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
  const $divBreedGroup = document.createElement('div');
  $divBreedGroup.className = 'breed-info-details breed-info-breed-group';
  const $divBreedGroupLabel = document.createElement('div');
  $divBreedGroupLabel.className =
    'breed-info-breed-group-label breed-info-label';
  $divBreedGroupLabel.textContent = 'Breed Group: ';
  const $divBreedGroupValue = document.createElement('div');
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
  const $divBreedBredFor = document.createElement('div');
  $divBreedBredFor.className = 'breed-info-details breed-info-breed-bred-for';
  const $divBreedBredForLabel = document.createElement('div');
  $divBreedBredForLabel.className =
    'breed-info-breed-bred-for-label breed-info-label';
  $divBreedBredForLabel.textContent = 'Bred For: ';
  const $divBreedBredForValue = document.createElement('div');
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
  const $divBreedCountyCode = document.createElement('div');
  $divBreedCountyCode.className =
    'breed-info-details breed-info-breed-country-code';
  const $divBreedCountyCodeLabel = document.createElement('div');
  $divBreedCountyCodeLabel.className =
    'breed-info-breed-country-code-label breed-info-label';
  $divBreedCountyCodeLabel.textContent = 'Country Code: ';
  const $divBreedCountyCodeValue = document.createElement('div');
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
  const $divBreedOrigin = document.createElement('div');
  $divBreedOrigin.className = 'breed-info-details breed-info-breed-origin';
  const $divBreedOriginLabel = document.createElement('div');
  $divBreedOriginLabel.className =
    'breed-info-breed-origin-label breed-info-label';
  $divBreedOriginLabel.textContent = 'Origin: ';
  const $divBreedOriginValue = document.createElement('div');
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
  const $divBreedHistory = document.createElement('div');
  $divBreedHistory.className = 'breed-info-details breed-info-breed-history';
  const $divBreedHistoryLabel = document.createElement('div');
  $divBreedHistoryLabel.className =
    'breed-info-breed-history-label breed-info-label';
  $divBreedHistoryLabel.textContent = 'History: ';
  const $divBreedHistoryValue = document.createElement('div');
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
  const $divBreedDescription = document.createElement('div');
  $divBreedDescription.className =
    'breed-info-details breed-info-breed-description';
  const $divBreedDescriptionLabel = document.createElement('div');
  $divBreedDescriptionLabel.className =
    'breed-info-breed-description-label breed-info-label';
  $divBreedDescriptionLabel.textContent = 'Description: ';
  const $divBreedDescriptionValue = document.createElement('div');
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
  const $divBreedImages = document.createElement('div');
  $divBreedImages.className = 'breed-info-breed-images';
  const $divBreedImagesLabel = document.createElement('div');
  $divBreedImagesLabel.className =
    'breed-info-breed-images-label breed-info-label';
  $divBreedImagesLabel.textContent = 'Additional Images: ';
  const $divBreedImagesValue = document.createElement('div');
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
if (!ppData.breedsList) throw new Error('ppData.breedsList does not exist');
populateBreedsList(ppData.breedsList);
$selectBreedsList.addEventListener('change', async (event) => {
  const eventTarget = event.target;
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
