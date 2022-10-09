/*
= Variables
*/
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search");
const contentArea = document.getElementById("content");

/*
= Functions
*/
searchBtn.onclick = searchWordMeaning;

async function searchWordMeaning() {
  let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchField.value}`);
  let parsedResponse = await response.json();
  console.log(parsedResponse);

  /*
  * Displaying the search results in details
  */
  contentArea.innerHTML = `<h2>${parsedResponse[0].word}</h2>`;

  const totalPartsOfSpeech = parsedResponse[0].meanings.length;
  const meanings = parsedResponse[0].meanings;

  // Displaying parts of speech , definitions , synonyms and antonyms
  for (let i = 0; i < totalPartsOfSpeech; i++) {
    // Dispalying Parts of speech
    contentArea.innerHTML += `<h3>${meanings[i].partOfSpeech}</h3>`;

    const totalDefinitions = meanings[i].definitions.length;
    const definitions = meanings[i].definitions;

    // Displaying the definitioins
    for (let j = 0; j < totalDefinitions; j++) {
      contentArea.innerHTML += `
      <p>
       ${j + 1}.
       <i>${definitions[j].definition}</i>
      </p>\n`;
    }

    const totalSynonyms = meanings[i].synonyms.length;
    const synonyms = meanings[i].synonyms;

    // Displaying the synonyms
    if (totalSynonyms > 0) {
      contentArea.innerHTML += `<h4>Synonyms</h4>`;
      for (let k = 0; k < totalSynonyms; k++) {
        contentArea.innerHTML += `${synonyms[k]} | `;
      }

      const totalAntonyms = meanings[i].antonyms.length;
      const antonyms = meanings[i].antonyms;

      // Displaying the antonyms
      if (totalAntonyms > 0) {
        contentArea.innerHTML += `<h4>Antonyms</h4>`;
        for (let l = 0; l < totalAntonyms; l++) {
          contentArea.innerHTML += `${antonyms[l]} | `;
        }
      }

    }

  }
}