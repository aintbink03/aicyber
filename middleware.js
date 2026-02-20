// ==================== MIDDLEWARE.JS - TO'LIQ VERSIYA ====================
// Bu fayl barcha sahifalarda foydalanuvchi autentifikatsiyasini boshqaradi
// va navigatsiya menyusini dinamik ravishda yangilaydi

(function() {
    'use strict';
    
    // ==================== KONSTANTALAR ====================
    const STORAGE_KEYS = {
        TOKEN: 'token',
        USER: 'user',
        CISCO_PROGRESS: 'cisco_completed_lessons',
        PYTHON_PROGRESS: 'python_completed_lessons'
    };
    
    // ==================== YORDAMCHI FUNKSIYALAR ====================
    
    /**
     * LocalStorage dan token olish
     * @returns {string|null} token yoki null
     */
    function getToken() {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }
    
    /**
     * LocalStorage dan foydalanuvchi ma'lumotlarini olish
     * @returns {Object} foydalanuvchi obyekti yoki bo'sh obyekt
     */
    function getUser() {
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        try {
            return userStr ? JSON.parse(userStr) : {};
        } catch (e) {
            console.error('❌ User ma\'lumotlarini o'qishda xatolik:', e);
            return {};
        }
    }
    
    /**
     * Foydalanuvchi tizimga kirganligini tekshirish
     * @returns {boolean} true agar kirgan bo'lsa
     */
    function isAuthenticated() {
        const token = getToken();
        const user = getUser();
        return !!(token && user.id);
    }
    
    /**
     * Foydalanuvchi admin ekanligini tekshirish
     * @returns {boolean} true agar admin bo'lsa
     */
    function isAdmin() {
        const user = getUser();
        return user.role === 'admin';
    }
    
    /**
     * Foydalanuvchi initials (bosh harflar) ni olish
     * @returns {string} masalan: "AK", "JD"
     */
    function getUserInitials() {
        const user = getUser();
        const firstname = user.firstname || '';
        const lastname = user.lastname || '';
        
        if (firstname && lastname) {
            return (firstname.charAt(0) + lastname.charAt(0)).toUpperCase();
        } else if (firstname) {
            return firstname.charAt(0).toUpperCase();
        } else if (lastname) {
            return lastname.charAt(0).toUpperCase();
        } else {
            return 'U';
        }
    }
    
    /**
     * Foydalanuvchi to'liq ismini olish
     * @returns {string} foydalanuvchi ismi
     */
    function getUserFullName() {
        const user = getUser();
        return user.fullname || user.firstname || 'Foydalanuvchi';
    }
    
    // ==================== NAVIGATSIYA FUNKSIYALARI ====================
    
    /**
     * Profil sahifasiga o'tish
     */
    function goToProfile() {
        if (isAuthenticated()) {
            window.location.href = '/profile';
        } else {
            window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        }
    }
    
    /**
     * Tizimdan chiqish
     */
    function logout() {
        // Barcha ma'lumotlarni tozalash
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.CISCO_PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.PYTHON_PROGRESS);
        
        // Toast xabar ko'rsatish
        showToast('✅ Tizimdan chiqildi');
        
        // Sahifani qayta yuklash (3 soniyadan keyin)
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }
    
    // ==================== UI YANGILASH ====================
    
    /**
     * Navigatsiya menyusini yangilash
     */
    function updateNavigation() {
        const authenticated = isAuthenticated();
        const user = getUser();
        const isAdminUser = user.role === 'admin';
        const userName = getUserFullName();
        const userInitials = getUserInitials();
        
        // Desktop auth buttons
        const authButtons = document.querySelectorAll('.auth-buttons');
        const profileLinks = document.querySelectorAll('.profile-link');
        const userNameElements = document.querySelectorAll('.user-name');
        const userAvatarElements = document.querySelectorAll('.user-avatar');
        const adminLinks = document.querySelectorAll('.admin-link');
        
        if (authenticated) {
            // Foydalanuvchi kirgan - profile ko'rsatish
            authButtons.forEach(el => el.classList.add('hidden'));
            profileLinks.forEach(el => el.classList.remove('hidden'));
            
            // User name va avatarni yangilash
            userNameElements.forEach(el => {
                el.textContent = userName;
                el.classList.remove('hidden');
            });
            
            userAvatarElements.forEach(el => {
                el.textContent = userInitials;
                el.classList.remove('hidden');
            });
            
            // Admin linklarini ko'rsatish (faqat admin uchun)
            if (isAdminUser) {
                adminLinks.forEach(el => el.classList.remove('hidden'));
            } else {
                adminLinks.forEach(el => el.classList.add('hidden'));
            }
            
        } else {
            // Foydalanuvchi kirmagan - login/register ko'rsatish
            authButtons.forEach(el => el.classList.remove('hidden'));
            profileLinks.forEach(el => el.classList.add('hidden'));
            userNameElements.forEach(el => el.classList.add('hidden'));
            userAvatarElements.forEach(el => el.classList.add('hidden'));
            adminLinks.forEach(el => el.classList.add('hidden'));
        }
    }
    
    /**
     * Toast xabar ko'rsatish
     * @param {string} message - xabar matni
     * @param {boolean} isError - xatolik xabari bo'lsa true
     */
    function showToast(message, isError = false) {
        // Toast elementi borligini tekshirish
        let toast = document.getElementById('toast');
        
        if (!toast) {
            // Toast elementi yo'q bo'lsa, yaratish
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
    
    /**
     * Mobile menyuni boshqarish
     */
    function initMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Mobile menyu ichidagi linklarni bosganda menyuni yopish
            mobileMenu.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }
    
    // ==================== LOGIN TEKSHIRISH ====================
    
    /**
     * Sahifa uchun login tekshirish
     * @param {Array} protectedPages - himoyalangan sahifalar ro'yxati
     */
    function checkAuth(protectedPages = ['/cisco/darslar', '/python/darslar', '/profile', '/admin']) {
        const currentPath = window.location.pathname;
        const authenticated = isAuthenticated();
        
        // Himoyalangan sahifalarni tekshirish
        const isProtected = protectedPages.some(page => 
            currentPath.startsWith(page) || currentPath === page
        );
        
        if (isProtected && !authenticated) {
            // Foydalanuvchi kirmagan - login sahifasiga o'tkazish
            const redirectUrl = encodeURIComponent(currentPath);
            window.location.href = `/login?redirect=${redirectUrl}`;
            return false;
        }
        
        // Admin sahifalarini tekshirish
        if (currentPath.startsWith('/admin') && !isAdmin()) {
            // Admin huquqi yo'q - bosh sahifaga o'tkazish
            window.location.href = '/';
            return false;
        }
        
        return true;
    }
    
    // ==================== PROGRESS MA'LUMOTLARI ====================
    
    /**
     * Foydalanuvchi progressini yangilash
     * @param {string} course - kurs nomi ('cisco' yoki 'python')
     * @param {number} lessonId - dars ID si
     */
    async function updateProgress(course, lessonId) {
        if (!isAuthenticated()) return false;
        
        try {
            const token = getToken();
            const response = await fetch(`/api/progress/${course}/${lessonId}`, {
                method: 'POST',
                headers: {
                    'x-auth-token': token
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // LocalStorage dagi progressni yangilash
                const user = getUser();
                if (!user.completedLessons) user.completedLessons = {};
                if (!user.completedLessons[course]) user.completedLessons[course] = [];
                
                if (!user.completedLessons[course].includes(lessonId)) {
                    user.completedLessons[course].push(lessonId);
                    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
                }
                
                return true;
            }
        } catch (error) {
            console.error('Progress yangilanmadi:', error);
        }
        
        return false;
    }
    
    // ==================== INITIALIZATSIYA ====================
    
    /**
     * Barcha event listenerlarni o'rnatish
     */
    function initEventListeners() {
        // Logout tugmalari
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        });
        
        // Profil tugmalari
        document.querySelectorAll('.profile-link-btn, .profile-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                goToProfile();
            });
        });
        
        // Login/Register tugmalari allaqachon href orqali ishlaydi
    }
    
    /**
     * Sahifa yuklanganda ishga tushadigan asosiy funksiya
     */
    function init() {
        // Himoyalangan sahifalarni tekshirish
        checkAuth();
        
        // Navigatsiyani yangilash
        updateNavigation();
        
        // Mobile menyuni ishga tushirish
        initMobileMenu();
        
        // Event listenerlarni o'rnatish
        initEventListeners();
        
        console.log('✅ Middleware ishga tushdi', isAuthenticated() ? 'Foydalanuvchi kirgan' : 'Foydalanuvchi kirmagan');
    }
    
    // DOM to'liq yuklangandan keyin ishga tushirish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM allaqachon yuklangan
        init();
    }
    
    // ==================== GLOBAL OBYEKT ====================
    
    // Global obyekt orqali funksiyalarni ochiq qilish
    window.userAuth = {
        isAuthenticated,
        isAdmin,
        getUser,
        getUserFullName,
        getUserInitials,
        goToProfile,
        logout,
        updateProgress,
        showToast
    };
    
})();