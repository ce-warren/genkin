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
    constructor(_name, _id) {
        this.name = _name;
        this.id = _id
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
    person.name = document.getElementById('input-box-'+person.id).value
    document.getElementById('name-label-'+person.id).innerHTML = person.name
}

function addPartner(person) {

}

function addSibling(person) {

}

function addParent(person) {

}

function deletePerson(person) {

}

function showButtons(id) {
    document.getElementById('name-label-'+id).style.display = 'none'
    document.getElementById('input-box-'+id).removeAttribute('style')
    document.getElementById('name-button-'+id).removeAttribute('style')
    document.getElementById('media-button-'+id).removeAttribute('style')
    document.getElementById('parent-button-'+id).removeAttribute('style')
    document.getElementById('partner-button-'+id).removeAttribute('style')
    document.getElementById('sibling-button-'+id).removeAttribute('style')
    document.getElementById('delete-button-'+id).removeAttribute('style')
    document.getElementById('show-button-'+id).style.display = 'none'
    document.getElementById('hide-button-'+id).removeAttribute('style')
}

function hideButtons(id) {
    document.getElementById('name-label-'+id).removeAttribute('style')
    document.getElementById('input-box-'+id).style.display = 'none'
    document.getElementById('name-button-'+id).style.display = 'none'
    document.getElementById('media-button-'+id).style.display = 'none'
    document.getElementById('parent-button-'+id).style.display = 'none'
    document.getElementById('partner-button-'+id).style.display = 'none'
    document.getElementById('sibling-button-'+id).style.display = 'none'
    document.getElementById('delete-button-'+id).style.display = 'none'
    document.getElementById('show-button-'+id).removeAttribute('style')
    document.getElementById('hide-button-'+id).style.display = 'none'
    
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
        form.prepend(generation)

        for (tree of treeList) {
            for (person of tree.names) {
                newTreeList = newTreeList.concat(person.subtree)

                const personDiv = document.createElement('div')
                personDiv.className = 'person-div'
                generation.appendChild(personDiv)

                const showButton = document.createElement('h4')
                showButton.innerHTML = '+'
                showButton.className = 'show-hide'
                showButton.id = 'show-button-' + person.id
                showButton.addEventListener('click', function() {showButtons(showButton.id.split('-').pop())})
                personDiv.append(showButton)

                const hideButton = document.createElement('h4')
                hideButton.innerHTML = '-'
                hideButton.className = 'show-hide'
                hideButton.id = 'hide-button-' + person.id
                hideButton.style.display = 'none'
                hideButton.addEventListener('click', function() {hideButtons(showButton.id.split('-').pop())})
                personDiv.append(hideButton)

                const nameLabel = document.createElement('h4')
                nameLabel.innerHTML = person.name
                nameLabel.id = 'name-label-' + person.id
                personDiv.appendChild(nameLabel)

                const inputBox = document.createElement('input')
                inputBox.type = 'text'
                inputBox.value = person.name
                inputBox.style.display = 'none'
                inputBox.id = 'input-box-' + person.id
                personDiv.appendChild(inputBox)
                personDiv.appendChild(document.createElement('br'))

                const nameButton = document.createElement('button')
                nameButton.className = 'name-button'
                nameButton.id = 'name-button-' + person.id
                nameButton.innerHTML = 'Change Name'
                nameButton.style.display = 'none'
                nameButton.addEventListener('click', function () {changeName(personDict[nameButton.id.split('-').pop()])})
                personDiv.appendChild(nameButton)

                const mediaButton = document.createElement('button')
                mediaButton.innerHTML = 'Add Media'
                mediaButton.className = 'media-button'
                mediaButton.id = 'media-button-' + person.id
                mediaButton.style.display = 'none'
                mediaButton.addEventListener('click', function() {addMedia(personDict[nameButton.id.split('-').pop()])})
                personDiv.appendChild(mediaButton)

                const parentButton = document.createElement('button')
                parentButton.innerHTML = 'Add Parent'
                parentButton.className = 'parent-button'
                parentButton.id = 'parent-button-' + person.id
                parentButton.style.display = 'none'
                parentButton.addEventListener('click', function() {addParent(person)})
                personDiv.appendChild(parentButton)

                const partnerButton = document.createElement('button')
                partnerButton.innerHTML = 'Add Partner'
                partnerButton.id = 'partner-button-' + person.id
                partnerButton.addEventListener('click', function() {addPartner(person)})
                partnerButton.style.display = 'none'
                personDiv.appendChild(partnerButton)
                if (person.partner === '' || person.partner === null) {
                    partnerButton.className = 'partner-button'
                }
                else {
                    partnerButton.className = 'partner-button-inactive'
                }

                const siblingButton = document.createElement('button')
                siblingButton.innerHTML = 'Add Sibling'
                siblingButton.className = 'sibling-button'
                siblingButton.id = 'sibling-button-' + person.id
                siblingButton.style.display = 'none'
                siblingButton.addEventListener('click', function() {addSibling(person)})
                personDiv.appendChild(siblingButton)

                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'Delete Person'
                deleteButton.className = 'delete-button'
                deleteButton.id = 'delete-button-' + person.id
                deleteButton.style.display = 'none'
                deleteButton.addEventListener('click', function() {deletePerson(person)})
                personDiv.appendChild(deleteButton)
            }
        }
        treeList = newTreeList
    }
    while (checkForChildren(treeList));

    //renderGraph()
}

