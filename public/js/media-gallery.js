function uploadPhoto() {
    const photo = document.getElementById('upload-selector').files

    if (photo !== undefined) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(photo[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/image', {content:binData}, function(image) {
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
    const video = document.getElementById('upload-selector').files

    if (video !== undefined) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(video[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/video', {content:binData}, function(video) {
                showVideos()
            });
        }  
    }
}

function showVideos() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all videos, display videos
    get('/api/videos', {'creator_id': window.location.search.substring(1)}, function(videos) {
        for (video of videos) {
            const videoHolder = document.createElement('video')
            videoHolder.class = 'controls'
            const videoSource = document.createElement('src')
            videoSource.src = "data:video;base64," + btoa(video.data) // might need more specific attributes, ex. type
            videoHolder.appendChild(videoSource)
            mediaContainer.prepend(videoHolder)
        }
    });

    // create upload button
    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'video/*'
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Video';
    button.addEventListener('click', uploadVideo);
    mediaContainer.appendChild(button);
}

function uploadMusic() {
    const audio = document.getElementById('upload-selector').files

    if (audio !== undefined) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(audio[0])
        fileReader.onload = function() {
            const binData = fileReader.result
            post('/api/audio', {content:binData}, function(audio) {
                showMusic()
            });
        }  
    }
}

function showMusic() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all audio, display audio files
    get('/api/audios', {'creator_id': window.location.search.substring(1)}, function(audios) {
        for (audio of audios) {
            const audioHolder = document.createElement('audio')
            audioHolder.class = 'controls'
            const audioSource = document.createElement('src')
            audioSource.src = "data:audio;base64," + btoa(audio.data) // might need more specific attributes, ex. type
            audioHolder.appendChild(audioSource)
            mediaContainer.prepend(audioHolder)
        }
    });

    // create upload button
    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'audio/*'
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Audio File';
    button.addEventListener('click', uploadMusic);
    mediaContainer.appendChild(button);
}

function uploadText() {
    const text = document.getElementById('upload-selector').value;

    if (text !== undefined) {
        post('/api/text', {content:text}, function(textOut) {
            console.log(textOut)
            showText();
        }); 
    }
}

function showText() {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';

    // query database for all text files, display text files
    get('/api/texts', {'creator_id': window.location.search.substring(1)}, function(texts) {
        for (text of texts) {
            const textHolder = document.createElement('div')
            textHolder.class = 'text-container'
            const textP = document.createElement('p')
            textP.innerHTML = text.data
            textHolder.appendChild(textP)
            mediaContainer.prepend(textHolder)
        }
    });

    // create upload box
    const textLabel = document.createElement('h6');
    textLabel.innerHTML = 'Enter Text Here';
    mediaContainer.appendChild(textLabel);

    const inputField = document.createElement('textarea');
    inputField.id = 'upload-selector';
    mediaContainer.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Text';
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