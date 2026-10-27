
/* Wait for the page to load */

window.addEventListener("load", () => {
  createStars();

  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1200);
});

/* Create random stars */

function createStars() {
  const starfield = document.getElementById("starfield");
  const starCount = window.innerWidth < 600 ? 65 : 120;

  starfield.innerHTML = "";

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    starfield.appendChild(star);
  }
}

/* Navigate between chapters */

function navigateTo(number) {
  if (number < 1 || number > 10) return;

  document.querySelectorAll(".chapter").forEach(chapter => {
    chapter.classList.remove("active");
  });

  const selectedChapter = document.getElementById(`chapter-${number}`);

  if (selectedChapter) {
    selectedChapter.classList.add("active");
  }

  document.querySelectorAll(".nav-dot").forEach(button => {
    button.classList.toggle(
      "active",
      Number(button.dataset.ch) === number
    );
  });

  document.getElementById("chapter-number").textContent =
    String(number).padStart(2, "0");

  document.getElementById("progress-fill").style.width =
    (number * 10) + "%";

  if (number === 10) {
    createConfetti();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* Floating hearts and petals */

function releasePetals(amount = 12) {
  const symbols = ["♡", "✿", "♥", "✧"];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";
    petal.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (14 + Math.random() * 18) + "px";
    petal.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 8500);
  }
}

/* Birthday celebration */

function celebrate() {
  releasePetals(45);
  createConfetti();
}

/* Simple confetti effect */

function createConfetti() {
  const colors = ["#ffb8d2", "#c9b8ff", "#ffe2a6", "#fff6f8"];

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("span");

    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-15px";
    piece.style.width = "7px";
    piece.style.height = "10px";
    piece.style.borderRadius = "2px";
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.zIndex = "100";
    piece.style.pointerEvents = "none";
    piece.style.transition =
      `transform ${2 + Math.random() * 3}s linear, opacity 4s ease`;

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform =
        `translate(${Math.random() * 160 - 80}px, ${window.innerHeight + 40}px) rotate(${Math.random() * 900}deg)`;
      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), 5500);
  }
}


/* =====================================
   CHAPTER 2 — CINEMATIC LOVE LETTER
===================================== */

const nishuLetterText = [
  "I don't think words will ever be enough to explain how special you are to me. ",
  "But today, I want to try. ♡\n\n",

  "Thank you for being the person who makes ordinary moments feel special. ",
  "Thank you for the laughs, the little memories, and all those moments ",
  "that mean more to me than I can properly explain.\n\n",

  "You deserve a life filled with beautiful surprises, ",
  "genuine happiness, peaceful days, and people who love you ",
  "for exactly who you are.\n\n",

  "And no matter how much time passes, I hope you always remember ",
  "that somewhere in this big universe, there is a little chota bacha ",
  "who is really, really grateful to have you. 💗"
].join("");

let letterTypingTimer = null;
let letterHasOpened = false;
let letterIsTyping = false;


/* Open the envelope */

function openCinemaLetter() {
  if (letterHasOpened) return;

  const envelope = document.getElementById("cinemaEnvelope");
  const hint = document.getElementById("envelopeHint");
  const openButton = document.getElementById("letterOpenButton");

  if (!envelope) return;

  letterHasOpened = true;

  envelope.classList.add("open");

  if (hint) {
    hint.textContent = "A little something from my heart... ♡";
  }

  if (openButton) {
    openButton.hidden = true;
  }

  releaseLetterPetals(12);

  // Open the flap first, then lift and expand the letter.
  setTimeout(() => {
    envelope.classList.add("letter-expanded");
  }, 650);

  // Start typing after the letter has had time to rise.
  setTimeout(() => {
    startLetterTyping();
  }, 1500);
}


/* Type out the letter */

function startLetterTyping() {
  if (letterIsTyping) return;

  const message = document.getElementById("typedMessage");
  const signature = document.getElementById("letterSignature");
  const replayButton = document.getElementById("letterReplayButton");
  const secret = document.getElementById("secretLetter");
  const hint = document.getElementById("envelopeHint");

  if (!message) return;

  letterIsTyping = true;

  message.textContent = "";
  if (signature) signature.classList.remove("visible");
  if (secret) secret.classList.remove("visible");
  if (replayButton) replayButton.hidden = true;

  let characterIndex = 0;

  function typeNextCharacter() {
    if (characterIndex < nishuLetterText.length) {
      message.textContent += nishuLetterText.charAt(characterIndex);
      characterIndex++;

      // Keep the latest text visible while it types.
      const paper = document.getElementById("letterPaper");
      if (paper) {
        paper.scrollTop = paper.scrollHeight;
      }

      letterTypingTimer = setTimeout(typeNextCharacter, 28);
    } else {
      letterIsTyping = false;

      if (signature) {
        signature.classList.add("visible");
      }

      if (secret) {
        secret.classList.add("visible");
      }

      if (replayButton) {
        replayButton.hidden = false;
      }

      if (hint) {
        hint.textContent = "A little piece of my heart, just for you. 💗";
      }

      releaseLetterPetals(18);
    }
  }

  typeNextCharacter();
}


