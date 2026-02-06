function displayComics() {
    const comics = JSON.parse(localStorage.getItem('comics')) || [];
    const container = document.getElementById('comicsContainer');
    container.innerHTML = '';

    comics.forEach((comic, index) => {
        const div = document.createElement('div');
        div.className = 'comic';
        div.innerHTML = `<h2 onclick="openReader(${index}, 0)">${comic.title}</h2><p>${comic.chapters.length} Chapter(s)</p>`;
        container.appendChild(div);
    });
}

function openReader(comicIndex, chapterIndex) {
    window.location.href = `reader.html?comic=${comicIndex}&chapter=${chapterIndex}`;
}

window.onload = displayComics;