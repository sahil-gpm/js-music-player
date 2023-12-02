// console.log('My Music Player.')
//variables fetch ..
let currentIndex = 1;
let currentAudio = new Audio(`src/music/song${currentIndex}.mp3`)
let songNode = Array.from(document.getElementsByClassName('songNode'))
let playPause = document.getElementById('playPause')
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let songHandlingBar = document.getElementById('songHandlingBar');
let currentSongBanner = document.getElementById('currentSongBanner')
let currentSongNameStatus = document.getElementById('currentSongNameStatus')

let dataList = [
    { songName: "Closer - The Chainsmokers Feat.Halsey", coverImg: "src/res/covers/song1.jpg" },
    { songName: "You Broke me first - Tate McRae", coverImg: "src/res/covers/song2.jpg" },
    { songName: "Without Me - Feat.Halsey", coverImg: "src/res/covers/song3.jpg" }
]

//setting initial resources...
songNode.forEach((node, i) => {
    node.getElementsByClassName('songBanner')[0].src = dataList[i].coverImg;
    node.getElementsByClassName('songName')[0].innerText = dataList[i].songName;
    // node.getElementsByClassName('songDuration')[0].innerText = getDuration(i);
})

//playing songs and adding event listeners...
playPause.addEventListener('click', () => {
    if (currentAudio.paused || currentAudio.currentTime <= 0) {
        currentAudio.play()
        playPause.src = 'src/res/pause_white.png'
    } else {
        pauseOthers()
        currentAudio.pause()
        playPause.src = 'src/res/play_white.png'
    }
})

//handling previous and next button...
previous.addEventListener('click', () => {
    if (currentIndex <= 1) {
        currentIndex = 3;
        currentAudio.src = `src/music/song${currentIndex}.mp3`
        currentAudio.currentTime = 0;
        currentAudio.play()
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        playPause.src = 'src/res/pause_white.png'
        let tempIndex = currentIndex - 1;
        currentSongNameStatus.innerText = dataList[tempIndex].songName
    }
    else {
        currentIndex -= 1;
        currentAudio.src = `src/music/song${currentIndex}.mp3`
        currentAudio.currentTime = 0;
        currentAudio.play()
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        playPause.src = 'src/res/pause_white.png'
        let tempIndex = currentIndex - 1;
        currentSongNameStatus.innerHTML = dataList[tempIndex].songName
    }
})

//next button 
next.addEventListener('click', () => {
    if (currentIndex >= 3) {
        currentIndex = 1;
        console.log(currentIndex)
        currentAudio.pause()
        currentAudio.src = `src/music/song${currentIndex}.mp3`
        currentAudio.currentTime = 0;
        currentAudio.play()
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        playPause.src = 'src/res/pause_white.png'
        let tempIndex = currentIndex - 1;
        currentSongNameStatus.innerText = dataList[tempIndex].songName
    }
    else {
        currentIndex += 1;
        console.log(currentIndex)
        currentAudio.pause()
        currentAudio.src = `src/music/song${currentIndex}.mp3`
        currentAudio.currentTime = 0;
        currentAudio.play()
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        playPause.src = 'src/res/pause_white.png'
        let tempIndex = currentIndex - 1;
        currentSongNameStatus.innerText = dataList[tempIndex].songName
    }
})

//seekbar progression and seeking
currentAudio.addEventListener('timeupdate', () => {
    if (currentAudio.currentTime >= currentAudio.duration) {
        if (currentIndex >= 1 && currentIndex < 3) {
            currentIndex++;
        } else {
            currentIndex = 1;
        }
        currentAudio.src = `src/music/song${currentIndex}.mp3`
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        let tempIndex = currentIndex - 1
        currentSongNameStatus.innerText = dataList[tempIndex].songName
        currentAudio.currentTime = 0;
        currentAudio.play()
    }
    songHandlingBar.value = parseInt((currentAudio.currentTime / currentAudio.duration) * 100)
})
//handling seeking by user
songHandlingBar.addEventListener('change', () => {
    currentAudio.currentTime = ((songHandlingBar.value * currentAudio.duration) / 100)
})

//playing music directly without main player 
const pauseOthers = () => {
    Array.from(document.getElementsByClassName('playFromHere')).forEach((element) => {
        element.getElementsByTagName('img')[0].src = 'src/res/play_white.png'
        // element.getElementsByTagName('img').src = 'src/res/play_white.png'
    })
}
//direct buttons.....
Array.from(document.getElementsByClassName('playFromHere')).forEach((element) => {
    element.addEventListener('click', (miniBtnElement) => {
        pauseOthers()
        currentIndex = parseInt(miniBtnElement.target.id);
        currentAudio.src = `src/music/song${parseInt(currentIndex)}.mp3`
        currentAudio.currentTime = 0;
        currentAudio.play()
        miniBtnElement.target.src = "src/res/restart.png"
        playPause.src = 'src/res/pause_white.png'
        let tempIndex = currentIndex - 1;
        currentSongBanner.src = `src/res/covers/song${currentIndex}.jpg`
        currentSongNameStatus.innerText = dataList[tempIndex].songName
    })
})
//that's the end for now