/* Replay the letter */

function resetCinemaLetter() {
  if (letterTypingTimer !== null) {
    clearTimeout(letterTypingTimer);
    letterTypingTimer = null;
  }

  letterHasOpened = false;
  letterIsTyping = false;

  const envelope = document.getElementById("cinemaEnvelope");
  const message = document.getElementById("typedMessage");
  const signature = document.getElementById("letterSignature");
  const hint = document.getElementById("envelopeHint");
  const openButton = document.getElementById("letterOpenButton");
  const replayButton = document.getElementById("letterReplayButton");
  const secret = document.getElementById("secretLetter");

  if (envelope) {
    envelope.classList.remove("open", "letter-expanded");
  }

  if (message) message.textContent = "";

  if (signature) {
    signature.classList.remove("visible");
  }

  if (secret) {
    secret.classList.remove("visible");
  }

  if (hint) {
    hint.textContent = "Tap the little heart to open your letter 💌";
  }

  if (openButton) openButton.hidden = false;
  if (replayButton) replayButton.hidden = true;

  const paper = document.getElementById("letterPaper");
  if (paper) paper.scrollTop = 0;
}


/* Floating hearts and petals for this chapter */

function releaseLetterPetals(amount = 12) {
  const symbols = ["♡", "♥", "✧", "✿"];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");

    petal.className = "letter-petal";
    petal.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (15 + Math.random() * 18) + "px";
    petal.style.setProperty(
      "--drift",
      (Math.random() * 160 - 80) + "px"
    );

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 5000);
  }
}

/* =====================================
   CHAPTER 3 — INTERACTIVE MEMORY GALLERY
===================================== */

const nishuMemories = [
  {
    title: "The beginning ♡",
    caption: "Every beautiful story has a beginning. I'm glad ours exists.",
    image: "assets/memory-1.jpg"
  },
  {
    title: "That happy day",
    caption: "Some moments make you smile even long after they've passed.",
    image: "assets/memory-2.jpg"
  },
  {
    title: "Just being us",
    caption: "No grand plans needed. Sometimes being ourselves is enough.",
    image: "assets/memory-3.jpg"
  },
  {
    title: "My comfort person",
    caption: "Some people make the world feel a little softer. You're one of them.",
    image: "assets/memory-4.jpg"
  },
  {
    title: "A forever favourite",
    caption: "A tiny moment, a big feeling, and a place in my heart.",
    image: "assets/memory-5.jpg"
  },
  {
    title: "More memories to come",
    caption: "This isn't the end of our story. There are so many moments left to make.",
    image: "assets/memory-6.jpg"
  }
];

let activeMemoryIndex = 0;


/* Open a selected photo */

function openMemory(index) {
  if (index < 0 || index >= nishuMemories.length) return;

  activeMemoryIndex = index;

  const lightbox = document.getElementById("memoryLightbox");

  if (!lightbox) return;

  updateMemoryLightbox();

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}


/* Update the selected photo and caption */

function updateMemoryLightbox() {
  const memory = nishuMemories[activeMemoryIndex];

  const photo = document.getElementById("lightboxPhoto");
  const count = document.getElementById("lightboxCount");
  const title = document.getElementById("lightboxTitle");
  const caption = document.getElementById("lightboxCaption");

  if (!photo || !memory) return;

  photo.innerHTML = "";

  const galleryImage = document.querySelector(
    `#chapter-3 .memory-card-${activeMemoryIndex + 1} img`
  );

  // Use the actual gallery image if it loaded successfully.
  if (
    galleryImage &&
    galleryImage.complete &&
    galleryImage.naturalWidth > 0
  ) {
    const enlargedImage = document.createElement("img");
    enlargedImage.src = galleryImage.currentSrc || galleryImage.src;
    enlargedImage.alt = memory.title;

    photo.appendChild(enlargedImage);
  } else {
    // A decorative fallback appears until a real photo is added.
    const placeholder = document.createElement("span");
    placeholder.textContent = ["♡", "✿", "☾", "♡", "✧", "♥"][
      activeMemoryIndex
    ];

    photo.appendChild(placeholder);
  }

  count.textContent =
    `MEMORY ${String(activeMemoryIndex + 1).padStart(2, "0")} / 06`;

  title.textContent = memory.title;
  caption.textContent = memory.caption;
}


/* Move between photos */

