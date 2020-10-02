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
            title = song.title;
            artistName = song.artist.name;
            const h4 = document.createElement('h4');
            h4.innerHTML = `<h4 class="song">${title} - <strong>${artistName}</strong> <button
            class="btn btn-success" 
            onClick='getLyrics()'>Get Lyrics</button> </h4>`;
            display.appendChild(h4);
        }
    });
}

const getLyrics = () => {
    fetch(`${apiUrl}/v1/${artistName}/${title}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.lyrics === '') {
            alert('Sorry, lyrics not found.');
        }
        else {
            const lyrics_show = document.querySelector('.lyrics');

            displayShowing(lyrics_show, '.display');

            lyrics_show.innerHTML = `<h3 style='text-align: center;'>${title}</h3>
            <pre class='lyricsShow'>${data.lyrics}</pre>`;    
        }
        
    })
}

const displayShowing = (block, selector) => {
    block.style.display = 'block';
    const displayNone = document.querySelector(selector);
    displayNone.style.display = 'none';
}
