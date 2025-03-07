// interface Weight {
//   imperial: string;
//   metric: string;
// }

// interface Height {
//   imperial: string;
//   metric: string;
// }

// interface BreedInfo {
//   id?: number;
//   name?: string;
//   weight?: Weight;
//   height?: Height;
//   life_span?: string;
//   reference_image_id?: string;
//   temperament?: string;
//   breed_group?: string;
//   bred_for?: string;
//   country_code?: string;
//   origin?: string;
//   history?: string;
//   description?: string;
// }

// const $selectBreedsList = document.querySelector(
//   '.breeds-list',
// ) as HTMLSelectElement;
// if (!$selectBreedsList) throw new Error('$selectBreedsList does not exist');

// const $divBreedInfo = document.querySelector('.breed-info') as HTMLDivElement;

// let breedInfo: BreedInfo = {};

// function populateBreedsList(breedsList: BreedID[]): void {
//   for (const breed of breedsList) {
//     // Creates 'option' element for each breed
//     const $optionBreed: HTMLOptionElement = document.createElement('option');
//     if (!$optionBreed) throw new Error('$optionBreed does not exist');
//     $optionBreed.className = 'breeds-list-breed';
//     $optionBreed.value = breed.id.toString();
//     $optionBreed.textContent = breed.name;

//     // Appends the `option` element to the drop-down list
//     $selectBreedsList.append($optionBreed);
//   }
// }

// async function fetchBreedInfo(breedID: number): Promise<void> {
//   try {
//     // Initiate a fetch request and await its response
//     const response = await fetch(
//       `https://api.thedogapi.com/v1/breeds/${breedID}`,
//     );

//     // Ensure the response status indicates success
//     if (!response.ok) {
//       // If the status code is not in the successful range, throw an error
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // Await the parsing of the response body as JSON
//     breedInfo = (await response.json()) as BreedInfo;
//   } catch (error) {
//     // Log any errors that arise during the fetch operation
//     console.error('Error:', error);
//   }
// }

// function populateBreedInfo(breedInfo: BreedInfo): void {
//   // Clears the div of any previous breed queries
//   if (!$divBreedInfo) throw new Error('divBreedInfo does not exist');
//   $divBreedInfo.innerHTML = '';

//   // Adds a div element for breed name
//   const $divBreedName = document.createElement('div') as HTMLDivElement;
//   $divBreedName.className = 'breed-info-name';
//   $divBreedName.textContent = `${breedInfo.name}`;
//   $divBreedInfo.append($divBreedName);

//   // Adds a div element for breed weight
//   const $divBreedWeight = document.createElement('div') as HTMLDivElement;
//   $divBreedWeight.className = 'breed-info-weight';
//   const $divBreedWeightLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedWeightLabel.className = 'breed-info-weight-label';
//   $divBreedWeightLabel.textContent = 'Weight:&nbsp;';
//   const $divBreedWeightValue = document.createElement('div') as HTMLDivElement;
//   $divBreedWeightValue.className = 'breed-info-weight-value';
//   const $divBreedWeightImperial = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedWeightImperial.className = 'breed-info-weight-imperial';
//   if (!breedInfo.weight) throw new Error('breedInfo.weight does not exist');
//   $divBreedWeightImperial.textContent = `&bull;Imperial: ${breedInfo.weight.imperial}`;
//   const $divBreedWeightMetric = document.createElement('div') as HTMLDivElement;
//   $divBreedWeightMetric.className = 'breed-info-weight-metric';
//   $divBreedWeightMetric.textContent = `&bull;Metric: ${breedInfo.weight.metric}`;
//   $divBreedWeightValue.append($divBreedWeightImperial);
//   $divBreedWeightValue.append($divBreedWeightMetric);
//   $divBreedWeight.append($divBreedWeightLabel);
//   $divBreedWeight.append($divBreedWeightValue);
//   $divBreedInfo.append($divBreedWeight);

