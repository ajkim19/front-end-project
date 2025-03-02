'use strict';
function populateBreedsList(breedsList) {
  // Locates the target `select` element
  const $selectBreedsList = document.querySelector('.breeds-list');
  if (!$selectBreedsList) throw new Error('$selectBreedsList does not exist');
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
if (!ppData.breedsList) throw new Error('ppData.breedsList does not exist');
populateBreedsList(ppData.breedsList);
