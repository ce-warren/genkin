class Tree {
    constructor() {
        this.names = [] // array of Person objects - siblings
    }

    addName(name) {
        this.names.append(name)
    }

    removeName(name) {
        for (i in this.names) {
            if (this.names[i] === name) {
                this.names.splice(i,1)
                break
            }
        }
    }
}

class Person {
    constructor(_name, partner) {
        this.name = _name
        this.partner = partner;
        this.subtree = [] // array of tree objects - one for each parent (geneologically), should add their siblings into the tree
        this.photos = []
        this.videos = []
        this.audios = []
        this.texts = []
    }

    addSubtree() {
        this.subtree.append(new Tree)
    }

    removeSubtree(index) {
        this.subtree.splice(index,1)
    }

    addPhoto(photo) {
        this.photos.append(photo)
    }

    removePhoto(photo) {
        for (i in this.photos) {
            if (this.photos[i] === photo) {
                this.photos.splice(i,1)
                break
            }
        }
    }

    addVideo(video) {
        this.videos.append(video)
    }

    removeVideo(video) {
        for (i in this.videos) {
            if (this.videos[i] === video) {
                this.videos.splice(i,1)
                break
            }
        }
    }

    addAudio(audio) {
        this.audios.append(audio)
    }

    removeAudio(audio) {
        for (i in this.audios) {
            if (this.audios[i] === audio) {
                this.audios.splice(i,1)
                break
            }
        }
    }

    addText(text) {
        this.texts.append(text)
    }

    removeText(text) {
        for (i in this.texts) {
            if (this.texts[i] === text) {
                this.texts.splice(i,1)
                break
            }
        }
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

let count = 0 //appended to graph id to specify the level of the graph

function renderGraph(current_id) {
    //the initial current_id is graph
    //the global variable is rootTree
    //currently, the tree is being rebuilt with each submission

    const area = document.getElementById(current_id); //the parent graph
    const current_graph = document.createElement('ul');
    for (let i of rootTree.names) {
        const newLevel = document.createElement('li');
        newLevel.innerText = i.name;


    }
}

function checkForChildren(treeList) {
    // return true if no trees hav no lower trees (is the highest branch of family tree)
    for (tree of treeList) {
        for (person of tree.names) {
            if (!this.subtree === []) {
                return false
            }
        }
    }
    return true
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
        form.append(generation)

        for (tree of treeList) {
            for (person of tree.names) {
                newTreeList = newTreeList + person.subtree
                const inputBox = document.createElement('input')
                inputBox.type = 'text'
                inputBox.value = person.name
            }
        }
    }
    while (checkForChildren(treeList));

    renderGraph()
}

let rootTree = new Tree()

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