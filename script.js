// ----- FLOATING BACKGROUND EMOJIS -----
const FLOATIES = ['🌷','🌷','💕','💗','🐾','🌷','💖','🌷','💓','🌷'];

function spawnFloaties() {
  const container = document.getElementById('bgFloaties');
  FLOATIES.forEach((emoji, i) => {
    const el = document.createElement('span');
    el.className = 'floatie';
    el.textContent = emoji;
    el.style.left     = `${Math.random() * 100}%`;
    el.style.animationDuration = `${7 + Math.random() * 8}s`;
    el.style.animationDelay   = `${i * 0.7}s`;
    el.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;
    container.appendChild(el);
  });
}
spawnFloaties();

// ----- LETTER PARAGRAPHS -----
const PARAGRAPHS = [
  "Baby, being with you feels like coming home in the middle of a busy day. I love your quiet strength and the way your laugh lights up my world. I’m grateful for every moment we share, right here, right now.",
  "I love how you listen and how you care without effort, how you make even small moments feel intimate. Your warmth stays with me long after we’re apart.",
  "We started as two people who were both just bored, and because of that boredom, we ended up opening the same website (I’ve already forgotten its name). I’m really grateful that you were there too at that moment, because that’s how I got to meet you.",
  " I also love how we started as enemies first, and then somehow ended up becoming lovers. The moment we carved out time for a late-night talk, I knew this would be different.",
  "I dream of a life where we keep growing together, building a home and becoming fur parents, side by side, every day a little sweeter than the last.",
  "Thank you for being you. The world is softer, sweeter, and more beautiful because you exist in it. 💖",
];

let currentParagraph = 0;

function revealNext() {
  const textEl  = document.getElementById('letterText');
  const btn     = document.getElementById('revealBtn');
  const sigEl   = document.getElementById('signature');

  if (currentParagraph < PARAGRAPHS.length) {
    const p = document.createElement('span');
    p.style.display = 'block';
    p.style.opacity = '0';
    p.style.animation = 'fadeIn 0.7s ease forwards';
    p.textContent = PARAGRAPHS[currentParagraph];
    textEl.appendChild(p);
    currentParagraph++;

    // sprinkle hearts on click
    sprinkleHearts();
  }

  if (currentParagraph >= PARAGRAPHS.length) {
    btn.style.display = 'none';
    sigEl.style.display = 'block';
  } else {
    btn.textContent = currentParagraph === 1 ? 'Keep reading 💓' : 'Tell me more 🌷';
  }
}

// ----- OPEN ENVELOPE -----
function openEnvelope() {
  const env    = document.getElementById('envelope');
  const letter = document.getElementById('letter');

  if (env.classList.contains('opened')) return;

  env.classList.add('opened');
  env.style.animation = 'none';

  setTimeout(() => {
    env.style.display = 'none';
    letter.style.display = 'block';
    // first paragraph auto-reveals
    revealNext();
  }, 650);
}

// ----- CLOSE / REFOLD -----
function closeAll() {
  const env    = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const textEl = document.getElementById('letterText');
  const btn    = document.getElementById('revealBtn');
  const sigEl  = document.getElementById('signature');
  const petalMsg = document.getElementById('petalMsg');

  // reset state
  currentParagraph = 0;
  textEl.innerHTML = '';
  btn.textContent   = 'Read More 💗';
  btn.style.display = 'block';
  sigEl.style.display = 'none';
  petalMsg.textContent = '';
  document.querySelectorAll('.petal-btn').forEach(p => p.classList.remove('picked'));

  letter.style.display = 'none';
  env.classList.remove('opened');
  env.style.display    = 'block';
  env.style.animation  = 'envBob 3s ease-in-out infinite';
}

// ----- PETAL GAME -----
const PETAL_MSGS = [
  "They love you to the moon and back! 🌙💖",
  "Your heart is the sweetest garden 🌷🌷",
  "Love blooms wherever you go 💕",
  "You are truly, deeply loved 🐾💗",
  "This tulip is yours forever! 🌷✨",
];

function pickPetal(el) {
  if (el.classList.contains('picked')) return;
  el.classList.add('picked');

  const remaining = document.querySelectorAll('.petal-btn:not(.picked)');
  const msg = document.getElementById('petalMsg');

  if (remaining.length === 0) {
    msg.textContent = "You picked them all! That's how much you're loved 💖🌷";
  } else {
    const idx = Math.floor(Math.random() * PETAL_MSGS.length);
    msg.textContent = PETAL_MSGS[idx];
    msg.style.animation = 'none';
    void msg.offsetWidth; // reflow
    msg.style.animation = 'fadeIn 0.5s ease forwards';
  }
  sprinkleHearts();
}

// ----- HEART SPRINKLE -----
function sprinkleHearts() {
  const emojis = ['💕','💗','💖','🌷','✨','💓'];
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      left: ${20 + Math.random() * 60}%;
      top:  ${20 + Math.random() * 60}%;
      font-size: ${0.8 + Math.random() * 1.2}rem;
      pointer-events: none;
      z-index: 999;
      animation: floatUp ${1.2 + Math.random() * 1}s ease forwards;
      opacity: 1;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
}