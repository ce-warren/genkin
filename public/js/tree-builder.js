import { Tree } from '../../src/models/tree.js';

// + button to add ring (create new html object or just change visual on singe object?)

// name button to allow name input (?) - maybe click ring to add new name, double-click to edit name?

// media button to add media

// render AR/VR buttons (take to another page with reroute? but also pass in data for specific tree)
// - really just make the buttons links

// actually render the whole thing
function renderTitle(treeTitle) {
    // basically put the tree name somewhere on the page
}

function renderTree(tree) {
    let treeRings = [[tree.names, tree.mediaDict]];
    let thisTree = tree;
    while (thisTree.child !== undefined) {
        treeRings.append([thisTree.names, thisTree.mediaDict]);
        thisTree = thisTree.child;
    };
};

function main() {
    const treeTitle = window.location.search.substring(1);
    get('/api/tree', {'title': treeTitle}, function(tree) {
        renderTitle(tree.title)
        renderTree(tree.tree_object);
      });
} 

main();