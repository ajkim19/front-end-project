function populateBreedsList(breedsList: BreedID[]): void {
  // Locates the target `select` element
  const $selectBreedsList = document.querySelector(
    '.breeds-list',
  ) as HTMLSelectElement;
  if (!$selectBreedsList) throw new Error('$selectBreedsList does not exist');

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

if (!ppData.breedsList) throw new Error('ppData.breedsList does not exist');
populateBreedsList(ppData.breedsList);
