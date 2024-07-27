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

    // 生涯發展相關功能可以在這裡添加

    // 教師介紹相關功能可以在這裡添加

    // 定義每頁顯示的升學榜單數量和當前頁碼
    const GRADUATION_PER_PAGE = 1;
    let currentGraduationPage = 1;
    let graduationRecords = [];

    // 從 JSON 文件獲取升學榜單數據
    function fetchGraduationRecords() {
        fetch('graduation.json')
            .then(response => response.json())
            .then(data => {
                graduationRecords = data;
                displayGraduationRecords();
                updateGraduationPagination();
            })
            .catch(error => console.error('Error fetching graduation records:', error));
    }

    // 顯示當前頁的升學榜單
    function displayGraduationRecords() {
        const graduationBoard = document.getElementById('graduation-board');
        graduationBoard.innerHTML = '';

        const startIndex = (currentGraduationPage - 1) * GRADUATION_PER_PAGE;
        const endIndex = startIndex + GRADUATION_PER_PAGE;
        const pageGraduationRecords = graduationRecords.slice(startIndex, endIndex);

        pageGraduationRecords.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.classList.add('graduation-record');
            recordDiv.innerHTML = `
                <h3>${record.title}</h3>
                <p>${record.content}</p>
                <p class="document">
                    <a href="${record.document.url}" target="_blank" download>${record.document.filename}</a>
                </p>
            `;
            graduationBoard.appendChild(recordDiv);
        });
    }

    // 更新升學榜單分頁信息和按鈕狀態
    function updateGraduationPagination() {
        const pageInfo = document.getElementById('graduation-page-info');
        const totalPages = Math.ceil(graduationRecords.length / GRADUATION_PER_PAGE);
        pageInfo.textContent = `第 ${currentGraduationPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('graduation-prev-page');
        const nextButton = document.getElementById('graduation-next-page');

        prevButton.disabled = currentGraduationPage === 1;
        nextButton.disabled = currentGraduationPage === totalPages;
    }

    // 初始獲取升學榜單
    fetchGraduationRecords();

    // 為升學榜單上一頁按鈕添加點擊事件
    document.getElementById('graduation-prev-page').addEventListener('click', () => {
        if (currentGraduationPage > 1) {
            currentGraduationPage--;
            displayGraduationRecords();
            updateGraduationPagination();
        }
    });

    // 為升學榜單下一頁按鈕添加點擊事件
    document.getElementById('graduation-next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(graduationRecords.length / GRADUATION_PER_PAGE);
        if (currentGraduationPage < totalPages) {
            currentGraduationPage++;
            displayGraduationRecords();
            updateGraduationPagination();
        }
    });

    // 定義每頁顯示的工科技藝競賽數量和當前頁碼
    const TECHNICAL_PER_PAGE = 1;
    let currentTechnicalPage = 1;
    let technicalRecords = [];

    // 從 JSON 文件獲取工科技藝競賽數據
    function fetchTechnicalRecords() {
        fetch('technical.json')
            .then(response => response.json())
            .then(data => {
                technicalRecords = data;
                displayTechnicalRecords();
                updateTechnicalPagination();
            })
            .catch(error => console.error('Error fetching technical records:', error));
    }

    // 顯示當前頁的工科技藝競賽
    function displayTechnicalRecords() {
        const technicalBoard = document.getElementById('technical-board');
        technicalBoard.innerHTML = '';

        const startIndex = (currentTechnicalPage - 1) * TECHNICAL_PER_PAGE;
        const endIndex = startIndex + TECHNICAL_PER_PAGE;
        const pageTechnicalRecords = technicalRecords.slice(startIndex, endIndex);

        pageTechnicalRecords.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.classList.add('technical-record');
            recordDiv.innerHTML = `
                <h3>${record.title}</h3>
                <p>${record.content}</p>
                <p class="document">
                    <a href="${record.document.url}" target="_blank" download>${record.document.filename}</a>
                </p>
            `;
            technicalBoard.appendChild(recordDiv);
        });
    }

    // 更新工科技藝競賽分頁信息和按鈕狀態
    function updateTechnicalPagination() {
        const pageInfo = document.getElementById('technical-page-info');
        const totalPages = Math.ceil(technicalRecords.length / TECHNICAL_PER_PAGE);
        pageInfo.textContent = `第 ${currentTechnicalPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('technical-prev-page');
        const nextButton = document.getElementById('technical-next-page');

        prevButton.disabled = currentTechnicalPage === 1;
        nextButton.disabled = currentTechnicalPage === totalPages;
    }

    // 初始獲取工科技藝競賽
    fetchTechnicalRecords();

    // 為工科技藝競賽上一頁按鈕添加點擊事件
    document.getElementById('technical-prev-page').addEventListener('click', () => {
        if (currentTechnicalPage > 1) {
            currentTechnicalPage--;
            displayTechnicalRecords();
            updateTechnicalPagination();
        }
    });

    // 為工科技藝競賽下一頁按鈕添加點擊事件
    document.getElementById('technical-next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(technicalRecords.length / TECHNICAL_PER_PAGE);
        if (currentTechnicalPage < totalPages) {
            currentTechnicalPage++;
            displayTechnicalRecords();
            updateTechnicalPagination();
        }
    });

    // 定義每頁顯示的全國技能競賽數量和當前頁碼
    const SKILL_PER_PAGE = 1;
    let currentSkillPage = 1;
    let skillRecords = [];

    // 從 JSON 文件獲取全國技能競賽數據
    function fetchSkillRecords() {
        fetch('skill.json')
            .then(response => response.json())
            .then(data => {
                skillRecords = data;
                displaySkillRecords();
                updateSkillPagination();
            })
            .catch(error => console.error('Error fetching skill records:', error));
    }

    // 顯示當前頁的全國技能競賽
    function displaySkillRecords() {
        const skillBoard = document.getElementById('skill-board');
        skillBoard.innerHTML = '';

        const startIndex = (currentSkillPage - 1) * SKILL_PER_PAGE;
        const endIndex = startIndex + SKILL_PER_PAGE;
        const pageSkillRecords = skillRecords.slice(startIndex, endIndex);

        pageSkillRecords.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.classList.add('skill-record');
            recordDiv.innerHTML = `
                <h3>${record.title}</h3>
                <p>${record.content}</p>
                <p class="document">
                    <a href="${record.document.url}" target="_blank" download>${record.document.filename}</a>
                </p>
            `;
            skillBoard.appendChild(recordDiv);
        });
    }

    // 更新全國技能競賽分頁信息和按鈕狀態
    function updateSkillPagination() {
        const pageInfo = document.getElementById('skill-page-info');
        const totalPages = Math.ceil(skillRecords.length / SKILL_PER_PAGE);
        pageInfo.textContent = `第 ${currentSkillPage} 頁，共 ${totalPages} 頁`;

        const prevButton = document.getElementById('skill-prev-page');
        const nextButton = document.getElementById('skill-next-page');

        prevButton.disabled = currentSkillPage === 1;
        nextButton.disabled = currentSkillPage === totalPages;
    }

    // 初始獲取全國技能競賽
    fetchSkillRecords();

    // 為全國技能競賽上一頁按鈕添加點擊事件
    document.getElementById('skill-prev-page').addEventListener('click', () => {
        if (currentSkillPage > 1) {
            currentSkillPage--;
            displaySkillRecords();
            updateSkillPagination();
        }
    });

    // 為全國技能競賽下一頁按鈕添加點擊事件
    document.getElementById('skill-next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(skillRecords.length / SKILL_PER_PAGE);
        if (currentSkillPage < totalPages) {
            currentSkillPage++;
            displaySkillRecords();
            updateSkillPagination();
        }
    });
});