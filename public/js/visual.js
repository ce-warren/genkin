function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        const title = document.getElementById('title-place')
        title.innerHTML = 'My Tree | ' + profileUser.name
    });
};

main();