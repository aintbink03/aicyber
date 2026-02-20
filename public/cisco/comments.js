// comments.js - To'liq kod

// ==================== MUHOKAMA TIZIMI ====================

// Random rang
function getRandomColor(seed) {
    const colors = [
        'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600',
        'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
    ];
    return colors[seed % colors.length];
}

// Vaqtni formatlash
function formatTimeAgo(time) {
    const now = new Date();
    const past = new Date(time);
    const diff = Math.floor((now - past) / 1000);
    
    if (diff < 60) return 'hozir';
    if (diff < 3600) return Math.floor(diff / 60) + ' min oldin';
    if (diff < 86400) return Math.floor(diff / 3600) + ' soat oldin';
    if (diff < 604800) return Math.floor(diff / 86400) + ' kun oldin';
    return past.toLocaleDateString('uz-UZ');
}

// Izohlarni yuklash
function loadComments() {
    let comments = [];
    
    // LocalStorage dan o'qish
    const saved = localStorage.getItem('cisco_comments');
    if (saved) {
        comments = JSON.parse(saved);
    } else {
        // Standart izohlar
        comments = [
            {
                id: 1,
                lessonId: 24,
                userId: 1,
                userName: "Alisher Karimov",
                userInitials: "AK",
                userColor: "bg-purple-600",
                text: "7 qavatli bino loyihasi juda zo'r chiqibdi!",
                time: "2024-02-20T10:30:00",
                likes: 12
            },
            {
                id: 2,
                lessonId: 7,
                userId: 2,
                userName: "Madina Azimova",
                userInitials: "MA",
                userColor: "bg-blue-600",
                text: "VLAN larni tushunish oson ekan.",
                time: "2024-02-20T11:15:00",
                likes: 8
            }
        ];
        localStorage.setItem('cisco_comments', JSON.stringify(comments));
    }
    
    return comments;
}

// Izohlarni ko'rsatish
function renderComments(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container topilmadi:', containerId);
        return;
    }
    
    const comments = loadComments();
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    let html = '';
    
    if (comments.length === 0) {
        html = `
            <div class="text-center py-8 text-gray-500">
                <i class="far fa-comment-dots text-4xl mb-3"></i>
                <p>Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!</p>
            </div>
        `;
    } else {
        comments.sort((a, b) => new Date(b.time) - new Date(a.time)).forEach(comment => {
            const timeAgo = formatTimeAgo(comment.time);
            
            html += `
                <div class="bg-gray-800/30 rounded-lg p-4 mb-3">
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 ${comment.userColor} rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            ${comment.userInitials}
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="font-medium text-sm">${comment.userName}</span>
                                    <span class="text-xs text-gray-500 ml-2">${timeAgo}</span>
                                </div>
                            </div>
                            <p class="text-gray-300 text-sm mt-1">${comment.text}</p>
                            <div class="flex items-center space-x-4 mt-2">
                                <button class="like-comment text-xs text-gray-500 hover:text-blue-400" data-id="${comment.id}">
                                    <i class="far fa-heart mr-1"></i>${comment.likes || 0}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
    
    // Izohlar sonini yangilash
    const countSpan = document.getElementById('comment-count');
    if (countSpan) {
        countSpan.textContent = comments.length;
    }
}

// Yangi izoh qo'shish
function addComment(text) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    if (!currentUser) {
        alert('Izoh qoldirish uchun tizimga kiring!');
        window.location.href = 'login.html';
        return false;
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const users = JSON.parse(localStorage.getItem('cisco_users') || '[]');
    const user = users.find(u => u.id === currentUser.userId);
    
    if (!user) return false;
    
    const comments = loadComments();
    
    const newComment = {
        id: Date.now(),
        lessonId: 24, // Hozirgi dars ID si
        userId: user.id,
        userName: user.fullname,
        userInitials: (user.firstname?.charAt(0) || '') + (user.lastname?.charAt(0) || ''),
        userColor: getRandomColor(user.id),
        text: text,
        time: new Date().toISOString(),
        likes: 0
    };
    
    comments.push(newComment);
    localStorage.setItem('cisco_comments', JSON.stringify(comments));
    
    // muhokama.txt uchun saqlash
    saveToTxt(comments);
    
    return true;
}

// muhokama.txt ga saqlash
function saveToTxt(comments) {
    let txtContent = "CISCO PACKET TRACER - MUHOKAMA IZOHLARI\n";
    txtContent += "=".repeat(50) + "\n\n";
    
    comments.sort((a, b) => new Date(b.time) - new Date(a.time)).forEach(c => {
        const date = new Date(c.time).toLocaleString('uz-UZ');
        txtContent += `[${date}] ${c.userName}:\n`;
        txtContent += `${c.text}\n`;
        txtContent += `👍 ${c.likes}\n\n`;
    });
    
    localStorage.setItem('muhokama_txt', txtContent);
}

// muhokama.txt yuklash
function downloadMuhokamaTxt() {
    const content = localStorage.getItem('muhokama_txt') || 'Izohlar yo\'q';
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'muhokama.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}