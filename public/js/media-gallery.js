function uploadPhoto() {
    const photo = document.getElementById('upload-selector').files

    if (photo !== undefined) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(photo[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/image', {content:binData}, function(image) {
                const imageHolder = document.createElement('img')
                imageHolder.src = 'data:image;base64,' + btoa(image.data)
                const mediaContainer = document.getElementById('media-container')
                mediaContainer.prepend(imageHolder)
                showPhotos()
            });
        }  
    }
}

function showPhotos() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all photos, display photos
    get('/api/images', {'creator_id': window.location.search.substring(1)}, function(images) {
        for (image of images) {
            const imageHolder = document.createElement('img')
            imageHolder.src = 'data:image;base64,' + btoa(image.data)
            mediaContainer.prepend(imageHolder)
        }
    });

    // create upload button
    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'image/*'
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Photo';
    button.addEventListener('click', uploadPhoto);
    mediaContainer.appendChild(button);
}

function uploadVideo() {
    
}

function showVideos() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Video';
    button.addEventListener('click', uploadVideo);
    mediaContainer.appendChild(button);
}

function uploadMusic() {
    
}

function showMusic() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Audio';
    button.addEventListener('click', uploadMusic);
    mediaContainer.appendChild(button);
}

function uploadText() {
    
}

function showText() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Document';
    button.addEventListener('click', uploadText);
    mediaContainer.appendChild(button);
}

function tabButtons(user) {
    const photosTab = document.getElementById('photos-tab')
    photosTab.addEventListener('click', showPhotos)

    const videosTab = document.getElementById('videos-tab')
    videosTab.addEventListener('click', showVideos)

    const musicTab = document.getElementById('music-tab')
    musicTab.addEventListener('click', showMusic)

    const textTab = document.getElementById('text-tab')
    textTab.addEventListener('click', showText)
};
    

function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}, function(profileUser) {
        tabButtons(profileUser);
        showPhotos()
    });
};

main();