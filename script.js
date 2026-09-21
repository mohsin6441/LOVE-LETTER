const intro = document.getElementById("intro");
const nameSection = document.getElementById("nameSection");
const letterSection = document.getElementById("letterSection");
const finalSection = document.getElementById("finalSection");

const music = document.getElementById("loveMusic");
const musicButton = document.getElementById("musicButton");

const heartsContainer = document.querySelector(".floating-hearts");
const voiceStatus = document.getElementById("voiceStatus");
const voiceButton = document.querySelector(".voice-button");

let musicPlaying = false;
let recognition = null;
let alreadyOpened = false;


/* =========================
   VOICE RECOGNITION
========================= */

function startListening() {

    if (alreadyOpened) {
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        voiceStatus.textContent =
            "Please use Google Chrome or Microsoft Edge.";

        return;
    }


    // Stop previous recognition
    if (recognition) {

        try {
            recognition.stop();
        } catch (error) {
            console.log(error);
        }

    }


    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 10;


    voiceStatus.textContent =
        '🎧 Listening... Say "I am Eva, open my letter" ❤️';

    voiceButton.classList.add("listening");


    try {

        recognition.start();

    } catch (error) {

        console.log("Recognition start error:", error);

        voiceButton.classList.remove("listening");

        voiceStatus.textContent =
            "Please tap the button again.";

        return;
    }


    /* =========================
       WHEN VOICE IS DETECTED
    ========================= */

    recognition.onresult = function(event) {

        let spokenText =
            event.results[0][0].transcript
                .toLowerCase()
                .trim();


        console.log(
            "Original voice:",
            spokenText
        );


        /*
        Remove punctuation
        */

        spokenText =
            spokenText.replace(
                /[.,!?]/g,
                ""
            );


        /*
        Fix spaces
        */

        spokenText =
            spokenText
                .replace(/\s+/g, " ")
                .trim();


        /*
        Normalize common speech
        */

        spokenText =
            spokenText
                .replace(/\bi'm\b/g, "i am")
                .replace(/\biam\b/g, "i am")
                .replace(/\be va\b/g, "eva")
                .replace(/\beva\b/g, "eva");


        console.log(
            "Normalized voice:",
            spokenText
        );


        /* =========================
           SECRET PHRASE
        ========================= */

        const phrase1 =
            "i am eva open my letter";

        const phrase2 =
            "i am eva please open my letter";

        const phrase3 =
            "i am eva can you open my letter";

        const phrase4 =
            "iam eva open my letter";


        /*
        Exact secret phrase OR
        very small recognition variations
        */

        const correctPhrase =
            spokenText === phrase1 ||
            spokenText === phrase2 ||
            spokenText === phrase3 ||
            spokenText === phrase4 ||
            spokenText.includes(
                "i am eva open my letter"
            );


        /* =========================
           OPEN PAGE 2
        ========================= */

        if (correctPhrase) {

            alreadyOpened = true;


            voiceStatus.textContent =
                "❤️ Welcome, Eva...";


            voiceButton.classList.remove(
                "listening"
            );


            setTimeout(() => {

                openLetter();

            }, 700);


        } else {

            voiceStatus.textContent =
                '❌ Wrong phrase. Say "I am Eva, open my letter"';


            voiceButton.classList.remove(
                "listening"
            );

        }

    };


    /* =========================
       VOICE ERROR
    ========================= */

    recognition.onerror = function(event) {

        console.log(
            "Voice error:",
            event.error
        );


        voiceButton.classList.remove(
            "listening"
        );


        if (
            event.error === "not-allowed"
        ) {

            voiceStatus.textContent =
                "🎙️ Please allow microphone access.";

        }

        else if (
            event.error === "no-speech"
        ) {

            voiceStatus.textContent =
                '🎙️ I didn\'t hear you. Try again.';

        }

        else if (
            event.error === "audio-capture"
        ) {

            voiceStatus.textContent =
                "🎙️ Microphone not found.";

        }

        else {

            voiceStatus.textContent =
                'Try again: "I am Eva, open my letter" ❤️';

        }

    };


    /* =========================
       VOICE ENDED
    ========================= */

    recognition.onend = function() {

        voiceButton.classList.remove(
            "listening"
        );

    };

}


/* =========================
   PAGE 1 → PAGE 2
========================= */

function openLetter() {

    if (!alreadyOpened) {

        alreadyOpened = true;

    }


    createHearts(30);


    intro.style.opacity = "0";

    intro.style.transform =
        "scale(1.08)";


    setTimeout(() => {

        intro.style.display = "none";


        nameSection.classList.add(
            "active"
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        /* MUSIC STARTS ON PAGE 2 */

        music.volume = 0.35;


        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "🔊 Music On";

            })
            .catch(() => {

                musicPlaying = false;

                musicButton.textContent =
                    "🔇 Music Off";

            });


        createHearts(40);


    }, 700);

}


/* =========================
   MUSIC
========================= */

function toggleMusic() {

    if (music.paused) {

        music.volume = 0.35;


        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "🔊 Music On";

            })
            .catch(() => {

                alert(
                    "Music play korte abar click koro ❤️"
                );

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicButton.textContent =
            "🔇 Music Off";

    }

}


/* =========================
   PAGE 2 → PAGE 3
========================= */

function showLetter() {

    nameSection.classList.remove(
        "active"
    );


    createHearts(35);


    setTimeout(() => {

        nameSection.style.display =
            "none";


        letterSection.classList.add(
            "active"
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 700);

}


/* =========================
   PAGE 3 → PAGE 4
========================= */

function showFinal() {

    letterSection.classList.remove(
        "active"
    );


    createHearts(50);


    setTimeout(() => {

        letterSection.style.display =
            "none";


        finalSection.classList.add(
            "active"
        );


        createHearts(60);


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 900);

}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts(amount) {

    const heartTypes = [

        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💘",
        "💞"

    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.classList.add(
                "heart-particle"
            );


            heart.textContent =
                heartTypes[
                    Math.floor(
                        Math.random() *
                        heartTypes.length
                    )
                ];


            heart.style.left =
                Math.random() * 100 + "%";


            heart.style.fontSize =
                (
                    14 +
                    Math.random() * 28
                ) + "px";


            heart.style.animationDuration =
                (
                    5 +
                    Math.random() * 7
                ) + "s";


            heartsContainer.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 13000);


        }, i * 100);

    }

}


/* =========================
   CONTINUOUS HEARTS
========================= */

setInterval(() => {

    if (

        nameSection.classList.contains(
            "active"
        ) ||

        letterSection.classList.contains(
            "active"
        ) ||

        finalSection.classList.contains(
            "active"
        )

    ) {

        createHearts(1);

    }

}, 1000);


/* =========================
   RESTART
========================= */

function restart() {

    music.pause();

    music.currentTime = 0;

    musicPlaying = false;

    location.reload();

}