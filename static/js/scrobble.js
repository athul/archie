function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

async function lbCall() {
    console.log("lbcall");
    await axios.get("https://api.listenbrainz.org/1/user/ChilledTonic/listens?count=1")
    .then(function (response) {
    const payload = response.data.payload.listens[0]
    track = payload.track_metadata.track_name
    artist = payload.track_metadata.artist_name
    release = payload.track_metadata.release_name
    document.getElementById("artist").innerHTML = truncateString(artist, 20)
    document.getElementById("artist").href="https://www.deezer.com/search/"+artist+"/artist"
    document.getElementById("track").innerHTML = truncateString(track, 15)
    document.getElementById("track").href="https://www.deezer.com/search/"+release+"/album"
}).catch(function (error) {
    document.getElementById("lbwrapper").innerHTML = ""
    console.log(error)
})
}