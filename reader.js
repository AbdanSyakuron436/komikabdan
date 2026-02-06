const urlParams = new URLSearchParams(window.location.search);
const comicIndex = parseInt(urlParams.get('comic'));
const chapterIndex = parseInt(urlParams.get('chapter'));
const comics = JSON.parse(localStorage.getItem('comics')) || [];
const comic = comics[comicIndex];
let currentImageIndex = 0;

if (!comic) {
    document.body.innerHTML = '<h1>Komik tidak ditemukan!</h1>';
} else {
    document.getElementById('comicTitle').textContent = comic.title;
    loadChapter(chapterIndex);

    function loadChapter(chapIndex) {
        const chapter = comic.chapters[chapIndex];
        if (!chapter) return;
        document.getElementById('chapterInfo').textContent = `Chapter ${chapter.chapterNumber}`;
        displayImages(chapter.images);
        updateNavButtons(chapIndex);
    }

    function displayImages(images) {
        const container = document.getElementById('imagesContainer');
        container.innerHTML = `<img src="${images[currentImageIndex]}" alt="Comic Image" />`;
        document.getElementById('imageInfo').textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    function updateNavButtons(chapIndex) {
        document.getElementById('prevChapter').disabled = chapIndex === 0;
        document.getElementById('nextChapter').disabled = chapIndex === comic.chapters.length - 1;
    }

    document.getElementById('prevImage').onclick = () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            displayImages(comic.chapters[chapterIndex].images);
        }
    };

    document.getElementById('nextImage').onclick = () => {
        if (currentImageIndex < comic.chapters[chapterIndex].images.length - 1) {
            currentImageIndex++;
            displayImages(comic.chapters[chapterIndex].images);
        }
    };

    document.getElementById('prevChapter').onclick = () => {
        if (chapterIndex > 0) {
            window.location.href = `reader.html?comic=${comicIndex}&chapter=${chapterIndex - 1}`;
        }
    };

    document.getElementById('nextChapter').onclick = () => {
        if (chapterIndex < comic.chapters.length - 1) {
            window.location.href = `reader.html?comic=${comicIndex}&chapter=${chapterIndex + 1}`;
        }
    };
}