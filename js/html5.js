var media = document.querySelector('video');

// Event listeners
media.addEventListener("play", function(e) {
    if (host) {
        playOther(roomnum)
    } else {
        getHostData(roomnum)
    }
})
media.addEventListener("pause", function(e) {
    if (host) {
        pauseOther(roomnum)
    }
})
media.addEventListener("seeked", function(e) {
    var currTime = media.currentTime
    if (host) {
        seekOther(roomnum, currTime)
    }
})

// Play/pause function
function html5Play() {
    if (media.paused) {
        media.play();
    } else {
        media.pause();
    }
}

// Load video
function htmlLoadVideo(videoId) {
    console.log("changing video to: " + videoId)
    media.src = videoId
}
