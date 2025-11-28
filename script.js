// 示例项目数据
const projectsData = [
    {
        id: 1,
        name: "Notion Clone",
        authorId: "dev101",
        link: "https://example.com/notion-clone",
        category: "web",
        likes: 1254,
        image: "https://picsum.photos/seed/project1/600/400"
    },
    {
        id: 2,
        name: "Todo Master",
        authorId: "dev102",
        link: "https://example.com/todo-master",
        category: "mobile",
        likes: 892,
        image: "https://picsum.photos/seed/project2/600/400"
    },
    {
        id: 3,
        name: "Code Snippet Manager",
        authorId: "dev103",
        link: "https://example.com/code-snippets",
        category: "tool",
        likes: 1567,
        image: "https://picsum.photos/seed/project3/600/400"
    },
    {
        id: 4,
        name: "Pixel Adventure",
        authorId: "dev104",
        link: "https://example.com/pixel-adventure",
        category: "game",
        likes: 2103,
        image: "https://picsum.photos/seed/project4/600/400"
    },
    {
        id: 5,
        name: "Weather App",
        authorId: "dev105",
        link: "https://example.com/weather-app",
        category: "web",
        likes: 756,
        image: "https://picsum.photos/seed/project5/600/400"
    },
    {
        id: 6,
        name: "Photo Editor",
        authorId: "dev106",
        link: "https://example.com/photo-editor",
        category: "mobile",
        likes: 1890,
        image: "https://picsum.photos/seed/project6/600/400"
    },
    {
        id: 7,
        name: "Markdown Writer",
        authorId: "dev107",
        link: "https://example.com/markdown-writer",
        category: "tool",
        likes: 1123,
        image: "https://picsum.photos/seed/project7/600/400"
    },
    {
        id: 8,
        name: "Space Invaders Remake",
        authorId: "dev108",
        link: "https://example.com/space-invaders",
        category: "game",
        likes: 1456,
        image: "https://picsum.photos/seed/project8/600/400"
    },
    {
        id: 9,
        name: "Portfolio Builder",
        authorId: "dev109",
        link: "https://example.com/portfolio-builder",
        category: "web",
        likes: 987,
        image: "https://picsum.photos/seed/project9/600/400"
    },
    {
        id: 10,
        name: "Budget Tracker",
        authorId: "dev110",
        link: "https://example.com/budget-tracker",
        category: "mobile",
        likes: 1342,
        image: "https://picsum.photos/seed/project10/600/400"
    },
    {
        id: 11,
        name: "Color Picker",
        authorId: "dev111",
        link: "https://example.com/color-picker",
        category: "tool",
        likes: 876,
        image: "https://picsum.photos/seed/project11/600/400"
    },
    {
        id: 12,
        name: "Flappy Bird Clone",
        authorId: "dev112",
        link: "https://example.com/flappy-bird",
        category: "game",
        likes: 1678,
        image: "https://picsum.photos/seed/project12/600/400"
    }
];

// DOM 元素
const projectsGrid = document.getElementById('projectsGrid');
const leaderboardContent = document.getElementById('leaderboardContent');
const navLinks = document.querySelectorAll('.nav-link[data-filter]');

// 初始化页面
function init() {
    renderProjects(projectsData);
    renderLeaderboard();
    setupEventListeners();
}

// 渲染项目卡片
function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #666;">暂无项目</p>';
        return;
    }
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// 创建项目卡片元素
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.name}" class="project-image">
        <div class="project-info">
            <div class="name-row">
                <h3 class="project-name">${project.name}</h3>
                <div class="author-id">@${project.authorId}</div>
            </div>
            <div class="project-stats">
                <div class="likes">
                    <button class="like-btn" onclick="toggleLike(${project.id}, this)">
                        ♡
                    </button>
                    <span class="like-count">${project.likes}</span>
                </div>
            </div>
        </div>
    `;
    
    // 添加卡片点击事件，跳转到项目链接
    card.addEventListener('click', () => {
        window.open(project.link, '_blank', 'noopener noreferrer');
    });
    
    // 为点赞按钮添加事件冒泡阻止，防止触发卡片点击
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    return card;
}

// 渲染排行榜
function renderLeaderboard() {
    // 按点赞数排序
    const sortedProjects = [...projectsData].sort((a, b) => b.likes - a.likes);
    
    leaderboardContent.innerHTML = '';
    
    sortedProjects.forEach((project, index) => {
        const leaderboardItem = createLeaderboardItem(project, index + 1);
        leaderboardContent.appendChild(leaderboardItem);
    });
}

// 创建排行榜项
function createLeaderboardItem(project, rank) {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    
    // 为前三名添加特殊样式
    let rankClass = '';
    if (rank === 1) rankClass = 'gold';
    else if (rank === 2) rankClass = 'silver';
    else if (rank === 3) rankClass = 'bronze';
    
    const categoryNames = {
        'web': '网站应用',
        'mobile': '移动应用',
        'tool': '工具',
        'game': '游戏'
    };
    
    item.innerHTML = `
        <div class="rank ${rankClass}">${rank}</div>
        <div class="leaderboard-content">
            <img src="${project.image}" alt="${project.name}" class="leaderboard-image">
            <div class="leaderboard-info">
                <h3 class="leaderboard-name">${project.name}</h3>
                <div class="author-id">@${project.authorId}</div>
                <div class="leaderboard-category">${categoryNames[project.category]}</div>
            </div>
            <div class="leaderboard-likes">
                ♡ ${project.likes}
            </div>
        </div>
    `;
    
    // 添加排行榜项点击事件，跳转到项目链接
    item.addEventListener('click', () => {
        window.open(project.link, '_blank', 'noopener noreferrer');
    });
    
    return item;
}

// 设置事件监听器
function setupEventListeners() {
    // 分类筛选
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 更新活跃状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 获取筛选条件
            const filter = link.dataset.filter;
            
            // 筛选项目
            if (filter === 'all') {
                renderProjects(projectsData);
            } else {
                const filteredProjects = projectsData.filter(project => project.category === filter);
                renderProjects(filteredProjects);
            }
        });
    });
}

// 点赞功能
function toggleLike(projectId, button) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
        project.likes++;
        
        // 更新项目卡片中的点赞数
        const likeCount = button.nextElementSibling;
        likeCount.textContent = project.likes;
        
        // 更新排行榜
        renderLeaderboard();
        
        // 添加简约动画效果
        button.style.transform = 'scale(1.05)';
        button.style.color = '#ff6b6b';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // 保持点赞状态
        button.classList.add('liked');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);