let artists = JSON.parse(localStorage.getItem('artists')) || [];
let songs = JSON.parse(localStorage.getItem('songs')) || [];

function saveToLocalStorage() {
    localStorage.setItem('artists', JSON.stringify(artists));
    localStorage.setItem('songs', JSON.stringify(songs));
}

// Dodawanie artysty
document.getElementById('add-artist-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let artistName = document.getElementById('artist-name').value;
    let label = document.getElementById('artist-label').value;

    artists.push({
        name: artistName,
        label: label,
        earnings: 0
    });

    saveToLocalStorage();
    updateArtists();
    alert(`Dodano artystę: ${artistName}`);
    document.getElementById('add-artist-form').reset();
});

// Dodawanie piosenki
document.getElementById('add-song-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let songTitle = document.getElementById('song-title').value;
    let songArtist = document.getElementById('song-artist').value;

    let randomStreams = Math.floor(Math.random() * 10000000);

    songs.push({
        title: songTitle,
        artist: songArtist,
        streams: randomStreams
    });

    saveToLocalStorage();
    updateRanking();
    alert(`Dodano piosenkę: ${songTitle}`);
    document.getElementById('add-song-form').reset();
});

// Aktualizacja rankingu
function updateRanking() {
    let rankings = [...songs].sort((a, b) => b.streams - a.streams).slice(0, 10);

    let rankingList = document.getElementById('global-ranking');
    rankingList.innerHTML = '';

    rankings.forEach((song, index) => {
        let li = document.createElement('li');
        li.innerHTML = `#${index + 1} - ${song.title} (${song.artist}) - 🔥 ${song.streams.toLocaleString()} odtworzeń`;
        rankingList.appendChild(li);
    });
}

// Wyświetlanie artystów
function updateArtists() {
    let artistList = document.getElementById('artist-list');
    artistList.innerHTML = '';

    artists.forEach(artist => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="artist.html?name=${artist.name}">${artist.name} (${artist.label})</a>`;
        artistList.appendChild(li);
    });
}

// Aktualizacja odtworzeń
function updateStreams() {
    songs.forEach(song => {
        song.streams += Math.floor(Math.random() * 1000000);
    });

    saveToLocalStorage();
    updateRanking();
}

updateArtists();
updateRanking();
setInterval(updateStreams, 3600000);
