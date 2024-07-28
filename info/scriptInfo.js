document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.querySelector('.sidebar-container');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('section');

    // Toggle sidebar
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebarContainer.classList.toggle('active');
    });

    // Close sidebar when clicking outside (only on mobile)
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && !sidebarContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebarContainer.classList.remove('active');
        }
    });

    // Close sidebar when clicking a link (only on mobile)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebarContainer.classList.remove('active');
            }
        });
    });

    // Existing scroll event listener
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 資訊專區相關功能可以在這裡添加
});