function changeMemory(direction) {
  activeMemoryIndex =
    (activeMemoryIndex + direction + nishuMemories.length) %
    nishuMemories.length;

  updateMemoryLightbox();
}


/* Close the photo viewer */

function closeMemory() {
  const lightbox = document.getElementById("memoryLightbox");

  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.style.overflow = "";
}


/* Close only when clicking the dark backdrop */

function closeMemoryOnBackdrop(event) {
  if (event.target.id === "memoryLightbox") {
    closeMemory();
  }
}


/* Reveal the extra note */

function showMemoryNote() {
  const note = document.getElementById("memoryNote");

  if (!note) return;

  note.hidden = !note.hidden;

  if (!note.hidden) {
    releaseLetterPetals(8);
  }
}


/* Keyboard support */

document.addEventListener("keydown", function(event) {
  const lightbox = document.getElementById("memoryLightbox");

  if (!lightbox || lightbox.hidden) return;

  if (event.key === "Escape") {
    closeMemory();
  }

  if (event.key === "ArrowRight") {
    changeMemory(1);
  }

  if (event.key === "ArrowLeft") {
    changeMemory(-1);
  }
});

/* =====================================
   CHAPTER 4 — INTERACTIVE REASONS
===================================== */

const adoreReasonsCount = 8;
const discoveredAdoreReasons = new Set();


/* Reveal a reason card */

function revealAdore(index) {
  if (index < 0 || index >= adoreReasonsCount) return;

  const card = document.querySelector(
    `#chapter-4 .adore-card:nth-child(${index + 1})`
  );

  if (!card) return;

  // Don't count the same card twice.
  if (discoveredAdoreReasons.has(index)) return;

  discoveredAdoreReasons.add(index);
  card.classList.add("revealed");
  card.setAttribute("aria-expanded", "true");

  updateAdoreProgress();

  // A little burst of hearts when a reason is discovered.
  releaseAdoreHearts(4);

  // Unlock the final message after all eight cards are opened.
  if (discoveredAdoreReasons.size === adoreReasonsCount) {
    revealAdoreFinale();
  }
}


/* Update the discovery counter */

function updateAdoreProgress() {
  const counter = document.getElementById("adoreCounter");
  const note = document.getElementById("adoreProgressNote");

  const discovered = discoveredAdoreReasons.size;

  if (counter) {
    counter.textContent =
      `${discovered} of ${adoreReasonsCount} little reasons discovered`;
  }

  if (!note) return;

  if (discovered === 0) {
    note.textContent = "Your little collection begins with one tap. ✨";
  } else if (discovered < adoreReasonsCount) {
    note.textContent =
      `${adoreReasonsCount - discovered} more little reasons are waiting for you. ♡`;
  } else {
    note.textContent =
      "You found them all. But these are only a few of the reasons. 💗";
  }
}


/* Reveal the final message */

function revealAdoreFinale() {
  const finale = document.getElementById("adoreFinale");

  if (!finale || finale.classList.contains("visible")) return;

  finale.classList.add("visible");

  setTimeout(() => {
    finale.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 250);

  releaseAdoreHearts(20);
}


/* Floating hearts for Chapter 4 */

function releaseAdoreHearts(amount = 6) {
  const symbols = ["♡", "♥", "✧"];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "adore-floating-heart";
    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.cssText = `
      position: fixed;
      left: ${15 + Math.random() * 70}vw;
      top: ${45 + Math.random() * 25}vh;
      z-index: 150;
      color: ${Math.random() > 0.5 ? "#ffb8d2" : "#c9b8ff"};
      font-size: ${15 + Math.random() * 17}px;
      pointer-events: none;
      animation: adoreHeartRise 2.4s ease-out forwards;
    `;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2600);
  }
}


/* Add the floating-heart animation once */

if (!document.getElementById("adoreHeartAnimation")) {
  const adoreStyle = document.createElement("style");
  adoreStyle.id = "adoreHeartAnimation";

  adoreStyle.textContent = `
    @keyframes adoreHeartRise {
      0% {
        opacity: 0;
        transform: translateY(15px) scale(0.6) rotate(-10deg);
      }

      20% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        transform: translateY(-100px) scale(1.3) rotate(20deg);
      }
    }
  `;

  document.head.appendChild(adoreStyle);
}


/* Initialise the cards */

document.querySelectorAll("#chapter-4 .adore-card").forEach(card => {
  card.setAttribute("aria-expanded", "false");
});

/* =====================================
   CHAPTER 5 — THE INTERACTIVE WISH GARDEN
===================================== */

