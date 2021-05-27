console.log("This is my Dictionary");

// Grab the searchBtn 
let searchBtn = document.getElementById("searchBtn");

// Add event listener to searchBtn 
searchBtn.addEventListener('click', () => {
    // Grab the text in search bar 
    let word = document.getElementById("searchBar");


    // Create a Xhr variable
    const xhr1 = new XMLHttpRequest();

    // Assign the word in the URL 
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word.value}`
    xhr1.open('GET', url, true);

    // On loading create the following function 
    xhr1.onload = function () {

        // Parsing the response JSON text and assign the resultant to obj
        let obj = JSON.parse(this.responseText)[0];

        // Grab the container 
        let container = document.getElementById("container");

        // Grab the audio file 
        let audio = new Audio(obj.phonetics[0].audio, 100, false);

        // if it is SUCCESS 
        if (this.status === 200) {

            // Clear the container for next search 
            container.innerHTML = ``;

            // Create the first "Word" div box
            container.innerHTML = `
            <div class="card-body bg-light d-flex align-items-center rounded-2 shadow my-4">
                <h1 class="card-title mx-3">${obj.word}</h1>
                <h5 class="card-text" style="color: grey;">${obj.phonetics[0].text}</h5>
                <button id="audioBtn" type="button" class="btn btn-light mx-4">🔊</button>
            </div>`

            //Run a loop to assign the meanings 
            obj.meanings.forEach(element => {
                container.innerHTML += `
                    <div id="Box${element.partOfSpeech}" class="card-body bg-light rounded-2 shadow my-4 px-3 d-flex flex-column">
                        <h1 class="card-title mx-2">${element.partOfSpeech.charAt(0).toUpperCase() + element.partOfSpeech.slice(1)}</h1>
                        <hr>
                        <h3 class="card-text mx-3">Definitions :</h3>
                        <ul id="list${element.partOfSpeech}" class="card-text mx-3" style="font-size: 1.5rem;"></ul>
                        <hr>
                    </div>`

                let flag = 0;
                // Assign definitions and their examples to each partOfSpeech 
                element.definitions.forEach(e => {
                    // li and p for definition and example 
                    let listItem = document.createElement("li");
                    listItem.className = "my-3";
                    let para = document.createElement("p");
                    para.style.color = "grey";
                    let list = document.getElementById(`list${element.partOfSpeech}`); //To create a unique ID for each partOfSpeechlist

                    listItem.innerText = e.definition;
                    para.innerText = `e.g. ${e.example}`;
                    
                    list.appendChild(listItem);
                    if(para.innerText != `e.g. undefined`)
                    {
                        list.appendChild(para);
                    }

                    let partOfSpeechBox = document.getElementById(`Box${element.partOfSpeech}`); //To create a unique ID for each partOfSpeechBox

                    let SynonymHead = document.createElement("h3");
                    let SynonymPara = document.createElement("para");
                    
                    // Assigning classes and text  to Heading and para
                    SynonymHead.className = "card-text";
                    SynonymHead.className = "mx-3";
                    SynonymHead.innerText = `Synonyms :`
                    
                    SynonymPara.className = "card-text";
                    SynonymPara.className = "mx-3";
                    SynonymPara.style.color = "grey";
                    SynonymPara.style.fontSize = "1.5rem"; 

                    let Paratext = `- `;
                    if(e.synonyms != undefined)
                    {  
                        e.synonyms.forEach(es => {
                            if(es != undefined)
                            {
                                Paratext += es + ` ,`;
                            }
                        });
                        SynonymPara.innerText = Paratext.replace(/.$/,".");
                        // As to print the headig only once in a Box 
                        if (flag == 0){
                            partOfSpeechBox.appendChild(SynonymHead);
                            flag = 1;
                        }
                        // Printing the synonym list 
                        partOfSpeechBox.appendChild(SynonymPara);
                    }
    
                    
                });

            });
        }

        // if it is failure 
        else{
            // Assign an alert 
            console.log("Some error occurred !");
        }

        let audioBtn = document.getElementById("audioBtn");
        audioBtn.addEventListener('click', () => {
            audio.play();
        })

    }

    // Sending the request 
    xhr1.send();

    // Reset the searchbar after clicking on the searchBtn 
    word.value = "";


})
