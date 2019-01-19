function createTree() {
    post('/api/tree', {'public': true}, function(tree) {
        window.location.assign('/tree-builder?' + tree._id);
    });
};

function toUserTrees() {
    window.location.assign('/user-trees?' + window.location.search.substring(1))
}

function toMedia() {
    window.location.assign('/media-gallery?' + window.location.search.substring(1))
}

function hrefButtons(user) {
    const myTrees = document.getElementById('my-trees-link');
    myTrees.addEventListener('click', toUserTrees)

    const media = document.getElementById('media-link');
    media.addEventListener('click', toMedia)

    const newTree = document.getElementById('new-tree-link');
    newTree.addEventListener('click', createTree);
};

function renderHeading(user) {
    const headingDiv = document.getElementById('user-heading');
    const heading = document.createElement('h1');
    heading.innerHTML = user.name;
    heading.id = 'user-name'
    headingDiv.appendChild(heading);

    const title = document.getElementById('title-place');
    title.innerHTML = user.name
};

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        renderHeading(profileUser);
        hrefButtons(profileUser);
    });
};

main();