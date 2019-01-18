// + button to add ring (create new html object or just change visual on singe object?)

// name button to allow name input (?) - maybe click ring to add new name, double-click to edit name?

// media button to add media

// render AR/VR buttons (take to another page with reroute? but also pass in data for specific tree)
// - really just make the buttons links
// do this thing again: creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.creator_id);

// actually render the whole thing

function renderTree(tree) {

    // wait and see about exact data structure - below no longer works

    /* let treeRings = [[tree.names, tree.mediaDict]];
    let thisTree = tree;
    while (thisTree.child !== undefined) {
        treeRings.append([thisTree.names, thisTree.mediaDict]);
        thisTree = thisTree.child;
    }; */

    // graphics - depends on how the AR stuff works, should it be in HTML circle divs? how would text work?
};

function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {
        renderTree(tree.tree_object);
        const title = document.getElementById('title-place')
        title.innerHTML = 'Tree Builder | ' + tree.creator_name
    });
} ;

main();