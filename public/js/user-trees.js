function treeDOMObject(treeJSON) {
    const card = document.createElement('div');
    card.setAttribute('id', treeJSON.title);
    card.className = 'tree-card';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);
  
    const titleSpan = document.createElement('a');
    titleSpan.className = 'tree-title';
    titleSpan.innerHTML = 'My Tree'; // uh how should we title it?
    titleSpan.setAttribute('href', '/tree-builder?' + treeJSON._id);
    cardBody.appendChild(titleSpan);

    // add image or graphic? maybe mini - vr?

    return card;
};

function renderTreeCards(user) {
    const treesDiv = document.getElementById('user-trees-container');
    get('/api/user-trees', {'creator_id': user._id}, function(treesArr) {
        for (let i = 0; i < treesArr.length; i++) {
            const currentTree = treesArr[i];
            treesDiv.prepend(treeDOMObject(currentTree));
        };
    });
};

function renderHeading(user) {
    const headingDiv = document.getElementById('user-heading')
    const heading = document.createElement('h1')
    document.innerHTML = user.name + "'s Trees";
    headingDiv.append(heading)
};

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        renderTreeCards(profileUser);
        renderHeading(profileUser);
    });
};

main();