
    const burger = document.getElementById("burger");
    const navigation = document.getElementById("navigation");
    const navigationLinks = document.querySelectorAll(".navigation__link");

    // Toggle Mobile Menu
    burger.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("active");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
});

    // Handle Active Link State on Click
    navigationLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        // Remove active class from all links
        navigationLinks.forEach((item) => {
            item.classList.remove("navigation__link--active");
        });

        // Add active class to clicked link
        link.classList.add("navigation__link--active");

        // Close mobile menu on selection
        navigation.classList.remove("active");
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
    });
});

    // Close menu when clicking outside header
    document.addEventListener("click", (event) => {
    const clickedInsideHeader = event.target.closest(".header");

    if (!clickedInsideHeader) {
    navigation.classList.remove("active");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
}
});

