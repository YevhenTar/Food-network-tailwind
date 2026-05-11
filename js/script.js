"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // DOM ELEMENTS
    // =========================
    const header = document.querySelector('#main-header');
    const headerWrap = document.querySelector('#main-header__wrap');

    const burgerMenu = document.querySelector('#burger-menu');
    const hiddenMenu = document.querySelector('#hidden-nav-block');

    const logoLink = document.querySelector('#logo-link');
    const bookingBtn = document.querySelector('#booking-btn');

    const menuLinks = document.querySelectorAll('.hidden-menu-list__link');

    // =========================
    // HEADER SCROLL
    // =========================
    if (header) {
        window.addEventListener("scroll", () => {
            const isSticky = window.scrollY >= 10;
            header.classList.toggle("is-sticky", isSticky);
        });
    }

    // =========================
    // PARALLAX
    // =========================
    if (window.innerWidth >= 992) {
        const scene = document.querySelector('#scene');

        if (scene && typeof Parallax !== "undefined") {
            new Parallax(scene, {
                relativeInput: true
            });
        }
    }

    // =========================
    // MENU LOGIC
    // =========================
    if (!burgerMenu || !hiddenMenu) {
        throw new Error('Menu elements not found in DOM');
    }

    const isMenuOpen = () => burgerMenu.classList.contains('change');

    const openMenu = () => {
        burgerMenu.classList.add('change');
        burgerMenu.classList.remove('close');

        hiddenMenu.classList.remove('hidden');
        document.body.classList.add('body-blocked');

        burgerMenu.setAttribute('aria-expanded', "true");
    };

    const closeMenu = () => {
        burgerMenu.classList.add('close');
        burgerMenu.classList.remove('change');

        hiddenMenu.classList.add('hidden');
        document.body.classList.remove('body-blocked');

        burgerMenu.setAttribute('aria-expanded', "false");
    };

    const toggleMenu = () => {
        isMenuOpen() ? closeMenu() : openMenu();
    };

    // =========================
    // EVENTS
    // =========================

    // BURGER
    burgerMenu.addEventListener('click', toggleMenu);

    // LOGO
    logoLink.addEventListener('click', () => {
        if (isMenuOpen()) closeMenu();
    });

    // BOOKING BUTTON
    bookingBtn.addEventListener('click', (e) => {
        if (isMenuOpen()) {
            closeMenu();
        } 
    });

    // MENU LINKS (mobile)
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeMenu();
        });
    });

    // =========================
    // SWIPER
    // =========================
    if (typeof Swiper === "undefined") {
        throw new Error('Swiper is not loaded. Make sure the library is connected.');
    }

    const swiper = new Swiper('.testimonials-swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});