const nishuGardenWishes = [
  {
    flower: "🌷",
    title: "A wish for happiness",
    message:
      "I hope your days are filled with genuine laughter, " +
      "little unexpected joys, and so many reasons to smile. " +
      "May happiness find you even on the most ordinary days. ♡"
  },
  {
    flower: "🌸",
    title: "A wish for peace",
    message:
      "I hope your heart finds peace, your mind gets the rest " +
      "it deserves, and you never feel pressured to have " +
      "everything figured out all at once. Take life at your pace."
  },
  {
    flower: "🌻",
    title: "A wish for courage",
    message:
      "Whenever life feels uncertain, I hope you remember " +
      "how much you're capable of. May you find the courage " +
      "to try, to grow, and to believe in yourself again. ✨"
  },
  {
    flower: "🌼",
    title: "A wish for adventure",
    message:
      "May this new chapter bring beautiful places, spontaneous " +
      "plans, unforgettable memories, and opportunities that " +
      "make you excited about everything still ahead of you."
  },
  {
    flower: "🪻",
    title: "A wish for love",
    message:
      "May you always be surrounded by people who appreciate " +
      "the real you, respect your heart, celebrate your wins, " +
      "and remind you that you never have to be perfect to be loved. 💗"
  },
  {
    flower: "🌹",
    title: "A wish just for you",
    message:
      "More than anything, I wish you a life that feels right " +
      "for YOU. A life with peace, purpose, good people, " +
      "beautiful surprises, and dreams that slowly become real. ♡"
  }
];

const plantedGardenWishes = new Set();


/* Plant a flower and reveal its wish */

function plantWish(index) {
  if (index < 0 || index >= nishuGardenWishes.length) return;

  const plot = document.querySelector(
    `#wishGarden .garden-plot:nth-child(${index + 1})`
  );

  if (!plot) return;

  const wish = nishuGardenWishes[index];
  const isNewFlower = !plantedGardenWishes.has(index);

  // Mark this flower as planted only once.
  if (isNewFlower) {
    plantedGardenWishes.add(index);
    plot.classList.add("bloomed");
    plot.setAttribute("aria-pressed", "true");

    releaseGardenMagic(5);
    updateGardenProgress();
  }

  // Show the selected wish.
  const icon = document.getElementById("gardenWishIcon");
  const label = document.getElementById("gardenWishLabel");
  const title = document.getElementById("gardenWishTitle");
  const message = document.getElementById("gardenWishText");
  const instruction = document.getElementById("gardenInstruction");
  const wishCard = document.getElementById("gardenWishCard");

  if (icon) icon.textContent = wish.flower;
  if (label) label.textContent = "A LITTLE WISH FOR NISHU";
  if (title) title.textContent = wish.title;
  if (message) message.textContent = wish.message;

  if (instruction) {
    instruction.textContent = plantedGardenWishes.size === 6
      ? "Your little garden is blooming with love. 🌷"
      : "Your flower has bloomed! Choose another seed to discover more. ♡";
  }

  // Replay the card's gentle reveal animation.
  if (wishCard) {
    wishCard.classList.remove("wish-updated");

    void wishCard.offsetWidth;

    wishCard.classList.add("wish-updated");
  }

  if (plantedGardenWishes.size === 6) {
    revealGardenFinale();
  }
}


/* Update the flower counter and progress bar */

function updateGardenProgress() {
  const count = plantedGardenWishes.size;

  const gardenCount = document.getElementById("gardenCount");
  const progressFill = document.getElementById("gardenProgressFill");

  if (gardenCount) {
    gardenCount.textContent = `${count} / 6 flowers`;
  }

  if (progressFill) {
    progressFill.style.width = `${(count / 6) * 100}%`;
  }
}


/* Reveal the finale once all six flowers bloom */

function revealGardenFinale() {
  const finale = document.getElementById("gardenFinale");

  if (!finale || finale.classList.contains("visible")) return;

  finale.classList.add("visible");

  const instruction = document.getElementById("gardenInstruction");

  if (instruction) {
    instruction.textContent =
      "You did it! Every little flower is now blooming. 💗";
  }

  // A bigger celebration for the completed garden.
  releaseGardenMagic(35);

  setTimeout(() => {
    finale.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 350);
}


/* Floating petals and magical sparkles */

function releaseGardenMagic(amount = 12) {
  const symbols = ["🌸", "🌷", "✧", "♡", "✿"];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");

    petal.className = "garden-petal";

    petal.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.fontSize =
      `${14 + Math.random() * 18}px`;

    petal.style.setProperty(
      "--petal-drift",
      `${Math.random() * 180 - 90}px`
    );

    petal.style.setProperty(
      "--fall-duration",
      `${3.5 + Math.random() * 2.5}s`
    );

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 6500);
  }
}


/* Initialise the garden */

function initialiseWishGarden() {
  document.querySelectorAll("#wishGarden .garden-plot").forEach(plot => {
    plot.classList.remove("bloomed");
    plot.setAttribute("aria-pressed", "false");
  });

  updateGardenProgress();
}

