const intro =
    document.getElementById("intro");

const nameSection =
    document.getElementById("nameSection");

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


/* =================================
   PAGE 1 → PAGE 2
   LETTER CLICK
================================= */

function openLetter() {

    /* Create hearts */

    createHearts(30);


    /* Fade first page */

    intro.style.opacity = "0";

    intro.style.transform =
        "scale(1.08)";


    setTimeout(() => {

        intro.style.display = "none";

        nameSection.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* =================================
           MUSIC STARTS ONLY ON PAGE 2
        ================================= */

        music.volume = 0.35;

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.innerHTML =
                    "🔊 Music On";

            })
            .catch(() => {

                musicPlaying = false;

                musicButton.innerHTML =
                    "🔇 Music Off";

            });


        createHearts(40);

    }, 700);
}


/* =================================
   MUSIC ON / OFF
================================= */

function toggleMusic() {

    if (music.paused) {

        music.volume = 0.35;

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.innerHTML =
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

        musicButton.innerHTML =
            "🔇 Music Off";
    }
}


/* =================================
   PAGE 2 → LETTER
================================= */

function showLetter() {

    nameSection.classList.remove("active");

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


/* =================================
   LETTER → FINAL
================================= */

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


/* =================================
   CREATE HEARTS
================================= */

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
                document.createElement(
                    "div"
                );


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


/* =================================
   CONTINUOUS HEARTS
================================= */

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


/* =================================
   RESTART
================================= */

function restart() {

    music.pause();

    music.currentTime = 0;

    musicPlaying = false;

    location.reload();
}