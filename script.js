document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = sidebar.querySelectorAll('a');
    const sections = document.querySelectorAll('section');

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

    function fetchAnnouncements() {
        fetch('announcements.json')
            .then(response => response.json())
            .then(data => {
                const announcementBoard = document.getElementById('announcement-board');
                data.forEach(announcement => {
                    const announcementElement = document.createElement('div');
                    announcementElement.classList.add('announcement');
                    announcementElement.innerHTML = `
                        <h3>${announcement.title}</h3>
                        <p class="date">${announcement.date}</p>
                        <p>${announcement.content}</p>
                    `;
                    announcementBoard.appendChild(announcementElement);
                });
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }

    // 調用獲取公告的函數
    fetchAnnouncements();
});