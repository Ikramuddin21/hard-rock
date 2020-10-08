document.querySelector('.search-btn').addEventListener('click', () => {
    const input = document.querySelector('.form-control').value;
    searchResult(input);
})

const apiUrl = 'https://api.lyrics.ovh';

const searchResult = input => {
    fetch(`${apiUrl}/suggest/${input}`)
    .then(res => res.json())
    .then(data => {
        const searchResult = data.data.slice(0, 10);
        const display = document.querySelector('.display');

        displayShowing(display, '.lyrics');

        display.innerHTML = '';
        for (let i = 0; i < searchResult.length; i++) {
            const song = searchResult[i];
            const title = song.title;
            const artistName = song.artist.name;
            const h4 = document.createElement('h4');
            h4.innerHTML = `<h4 class="song">${title} - <strong>${artistName}</strong> <button
            class="btn btn-success" 
            onClick='getLyrics("${artistName}", "${title}")'>Get Lyrics</button> </h4>`;
            display.appendChild(h4);
        }
    });
}
const getLyrics = (artistName, title) => {
    fetch(`${apiUrl}/v1/${artistName}/${title}`)
    .then(res => res.json())
    .then(data => {
        const lyrics_show = document.querySelector('.lyrics');

            displayShowing(lyrics_show, '.display');

            lyrics_show.innerHTML = `<h3 style='text-align: center;'>${title}</h3>
            <pre class='lyricsShow'>${data.lyrics}</pre>`;    
    })
}

const displayShowing = (block, selector) => {
    block.style.display = 'block';
    const displayNone = document.querySelector(selector);
    displayNone.style.display = 'none';
}
