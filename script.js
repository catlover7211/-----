document.addEventListener('DOMContentLoaded', () => {
    // 選擇側邊欄和其中的鏈接
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = sidebar.querySelectorAll('a');
    const sections = document.querySelectorAll('section');

    // 監聽滾動事件，更新活動鏈接
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

    // 定義每頁顯示的公告數量和當前頁碼
    const ITEMS_PER_PAGE = 3;
    let currentPage = 1;
    let announcements = [];

    // 從 JSON 文件獲取公告數據
    function fetchAnnouncements() {
        fetch('announcements.json')
            .then(response => response.json())
            .then(data => {
                announcements = data;
                displayAnnouncements();
                updatePagination();
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }

    // 顯示當前頁的公告
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
            let attachmentHTML = '';
            if (announcement.attachment) {
                attachmentHTML = `
                    <p class="attachment">
                        附件：<a href="${announcement.attachment.url}" target="_blank">${announcement.attachment.filename}</a>
                    </p>
                `;
            }
            announcementItem.innerHTML = `
                <h3>${announcement.title}</h3>
                <p class="date">${announcement.date}</p>
                <p>${announcement.content}</p>
                ${attachmentHTML}
            `;
            announcementList.appendChild(announcementItem);
        });

        announcementBoard.appendChild(announcementList);
    }

    // 更新分頁信息和按鈕狀態
    function updatePagination() {
        const pageInfo = document.getElementById('page-info');
        const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
        pageInfo.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // 初始獲取公告
    fetchAnnouncements();

    // 為上一頁按鈕添加點擊事件
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayAnnouncements();
            updatePagination();
        }
    });

    // 為下一頁按鈕���加點擊事件
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            displayAnnouncements();
            updatePagination();
        }
    });

    // 定義每頁顯示的榮譽數量和當前頁碼
    const AWARDS_PER_PAGE = 3;
    let currentAwardsPage = 1;
    let awards = [];

    // 從 JSON 文件獲取榮譽數據
    function fetchAwards() {
        fetch('awards.json')
            .then(response => response.json())
            .then(data => {
                awards = data;
                displayAwards();
                updateAwardsPagination();
            })
            .catch(error => console.error('Error fetching awards:', error));
    }

    // 顯示當前頁的榮譽
    function displayAwards() {
        const awardsBoard = document.getElementById('awards-board');
        awardsBoard.innerHTML = '';

        const startIndex = (currentAwardsPage - 1) * AWARDS_PER_PAGE;
        const endIndex = startIndex + AWARDS_PER_PAGE;
        const pageAwards = awards.slice(startIndex, endIndex);

        const awardsList = document.createElement('ul');
        awardsList.style.listStyleType = 'none';
        awardsList.style.padding = '0';

        pageAwards.forEach(award => {
            const awardItem = document.createElement('li');
            awardItem.classList.add('award');
            awardItem.innerHTML = `
                <h3>${award.title}</h3>
                <p class="date">${award.date}</p>
                <p>${award.description}</p>
            `;
            awardsList.appendChild(awardItem);
        });

        awardsBoard.appendChild(awardsList);
    }

    // 更新榮譽榜分頁信息和按鈕狀態
    function updateAwardsPagination() {
        const pageInfo = document.getElementById('awards-page-info');
        const totalPages = Math.ceil(awards.length / AWARDS_PER_PAGE);
        pageInfo.textContent = `第 ${currentAwardsPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('awards-prev-page');
        const nextButton = document.getElementById('awards-next-page');

        prevButton.disabled = currentAwardsPage === 1;
        nextButton.disabled = currentAwardsPage === totalPages;
    }

    // 初始獲取榮譽
    fetchAwards();

    // 為榮譽榜上一頁按鈕添加點擊事件
    document.getElementById('awards-prev-page').addEventListener('click', () => {
        if (currentAwardsPage > 1) {
            currentAwardsPage--;
            displayAwards();
            updateAwardsPagination();
        }
    });

    // 為榮譽榜下一頁按鈕添加點擊事件
    document.getElementById('awards-next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(awards.length / AWARDS_PER_PAGE);
        if (currentAwardsPage < totalPages) {
            currentAwardsPage++;
            displayAwards();
            updateAwardsPagination();
        }
    });
});