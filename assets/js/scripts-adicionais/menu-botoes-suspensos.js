document.getElementById('toggleMenu').addEventListener('click', function () {
    const menuOptions = document.getElementById('menuOptions');
    const menuOverlay = document.getElementById('menuOverlay');
    const isExpanded = menuOptions.classList.contains('show');

    if (isExpanded) {
        menuOptions.classList.remove('show');
        menuOptions.classList.add('d-none');
        menuOverlay.classList.add('d-none');
        this.classList.remove('open');
    } else {
        menuOptions.classList.add('show');
        menuOptions.classList.remove('d-none');
        menuOverlay.classList.remove('d-none');
        this.classList.add('open');

        const menuButtons = menuOptions.querySelectorAll('.menu-button');
        menuButtons.forEach((button, index) => {
            button.style.transitionDelay = `${index * 0.1}s`; 
        });
    }
});


document.getElementById('menuOverlay').addEventListener('click', function () {
    const menuOptions = document.getElementById('menuOptions');
    const menuOverlay = document.getElementById('menuOverlay');
    const toggleMenu = document.getElementById('toggleMenu');

    menuOptions.classList.remove('show');
    menuOptions.classList.add('d-none');
    menuOverlay.classList.add('d-none');
    toggleMenu.classList.remove('open');
});