// Initialise once the HTML is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseWishGarden);
} else {
  initialiseWishGarden();
}

/* =====================================
   CHAPTER 6 — OPEN WHEN YOU NEED ME
===================================== */

const nishuComfortLetters = [
  {
    icon: "🌧️",
    title: "For the days that feel heavy",
    message:
      "Hey, Nishu. ♡\n\n" +
      "If today has been difficult, I just want you to know " +
      "that you don't have to pretend to be okay all the time. " +
      "You are allowed to feel tired, to take a break, and to " +
      "have days when everything feels a little too much.\n\n" +
      "You don't have to solve your entire life today. Take " +
      "a breath, drink some water, and give yourself the same " +
      "kindness you would give someone you love.\n\n" +
      "A difficult day doesn't make your life a difficult story. " +
      "There are still beautiful moments ahead of you, even " +
      "if you can't see them right now.\n\n" +
      "Sending you the biggest virtual hug, Mumma. 🫂"
  },
  {
    icon: "🌙",
    title: "For your quiet nights",
    message:
      "Hey, sleepyhead. 🌙\n\n" +
      "If your mind is running through a hundred different " +
      "thoughts tonight, let this be your little reminder " +
      "that you don't need to figure everything out before " +
      "you go to sleep.\n\n" +
      "Tomorrow can wait a little. The unanswered questions " +
      "can wait too. Right now, you deserve a moment of peace.\n\n" +
      "Relax your shoulders, take a slow breath, and let " +
      "yourself rest. You've made it through so many days " +
      "already, and you can take tomorrow one step at a time.\n\n" +
      "Goodnight, Nishu. I hope your dreams are gentle. ♡"
  },
  {
    icon: "🫂",
    title: "For when you miss me",
    message:
      "Mummaaa. 🥹💗\n\n" +
      "If you're missing me right now, imagine your chota " +
      "bacha sitting beside you, talking absolute nonsense " +
      "until you start laughing again.\n\n" +
      "I hope you know that even when we're busy with our " +
      "own lives, the little moments we've shared still " +
      "matter. Distance, time, and everyday chaos don't " +
      "erase the memories we've made.\n\n" +
      "So here's your tiny reminder to smile a little, " +
      "remember one of our funny moments, and imagine " +
      "a very dramatic virtual hug coming your way.\n\n" +
      "Consider yourself officially hugged. No escaping. 😭♡"
  },
  {
    icon: "✨",
    title: "For when you doubt yourself",
    message:
      "Listen to me for a second, Nishu. ✨\n\n" +
      "You don't have to have everything figured out. " +
      "You don't have to be the best at everything. " +
      "And you definitely don't have to compare your " +
      "journey with somebody else's.\n\n" +
      "You are allowed to learn slowly, make mistakes, " +
      "change your mind, and begin again. None of those " +
      "things make you less worthy of the dreams you have.\n\n" +
      "Please don't let one bad day convince you that " +
      "you're not capable of beautiful things. Keep going " +
      "at your own pace. I hope you learn to believe in " +
      "yourself as much as you deserve to.\n\n" +
      "Your chota bacha is cheering for you. Always. ♡"
  },
  {
    icon: "🎀",
    title: "For when you need a smile",
    message:
      "HELLOOOOO MUMMAAAAA. 😭🎀\n\n" +
      "This is your official notification that you are " +
      "required to smile at least a tiny bit right now.\n\n" +
      "Imagine me making the most ridiculous face, telling " +
      "the worst joke imaginable, and then laughing at " +
      "my own joke because apparently nobody else will.\n\n" +
      "You have permission to take a break from being " +
      "serious. Put on a favourite song, eat something " +
      "you love, watch something silly, or do absolutely " +
      "nothing for a little while.\n\n" +
      "This is your reminder that happiness doesn't always " +
      "need a big reason. Sometimes a tiny thing is enough.\n\n" +
      "Okay, now give me one little smile. Deal? ♡"
  },
  {
    icon: "💗",
    title: "A reminder that you're loved",
    message:
      "My dearest Nishu, 💗\n\n" +
      "I hope you never feel that you have to be perfect " +
      "to deserve care, kindness, or appreciation.\n\n" +
      "You are a person, not a list of achievements. " +
      "You can have flaws, uncertain days, and moments " +
      "when you don't feel like your best self. You still " +
      "deserve patience, respect, and genuine affection.\n\n" +
      "I am grateful for the memories we've shared, " +
      "the laughs, the conversations, and all the little " +
      "things that make our bond ours.\n\n" +
      "Whatever this new year brings, I hope you keep " +
      "finding people and places where you feel appreciated " +
      "for who you truly are.\n\n" +
      "You matter, Mumma. Never forget that. ♡\n\n" +
      "With all my love,\n" +
      "your chota bacha. 🥹"
  }
];

