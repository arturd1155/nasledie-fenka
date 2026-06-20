// ЗДЕСЬ ДОБАВЛЯЙ СВОИ ВИДЕО
// category: "evrei" = раздел "Евреи изменившие мир"
// category: "istorii" = раздел "Истории, которые изменили мир"
// season: номер сезона (только для "istorii"), для "evrei" пиши null
// file: путь к видеофайлу (положи mp4 в нужную папку)
// thumbnail: путь к картинке-обложке (положи в папку thumbnails), если нет — пиши null
// duration: длина видео в формате "ЧЧ:ММ" (например "24:15")

const videos = [

    // ── ЕВРЕИ ИЗМЕНИВШИЕ МИР ──────────────────────────────────
    {
        id: 1,
        title: "Название видео 1",
        category: "evrei",
        season: null,
        file: "videos/evrei/video1.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },
    {
        id: 2,
        title: "Название видео 2",
        category: "evrei",
        season: null,
        file: "videos/evrei/video2.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },
    {
        id: 3,
        title: "Название видео 3",
        category: "evrei",
        season: null,
        file: "videos/evrei/video3.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },

    // ── ИСТОРИИ, КОТОРЫЕ ИЗМЕНИЛИ МИР — СЕЗОН 1. МОИСЕЙ ─────
    {
        id: 4,
        title: "Название видео 1",
        category: "istorii",
        season: 1,
        file: "videos/istorii/sezon1/video1.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },
    {
        id: 5,
        title: "Название видео 2",
        category: "istorii",
        season: 1,
        file: "videos/istorii/sezon1/video2.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },
    {
        id: 6,
        title: "Название видео 3",
        category: "istorii",
        season: 1,
        file: "videos/istorii/sezon1/video3.mp4",
        thumbnail: null,
        duration: "00:00",
        description: "Описание видео"
    },

    // Чтобы добавить новое видео — скопируй блок выше и измени данные.
    // Для нового сезона измени season: на нужный номер (например season: 2).
];
