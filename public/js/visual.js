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
let mediaDict = {} // dictionary structure: entry for each person; each entry is a dict with keys photos, videos, audios, texts,
    // each a list containing html elements

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
        partnership.innerHTML = '<a class="tree-name-box" id="' + i.id + '">' + i.name + '</a>'
        partnership.addEventListener('click', function() {getMedia(partnership.id)})
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

function loadMedia (id) {
    mediaDict[id] = {
        'photos': [],
        'videos': [],
        'audios': [],
        'texts': []
    }

    for (photoID of personDict[id].photos) {
        get('/api/image', {'_id': photoID}, function(image) {
            const imageHolder = document.createElement('img')
            imageHolder.src = 'data:image;base64,' + btoa(image.data)
            imageHolder.setAttribute('class','photo-holder media-holder')
            mediaDict[id]['photos'].push(imageHolder)
        })
    }

    for (videoID of personDict[id].videos) {
        get('/api/video', {'_id': videoID}, function(video) {
            const videoHolder = document.createElement('video')
            videoHolder.setAttribute('controls', '')
            const videoSource = document.createElement('source')
            videoSource.src = 'data:video;base64,' + btoa(video.data)
            videoSource.type = video.type
            videoHolder.appendChild(videoSource)
            videoHolder.setAttribute('class','video-holder media-holder')
            mediaDict[id]['videos'].push(videoHolder)
        })
    }

    for (audioID of personDict[id].audios) {
        get('/api/audio', {'_id': audioID}, function(audio) {
            const audioHolder = document.createElement('audio')
            audioHolder.setAttribute('controls', '')
            const audioSource = document.createElement('source')
            audioSource.src = 'data:audio;base64,' + btoa(audio.data)
            audioSource.type = audio.type
            audioHolder.appendChild(audioSource)
            audioHolder.setAttribute('class','audio-holder media-holder')
            mediaDict[id]['audios'].push(audioHolder)
        })
    }

    for (textID of personDict[id].texts) {
        get('/api/text', {'_id': textID}, function(text) {
            const textHolder = document.createElement('div')
            pList = text.data.split(/(\r\n|\n|\r)/gm)
            for (i of pList) {
                const textP = document.createElement('p')
                textP.innerHTML = i
                textHolder.appendChild(textP)
            }
            textHolder.setAttribute('class','text-holder media-holder')
            mediaDict[id]['texts'].push(textHolder)
        })
    }
}

function getMedia (id) {
    // render all media on page when person's name is clicked
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

            siblingList = tree.contributor_names
            const title = document.getElementById('title-place')
            title.innerHTML = 'Tree Builder | ' + tree.creator_name
            
            rootTree = getTree(tree)
            setTimeout(function(){
                renderGraph(rootTree);
                let count = 0
                for (thing in databaseObjects) {count ++;}
                lenDatabase = count
                setTimeout (function() {
                    for (person in personDict) {
                        loadMedia(person)
                    }
                }, 1000)
            }, 1000);

        });
    });
};

main();