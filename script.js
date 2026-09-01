/* =====================================================
   SPCLASSES — INTERACTIVE JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= LOADER ================= */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 900);
        });
    }


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
            });
        });

    }


    /* ================= CURSOR GLOW ================= */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", (event) => {

            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;

        });

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            revealObserver.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* ================= 3D TILT ================= */

    const tiltCards =
        document.querySelectorAll(".tilt");

    if (window.matchMedia("(pointer: fine)").matches) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

            });

        });

    }


    /* ================= THREE.JS ================= */

    const canvas =
        document.getElementById("three-canvas");

    if (
        canvas &&
        typeof THREE !== "undefined"
    ) {

        const scene =
            new THREE.Scene();

        const camera =
            new THREE.PerspectiveCamera(
                60,
                window.innerWidth /
                window.innerHeight,
                0.1,
                1000
            );

        camera.position.z = 5;


        const renderer =
            new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        /* ================= PARTICLES ================= */

        const particleGeometry =
            new THREE.BufferGeometry();

        const particleCount = 1200;

        const positions =
            new Float32Array(
                particleCount * 3
            );

        for (
            let i = 0;
            i < particleCount * 3;
            i++
        ) {

            positions[i] =
                (Math.random() - 0.5) * 16;

        }

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({
                color: 0x8f6cff,
                size: 0.018,
                transparent: true,
                opacity: 0.55
            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );

        scene.add(particles);


        /* ================= WIREFRAME SPHERE ================= */

        const sphereGeometry =
            new THREE.IcosahedronGeometry(
                1.5,
                2
            );

        const sphereMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x7549d8,
                wireframe: true,
                transparent: true,
                opacity: 0.07
            });

        const sphere =
            new THREE.Mesh(
                sphereGeometry,
                sphereMaterial
            );

        sphere.position.set(
            2.8,
            0.2,
            -1
        );

        scene.add(sphere);


        /* ================= TORUS ================= */

        const torusGeometry =
            new THREE.TorusGeometry(
                2.3,
                0.012,
                16,
                120
            );

        const torusMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x9d7aff,
                transparent: true,
                opacity: 0.14
            });

        const torus =
            new THREE.Mesh(
                torusGeometry,
                torusMaterial
            );

        torus.rotation.x = 1.1;

        scene.add(torus);


        /* ================= MOUSE PARALLAX ================= */

        let mouseX = 0;
        let mouseY = 0;

        if (window.matchMedia("(pointer: fine)").matches) {

            document.addEventListener(
                "mousemove",
                (event) => {

                    mouseX =
                        (event.clientX /
                            window.innerWidth) *
                        2 - 1;

                    mouseY =
                        (event.clientY /
                            window.innerHeight) *
                        2 - 1;

                }
            );

        }


        /* ================= ANIMATION ================= */

        const clock =
            new THREE.Clock();

        function animate() {

            requestAnimationFrame(animate);

            const time =
                clock.getElapsedTime();


            particles.rotation.y =
                time * 0.012;

            particles.rotation.x =
                mouseY * 0.03;


            sphere.rotation.x =
                time * 0.10;

            sphere.rotation.y =
                time * 0.14;


            sphere.position.x =
                2.8 + mouseX * 0.25;

            sphere.position.y =
                0.2 - mouseY * 0.20;


            torus.rotation.z =
                time * 0.06;

            torus.rotation.y =
                time * 0.04;


            camera.position.x +=
                (mouseX * 0.15 -
                 camera.position.x) * 0.025;

            camera.position.y +=
                (-mouseY * 0.10 -
                 camera.position.y) * 0.025;


            camera.lookAt(
                scene.position
            );


            renderer.render(
                scene,
                camera
            );

        }

        animate();


        /* ================= RESIZE ================= */

        window.addEventListener(
            "resize",
            () => {

                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;

                camera.updateProjectionMatrix();

                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );

                renderer.setPixelRatio(
                    Math.min(
                        window.devicePixelRatio,
                        2
                    )
                );

            }
        );


        /* ================= SCROLL PARALLAX ================= */

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                sphere.position.y =
                    0.2 + scroll * 0.00025;

                torus.position.y =
                    -scroll * 0.00012;

            },
            { passive: true }
        );

    }


    /* ================= COURSE CARD DELAY ================= */

    const courseCards =
        document.querySelectorAll(
            ".course-card"
        );

    courseCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 50}ms`;

        }
    );


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 220;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.style.color = "#999";

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.style.color = "white";

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* ================= SMOOTH ANCHOR CLOSE ================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (navMenu) {
                    navMenu.classList.remove("open");
                }

            }
        );

    });

});
