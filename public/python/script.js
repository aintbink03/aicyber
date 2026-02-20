// ==================== PYTHON KURSI SCRIPT.JS ====================

// API URL
const API_URL = '';
const COURSE_TYPE = 'python';

// Global o'zgaruvchilar
let darslar = [];
let activeLessonId = 1;
let currentFilter = 'all';
let searchTerm = '';
let completedLessons = JSON.parse(localStorage.getItem('python_completed_lessons')) || [];

// ==================== TOAST FUNKSIYASI ====================
function showToast(message, isError = false) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas text-xl"></i>
                <p id="toast-message" class="text-sm"></p>
            </div>
        `;
        document.body.appendChild(toast);
    }
    
    const icon = toast.querySelector('i');
    const text = document.getElementById('toast-message');
    
    text.textContent = message;
    
    if (isError) {
        toast.style.borderLeftColor = '#ef4444';
        icon.className = 'fas fa-exclamation-circle text-red-500 text-xl';
    } else {
        toast.style.borderLeftColor = '#3b82f6';
        icon.className = 'fas fa-check-circle text-blue-500 text-xl';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOADER ====================
function showLoader(show) {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        if (show) {
            loader.classList.remove('hidden');
        } else {
            loader.classList.add('hidden');
        }
    }
}

// ==================== PROGRESS ====================
function updateProgress() {
    const totalLessons = darslar.length;
    const completedCount = completedLessons.length;
    const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
    
    const progressBar = document.getElementById('progress-bar');
    const completedSpan = document.getElementById('completed-count');
    const progressPercentSpan = document.getElementById('progress-percent');
    
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    if (completedSpan) {
        completedSpan.textContent = completedCount;
    }
    
    if (progressPercentSpan) {
        progressPercentSpan.textContent = `${Math.round(progressPercent)}%`;
    }
    
    localStorage.setItem('python_completed_lessons', JSON.stringify(completedLessons));
}

function toggleComplete(lessonId, event) {
    if (event) event.stopPropagation();
    
    const index = completedLessons.indexOf(lessonId);
    if (index === -1) {
        completedLessons.push(lessonId);
        showToast(`✅ Dars ${lessonId} tugallandi!`);
    } else {
        completedLessons.splice(index, 1);
        showToast(`⏪ Dars ${lessonId} tugallanmagan deb belgilandi`);
    }
    
    updateProgress();
    renderLessonsList();
}

// ==================== DARSLARNI YUKLASH ====================
async function loadDarslar() {
    showLoader(true);
    
    try {
        console.log('📡 Python darslari yuklanmoqda...');
        const response = await fetch(`${API_URL}/api/python/darslar`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        darslar = await response.json();
        console.log(`✅ ${darslar.length} ta dars yuklandi:`, darslar);
        
        // Darslar sonini tekshirish
        if (darslar.length === 0) {
            console.warn('⚠️ Darslar ro\'yxati bo\'sh');
            showToast('⚠️ Darslar topilmadi', true);
        } else if (darslar.length < 24) {
            console.warn(`⚠️ Faqat ${darslar.length} ta dars bor (24 ta bo'lishi kerak)`);
        }
        
        // Darslar ro'yxatini ko'rsatish
        renderLessonsList();
        updateProgress();
        
        // Birinchi darsni yuklash
        if (darslar.length > 0) {
            loadLesson(darslar[0].id);
        }
        
    } catch (error) {
        console.error('❌ Darslar yuklanmadi:', error);
        showToast('❌ Darslar yuklanmadi', true);
        
        // Fallback test ma'lumotlar
        darslar = [
            {
                id: 1,
                nomi: "Python va kiberxavfsizlikka kirish",
                qisqa_mazmun: "Python nima uchun kiberxavfsizlikda muhim?",
                category: "basic",
                level: "Boshlang'ich",
                badge: "badge-beginner",
                icon: "🐍",
                video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                libraries: ["sys", "os"],
                cli_commands: ["python3 --version"],
                qurilmalar: ["Python 3.x"],
                topshiriq: "Python versiyangizni aniqlang",
                batafsil: "<h4>Python kiberxavfsizlikda</h4><p>Python kiberxavfsizlik sohasida eng ko'p qo'llaniladigan dasturlash tillaridan biridir.</p>"
            }
        ];
        renderLessonsList();
    } finally {
        showLoader(false);
    }
}

