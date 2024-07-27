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
});