let activeComfortLetter = 0;


/* Open a selected comfort letter */

function openComfortLetter(index) {
  if (index < 0 || index >= nishuComfortLetters.length) return;

  activeComfortLetter = index;

  const reader = document.getElementById("comfortReader");

  if (!reader) return;

  renderComfortLetter();

  reader.hidden = false;
  document.body.style.overflow = "hidden";

  const closeButton = reader.querySelector(".comfort-close");

  if (closeButton) {
    closeButton.focus();
  }
}


/* Display the selected letter */

function renderComfortLetter() {
  const letter = nishuComfortLetters[activeComfortLetter];

  if (!letter) return;

  const icon = document.getElementById("comfortReaderIcon");
  const eyebrow = document.getElementById("comfortReaderEyebrow");
  const title = document.getElementById("comfortLetterTitle");
  const body = document.getElementById("comfortLetterBody");

  if (icon) icon.textContent = letter.icon;

  if (eyebrow) {
    eyebrow.textContent =
      `LETTER ${String(activeComfortLetter + 1).padStart(2, "0")} · JUST FOR YOU`;
  }

  if (title) title.textContent = letter.title;

  // textContent keeps the message as plain text.
  if (body) body.textContent = letter.message;
}


/* Close the current letter */

function closeComfortLetter() {
  const reader = document.getElementById("comfortReader");

  if (!reader) return;

  reader.hidden = true;
  document.body.style.overflow = "";

  // Return keyboard focus to the envelope that was opened.
  const envelope = document.querySelector(
    `#chapter-6 .comfort-envelope:nth-child(${activeComfortLetter + 1})`
  );

  if (envelope) envelope.focus();
}


/* Open the next letter */

function openNextComfortLetter() {
  const nextIndex =
    (activeComfortLetter + 1) % nishuComfortLetters.length;

  openComfortLetter(nextIndex);
}


/* Close the letter with Escape */

document.addEventListener("keydown", function(event) {
  const reader = document.getElementById("comfortReader");

  if (!reader || reader.hidden) return;

  if (event.key === "Escape") {
    closeComfortLetter();
  }
});

/* ==========================================
   CHAPTER 7 — THE HAPPINESS GAME
========================================== */

const happinessMessages = [
  "A little heart for the girl who makes ordinary days special. 💗",
  "A little heart for your smile — my favourite kind of sunshine. ☀️",
  "A little heart for all the times you've made me feel cared for. 🧸",
  "A little heart to remind you that you deserve good things. 🌷",
  "A little heart for every silly memory that makes us laugh. 😂",
  "A little heart because you make this world softer just by being you. ✨",
  "A little heart for the moments when you need a little extra love. 🫶",
  "And one more heart because, Mumma, you're simply irreplaceable. 💖"
];

let happinessCollected = 0;
let happinessMessageIndex = 0;

function collectHappinessHeart(button) {
  if (!button || button.classList.contains("collected")) return;

  button.classList.add("collected");
  button.disabled = true;
  happinessCollected++;

  const score = document.getElementById("happinessScore");
  const level = document.getElementById("happinessLevel");
  const fill = document.getElementById("happinessProgressFill");
  const progressText = document.getElementById("happinessProgressText");
  const arenaMessage = document.getElementById("arenaMessage");
  const finalCard = document.getElementById("happinessFinal");
  const bottomNote = document.getElementById("happinessBottomNote");

  if (score) score.textContent = happinessCollected;

  if (level) {
    if (happinessCollected < 3) level.textContent = "Warming up 💗";
    else if (happinessCollected < 6) level.textContent = "Little sunshine ☀️";
    else if (happinessCollected < 10) level.textContent = "Pure happiness ✨";
    else level.textContent = "Mumma's magic 💖";
  }

  if (fill) {
    fill.style.width = `${Math.min(happinessCollected / 10 * 100, 100)}%`;
  }

  if (arenaMessage) {
    const message = happinessMessages[
      happinessMessageIndex % happinessMessages.length
    ];
    arenaMessage.innerHTML = `<span>♡</span><p>${message}</p>`;
    happinessMessageIndex++;
  }

  if (typeof releaseLetterPetals === "function") {
    releaseLetterPetals(3);
  }

  if (happinessCollected >= 10) {
    if (progressText) {
      progressText.textContent = "You did it, Mumma! All the love is yours. 💕";
    }

    if (finalCard) finalCard.hidden = false;
    if (bottomNote) bottomNote.hidden = true;

    document.querySelectorAll("#happinessArena .floating-heart").forEach(
      heart => {
        heart.disabled = true;
        heart.classList.add("collected");
      }
    );

    if (typeof celebrate === "function") celebrate();
  } else {
    const remaining = 10 - happinessCollected;
    if (progressText) {
      progressText.textContent =
        `${remaining} more ${remaining === 1 ? "heart" : "hearts"} to collect ✨`;
    }
  }
}

