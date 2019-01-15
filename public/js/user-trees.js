function treeDOMObject(treeJSON) {
    const card = document.createElement('div');
    card.setAttribute('id', treeJSON.title);
    card.className = 'tree-card';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);
  
    const titleSpan = document.createElement('a');
    titleSpan.className = 'tree-title';
    titleSpan.innerHTML = treeJSON.title;
    titleSpan.setAttribute('href', '/tree-builder?' + treeJSON.title); //'/u/profile?' + storyJSON.creatorid); // DOES THIS WORK?
    cardBody.appendChild(titleSpan);

    // add image or graphic?

    return card;
}

function renderTreeCards(user) {
    const treesDiv = document.getElementById('MAIN BODY ID'); // HTML REFERENCE NEEDED
    get('/api/trees', {creator_id: req.user}, function(treesArr) {
        for (let i = 0; i < treesArr.length; i++) {
            const currentTree = treesArr[i];
            treesDiv.prepend(treeDOMObject(currentTree));
    }
  });
}

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        renderTreeCards(profileUser);
    });
}

main()