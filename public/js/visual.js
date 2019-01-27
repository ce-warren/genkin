class Tree {
    constructor() {
        this.names = [] // array of Person objects
        this.id = treeIDCounter.toString();
        treeIDCounter ++;
    }

    addName(name) {
        this.names.push(name)
    }

    removeName(name) {
        for (i in this.names) {
            if (this.names[i] === name) {
                this.names.splice(i,1);
                break;
            }
        }
    }
}

class Person {
    constructor(_name, _id) {
        this.name = _name;
        this.id = _id
        this.partner = null; // an ID of the person object
        this.subtree = [] // array of tree objects - one for each parent (geneologically), should add their siblings into the tree
        this.photos = []
        this.videos = []
        this.audios = []
        this.texts = []
    }

    addSubtree(tree) {
        this.subtree.push(tree)
    }

    removeSubtree(index) {
        this.subtree.splice(index,1)
    }

    addPhoto(photo) {

        if (!this.photos.includes(photo)) {
            this.photos.push(photo)
        }
    }

    removePhoto(photo) {
        for (i in this.photos) {
            if (this.photos[i] === photo) {
                this.photos.splice(i,1)
                break;
            }
        }
    }

    addVideo(video) {
        if (!this.videos.includes(video)) {
            this.videos.push(video)
        }
    }

    removeVideo(video) {
        for (i in this.videos) {
            if (this.videos[i] === video) {
                this.videos.splice(i,1)
                break;
            }
        }
    }

    addAudio(audio) {
        if (!this.audios.includes(audio)) {
            this.audios.push(audio)
        }
    }

    removeAudio(audio) {
        for (i in this.audios) {
            if (this.audios[i] === audio) {
                this.audios.splice(i,1)
                break;
            }
        }
    }

    addText(text) {
        if (!this.texts.includes(text)) {
            this.texts.push(text)
        }
    }

    removeText(text) {
        for (i in this.texts) {
            if (this.texts[i] === text) {
                this.texts.splice(i,1)
                break;
            }
        }
    }

    hasParent() {
        return this.subtree.length > 0; //if the Person has parents to be represented in the subtree
    }

    hasPartner() {
        return !this.partner;
    }
}

let rootTree;
let personDict = {}; // a list of ids mapped to person objects
let treeList = [] // a list of all trees
let databaseObjects = {}; // a list created of all models during getTree (so you know what to delete)
let idCounter = 0;
let treeIDCounter = 0;
let siblingList = []

function getTree(tree) {
    //transforms tree models into Tree objects
    let newTree = new Tree();
    for (i of tree.names) {
        get('/api/person', {'_id': i}, function(person) {
            databaseObjects[person._id] = 'person'
            let p = new Person(person.name, person._id)
            personDict[person._id] = p
            newTree.addName(p)
            p.partner = person.partner;
            p.photos = person.photos;
            p.videos = person.videos;
            p.audios = person.audios;
            p.texts = person.texts;
            for (j of person.subtree) {
                get('/api/tree', {'_id':j}, function(tree2) {
                    databaseObjects[tree2._id] = 'tree'
                    newTreeObject = getTree(tree2)
                    p.addSubtree(newTreeObject);
                    treeList.push(newTreeObject)
                })
            }
        })
    }
    treeList.push(newTree)
    return newTree;
}

function renderGraph(root) {
    //the initial current_id is graph
    //the global variable is rootTree
    //currently, the tree is being rebuilt with each submission
    document.getElementById('tree').innerHTML = ''
    document.getElementById('tree').appendChild(newGraph(root));
}

function newGraph (graph) {
    //to create an entire graph from scratch 
    const level = document.createElement('ul');
    for (i of graph.names) {
        const newLevel = document.createElement('li');
        const partnership = document.createElement('div');
        partnership.className = 'partners';
        partnership.innerHTML = '<a href="#">' + i.name + '</a>'
        // might need below code, depending on how partner graphing is implemented
        /* if (i.partner === null || i.partner === undefined) {
            partnership.innerHTML = '<a href="#">' + i.name + '</a>'
        }
        else {
            partnership.innerHTML = '<a href="#">' + i.name + '</a><a href="#">' + personDict[i.partner].name + '</a>'
        }*/
        if (i.subtree.length > 0) {
            //recursively creates a new list
            let newTree = new Tree();
            for (j of i.subtree) {
                for (k of j.names) {
                    newTree.addName(k)
                }
            }
            partnership.appendChild(newGraph(newTree))  
        }
        newLevel.appendChild(partnership);
        level.appendChild(newLevel);
    }
    return level;
}

function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {

        get('api/user', {'_id': tree.creator_id}, function(user) {
            const headingDiv = document.getElementById('user-heading');
            const heading = document.createElement('h1');
            heading.innerHTML = user.name;
            heading.id = 'user-name'
            headingDiv.appendChild(heading);

            const container = document.getElementById('main-container')
            const loader = document.createElement('div')
            loader.className = 'loader'
            loader.id = 'loader-main'
            container.prepend(loader)

            siblingList = tree.contributor_names
            const title = document.getElementById('title-place')
            title.innerHTML = 'Tree Builder | ' + tree.creator_name
            
            rootTree = getTree(tree)
            setTimeout(function(){
                document.getElementById('main-container').removeChild(document.getElementById('loader-main'))
                renderGraph(rootTree);
                let count = 0
                for (thing in databaseObjects) {count ++;}
                lenDatabase = count
            }, 1000);
        });
    });
};

main();