function replayHappinessGame() {
  happinessCollected = 0;
  happinessMessageIndex = 0;

  const score = document.getElementById("happinessScore");
  const level = document.getElementById("happinessLevel");
  const fill = document.getElementById("happinessProgressFill");
  const progressText = document.getElementById("happinessProgressText");
  const finalCard = document.getElementById("happinessFinal");
  const bottomNote = document.getElementById("happinessBottomNote");
  const arenaMessage = document.getElementById("arenaMessage");

  if (score) score.textContent = "0";
  if (level) level.textContent = "Just starting";
  if (fill) fill.style.width = "0%";
  if (progressText) {
    progressText.textContent = "8 little hearts are waiting for you ✨";
  }
  if (finalCard) finalCard.hidden = true;
  if (bottomNote) bottomNote.hidden = false;
  if (arenaMessage) {
    arenaMessage.innerHTML =
      "<span>♡</span><p>Every little heart is a little reason to smile.</p>";
  }

  document.querySelectorAll("#happinessArena .floating-heart").forEach(
    heart => {
      heart.disabled = false;
      heart.classList.remove("collected");
    }
  );
}

/* ==========================================
   CHAPTER 8 — A LITTLE TIME CAPSULE
========================================== */

const capsuleLetters = [
  {
    icon: "📜",
    time: "A LETTER FROM THE PAST",
    title: "The memories I keep",
    body: `Mumma, some of my favourite moments are the little ones — the random conversations, the silly jokes, the times we laugh over absolutely nothing, and the moments that become special without us even realising it.

I hope that whenever you think about our memories, they bring a smile to your face. Even the simplest moments can become precious when the right person is part of them.

And I'm really glad that you're part of my story. 💗`
  },
  {
    icon: "💗",
    time: "A LETTER FOR TODAY",
    title: "What you mean to me",
    body: `I might not always find the perfect words to explain it, Mumma, but your presence means a lot to me.

You deserve to feel appreciated, respected, and loved — not just on your birthday, but on ordinary days too. I hope you never feel that you have to be perfect to be important to someone.

You being yourself is already something worth celebrating. Thank you for being you. 🫶`
  },
  {
    icon: "🌷",
    time: "A LETTER FROM TOMORROW",
    title: "For all the days ahead",
    body: `Dear future Nishu,

I hope life gives you countless reasons to smile. I hope you discover new things, reach the dreams you're working towards, and learn to be proud of how far you've come.

And when life feels confusing or difficult, I hope you remember how much you deserve patience, gentleness, and good things.

May there be many more birthdays, conversations, ridiculous jokes, and beautiful memories ahead of us.

Here's to all the tomorrows we haven't met yet. 🌙`
  }
];

const openedCapsuleLetters = new Set();

function openCapsuleMessage(index) {
  if (index < 0 || index >= capsuleLetters.length) return;

  const letter = capsuleLetters[index];
  const reader = document.getElementById("capsuleReader");

  document.getElementById("capsuleReaderIcon").textContent = letter.icon;
  document.getElementById("capsuleReaderTime").textContent = letter.time;
  document.getElementById("capsuleReaderTitle").textContent = letter.title;
  document.getElementById("capsuleReaderBody").textContent = letter.body;

  reader.hidden = false;
  openedCapsuleLetters.add(index);
  updateCapsuleProgress();

  reader.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeCapsuleMessage() {
  const reader = document.getElementById("capsuleReader");
  if (reader) reader.hidden = true;
}

function updateCapsuleProgress() {
  const count = openedCapsuleLetters.size;
  const countElement = document.getElementById("capsuleOpenedCount");
  const fill = document.getElementById("capsuleProgressFill");
  const secret = document.getElementById("capsuleSecret");

  if (countElement) countElement.textContent = count;
  if (fill) fill.style.width = `${(count / capsuleLetters.length) * 100}%`;

  if (count === capsuleLetters.length && secret) {
    secret.hidden = false;
    secret.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (typeof releaseLetterPetals === "function") {
      releaseLetterPetals(8);
    }

    if (typeof celebrate === "function") {
      celebrate();
    }
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeCapsuleMessage();
  }
});

/* ==========================================
   CHAPTER 9 — THE BIRTHDAY SURPRISE
========================================== */

let birthdayGiftOpened = false;
let birthdayConfettiTimer = null;

