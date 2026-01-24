// Música de fundo simples
let audioElement: HTMLAudioElement | null = null;

export const playBackgroundMusic = () => {
  if (audioElement) return;

  audioElement = new Audio();
  audioElement.id = 'bg-music';
  audioElement.loop = true;
  audioElement.volume = 0.25;
  
  // Usa a música local da pasta public
  audioElement.src = '/musica.mp3';

  const playOnClick = () => {
    if (audioElement) {
      audioElement.play()
        .then(() => console.log('🎵 Música iniciada'))
        .catch(e => console.log('Erro:', e));
    }
    document.removeEventListener('click', playOnClick);
  };

  document.addEventListener('click', playOnClick);
};

export const stopBackgroundMusic = () => {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
};

export const toggleBackgroundMusic = () => {
  if (audioElement) {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }
};

export const setMusicVolume = (volume: number) => {
  if (audioElement) {
    audioElement.volume = Math.max(0, Math.min(1, volume));
  }
};
