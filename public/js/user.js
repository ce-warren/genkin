function createTree() { // sketchy
    user_id = window.location.search.substring(1)

    post('/api/tree', {});

    get('/api/trees', {'tree_object': [], 'creator_id': user_id}, function(trees) {
        console.log(trees)
        window.location.assign('/tree-builder?' + trees[0]._id);
    });
};

function hrefButtons(user) {
    const myTrees = document.getElementById('my-trees-link');
    myTrees.href = '/user-trees?' + user._id;

    const media = document.getElementById('media-link');
    media.href = '/media-gallery?' + user._id;

    const newTree = document.getElementById('new-tree-link');
    newTree.addEventListener('click', createTree);
};

function renderHeading(user) {
    const headingDiv = document.getElementById('user-heading');
    const heading = document.createElement('h1');
    heading.innerHTML = user.name;
    heading.id = 'user-name'
    headingDiv.appendChild(heading);
};

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        renderHeading(profileUser);
        hrefButtons(profileUser);
    });
};

main()