function openBirthdayGift() {
  if (birthdayGiftOpened) return;

  birthdayGiftOpened = true;

  const gift = document.getElementById("birthdayGift");
  const hint = document.getElementById("giftTapHint");
  const giftArea = document.getElementById("birthdayGiftArea");
  const reveal = document.getElementById("birthdayReveal");
  const intro = document.getElementById("surpriseIntro");
  const footer = document.getElementById("surpriseFooterNote");

  if (gift) {
    gift.classList.add("opened");
    gift.setAttribute("aria-label", "Birthday gift opened");
  }

  if (hint) hint.textContent = "A little love, just for you… 💗";

  // Give the gift-opening animation a moment before the reveal.
  window.setTimeout(function () {
    if (giftArea) giftArea.hidden = true;
    if (intro) intro.hidden = true;
    if (footer) footer.hidden = true;
    if (reveal) reveal.hidden = false;

    releaseBirthdayConfetti(100);

    if (typeof celebrate === "function") {
      celebrate();
    }

    if (reveal) {
      reveal.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, 850);
}

function releaseBirthdayConfetti(amount = 70) {
  const colors = [
    "#ff9fcf",
    "#e3b5ff",
    "#ffe6a6",
    "#ffffff",
    "#ffbedf",
    "#c5b5ff"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "birthday-confetti";

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty(
      "--fall-duration",
      `${2.5 + Math.random() * 3}s`
    );
    piece.style.setProperty(
      "--drift",
      `${Math.round(Math.random() * 180 - 90)}px`
    );
    piece.style.animationDelay = `${Math.random() * 1.2}s`;

    document.body.appendChild(piece);

    window.setTimeout(() => piece.remove(), 7500);
  }
}

function replayBirthdaySurprise() {
  birthdayGiftOpened = false;

  const gift = document.getElementById("birthdayGift");
  const hint = document.getElementById("giftTapHint");
  const giftArea = document.getElementById("birthdayGiftArea");
  const reveal = document.getElementById("birthdayReveal");
  const intro = document.getElementById("surpriseIntro");
  const footer = document.getElementById("surpriseFooterNote");

  if (gift) {
    gift.classList.remove("opened");
    gift.setAttribute("aria-label", "Open your birthday gift");
  }

  if (hint) {
    hint.textContent = "✨ Tap your gift to open it, Mumma ✨";
  }

  if (giftArea) giftArea.hidden = false;
  if (intro) intro.hidden = false;
  if (footer) footer.hidden = false;
  if (reveal) reveal.hidden = true;

  if (giftArea) {
    giftArea.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

/* ==========================================
   CHAPTER 10 — THE GRAND FINALE
========================================== */

let mummaHugSent = false;

function sendMummaHug() {
  if (mummaHugSent) return;

  mummaHugSent = true;

  const button = document.getElementById("finaleHugButton");
  const response = document.getElementById("finaleHugResponse");
  const hugIcon = document.getElementById("finaleHugIcon");

  if (button) {
    button.innerHTML = "💗 Hug sent with love 💗";
    button.disabled = true;
    button.style.opacity = "0.8";
    button.style.cursor = "default";
  }

  if (hugIcon) {
    hugIcon.textContent = "🤗";
  }

  if (response) {
    response.hidden = false;
    response.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  releaseFinaleHearts(45);

  if (typeof releaseLetterPetals === "function") {
    releaseLetterPetals(15);
  }

  if (typeof celebrate === "function") {
    celebrate();
  }
}

function releaseFinaleHearts(amount = 30) {
  const symbols = ["♡", "♥", "💗", "✧", "💕"];

  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");

    particle.className = "finale-heart-particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${Math.random() * 100}vw`;

    particle.style.setProperty(
      "--particle-size",
      `${14 + Math.random() * 20}px`
    );

    particle.style.setProperty(
      "--particle-duration",
      `${3 + Math.random() * 3}s`
    );

    particle.style.setProperty(
      "--particle-drift",
      `${Math.round(Math.random() * 160 - 80)}px`
    );

    particle.style.animationDelay = `${Math.random() * 1.3}s`;

    document.body.appendChild(particle);

    window.setTimeout(() => particle.remove(), 7500);
  }
}

function restartBirthdayJourney() {
  const confirmed = window.confirm(
    "Mumma's birthday story will start again from Chapter 1. Ready to relive it? 💗"
  );

  if (!confirmed) return;

  mummaHugSent = false;

  const button = document.getElementById("finaleHugButton");
  const response = document.getElementById("finaleHugResponse");
  const hugIcon = document.getElementById("finaleHugIcon");

  if (button) {
    button.innerHTML = "<span>♡</span> Send Mumma a hug <span>♡</span>";
    button.disabled = false;
    button.style.opacity = "";
    button.style.cursor = "";
  }

  if (response) response.hidden = true;
  if (hugIcon) hugIcon.textContent = "🫂";

  navigateTo(1);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
