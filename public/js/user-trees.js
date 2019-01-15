// add an event lister for clicking that opens the tree editor with a tree-specific parameter, or maybe just href

// also add divs for each tree ala feed.js

// new tree card
function treeDOMObject(treeJSON) {
    const card = document.createElement('div');
    card.setAttribute('id', treeJSON.id);
    card.className = 'tree-card';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);
  
    const titleSpan = document.createElement('a');
    titleSpan.className = 'tree-title';
    titleSpan.innerHTML = treeJSON.title;
    titleSpan.setAttribute('href', '/tree-builder?' + treeJSON.title); //'/u/profile?' + storyJSON.creatorid); // DOES THIS WORK?
    cardBody.appendChild(titleSpan);
  
    /* const contentSpan = document.createElement('img');
    contentSpan.className = 'story-content card-text';
    contentSpan.innerHTML = storyJSON.content;
    cardBody.appendChild(contentSpan); */

    // add image

    return card;
}

// main function
function renderTreeCards(user) {
    const treesDiv = document.getElementById('MAIN BODY ID'); // HTML REFERENCE NEEDED
    get('/api/tree', {}, function(treesArr) { // get('/api/stories', {}, function(treesArr) { where does "api/stories" go?
        for (let i = 0; i < treesArr.length; i++) {
            const currentTree = treesArr[i];
            treesDiv.prepend(treeDOMObject(currentTree));
    }
  });
}
  