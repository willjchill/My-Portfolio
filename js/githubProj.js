/*

    Note: I used a Github API tutorial 
    to setup some of the back-end content you see below! 

*/

// getting the scroll horizontal container
// so that I can add cards later on
const container = document.querySelector("#scroll-horizontal");

function requestUserRepos(username){
    
    // create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // When request is received
    // Process it here
    xhr.onload = function() {
    
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        // Log the response
        data.forEach((element) => {
            if(element.stargazers_count != 0) {
                // creating the card
                let myCard = document.createElement("div");
                myCard.className = "card";
                // creating the header
                let myCardHeader = document.createElement("div");
                myCardHeader.className = "card-header";
                let headernode = document.createTextNode(element.name); 
                myCardHeader.appendChild(headernode);
                // creating the description 
                let myCardDescription = document.createElement("div");
                myCardDescription.className = "card-description";
                let descriptionnode = document.createTextNode(element.description);
                myCardDescription.appendChild(descriptionnode);
                // creating the button
                let myCardButtonLink = document.createElement("a");
                myCardButtonLink.href = element.clone_url;
                myCardButtonLink.target = "_blank";
                let myCardButton = document.createElement("div");
                myCardButton.className = "card-button";
                let buttonnode = document.createTextNode("Learn More");
                myCardButton.appendChild(buttonnode);
                myCardButtonLink.appendChild(myCardButton);
                // attaching everything to card
                myCard.appendChild(myCardHeader);
                myCard.appendChild(myCardDescription);
                myCard.appendChild(myCardButtonLink);
                container.appendChild(myCard);
            }
        });
    }
    
    // Send the request to the server
    xhr.send();
}

requestUserRepos("willjchill");