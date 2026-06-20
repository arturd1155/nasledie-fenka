let currentCategory = 'all';
let currentSeason = 'all';
let searchQuery = '';

function renderVideos() {
    const grid = document.getElementById('videoGrid');
    const noResults = document.getElementById('noResults');
    const sectionLabel = document.getElementById('sectionLabel');

    const filtered = videos.filter(v => {
        const matchCategory = currentCategory === 'all' || v.category === currentCategory;
        const matchSeason = currentSeason === 'all' || v.season === parseInt(currentSeason);
        const matchSearch = searchQuery === '' || v.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSeason && matchSearch;
    });

    if (currentCategory === 'all') sectionLabel.textContent = 'Все видео';
    else if (currentCategory === 'evrei') sectionLabel.textContent = 'Евреи изменившие мир';
    else if (currentSeason === 'all') sectionLabel.textContent = 'Истории, которые изменили мир';
    else sectionLabel.textContent = `Истории — Сезон ${currentSeason}`;

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = filtered.map(v => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class="video-card" onclick="openModal(${v.id})">
                <div class="card-thumb">
                    ${v.thumbnail
                        ? `<img src="${v.thumbnail}" alt="${v.title}" loading="lazy">`
                        : `<div class="thumb-placeholder"><i class="bi bi-play-circle"></i></div>`
                    }
                    <div class="play-overlay">
                        <div class="play-btn"><i class="bi bi-play-fill"></i></div>
                    </div>
                    ${v.duration ? `<span class="duration-badge">${v.duration}</span>` : ''}
                </div>
                <div class="card-body-custom">
                    <span class="card-category-tag ${v.category === 'evrei' ? 'tag-evrei' : 'tag-istorii'}">
                        ${v.category === 'evrei' ? 'Евреи изменившие мир' : `Истории · Сезон ${v.season}`}
                    </span>
                    <div class="card-title-custom">${v.title}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(id) {
    const v = videos.find(v => v.id === id);
    if (!v) return;
    document.getElementById('modalVideoSrc').src = v.file;
    document.getElementById('modalTitle').textContent = v.title;
    document.getElementById('modalDescription').textContent = v.description || '';
    document.getElementById('modalVideo').load();
    document.getElementById('videoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.getElementById('modalVideo').pause();
    document.body.style.overflow = '';
}

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentSeason = 'all';

        const seasonTabs = document.getElementById('seasonTabs');
        if (currentCategory === 'istorii') {
            seasonTabs.classList.add('visible');
        } else {
            seasonTabs.classList.remove('visible');
        }

        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.season-btn[data-season="all"]').classList.add('active');

        renderVideos();
    });
});

document.querySelectorAll('.season-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSeason = btn.dataset.season;
        renderVideos();
    });
});

document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderVideos();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

renderVideos();
