function uploadPhoto() {
    const photo = document.getElementById('upload-selector').files

    if (photo !== undefined) {
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

function showPhotos() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all photos, display photos
    get('/api/images', {'creator_id': window.location.search.substring(1)}, function(images) {
        for (image of images) {
            const imageHolder = document.createElement('img')
            imageHolder.src = 'data:image;base64,' + btoa(image.data)
            imageHolder.setAttribute('class','photo-holder media-holder')
            mediaContainer.prepend(imageHolder)
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.appendChild(inputArea)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'image/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Photo';
    button.addEventListener('click', uploadPhoto);
    inputArea.appendChild(button);
}

function uploadVideo() {
    const video = document.getElementById('upload-selector').files

    if (video !== undefined) {
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

function showVideos() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all videos, display videos
    get('/api/videos', {'creator_id': window.location.search.substring(1)}, function(videos) {
        for (video of videos) {
            const videoHolder = document.createElement('video')
            videoHolder.setAttribute('controls', '')
            const videoSource = document.createElement('source')
            videoSource.src = 'data:video;base64,' + btoa(video.data)
            videoSource.type = video.type
            videoHolder.appendChild(videoSource)
            videoHolder.setAttribute('class','video-holder media-holder')
            mediaContainer.prepend(videoHolder)
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.appendChild(inputArea)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'video/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Video';
    button.addEventListener('click', uploadVideo);
    inputArea.appendChild(button);
}

function uploadMusic() {
    const audio = document.getElementById('upload-selector').files
    if (audio !== undefined) {
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

function showMusic() {
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = ''

    // query database for all audio, display audio files
    get('/api/audios', {'creator_id': window.location.search.substring(1)}, function(audios) {
        for (audio of audios) {
            const audioHolder = document.createElement('audio')
            audioHolder.setAttribute('controls', '')
            const audioSource = document.createElement('source')
            audioSource.src = 'data:audio;base64,' + btoa(audio.data)
            audioSource.type = audio.type
            audioHolder.appendChild(audioSource)
            audioHolder.setAttribute('class','audio-holder media-holder')
            mediaContainer.prepend(audioHolder)
        }
    });

    mediaContainer.appendChild(document.createElement('br'))

    // create upload button
    const inputArea = document.createElement('div')
    inputArea.setAttribute('class','input-area')
    mediaContainer.appendChild(inputArea)

    const inputField = document.createElement('input');
    inputField.type = 'file';
    inputField.name = 'Upload';
    inputField.id = 'upload-selector';
    inputField.accept = 'audio/*'
    inputArea.appendChild(inputField);

    const button = document.createElement('button');
    button.innerHTML = 'Upload Audio File';
    button.addEventListener('click', uploadMusic);
    inputArea.appendChild(button);
}

function uploadText() {
    const text = document.getElementById('upload-text').value;

    if (text !== undefined) {
        post('/api/text', {content:text, type:'manual-input'}, function(textOut) {
            showText();
        }); 
    }
}

function uploadTextFile() {
    const text = document.getElementById('upload-selector').files

    if (text !== undefined) {
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
            textHolder.setAttribute('class','text-holder media-holder')
            mediaContainer.prepend(textHolder)
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
    inputArea.appendChild(inputField2);

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
    inputArea.appendChild(button);
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