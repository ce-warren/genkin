class Tree {
    constructor() {
        this.names = [] // array of Person objects
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
    constructor(_name) {
        this.name = _name;
        this.partner = '';
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
        this.photos.push(photo)
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
        this.videos.push(video)
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
        this.audios.push(audio)
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
        this.texts.push(text)
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
}

function renderPage() {
    const container = document.getElementById('main-container')
    const lowerDiv = document.createElement('div')
    lowerDiv.className = 'row'

    const form = document.createElement('div')
    form.id = 'form'
    form.className = 'col-4'
    lowerDiv.appendChild(form)
    const graph = document.createElement('div')
    graph.id = 'graph'
    graph.className = 'col-8'
    lowerDiv.appendChild(graph)

    container.appendChild(lowerDiv)
}

function renderGraph(current_id, root) {
    //the initial current_id is graph
    //the global variable is rootTree
    //currently, the tree is being rebuilt with each submission

    const area = document.getElementById(current_id); //the parent graph
    area.appendChild(newGraph(root));
    return area; //the final complete list containing the family tree
}


function newGraph (graph) {
    const level = document.createElement('ul');
    for (i of graph.names) {
        const newLevel = document.createElement('li');
        newLevel.innerText = i.name;
        if (i.hasParent()) {
            //recursively creates a new list
            for (j of graph.subtree) {
                newLevel.appendChild(newGraph(j));
            }   
        }
        level.appendChild(newLevel)
    }
    return level;
}

function checkForChildren(treeList) {
    // return false if no trees hav no lower trees (is the highest branch of family tree)
    for (tree of treeList) {
        for (person of tree.names) {
            if (person.subtree !== []) {
                return true
            }
        }
    }
    return false
}

function changeName(person) {

}

function addMedia(person) {

}

function addPartner(person) {

}

function addSibling(person) {

}

function addParent(person) {

}

function deleteUser(person) {

}

function createPersonDiv(person) {

}

function renderForm() {
    const form = document.getElementById('form')
    let treeList = [rootTree]
    ind = 0

    do {
        let newTreeList = []
        ind += 1
        const generation = document.createElement('div')
        generation.id = 'gen-' + ind
        generation.className = 'generation'
        form.appendChild(generation)

        for (tree of treeList) {
            for (person of tree.names) {
                newTreeList = newTreeList.concat(person.subtree)

                const personDiv = document.createElement('div')
                personDiv.className = 'person-div'
                generation.appendChild(personDiv)

                const inputBox = document.createElement('input')
                inputBox.type = 'text'
                inputBox.value = person.name
                personDiv.appendChild(inputBox)
                personDiv.appendChild(document.createElement('br'))

                const nameButton = document.createElement('button')
                nameButton.id = 'name-button'
                nameButton.innerHTML = 'Change Name'
                nameButton.addEventListener('click', function () {changeName(inputBox.value)})
                personDiv.appendChild(nameButton)

                const mediaButton = document.createElement('button')
                mediaButton.innerHTML = 'Add Media'
                mediaButton.id = 'media-button'
                mediaButton.addEventListener('click', function() {addMedia(person)})
                personDiv.appendChild(mediaButton)

                const parentButton = document.createElement('button')
                parentButton.innerHTML = 'Add Parent'
                parentButton.id = 'parent-button'
                parentButton.addEventListener('click', function() {addParent(person)})
                personDiv.appendChild(parentButton)

                const partnerButton = document.createElement('button')
                partnerButton.innerHTML = 'Add Partner'
                partnerButton.addEventListener('click', function() {addPartner(person)})
                personDiv.append(partnerButton)
                if (person.partner === '' || person.partner === null) {
                    partnerButton.id = 'partner-button'
                }
                else {
                    partnerButton.id = 'partner-button-inactive'
                }

                const siblingButton = document.createElement('button')
                siblingButton.innerHTML = 'Add Sibling'
                siblingButton.id = 'sibling-button'
                siblingButton.addEventListener('click', function() {addSibling(person)})
                personDiv.appendChild(siblingButton)

                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'Delete This Person'
                deleteButton.id = 'delete-button'
                deleteButton.addEventListener('click', function() {deleteUser(person)})
                personDiv.appendChild(deleteButton)
            }
        }
        treeList = newTreeList
    }
    while (checkForChildren(treeList));

    //renderGraph()
}

function renderMediaGallery() {
       
}

let rootTree;

function getTree(tree) {
    //transforms tree models into Tree objects
    let newTree = new Tree();
    for (i of tree.names) {
        get('/api/person', {'_id': i}, function(person) {
            let p = new Person(person.name)
            newTree.addName(p)
            p.partner = person.partner;
            p.photos = person.photos;
            p.videos = person.videos;
            p.audios = person.audios;
            p.texts = person.texts;
            for (j of person.subtree) {
                get('/api/tree', {'_id':j}, function(tree2) {
                    p.addSubtree(getTree(tree2));
                })
            }
        })
    }
    return newTree;
}


function renderStuff() {
    // this is a placeholder function - because of asynchronous stuff, if you call these render functions directly in the
    // main method, it runs before the data is loaded - unsure how to fix this, so for now, click "Add Generation"
    renderForm()
}


function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {
        const title = document.getElementById('title-place')
        title.innerHTML = 'Tree Builder | ' + tree.creator_name
        renderPage()
        rootTree = getTree(tree)
        
        const but = document.getElementById("add-nav-button")
        but.addEventListener('click', renderStuff)
        //renderForm()
    });
} ;

main();