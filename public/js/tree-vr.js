function renderTitle(user) {
    const title = document.getElementById('title-place')
    title.innerHTML = 'VR | ' + user.name

    const headingDiv = document.getElementById('user-heading');
    const heading = document.createElement('h1');
    heading.innerHTML = user.name;
    heading.id = 'user-name'
    headingDiv.appendChild(heading);
}

function main() {
    const tree = window.location.search.substring(1);
    get('/api/tree', {'_id': tree}, function(currentTree) {
        get('api/user', {'_id': currentTree.creator_id}, function(user) {
            renderTitle(user)
        });
    });
};

main();