// ==================== DARSLAR RO'YXATINI CHIZISH ====================
function renderLessonsList() {
    const container = document.getElementById('lessons-list');
    if (!container) {
        console.error('❌ lessons-list elementi topilmadi!');
        return;
    }
    
    // Filtrni qo'llash
    let filtered = darslar;
    
    if (currentFilter !== 'all') {
        filtered = darslar.filter(d => d.category === currentFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(d => 
            d.nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.qisqa_mazmun.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Darslar sonini yangilash
    const countSpan = document.getElementById('lessons-count');
    if (countSpan) countSpan.textContent = filtered.length + ' ta';
    
    // Agar darslar bo'lmasa
    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-center py-8 text-gray-500">Darslar topilmadi</div>';
        return;
    }
    
    // HTML yaratish
    let html = '';
    filtered.forEach(dars => {
        const isActive = dars.id === activeLessonId;
        const isCompleted = completedLessons.includes(dars.id);
        
        html += `
            <div class="lesson-card ${isActive ? 'active' : ''}" data-lesson-id="${dars.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <span class="text-2xl">${dars.icon}</span>
                        <div class="flex-1">
                            <div class="font-medium flex items-center">
                                ${dars.id}. ${dars.nomi}
                                ${isCompleted ? '<i class="fas fa-check-circle text-green-500 ml-2 text-sm"></i>' : ''}
                            </div>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-xs ${dars.badge} px-2 py-0.5 rounded-full">${dars.level}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input type="checkbox" 
                               class="lesson-checkbox w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                               data-lesson-id="${dars.id}"
                               ${isCompleted ? 'checked' : ''}>
                        <i class="fas fa-chevron-right text-gray-600"></i>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Checkbox eventlari
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const lessonId = parseInt(e.target.dataset.lessonId);
            toggleComplete(lessonId, e);
        });
    });
    
    // Dars card click eventi
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('lesson-checkbox') || e.target.closest('.lesson-checkbox')) {
                return;
            }
            const id = parseInt(card.dataset.lessonId);
            loadLesson(id);
        });
    });
}

// ==================== DARS MAZMUNINI CHIZISH ====================
function loadLesson(lessonId) {
    activeLessonId = lessonId;
    const dars = darslar.find(d => d.id === lessonId);
    if (!dars) return;
    
    const isCompleted = completedLessons.includes(lessonId);
    const contentDiv = document.getElementById('lesson-content');
    
    if (!contentDiv) {
        console.error('❌ lesson-content elementi topilmadi!');
        return;
    }
    
    const html = `
        <div>
            <div class="flex items-start justify-between mb-6">
                <div>
                    <div class="flex items-center space-x-3 mb-2">
                        <span class="text-4xl">${dars.icon}</span>
                        <span class="text-xs ${dars.badge} px-3 py-1 rounded-full">${dars.level}</span>
                        ${isCompleted ? '<span class="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full"><i class="fas fa-check-circle mr-1"></i>Tugallangan</span>' : ''}
                    </div>
                    <h2 class="text-3xl font-bold">${dars.id}. ${dars.nomi}</h2>
                    <p class="text-gray-400 mt-2">${dars.qisqa_mazmun}</p>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button id="toggle-complete-btn" class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition flex items-center space-x-2" data-lesson-id="${dars.id}">
                        ${isCompleted 
                            ? '<i class="fas fa-check-circle text-green-500"></i><span>Tugallangan</span>' 
                            : '<i class="far fa-circle"></i><span>Darsni tugallash</span>'}
                    </button>
                </div>
            </div>
            
            <div class="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <iframe width="100%" height="100%" src="${dars.video_url}" frameborder="0" allowfullscreen></iframe>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2">
                    ${dars.batafsil}
                    
                    <h4 class="font-bold mt-6 mb-3">📝 Topshiriq:</h4>
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-300">${dars.topshiriq}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div class="card p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-cube text-blue-500 mr-2"></i>
                            Kutubxonalar
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${dars.libraries.map(lib => `
                                <span class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">${lib}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="card p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-terminal text-green-500 mr-2"></i>
                            CLI komandalar
                        </h4>
                        <div class="code-block text-sm">
                            ${dars.cli_commands.map(cmd => `<div class="mb-1">$ ${cmd}</div>`).join('')}
                        </div>
                    </div>
                    
                    <div class="card p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-microchip text-purple-500 mr-2"></i>
                            Qurilmalar
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${dars.qurilmalar.map(q => `
                                <span class="bg-gray-700 px-3 py-1 rounded-full text-sm">${q}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contentDiv.innerHTML = html;
    
    // Toggle complete button
    document.getElementById('toggle-complete-btn')?.addEventListener('click', (e) => {
        const lessonId = parseInt(e.currentTarget.dataset.lessonId);
        toggleComplete(lessonId, e);
        loadLesson(lessonId);
    });
    
    // Active class ni yangilash
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.classList.remove('active');
        if (parseInt(card.dataset.lessonId) === lessonId) {
            card.classList.add('active');
        }
    });
}

// ==================== FILTER ====================
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
                b.classList.add('bg-gray-800');
            });
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-800');
            
            currentFilter = btn.dataset.filter;
            renderLessonsList();
        });
    });
}

// ==================== SEARCH ====================
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('hidden');
            if (!searchBar.classList.contains('hidden')) {
                searchInput.focus();
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            if (searchClear) {
                searchClear.classList.toggle('hidden', !searchTerm);
            }
            renderLessonsList();
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchTerm = '';
            searchClear.classList.add('hidden');
            renderLessonsList();
        });
    }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ==================== PROGRESSNI TOZALASH ====================
function resetProgress() {
    if (confirm('Barcha darslarni tugallanmagan deb belgilashni xohlaysizmi?')) {
        completedLessons = [];
        updateProgress();
        renderLessonsList();
        showToast('🔄 Progress tozalandi');
    }
}

// ==================== LOGOUT ====================
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('python_completed_lessons');
    window.location.href = '/';
}

// ==================== SAHIFA YUKLANGANDA ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Python sahifasi yuklandi');
    
    // Darslarni yuklash
    loadDarslar();
    
    // Komponentlarni ishga tushirish
    initFilters();
    initSearch();
    initMobileMenu();
    
    // Reset progress button
    document.getElementById('reset-progress')?.addEventListener('click', resetProgress);
    
    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('mobile-logout')?.addEventListener('click', logout);
    
    // User ma'lumotlarini ko'rsatish
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user) {
        const userNameSpan = document.getElementById('user-name');
        if (userNameSpan) {
            userNameSpan.textContent = user.fullname || user.firstname || 'Foydalanuvchi';
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            document.getElementById('search-toggle')?.click();
        }
        if (e.key === 'Escape') {
            document.getElementById('search-bar')?.classList.add('hidden');
        }
    });
});