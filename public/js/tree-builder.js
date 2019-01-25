class Tree {
    constructor() {
        this.names = [] // array of Person objects
        this.id = treeIDCounter;
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

function renderPage() {
    const container = document.getElementById('main-container')
    const loader = document.createElement('div')
    loader.className = 'loader'
    loader.id = 'loader-main'
    container.appendChild(loader)

    const lowerDiv = document.createElement('div')
    lowerDiv.className = 'row'

    const form = document.createElement('div')
    form.id = 'form'
    form.className = 'col-4'
    lowerDiv.appendChild(form)
    const graph = document.createElement('div')
    graph.id = 'tree'
    graph.className = 'col-8'
    lowerDiv.appendChild(graph)

    container.appendChild(lowerDiv)
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
    //check for lower level parents first
    //check for their siblings and place those li into its own class - siblings are in a 2D array
    //so add the parents first
    //keep in mind that the siblings will then have to be joined and go up to the same parents - center line through going up
    //make sure sibling nodes are not revisited and that they don't have separate spawns
    //single arrays may be empty
    const level = document.createElement('ul');
    for (i of graph.names) {
        const newLevel = document.createElement('li');
        const link = document.createElement('a');
        link.innerText = i.name;
        link.href = "#";
        newLevel.appendChild(link);
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
        level.appendChild(newLevel);

     
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
    renderForm()
}

function addPartner(person) {
    function associate(person1, person2) {
        person2.partner = person1.id
        person1.partner = person2.id
        renderForm()
    }

    const menu = document.getElementById('dropdown-menu-'+person.id)
    const subMenu = document.createElement('div')
    subMenu.className = 'dropdown-content'
    menu.appendChild(subMenu)
    for (p in personDict) {
        if (personDict[p].partner == null && p !== person.id) {
            let listItem = document.createElement('p')
            listItem.id = 'person-' + p
            listItem.innerHTML = personDict[p].name
            listItem.addEventListener('click', function() {associate(personDict[listItem.id.split('-').pop()], person)})
            subMenu.appendChild(listItem)
        }
    }
    let cancel = document.createElement('p')
    cancel.innerHTML = 'Cancel'
    cancel.addEventListener('click', function() {document.getElementById('dropdown-menu-'+person.id).innerHTML = ''})
    subMenu.appendChild(cancel)
}

function addSibling(person) {
    p = new Person('[Enter Name]', idCounter);
    personDict[idCounter] = p;
    databaseObjects[idCounter] = 'person'
    idCounter ++;
    for (tree of treeList) {
        if (tree.names.includes(person)) {
            tree.addName(p)
            break
        }
    }
    sibling = 
    renderForm()
}

function addParent(person) {
    p = new Person('[Enter Name]', idCounter);
    personDict[idCounter] = p;
    databaseObjects[idCounter] = 'person'
    idCounter ++;
    newTree = new Tree()
    newTree.addName(p)
    treeList.push(newTree)
    person.addSubtree(newTree)
    renderForm()
}

function deletePerson(person) {
    function recurseDelete(person) {
        for (tree_ind in treeList) {
            if (treeList[tree_ind].names.includes(person)) { 
                treeList[tree_ind].removeName(person)
            }
        }
        if (person.partner !== null && person.partner !== undefined) {
            personDict[person.partner].partner = null
        }
        for (tree of person.subtree) {
            for (person2 of tree.names) {
                recurseDelete(person2)
            }
        }
        delete personDict[person.id]
    }
    recurseDelete(person)
    renderForm()
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
    document.getElementById('dropdown-menu-'+id).innerHTML = ''
    
}

function renderForm() {
    if (rootTree.names.length === 0) {
        p = new Person('[Enter Name]', idCounter);
        personDict[idCounter] = p;
        idCounter ++;
        rootTree.addName(p)
    }

    const form = document.getElementById('form')
    form.innerHTML = ''
    let ind = 0
    let innerTreeList = [rootTree]

    do {
        let newTreeList = []
        ind += 1
        const generation = document.createElement('div')
        generation.id = 'gen-' + ind
        generation.className = 'generation'
        form.prepend(generation)

        for (tree of innerTreeList) {
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
                nameLabel.addEventListener('click', function() {showButtons(nameLabel.id.split('-').pop())})
                personDiv.appendChild(nameLabel)

                const inputBox = document.createElement('input')
                inputBox.type = 'text'
                inputBox.value = person.name
                inputBox.style.display = 'none'
                inputBox.id = 'input-box-' + person.id
                personDiv.appendChild(inputBox)
                personDiv.appendChild(document.createElement('br'))
                inputBox.addEventListener('click', function() {inputBox.value = ''})

                const nameButton = document.createElement('button')
                nameButton.className = 'name-button'
                nameButton.id = 'name-button-' + person.id
                nameButton.innerHTML = 'Save Name'
                nameButton.style.display = 'none'
                nameButton.addEventListener('click', function () {changeName(personDict[nameButton.id.split('-').pop()])})
                personDiv.appendChild(nameButton)

                const mediaButton = document.createElement('button')
                mediaButton.innerHTML = 'Add Media'
                mediaButton.className = 'media-button'
                mediaButton.id = 'media-button-' + person.id
                mediaButton.style.display = 'none'
                mediaButton.addEventListener('click', function() {addMedia(personDict[mediaButton.id.split('-').pop()])})
                personDiv.appendChild(mediaButton)

                const parentButton = document.createElement('button')
                parentButton.innerHTML = 'Add Parent'
                parentButton.className = 'parent-button'
                parentButton.id = 'parent-button-' + person.id
                parentButton.style.display = 'none'
                parentButton.addEventListener('click', function() {addParent(personDict[parentButton.id.split('-').pop()])})
                personDiv.appendChild(parentButton)

                const partnerButton = document.createElement('button')
                partnerButton.className = 'partner-button'
                partnerButton.id = 'partner-button-' + person.id
                if (person.partner === '' || person.partner === null || person.partner === undefined) {
                    partnerButton.innerHTML = 'Add Partner'
                    partnerButton.addEventListener('click', function() {
                        addPartner(personDict[partnerButton.id.split('-').pop()])
                    })
                }
                else {
                    partnerButton.innerHTML = 'Remove Partner'
                    partnerButton.addEventListener('click', function() {
                        personDict[personDict[partnerButton.id.split('-').pop()].partner].partner = null
                        personDict[partnerButton.id.split('-').pop()].partner = null
                        renderForm()
                    })
                }
                partnerButton.style.display = 'none'
                personDiv.appendChild(partnerButton)

                const menu = document.createElement('div')
                menu.id = 'dropdown-menu-' + person.id
                personDiv.appendChild(menu)

                const siblingButton = document.createElement('button')
                siblingButton.innerHTML = 'Add Sibling'
                siblingButton.className = 'sibling-button'
                siblingButton.id = 'sibling-button-' + person.id
                siblingButton.style.display = 'none'
                siblingButton.addEventListener('click', function() {addSibling(personDict[siblingButton.id.split('-').pop()])})
                personDiv.appendChild(siblingButton)

                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'Delete Person'
                deleteButton.className = 'delete-button'
                deleteButton.id = 'delete-button-' + person.id
                deleteButton.style.display = 'none'
                deleteButton.addEventListener('click', function() {deletePerson(personDict[deleteButton.id.split('-').pop()])})
                personDiv.appendChild(deleteButton)
            }
        }
        innerTreeList = newTreeList
    }
    while (checkForChildren(innerTreeList));

    renderGraph(rootTree);
}

let rootTree;
let personDict = {}; // a list of ids mapped to person objects
let treeList = [] // a list of all trees
let databaseObjects = {}; // a list created of all models during getTree (so you know what to delete)
let idCounter = 0;
let treeIDCounter = 0;

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

function save() {
    // writes current Tree object into tree model in database (erases other database objects)

    function deleteModels() {
        for (object in databaseObjects) {
            if (databaseObjects[object] === 'person') {
                post('/api/person-delete', {'_id': object}, function() {})
            }
            else {
                post('/api/tree-delete', {'_id': object}, function() {})
            }
        }
    }

    function addPartners() {
        for (person in personDict) {
            if (personDict[person].partner !== null && personDict[person].partner !== undefined) {
                post('/api/person-update', {'_id':personIDMap[person], 'partner': personIDMap[personDict[person].partner]}, function() {})
            }
        }
    }

    function createList() {
        // return a list of trees and persons in sorted order so all children come before parents
        list = [];
        let treeL = [rootTree];
        let personL = [];
        do {
            for (j in treeL) {
                for (i in treeL[j].names) {
                    personL.push(treeL[j].names[i])
                }
                list.push(treeL[j])
            }
            treeL = [];
            for (j in personL) {
                for (i in personL[j].subtree) {
                    if (personL[j].subtree[i].names !== []) {
                        treeL.push(personL[j].subtree[i])
                    }
                }
                list.push(personL[j])
            }
            personL = [];
        }
        while (treeL.length !== 0 || personL.length !== 0)
        list.reverse()
        return list
    }

    let personIDMap = {};
    let treeIDMap = {};
    function writeModels(list) {
        function writeTree(tree) {
            let public = false
            if (tree === rootTree) {public = true}
            let newNames = [];
            for (i in tree.names) {
                newNames.push(personIDMap[tree.names[i].id])
            }
            post('/api/tree-saver', {'public': public, 'names': newNames}, function(newTree) {
                list.splice(0,1)
                treeIDMap[tree.id] = newTree._id
                if (list.length !== 0) {
                    if (list[0] instanceof Tree) {writeTree(list[0])}
                    else {writePerson(list[0])}
                }
                else {
                    addPartners()
                    deleteModels()
                    window.location.assign('/tree-builder?'+newTree._id)

                    // window.history.replaceState('', '', '?'+newTree._id);
                    // personDict = {}
                    // databaseObjects = []
                    // treeList = []
                    // rootTree = getTree(newTree)
                    // document.getElementById('start-nav-button').style = ''
                    // document.getElementById('form').innerHTML = ''
                }
            })
        }
        function writePerson(person) {
            let newSubtree = []
            for (i in person.subtree) {
                newSubtree.push(treeIDMap[person.subtree[i].id])
            }  
            post('/api/person-saver', {'name': person.name,'subtree': newSubtree, 'photos': person.photos, 'videos': person.photos, 'audios': person.audios, 'texts':person.texts}, function(newPerson) {
                list.splice(0,1)
                personIDMap[person.id] = newPerson._id
                if (list[0] instanceof Tree) {writeTree(list[0])}
                else {writePerson(list[0])}
            })
        }
        if (list[0] instanceof Tree) {writeTree(list[0])}
        else {writePerson(list[0])}
    }

    writeModels(createList())
}

function deleteTree() {
    for (object in databaseObjects) {
        if (databaseObjects[object] === 'person') {
            post('/api/person-delete', {'_id': object}, function() {})
        }
        else {
            post('/api/tree-delete', {'_id': object}, function(newTree) {
                window.location.assign('u/user?'+newTree.creator_id)
            })
        }
    }
}

function main() {
    const treeId = window.location.search.substring(1);
    get('/api/tree', {'_id': treeId}, function(tree) {
        databaseObjects[tree._id] = 'tree'
        const title = document.getElementById('title-place')
        title.innerHTML = 'Tree Builder | ' + tree.creator_name
        renderPage()
        rootTree = getTree(tree)
        document.getElementById('save-nav-button').addEventListener('click', save)
        document.getElementById('delete-nav-button').addEventListener('click', deleteTree)
        document.getElementById('ar-nav-button').addEventListener('click', function() {
            window.location.assign('/tree-ar?' + window.location.search.substring(1))
        })
        document.getElementById('vr-nav-button').addEventListener('click', function() {
            window.location.assign('/tree-vr?' + window.location.search.substring(1))
        })
        setTimeout(function(){
            document.getElementById('main-container').removeChild(document.getElementById('loader-main'))
            renderForm();
            let count = 0
            for (thing in databaseObjects) {count ++;}
            lenDatabase = count
        }, 1000);
    });
};

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

function showPhotos(user, person) {
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
                imageHolder.id = image._id
                if (person.photos.includes(imageHolder.id)) {
                    imageHolder.className = 'photo-holder media-holder selected-media'
                }
                else {
                    imageHolder.className = 'photo-holder media-holder'
                }
                imageHolder.addEventListener('click', function() {
                    if (person.photos.includes(imageHolder.id)) {
                        person.removePhoto(imageHolder.id)
                        imageHolder.className = 'photo-holder media-holder'
                    }
                    else {
                        person.addPhoto(imageHolder.id);
                        imageHolder.className = 'photo-holder media-holder selected-media'
                    }
                })
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
                showVideos()
            });
        }  
    }
}

