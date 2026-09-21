const intro =
    document.getElementById("intro");

const letterSection =
    document.getElementById("letterSection");

const finalSection =
    document.getElementById("finalSection");

const music =
    document.getElementById("loveMusic");

const musicButton =
    document.getElementById("musicButton");

const heartsContainer =
    document.querySelector(".floating-hearts");


let musicPlaying = false;


/* =========================
   OPEN LETTER
========================= */

function openLetter() {

    intro.style.opacity = "0";

    intro.style.transform = "scale(1.05)";


    setTimeout(() => {

        intro.style.display = "none";

        letterSection.classList.add("active");

    }, 700);


    /* Start Music */

    music.volume = 0.35;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.innerHTML =
                "🔊 Music On";

        })
        .catch((error) => {

            console.log(
                "Music could not start:",
                error
            );

            musicPlaying = false;

            musicButton.innerHTML =
                "🔇 Music Off";

        });


    /* Hearts */

    createHearts(35);

    setTimeout(() => {

        createHearts(20);

    }, 1500);
}


/* =========================
   MUSIC ON / OFF
========================= */

function toggleMusic() {

    if (music.paused) {

        music.volume = 0.35;

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.innerHTML =
                    "🔊 Music On";

            })
            .catch((error) => {

                console.log(
                    "Music error:",
                    error
                );

                alert(
                    "Music play korte abar button-e click koro ❤️"
                );

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicButton.innerHTML =
            "🔇 Music Off";
    }
}


/* =========================
   SHOW FINAL
========================= */

function showFinal() {

    letterSection.classList.remove("active");

    createHearts(50);


    setTimeout(() => {

        letterSection.style.display =
            "none";

        finalSection.classList.add("active");

        createHearts(60);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 900);
}


/* =========================
   CREATE HEARTS
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


    for (let i = 0; i < amount; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.classList.add(
                "heart-particle"
            );


            heart.innerHTML =
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