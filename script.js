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

    const ITEMS_PER_PAGE = 3;
    let currentPage = 1;
    let announcements = [];

    // 在文件開頭添加以下函數
    function sortAnnouncementsByDate(announcements) {
        return announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // 修改 fetchAnnouncements 函數
    async function fetchAnnouncements() {
        try {
            const response = await fetch('announcements.json');
            const data = await response.json();
            return sortAnnouncementsByDate(data); // 對獲取的數據進行排序
        } catch (error) {
            console.error('Error fetching announcements:', error);
            return [];
        }
    }

    function displayAnnouncements() {
        const announcementBoard = document.getElementById('announcement-board');
        announcementBoard.innerHTML = '';

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageAnnouncements = announcements.slice(startIndex, endIndex);

        const announcementList = document.createElement('ul');
        announcementList.style.listStyleType = 'none';
        announcementList.style.padding = '0';

        pageAnnouncements.forEach(announcement => {
            const announcementItem = document.createElement('li');
            announcementItem.classList.add('announcement');
            announcementItem.innerHTML = `
                <h3>${announcement.title}</h3>
                <p class="date">${announcement.date}</p>
                <p>${announcement.content}</p>
            `;
            announcementList.appendChild(announcementItem);
        });

        announcementBoard.appendChild(announcementList);
    }

    function updatePagination() {
        const pageInfo = document.getElementById('page-info');
        const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
        pageInfo.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    fetchAnnouncements();

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayAnnouncements();
            updatePagination();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            displayAnnouncements();
            updatePagination();
        }
    });
});