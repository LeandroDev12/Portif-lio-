// ----------------------- Lista de vídeos -----------------------
const videos = [
  {
    title: "Vídeo de Apresentação",
    thumb: "https://img.youtube.com/vi/6V5hf0XxIWM/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/6V5hf0XxIWM",
    isIntro: true
  },

  { title: "Somos poeira das estrelas", thumb: "https://img.youtube.com/vi/qHwA0o4pmZQ/maxresdefault.jpg", url: "https://www.youtube.com/embed/qHwA0o4pmZQ" },
  { title: "Quando iremos a Marte?", thumb: "https://img.youtube.com/vi/Bsug3KoTWaM/maxresdefault.jpg", url: "https://www.youtube.com/embed/Bsug3KoTWaM" },
  { title: "O que acontece se cair num buraco negro?", thumb: "https://img.youtube.com/vi/YI9zRN7wJIU/maxresdefault.jpg", url: "https://www.youtube.com/embed/YI9zRN7wJIU" },
  { title: "Pálido Ponto Azul", thumb: "https://img.youtube.com/vi/fBgNSIRWIns/maxresdefault.jpg", url: "https://www.youtube.com/embed/fBgNSIRWIns" },
  { title: "O que é ser estoico?", thumb: "https://img.youtube.com/vi/r_uEUM_A1Xc/maxresdefault.jpg", url: "https://www.youtube.com/embed/r_uEUM_A1Xc" },

  { 
    title: "Discurso de salvação de Jesus", 
    thumb: "https://img.youtube.com/vi/JNU0gHHmhXo/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/JNU0gHHmhXo" 
  },

  { 
    title: "O silêncio de Deus", 
    thumb: "https://img.youtube.com/vi/ZXiVZdkI6vw/maxresdefault.jpg", 
    url: "https://www.youtube.com/embed/ZXiVZdkI6vw" 
  },

  {
    title: "O problema do apego",
    thumb: "https://img.youtube.com/vi/XaZ9B4-V-2o/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/XaZ9B4-V-2o"
  },
  {
    title: "Peter Jordan era ateu?",
    thumb: "https://img.youtube.com/vi/_y5d4QaIZ60/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/_y5d4QaIZ60"
  },

  { 
    title: "Por que Peter acredita em Deus", 
    thumb: "https://img.youtube.com/vi/b9fk6DWdYC8/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/b9fk6DWdYC8" 
  },

  { title: "Earth Song - Michael Jackson", thumb: "earth.jpg", url: "https://www.youtube.com/embed/JblVfbUBtmE" },
  { title: "Thriller - Michael Jackson", thumb: "thriller.jpg", url: "https://www.youtube.com/embed/l8gfm6u5ES4" },

  // -------------------- NOVO VÍDEO LOCAL AQUI --------------------
  { 
    title: "Billie Jean - Michael Jackson", 
    thumb: "billie-jean.jpg", 
    url: "billie-jean.mp4", 
    local: true 
  },

  { title: "A franquia Resident Evil é super estimada", thumb: "resi.jpg", url: "https://www.youtube.com/embed/_2iyuu1E2jw", description: "Contém palavrão" },
  { title: "5 Coisas que o Kratos fez de bom", thumb: "kratos.jpg", url: "https://www.youtube.com/embed/c6W6k6s9HEo", description: "Contém palavrão" },
  { title: "Os privilégios dos políticos brasileiros", thumb: "kkk.jpg", url: "https://www.youtube.com/embed/KCW7t33yjZc" },
  { title: "Origem da lei Magnitsky", thumb: "lei.jpg", url: "https://www.youtube.com/embed/5-xSb2SIhRc" },
  { title: "Adultização", thumb: "felca.jpg", url: "https://www.youtube.com/embed/Bq1vE7TV6II" },
  { title: "O nepotismo no governo Lula", thumb: "nepotismo.jpg", url: "https://www.youtube.com/embed/lK-d0vVb3SI" },
  { title: "As hipocrisias de Lula", thumb: "lula.jpg", url: "https://www.youtube.com/embed/j6zOTaiyUeU" },
  { title: "As leis mais INÚTEIS DO BRASIL", thumb: "leis.jpg", url: "https://www.youtube.com/embed/PjMPwfiQNqo" },

  { 
    title: "BiTinCorp", 
    thumb: "bit.jpg", 
    url: "https://www.youtube.com/embed/fUnRJUhzQ-Y" 
  }
];

// ----------------------- Modal -----------------------
const modal = document.getElementById('videoModal');
const modalContainer = document.getElementById('modalVideoContainer');
const closeBtn = document.getElementById('closeModal');
let player;

// Detecta arquivo local
function isLocalVideo(url) {
  return url.endsWith(".mp4");
}

function openModal(url, title, isIntro = false) {
  if (!modal || !modalContainer) return;

  modal.classList.add('open');
  modal.dataset.isIntro = isIntro ? 'true' : 'false';

  modalContainer.innerHTML = `<h2 style="color:#fff;margin-bottom:1rem;">${title}</h2>`;
  document.body.style.overflow = 'hidden';

  // -------- Vídeo local (.mp4) --------
  if (isLocalVideo(url)) {
    modalContainer.innerHTML += `
      <video id="playerLocal" width="100%" controls autoplay style="border:none;">
        <source src="${url}" type="video/mp4">
      </video>
    `;
    return;
  }

  // -------- YouTube --------
  modalContainer.innerHTML += `<div id="player"></div>`;

  player = new YT.Player('player', {
    height: '450',
    width: '100%',
    videoId: getVideoId(url),
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
    events: {
      'onReady': event => event.target.getIframe().style.border = 'none'
    }
  });
}

function getVideoId(url) {
  const regex = /(?:\/|v=)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function closeModal() {
  if (!modal || !modalContainer) return;

  modal.classList.remove('open');
  modalContainer.innerHTML = '';
  document.body.style.overflow = '';

  if (player) {
    player.destroy();
    player = null;
  }
}

closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// ----------------------- Galeria -----------------------
function renderVideoCards() {
  const gallery = document.getElementById('videoGallery');
  if (!gallery) return;

  gallery.style.display = 'grid';
  gallery.innerHTML = '';

  videos.forEach((video, index) => {
    const card = createVideoCard(video);
    gallery.appendChild(card);

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function createVideoCard(video) {
  const card = document.createElement('div');

  card.className = 'card' + (video.isIntro ? ' intro' : '');
  card.tabIndex = 0;

  card.innerHTML = `
    <div style="position: relative;">
      <img class="thumb" src="${video.thumb}" alt="Thumbnail do vídeo" loading="lazy" />
      <div class="play-overlay"></div>
    </div>
    <div class="card-content">
      <h3 class="card-title">${video.title}</h3>
      ${video.description ? `<p class="warning">${video.description}</p>` : ''}
    </div>
  `;

  card.addEventListener('click', () => openModal(video.url, video.title, video.isIntro));
  return card;
}

// ----------------------- WhatsApp -----------------------
function createWhatsAppIcon() {
  if (document.getElementById('whatsappIcon')) return;

  const a = document.createElement('a');
  a.href = 'https://wa.me/5515981132964';
  a.target = '_blank';
  a.id = 'whatsappIcon';

  const img = document.createElement('img');
  img.src = 'Whats.png';
  img.alt = 'WhatsApp';

  a.appendChild(img);
  document.body.appendChild(a);
}

// ----------------------- Inicialização -----------------------
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loadingScreen');

  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }

    renderVideoCards();
    createWhatsAppIcon();
  }, 1000);
});