//   // Adds a div element for breed height
//   const $divBreedHeight = document.createElement('div') as HTMLDivElement;
//   $divBreedHeight.className = 'breed-info-height';
//   const $divBreedHeightLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedHeightLabel.className = 'breed-info-height-label';
//   $divBreedHeightLabel.textContent = 'Height:&nbsp;';
//   const $divBreedHeightValue = document.createElement('div') as HTMLDivElement;
//   $divBreedHeightValue.className = 'breed-info-height-value';
//   const $divBreedHeightImperial = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedHeightImperial.className = 'breed-info-height-imperial';
//   if (!breedInfo.height) throw new Error('$breedInfo.height does not exist');
//   $divBreedHeightImperial.textContent = `&bull;Imperial: ${breedInfo.height.imperial}`;
//   const $divBreedHeightMetric = document.createElement('div') as HTMLDivElement;
//   $divBreedHeightMetric.className = 'breed-info-height-metric';
//   $divBreedHeightMetric.textContent = `&bull;Metric: ${breedInfo.height.metric}`;
//   $divBreedHeightValue.append($divBreedHeightImperial);
//   $divBreedHeightValue.append($divBreedHeightMetric);
//   $divBreedHeight.append($divBreedHeightLabel);
//   $divBreedHeight.append($divBreedHeightValue);
//   $divBreedInfo.append($divBreedHeight);

//   // Adds a div element for breed life span
//   const $divBreedLifeSpan = document.createElement('div') as HTMLDivElement;
//   $divBreedLifeSpan.className = 'breed-info-life-span';
//   const $divBreedLifeSpanLabel = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedLifeSpanLabel.className = 'breed-info-life-span-label';
//   $divBreedLifeSpanLabel.textContent = 'Life Span:&nbsp;';
//   const $divBreedLifeSpanValue = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedLifeSpanValue.className = 'breed-info-breed-group-value';
//   $divBreedLifeSpanValue.textContent = `${breedInfo.life_span}`;
//   $divBreedLifeSpan.append($divBreedLifeSpanLabel);
//   $divBreedLifeSpan.append($divBreedLifeSpanValue);
//   $divBreedInfo.append($divBreedLifeSpan);

//   // Adds a div element for breed temperament
//   const $divBreedTemperament = document.createElement('div') as HTMLDivElement;
//   $divBreedTemperament.className = 'breed-info-temperament';
//   const $divBreedTemperamentLabel = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedTemperamentLabel.className = 'breed-info-temperament-label';
//   $divBreedTemperamentLabel.textContent = 'Temperament:&nbsp;';
//   const $divBreedTemperamentValue = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedTemperamentValue.className = 'breed-info-temperament-value';
//   if (!breedInfo.temperament) {
//     $divBreedTemperamentValue.textContent = 'N/A';
//   } else {
//     $divBreedTemperamentValue.textContent = `${breedInfo.temperament}`;
//   }
//   $divBreedTemperament.append($divBreedTemperamentLabel);
//   $divBreedTemperament.append($divBreedTemperamentValue);
//   $divBreedInfo.append($divBreedTemperament);

//   // Adds a div element for breed group
//   const $divBreedGroup = document.createElement('div') as HTMLDivElement;
//   $divBreedGroup.className = 'breed-info-breed-group';
//   const $divBreedGroupLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedGroupLabel.className = 'breed-info-breed-group-label';
//   $divBreedGroupLabel.textContent = 'Breed Group:&nbsp;';
//   const $divBreedGroupValue = document.createElement('div') as HTMLDivElement;
//   $divBreedGroupValue.className = 'breed-info-breed-group-value';
//   if (!breedInfo.breed_group) {
//     $divBreedGroupValue.textContent = 'N/A';
//   } else {
//     $divBreedGroupValue.textContent = `${breedInfo.breed_group}`;
//   }
//   $divBreedGroup.append($divBreedGroupLabel);
//   $divBreedGroup.append($divBreedGroupValue);
//   $divBreedInfo.append($divBreedGroup);

//   // Adds a div element for breed bred for
//   const $divBreedBredFor = document.createElement('div') as HTMLDivElement;
//   $divBreedBredFor.className = 'breed-info-breed-bred-for';
//   const $divBreedBredForLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedBredForLabel.className = 'breed-info-breed-bred-for-label';
//   $divBreedBredForLabel.textContent = 'Bred For:&nbsp;';
//   const $divBreedBredForValue = document.createElement('div') as HTMLDivElement;
//   $divBreedBredForValue.className = 'breed-info-breed-bred-for-value';
//   if (!breedInfo.bred_for) {
//     $divBreedBredForValue.textContent = 'N/A';
//   } else {
//     $divBreedBredForValue.textContent = `${breedInfo.bred_for}`;
//   }
//   $divBreedBredFor.append($divBreedBredForLabel);
//   $divBreedBredFor.append($divBreedBredForValue);
//   $divBreedInfo.append($divBreedBredFor);

