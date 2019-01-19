class Tree {
    constructor() {
        this.names = [] // array of Person objects
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
    constructor(_name) {
        this.name = _name
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
        this.subtrees.splice(index,1)
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
    form.className = 'col-4'
    lowerDiv.appendChild(form)
    const graph = document.createElement('div')
    graph.className = 'col-8'
    lowerDiv.appendChild(graph)

    container.appendChild(lowerDiv)
}

function renderGraph() {

}

function renderForm(name) {


    renderGraph()
}

function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {
        const title = document.getElementById('title-place')
        title.innerHTML = 'Tree Builder | ' + tree.creator_name
        renderPage()
        renderForm()
        let rootTree = new Tree
        tree.addName()
    });
} ;

main();