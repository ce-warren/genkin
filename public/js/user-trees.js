function treeDOMObject(treeJSON) {
    const card = document.createElement('div');
    card.setAttribute('id', treeJSON._id);
    card.className = 'tree-card';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);
  
    const titleSpan = document.createElement('h6');
    titleSpan.className = 'tree-title';
    titleSpan.innerHTML = 'My Tree'; // uh how should we title it?
    
    cardBody.appendChild(titleSpan);

    // add image or graphic? maybe mini - vr?
    
    const buttonDiv = document.createElement('div')
    buttonDiv.className = 'tree-button-div row mt-4'
    cardBody.appendChild(buttonDiv)

    const editButtonDiv = document.createElement('div')
    editButtonDiv.className = 'col-6'
    const editButton = document.createElement('div')
    editButton.className = 'card-button'
    editButton.innerHTML = '<a href="/tree-builder?' + treeJSON._id + '">Edit</a>'
    editButtonDiv.appendChild(editButton)
    buttonDiv.appendChild(editButtonDiv)

    const renderButtonDiv = document.createElement('div')
    renderButtonDiv.className = 'col-6'
    const renderButton = document.createElement('div')
    renderButton.className = 'card-button'
    renderButton.innerHTML = '<a href="/visual?' + treeJSON._id + '">Show Tree</a>'
    renderButtonDiv.appendChild(renderButton)
    buttonDiv.appendChild(renderButtonDiv)

    /* const renderARButtonDiv = document.createElement('div')
    renderARButtonDiv.className = 'col-4'
    const renderARButton = document.createElement('div')
    renderARButton.className = 'card-button'
    renderARButton.innerHTML = '<a href="/tree-ar?' + treeJSON._id + '">AR</a>'
    renderARButtonDiv.appendChild(renderARButton)
    buttonDiv.appendChild(renderARButtonDiv)

    const renderVRButtonDiv = document.createElement('div')
    renderVRButtonDiv.className = 'col-4'
    const renderVRButton = document.createElement('div')
    renderVRButton.className = 'card-button'
    renderVRButton.innerHTML = '<a href="/tree-vr?' + treeJSON._id + '">VR</a>'
    renderVRButtonDiv.appendChild(renderVRButton)
    buttonDiv.appendChild(renderVRButtonDiv) */

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
    heading.innerHTML = user.name + "'s Trees";
    headingDiv.append(heading)

    const title = document.getElementById('title-place')
    title.innerHTML = 'Trees | ' + user.name
};

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        renderTreeCards(profileUser);
        renderHeading(profileUser);
    });
};

main();