//   // Adds a div element for breed country code
//   const $divBreedCountyCode = document.createElement('div') as HTMLDivElement;
//   $divBreedCountyCode.className = 'breed-info-breed-country-code';
//   const $divBreedCountyCodeLabel = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedCountyCodeLabel.className = 'breed-info-breed-country-code-label';
//   $divBreedCountyCodeLabel.textContent = 'Country Code:&nbsp;';
//   const $divBreedCountyCodeValue = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedCountyCodeValue.className = 'breed-info-breed-country-code-value';
//   if (!breedInfo.country_code) {
//     $divBreedCountyCodeValue.textContent = 'N/A';
//   } else {
//     $divBreedCountyCodeValue.textContent = `${breedInfo.country_code}`;
//   }
//   $divBreedCountyCode.append($divBreedCountyCodeLabel);
//   $divBreedCountyCode.append($divBreedCountyCodeValue);
//   $divBreedInfo.append($divBreedCountyCode);

//   // Adds a div element for breed origin
//   const $divBreedOrigin = document.createElement('div') as HTMLDivElement;
//   $divBreedOrigin.className = 'breed-info-breed-origin';
//   const $divBreedOriginLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedOriginLabel.className = 'breed-info-breed-origin-label';
//   $divBreedOriginLabel.textContent = 'Origin:&nbsp;';
//   const $divBreedOriginValue = document.createElement('div') as HTMLDivElement;
//   $divBreedOriginValue.className = 'breed-info-breed-origin-value';
//   if (!breedInfo.origin) {
//     $divBreedOriginValue.textContent = 'N/A';
//   } else {
//     $divBreedOriginValue.textContent = `${breedInfo.origin}`;
//   }
//   $divBreedOrigin.append($divBreedOriginLabel);
//   $divBreedOrigin.append($divBreedOriginValue);
//   $divBreedInfo.append($divBreedOrigin);

//   // Adds a div element for breed history
//   const $divBreedHistory = document.createElement('div') as HTMLDivElement;
//   $divBreedHistory.className = 'breed-info-breed-history';
//   const $divBreedHistoryLabel = document.createElement('div') as HTMLDivElement;
//   $divBreedHistoryLabel.className = 'breed-info-breed-history-label';
//   $divBreedHistoryLabel.textContent = 'History:&nbsp;';
//   const $divBreedHistoryValue = document.createElement('div') as HTMLDivElement;
//   $divBreedHistoryValue.className = 'breed-info-breed-history-value';
//   if (!breedInfo.origin) {
//     $divBreedHistoryValue.textContent = 'N/A';
//   } else {
//     $divBreedHistoryValue.textContent = `${breedInfo.origin}`;
//   }
//   $divBreedHistory.append($divBreedHistoryLabel);
//   $divBreedHistory.append($divBreedHistoryValue);
//   $divBreedInfo.append($divBreedHistory);

//   // Adds a div element for breed description
//   const $divBreedDescription = document.createElement('div') as HTMLDivElement;
//   $divBreedDescription.className = 'breed-info-breed-description';
//   const $divBreedDescriptionLabel = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedDescriptionLabel.className = 'breed-info-breed-description-label';
//   $divBreedDescriptionLabel.textContent = 'Description:&nbsp;';
//   const $divBreedDescriptionValue = document.createElement(
//     'div',
//   ) as HTMLDivElement;
//   $divBreedDescriptionValue.className = 'breed-info-breed-description-value';
//   if (!breedInfo.origin) {
//     $divBreedDescriptionValue.textContent = 'N/A';
//   } else {
//     $divBreedDescriptionValue.textContent = `${breedInfo.origin}`;
//   }
//   $divBreedDescription.append($divBreedDescriptionLabel);
//   $divBreedDescription.append($divBreedDescriptionValue);
//   $divBreedInfo.append($divBreedDescription);
// }

// breedInfo = {
//   weight: { imperial: '6 - 13', metric: '3 - 6' },
//   height: { imperial: '9 - 11.5', metric: '23 - 29' },
//   id: 1,
//   name: 'Affenpinscher',
//   bred_for: 'Small rodent hunting, lapdog',
//   breed_group: 'Toy',
//   life_span: '10 - 12 years',
//   temperament: 'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
//   origin: 'Germany, France',
//   reference_image_id: 'BJa4kxc4X',
// };

// if (!ppData.breedsList) throw new Error('ppData.breedsList does not exist');
// populateBreedsList(ppData.breedsList);

// $selectBreedsList.addEventListener('click', (event: Event) => {
//   const eventTarget = event.target as HTMLOptionElement;

//   if (!eventTarget.value) {
//   } else {
//     fetchBreedInfo(Number(eventTarget.value));
//     populateBreedInfo(breedInfo);
//   }
// });
