async function fetchData(): Promise<void> {
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

    // Successfully handle and output the JSON data
    console.log(breeds);
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error('Error:', error);
  }
}
fetchData();
