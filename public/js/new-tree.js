// basically handle data from the form on "new-tree.html"  to create and store a new tree, then take you to tree builder

// notes for continuity:
// enforce titles being unique when creating a new tree (don't let them submit if the title exists, i.e.
// search mongodb and see if anything's returned)
// also make creator_id req.user