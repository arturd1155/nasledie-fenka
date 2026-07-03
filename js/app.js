let currentSeason = 1;
let gridCategory = 'all';
let gridSearch = '';

function categoryTag(v) {
    if (v.category === 'evrei') return { tag: 'tag-evrei', label: 'Евреи изменившие мир' };
    if (v.category === 'sinagogi') return { tag: 'tag-sinagogi', label: 'Синагоги мира' };
    return { tag: 'tag-istorii', label: `Истории · Сезон ${v.season}` };
}

function cardHTML(v, isGrid = false) {
    const { tag, label } = categoryTag(v);
    const cls = isGrid ? 'video-card-grid' : 'video-card';
    return `
        <div class="${cls}" onclick="openModal(${v.id})">
            <div class="card-thumb">
                ${v.thumbnail
                    ? `<img src="${v.thumbnail}" alt="${v.title}" loading="lazy">`
                    : `<div class="thumb-placeholder"><i class="bi bi-play-circle"></i></div>`}
                <div class="play-overlay"><div class="play-btn"><i class="bi bi-play-fill"></i></div></div>
                ${v.duration ? `<span class="duration-badge">${v.duration}</span>` : ''}
            </div>
            <div class="card-body-custom">
                <span class="card-category-tag ${tag}">${label}</span>
                <div class="card-title-custom">${v.title}</div>
            </div>
        </div>`;
}

function renderEvreiRow() {
    const list = videos.filter(v => v.category === 'evrei');
    document.getElementById('evreiGrid').innerHTML = list.map(v => cardHTML(v)).join('');
}

function renderStoriiRow() {
    const list = videos.filter(v => v.category === 'istorii' && v.season === currentSeason);
    document.getElementById('istoriiGrid').innerHTML = list.map(v => cardHTML(v)).join('');
}

function photoCardHTML(s) {
    return `
        <div class="photo-card" onclick="openPhotoModal(${s.id})">
            <div class="photo-card-img">
                ${s.photo
                    ? `<img src="${s.photo}" alt="${s.title}" loading="lazy">`
                    : `<div class="thumb-placeholder"><i class="bi bi-building"></i></div>`}
            </div>
            <div class="photo-card-body">
                <div class="photo-card-title">${s.title}</div>
                ${s.location ? `<div class="photo-card-location"><i class="bi bi-geo-alt"></i> ${s.location}</div>` : ''}
            </div>
        </div>`;
}

function renderSinagogiRow() {
    const grid = document.getElementById('sinagogiGrid');
    if (!sinagogi || sinagogi.length === 0) {
        grid.innerHTML = '<div class="sinagogi-empty"><i class="bi bi-building"></i><p>Фотографии скоро появятся</p></div>';
        return;
    }
    grid.innerHTML = sinagogi.map(s => photoCardHTML(s)).join('');
}

function openPhotoModal(id) {
    const s = sinagogi.find(s => s.id === id);
    if (!s) return;
    document.getElementById('photoModalImg').src = s.photo || '';
    document.getElementById('photoModalImg').alt = s.title;
    document.getElementById('photoModalTitle').textContent = s.title;
    document.getElementById('photoModalLocation').textContent = s.location || '';
    document.getElementById('photoModalDescription').textContent = s.description || '';
    document.getElementById('photoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    document.getElementById('photoModal').classList.remove('active');
    document.body.style.overflow = '';
}

function renderAllGrid() {
    const list = videos.filter(v => {
        const matchCat = gridCategory === 'all' || v.category === gridCategory;
        const matchSearch = gridSearch === '' || v.title.toLowerCase().includes(gridSearch.toLowerCase());
        return matchCat && matchSearch;
    });
    const noResults = document.getElementById('noResults');
    const grid = document.getElementById('allGrid');
    if (list.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';
    grid.innerHTML = list.map(v => `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
            ${cardHTML(v, true)}
        </div>`).join('');
}

function openModal(id) {
    const v = videos.find(v => v.id === id);
    if (!v) return;
    const wrap = document.getElementById('modalVideoWrap');
    document.getElementById('modalTitle').textContent = v.title;
    document.getElementById('modalDescription').textContent = v.description || '';
    if (v.vkEmbed) {
        wrap.innerHTML = `<iframe src="${v.vkEmbed}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    } else {
        wrap.innerHTML = `<video controls><source src="${v.file}" type="video/mp4"></video>`;
        wrap.querySelector('video').load();
    }
    document.getElementById('videoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.getElementById('modalVideoWrap').innerHTML = '';
    document.body.style.overflow = '';
}

function toggleSearch() {
    document.getElementById('searchBarWrap').classList.toggle('open');
}

function scrollToVideos() {
    document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Season buttons
document.querySelectorAll('.season-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSeason = parseInt(btn.dataset.season);
        renderStoriiRow();
    });
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gridCategory = btn.dataset.category;
        renderAllGrid();
    });
});

// Grid search
document.getElementById('gridSearchInput').addEventListener('input', e => {
    gridSearch = e.target.value;
    renderAllGrid();
});

// Header search
document.getElementById('searchInput').addEventListener('input', e => {
    gridSearch = e.target.value;
    gridCategory = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
    document.getElementById('gridSearchInput').value = gridSearch;
    renderAllGrid();
    if (gridSearch) document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closePhotoModal(); } });

renderEvreiRow();
renderStoriiRow();
renderSinagogiRow();
renderAllGrid();
