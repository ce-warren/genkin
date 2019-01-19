import { prependOnceListener } from "cluster";

class Tree {
    constructor() {
        this.names = [] // array of Person objects
    }

    addName(name) {
        this.names.push(name)
    }

    removeName(name) {
        for (let i in this.names) {
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
        this.partner = undefined;
        this.subtree = [] // array of tree objects - one for each parent (geneologically), should add their siblings into the tree
        this.photos = []
        this.videos = []
        this.audios = []
        this.texts = []
    }

    addSubtree() {
        this.subtree.push(new Tree)
    }

    removeSubtree(index) {
        this.subtree.splice(index,1)
    }

    addPhoto(photo) {
        this.photos.push(photo)
    }

    removePhoto(photo) {
        for (let i in this.photos) {
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
        for (let i in this.videos) {
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
        for (let i in this.audios) {
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
        for (let i in this.texts) {
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
    for (let i of graph.names) {
        const newLevel = document.createElement('li');
        newLevel.innerText = i.name;
        if (i.hasParent()) {
            //recursively creates a new list
            for (let j of graph.subtree) {
                newLevel.appendChild(newGraph(j));
            }   
        }
        level.appendChild(newLevel)
    }
    return level;
}

function checkForChildren(treeList) {
    // return true if no trees hav no lower trees (is the highest branch of family tree)
    for (let tree of treeList) {
        for (person of tree.names) {
            if (person.subtree !== []) {
                return false
            }
        }
    }
    return true
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

        for (let tree of treeList) {
            for (let person of tree.names) {
                newTreeList = newTreeList + person.subtree

                const personDiv = document.createElement('div')
                personDiv.className = 'person-div'
                generation.appendChild(personDiv)

                const inputBox = document.createElement('input')
                inputBox.type = 'text'
                inputBox.value = person.name
                personDiv.appendChild(inputBox)

                const nameButton = document.createElement('button')
                nameButton.id = 'name-button'
                nameButton.value = 'Change Name'
                nameButton.addEventListener('click', function () {changeName(inputBox.value)})
                personDiv.appendChild(nameButton)

                const mediaButton = document.createElement('button')
                mediaButton.value = 'Add Media'
                mediaButton.id = 'media-button'
                mediaButton.addEventListener('click', function() {addMedia(person)})
                personDiv.appendChild(mediaButton)

                const parentButton = document.createElement('button')
                parentButton.value = 'Add Parent'
                parentButton.id = 'parent-button'
                parentButton.addEventListener('click', function() {addParent(person)})
                personDiv.appendChild(parentButton)

                if (person.partner !== undefined) {
                    const partnerButton = document.createElement('button')
                    partnerButton.value = 'Add Partner'
                    partnerButton.id = 'partner-button'
                    partnerButton.addEventListener('click', function() {addPartner(person)})
                    personDiv.append(partnerButton)
                }

                const siblingButton = document.createElement('button')
                siblingButton.value = 'Add Sibling'
                siblingButton.id = 'sibling-button'
                siblingButton.addEventListener('click', function() {addSibling(person)})
                personDiv.appendChild(siblingButton)

                const deleteButton = document.createElement('button')
                deleteButton.value = 'Delete This Person'
                deleteButton.id = 'delete-button'
                deleteButton.addEventListener('click', function() {deleteUser(person)})
                personDiv.appendChild(deleteButton)
            }
        }
        treeList = newTreeList
    }
    while (checkForChildren(treeList));

    renderGraph()
}

let rootTree = new Tree()

function getTree(tree) {

}

function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {
        const title = document.getElementById('title-place')
        title.innerHTML = 'Tree Builder | ' + tree.creator_name
        renderPage()
        // somewhere gotta read prev data from db, then read data into db (SAVE button somewhere)
        rootTree.addName(tree.creator_name)
        renderForm()
    });
} ;

main();