let rootTree;
let personDict = {}; // a list of ids mapped to person objects

function getTree(tree) {
    //transforms tree models into Tree objects
    let newTree = new Tree();
    for (i of tree.names) {
        get('/api/person', {'_id': i}, function(person) {
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
    });
} ;

main();


//////////////// MEDIA GALLERY STUFF ////////////////


let currentTab;

function uploadPhoto() {
    const photo = document.getElementById('upload-selector').files

    if (photo.length !== 0) {
        dataType = photo[0].type
        fileReader = new FileReader()
        fileReader.readAsBinaryString(photo[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/image', {content:binData, type:dataType}, function(image) {
                showPhotos()
            });
        }  
    }
}

function showPhotos(user) {
    currentTab = 'photo'
    for (i of document.getElementsByClassName('media-nav-item')) {
        if (i.id === 'photos-tab') {
            i.setAttribute('class', 'nav-item media-nav-item current-nav-item')
        }
        else {
            i.setAttribute('class', 'nav-item media-nav-item')
        }
    }

    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''
    const loader = document.createElement('div')
    loader.className = 'loader'
    mediaContainer.appendChild(loader)

    // query database for all photos, display photos
    get('/api/images', {'creator_id': user._id}, function(images) {
        if (currentTab === 'photo') {
            for (image of images) {
                const imageHolder = document.createElement('img')
                imageHolder.src = 'data:image;base64,' + btoa(image.data)
                imageHolder.setAttribute('class','photo-holder media-holder')
                mediaContainer.appendChild(imageHolder)
            }
            loader.className = ''
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.prepend(inputArea)

    const label = document.createElement('label')
    label.setAttribute('for', 'upload-selector')
    label.className = 'custom-file-upload'
    label.innerHTML = 'Select File'
    inputArea.appendChild(label)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'image/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Photo';
    button.className = 'upload-button'
    button.addEventListener('click', uploadPhoto);
    inputArea.appendChild(button);
}

function uploadVideo() {
    const video = document.getElementById('upload-selector').files

    if (video.length !== 0) {
        dataType = video[0].type
        fileReader = new FileReader()
        fileReader.readAsBinaryString(video[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/video', {content:binData, type:dataType}, function(video) {
                console.log(video)
                showVideos()
            });
        }  
    }
}

function showVideos(user) {
    currentTab = 'video'
    for (i of document.getElementsByClassName('media-nav-item')) {
        if (i.id === 'videos-tab') {
            i.setAttribute('class', 'nav-item media-nav-item current-nav-item')
        }
        else {
            i.setAttribute('class', 'nav-item media-nav-item')
        }
    }
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''
    const loader = document.createElement('div')
    loader.className = 'loader'
    mediaContainer.appendChild(loader)

    // query database for all videos, display videos
    get('/api/videos', {'creator_id': user._id}, function(videos) {
        if (currentTab === 'video') {
            for (video of videos) {
                const videoHolder = document.createElement('video')
                videoHolder.setAttribute('controls', '')
                const videoSource = document.createElement('source')
                videoSource.src = 'data:video;base64,' + btoa(video.data)
                videoSource.type = video.type
                videoHolder.appendChild(videoSource)
                videoHolder.setAttribute('class','video-holder media-holder')
                mediaContainer.appendChild(videoHolder)
            }
            loader.className = ''
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.prepend(inputArea)

    const label = document.createElement('label')
    label.setAttribute('for', 'upload-selector')
    label.className = 'custom-file-upload'
    label.innerHTML = 'Select File'
    inputArea.appendChild(label)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'video/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Video';
    button.className = 'upload-button'
    button.addEventListener('click', uploadVideo);
    inputArea.appendChild(button);
}

function uploadMusic() {
    for (i of document.getElementsByClassName('media-nav-item')) {
        if (i.id === 'music-tab') {
            i.setAttribute('class', 'nav-item media-nav-item current-nav-item')
        }
        else {
            i.setAttribute('class', 'nav-item media-nav-item')
        }
    }

    const audio = document.getElementById('upload-selector').files
    if (audio.length !== 0) {
        if (audio[0].type === 'audio/mp3') {
            dataType = 'audio/mpeg'
        }
        else {
            dataType = audio[0].type
        }
        fileReader = new FileReader()
        fileReader.readAsBinaryString(audio[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/audio', {content:binData, type:dataType}, function(audio) {
                showMusic()
            });
        }  
    }
}

function showMusic(user) {
    currentTab = 'music'
    for (i of document.getElementsByClassName('media-nav-item')) {
        if (i.id === 'music-tab') {
            i.setAttribute('class', 'nav-item media-nav-item current-nav-item')
        }
        else {
            i.setAttribute('class', 'nav-item media-nav-item')
        }
    }

    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''
    const loader = document.createElement('div')
    loader.className = 'loader'
    mediaContainer.appendChild(loader)

    // query database for all audio, display audio files
    get('/api/audios', {'creator_id': user._id}, function(audios) {
        if (currentTab === 'music') {
            for (audio of audios) {
                const audioHolder = document.createElement('audio')
                audioHolder.setAttribute('controls', '')
                const audioSource = document.createElement('source')
                audioSource.src = 'data:audio;base64,' + btoa(audio.data)
                audioSource.type = audio.type
                audioHolder.appendChild(audioSource)
                audioHolder.setAttribute('class','audio-holder media-holder')
                mediaContainer.appendChild(audioHolder)
            }
            loader.className = ''
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.prepend(inputArea)

    const label = document.createElement('label')
    label.setAttribute('for', 'upload-selector')
    label.className = 'custom-file-upload'
    label.innerHTML = 'Select File'
    inputArea.appendChild(label)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'audio/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Audio File';
    button.className = 'upload-button'
    button.addEventListener('click', uploadMusic);
    inputArea.appendChild(button);
}

function uploadText() {
    const text = document.getElementById('upload-text').value;

    if (text !== '') {
        post('/api/text', {content:text, type:'manual-input'}, function(textOut) {
            showText();
        }); 
    }
}

function uploadTextFile() {

    const text = document.getElementById('upload-selector').files

    if (text.length !== 0) {
        dataType = text[0].type
        fileReader = new FileReader()
        fileReader.readAsText(text[0])
        fileReader.onload = function() {
            const textData = fileReader.result
            post('/api/text', {content:textData, type:dataType}, function(text) {
                showText();
            });
        }  
    }
}

function showText(user) {
    currentTab = 'text'
    for (i of document.getElementsByClassName('media-nav-item')) {
        if (i.id === 'text-tab') {
            i.setAttribute('class', 'nav-item media-nav-item current-nav-item')
        }
        else {
            i.setAttribute('class', 'nav-item media-nav-item')
        }
    }

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';
    const loader = document.createElement('div')
    loader.className = 'loader'
    mediaContainer.appendChild(loader)

    // query database for all text files, display text files
    get('/api/texts', {'creator_id': user._id}, function(texts) {
        if (currentTab === 'text') {
            for (text of texts) {
                const textHolder = document.createElement('div')
                pList = text.data.split(/(\r\n|\n|\r)/gm)
                for (i of pList) {
                    const textP = document.createElement('p')
                    textP.innerHTML = i
                    textHolder.appendChild(textP)
                }
                textHolder.setAttribute('class','text-holder media-holder')
                mediaContainer.appendChild(textHolder)
            }
            loader.className = ''
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.appendChild(inputArea)

    // create upload button
    const inputField2 = document.createElement('input');
    inputField2.type = 'file';
    inputField2.name = 'Upload';
    inputField2.id = 'upload-selector';
    inputField2.accept = '.txt'
    inputArea.prepend(inputField2);

    const label = document.createElement('label')
    label.setAttribute('for', 'upload-selector')
    label.className = 'custom-file-upload'
    label.innerHTML = 'Select File'
    inputArea.appendChild(label)

    const button2 = document.createElement('button');
    button2.innerHTML = 'Upload Text File';
    button2.addEventListener('click', uploadTextFile);
    inputArea.appendChild(button2);

    inputArea.appendChild(document.createElement('br'))
    inputArea.appendChild(document.createElement('br'))

    // create upload box
    const inputField = document.createElement('textarea');
    inputField.id = 'upload-text';
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Text';
    button.addEventListener('click', uploadText);
    button.className = 'upload-button'
    inputArea.appendChild(button);
}

function tabButtons(user) {
    const photosTab = document.getElementById('photos-tab')
    photosTab.addEventListener('click', function() {showPhotos(user)})

    const videosTab = document.getElementById('videos-tab')
    videosTab.addEventListener('click', function() {showVideos(user)})

    const musicTab = document.getElementById('music-tab')
    musicTab.addEventListener('click', function() {showMusic(user)})

    const textTab = document.getElementById('text-tab')
    textTab.addEventListener('click', function() {showText(user)})
};

function renderMediaGallery() {
    const container = document.getElementById('graph')
    container.innerHTML = ''
    container.innerHTML = '<div class="text-center"><h1>Media Gallery</h1><h6>Uploaded Media</h6></div><div class="row mt-4"><ul class="nav flex-column col-3" id="media-nav"><li class="nav-item media-nav-item" id="photos-tab">Photos</li><li class="nav-item media-nav-item" id="videos-tab">Videos</li><li class="nav-item media-nav-item" id="music-tab">Music / Audio</li><li class="nav-item media-nav-item" id="text-tab">Text</li></ul><div id="media-container" class="col-9"></div></div>'
    get('/api/whoami', {}, function(user) {
        tabButtons(user);
        showPhotos(user)
    })   
}

function addMedia(person) {
    renderMediaGallery()
}