function showVideos(user, person) {
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
                videoHolder.id = video._id
                if (person.videos.includes(videoHolder.id)) {
                    videoHolder.className = 'video-holder media-holder selected-media'
                }
                else {
                    videoHolder.className = 'video-holder media-holder'
                }
                videoHolder.addEventListener('click', function() {
                    if (person.videos.includes(videoHolder.id)) {
                        person.removeVideo(videoHolder.id)
                        videoHolder.className = 'video-holder media-holder'
                    }
                    else {
                        person.addVideo(videoHolder.id);
                        videoHolder.className = 'video-holder media-holder selected-media'
                    }
                })
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

function showMusic(user, person) {
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
                audioHolder.id = audio._id
                if (person.audios.includes(audioHolder.id)) {
                    audioHolder.className = 'audio-holder media-holder selected-media'
                }
                else {
                    audioHolder.className = 'audio-holder media-holder'
                }
                audioHolder.addEventListener('mouseover', function() { // not sure why 'click' listener won't work
                    if (person.audios.includes(audioHolder.id)) {
                        person.removeAudio(audioHolder.id)
                        audioHolder.className = 'audio-holder media-holder'
                    }
                    else {
                        person.addAudio(audioHolder.id);
                        audioHolder.className = 'audio-holder media-holder selected-media'
                    }
                })
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

function showText(user, person) {
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
                textHolder.id = text._id
                if (person.texts.includes(textHolder.id)) {
                    textHolder.className = 'text-holder media-holder selected-media'
                }
                else {
                    textHolder.className = 'text-holder media-holder'
                }
                textHolder.addEventListener('click', function() {
                    if (person.texts.includes(textHolder.id)) {
                        person.removeText(textHolder.id)
                        textHolder.className = 'text-holder media-holder'
                    }
                    else {
                        person.addText(textHolder.id);
                        textHolder.className = 'text-holder media-holder selected-media'
                    }
                })
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
    photosTab.addEventListener('click', function() {showPhotos(user, person)})

    const videosTab = document.getElementById('videos-tab')
    videosTab.addEventListener('click', function() {showVideos(user, person)})

    const musicTab = document.getElementById('music-tab')
    musicTab.addEventListener('click', function() {showMusic(user, person)})

    const textTab = document.getElementById('text-tab')
    textTab.addEventListener('click', function() {showText(user, person)})

    const closeTab = document.getElementById('exit-tab')
    closeTab.addEventListener('click', function() {
        const container = document.getElementById('tree-gallery')
        container.id = 'tree'
        container.innerHTML = ''
        renderGraph(rootTree);
    })
};

function addMedia(person) {
    const container = document.getElementById('tree')
    container.id = 'tree-gallery'
    container.innerHTML = ''
    container.innerHTML = '<div class="text-center"><h1>Media Gallery</h1><h6>Click to Select Media for ' + person.name + '</h6></div><div class="row mt-4"><ul class="nav flex-column col-3" id="media-nav"><li class="nav-item media-nav-item" id="photos-tab">Photos</li><li class="nav-item media-nav-item" id="videos-tab">Videos</li><li class="nav-item media-nav-item" id="music-tab">Music / Audio</li><li class="nav-item media-nav-item" id="text-tab">Text</li><li class="nav-item media-nav-item" id="exit-tab">Exit Gallery</li></ul><div id="media-container" class="col-9"></div></div>'
    get('/api/whoami', {}, function(user) {
        tabButtons(user, person);
        showPhotos(user, person)
    })   
}