let chapters = [];  // Array buat nyimpen chapter sementara

function addChapter() {
    const chapterNumber = chapters.length + 1;
    chapters.push({ chapterNumber, images: [] });
    renderChapters();
}

function addImage(chapterIndex) {
    const imageUrl = prompt('Masukin link gambar (contoh: https://i.postimg.cc/...):');
    if (imageUrl && imageUrl.startsWith('http')) {
        chapters[chapterIndex].images.push(imageUrl);
        renderChapters();
    } else {
        alert('Link harus valid dan mulai dengan http!');
    }
}

function removeImage(chapterIndex, imageIndex) {
    chapters[chapterIndex].images.splice(imageIndex, 1);
    renderChapters();
}

function renderChapters() {
    const container = document.getElementById('chaptersContainer');
    container.innerHTML = '';
    chapters.forEach((chapter, index) => {
        const div = document.createElement('div');
        div.className = 'chapter';
        div.innerHTML = `<h3>Chapter ${chapter.chapterNumber}</h3>
            <button onclick="addImage(${index})">Tambah Gambar</button>
            <ul>${chapter.images.map((img, i) => `<li>${img} <button onclick="removeImage(${index}, ${i})">Hapus</button></li>`).join('')}</ul>`;
        container.appendChild(div);
    });
}

function saveComic() {
    const title = document.getElementById('comicTitle').value.trim();
    if (!title || chapters.length === 0) {
        alert('Isi judul dan tambah minimal 1 chapter!');
        return;
    }

    const comic = { title, chapters };
    let comics = JSON.parse(localStorage.getItem('comics')) || [];
    comics.push(comic);
    localStorage.setItem('comics', JSON.stringify(comics));

    alert('Komik disimpan! Bisa diakses di index.html');
    // Reset
    document.getElementById('comicTitle').value = '';
    chapters = [];
    renderChapters();
}