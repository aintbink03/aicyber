const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// ==================== KONFIGURATSIYA ====================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'cisco-python-sysadmin-secret-key-2026';

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ==================== PAPKA STRUKTURASINI YARATISH ====================
const dataDir = path.join(__dirname, 'data');
const klentDir = path.join(__dirname, 'klent');
const coursesDir = path.join(__dirname, 'courses');

// Asosiy papkalar
fs.ensureDirSync(dataDir);
fs.ensureDirSync(klentDir);
fs.ensureDirSync(coursesDir);

// Kurs papkalari
fs.ensureDirSync(path.join(coursesDir, 'cisco', 'data'));
fs.ensureDirSync(path.join(coursesDir, 'python', 'data'));
fs.ensureDirSync(path.join(coursesDir, 'sysadmin', 'data'));

// Public papkalari
fs.ensureDirSync(path.join(__dirname, 'public', 'cisco'));
fs.ensureDirSync(path.join(__dirname, 'public', 'python'));
fs.ensureDirSync(path.join(__dirname, 'public', 'sysadmin'));

// ==================== FAYL YO'LLARI ====================
const usersPath = path.join(dataDir, 'users.json');
const klentPath = path.join(klentDir, 'foydalanuvchi.txt');

// Cisco
const ciscoDarslarPath = path.join(coursesDir, 'cisco', 'data', 'darslar.json');

// Python
const pythonDarslarPath = path.join(coursesDir, 'python', 'data', 'pythondarslar.json');

// SysAdmin
const sysadminDarslarPath = path.join(coursesDir, 'sysadmin', 'data', 'darslar.json');

// ==================== YORDAMCHI FUNKSIYALAR ====================

// Foydalanuvchilarni o'qish
async function readUsers() {
    try {
        if (!await fs.pathExists(usersPath)) {
            await fs.writeJson(usersPath, []);
            return [];
        }
        const data = await fs.readFile(usersPath, 'utf8');
        if (!data || data.trim() === '') {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.log('⚠️ users.json bo\'sh, yangi fayl yaratiladi');
        await fs.writeJson(usersPath, []);
        return [];
    }
}

// Foydalanuvchilarni saqlash
async function saveUsers(users) {
    await fs.writeJson(usersPath, users, { spaces: 2 });
}

// Foydalanuvchilarni TXT faylga yozish
async function saveUserToTxt(user) {
    const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
    const userLine = `${user.id} | ${user.fullname} | ${user.email} | ${user.phone || '-'} | ${timestamp} | ${user.role || 'user'}\n`;
    
    if (!await fs.pathExists(klentPath)) {
        await fs.writeFile(klentPath, "ID | Ism Familiya | Email | Telefon | Ro'yxat sanasi | Rol\n" + "=".repeat(80) + "\n");
    }
    
    await fs.appendFile(klentPath, userLine);
}

// ==================== AUTENTIFIKATSIYA ROUTES ====================

// Ro'yxatdan o'tish
app.post('/api/auth/register', [
    body('firstname').isLength({ min: 2 }),
    body('lastname').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { firstname, lastname, email, password, phone } = req.body;
        
        let users = await readUsers();
        
        if (users.some(u => u.email === email)) {
            return res.status(400).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = {
            id: Date.now(),
            firstname,
            lastname,
            fullname: `${firstname} ${lastname}`,
            email,
            phone: phone || '',
            password: hashedPassword,
            role: email === 'admin@example.com' ? 'admin' : 'user',
            registeredAt: new Date().toISOString(),
            lastLogin: null,
            completedLessons: {
                cisco: [],
                python: [],
                sysadmin: []
            }
        };
        
        users.push(newUser);
        await saveUsers(users);
        await saveUserToTxt(newUser);
        
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            token,
            user: {
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
            }
        });
        
    } catch (err) {
        console.error('Register xatoligi:', err);
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// Login
app.post('/api/auth/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { email, password } = req.body;
        
        const users = await readUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(400).json({ error: 'Email yoki parol noto\'g\'ri' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email yoki parol noto\'g\'ri' });
        }
        
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (err) {
        console.error('Login xatoligi:', err);
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// Joriy foydalanuvchi
app.get('/api/auth/me', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Token topilmadi' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const users = await readUsers();
        const user = users.find(u => u.id === decoded.id);
        
        if (!user) {
            return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
        }
        
        const { password, ...userData } = user;
        res.json(userData);
        
    } catch (err) {
        res.status(401).json({ error: 'Token yaroqsiz' });
    }
});

// ==================== ADMIN ROUTES ====================

const adminMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'Token topilmadi' });
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const users = await readUsers();
        const user = users.find(u => u.id === decoded.id);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin huquqi kerak' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token yaroqsiz' });
    }
};

app.get('/api/admin/users', adminMiddleware, async (req, res) => {
    try {
        const users = await readUsers();
        const safeUsers = users.map(u => {
            const { password, ...rest } = u;
            return rest;
        });
        res.json(safeUsers);
    } catch (err) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

app.get('/api/admin/stats', adminMiddleware, async (req, res) => {
    try {
        const users = await readUsers();
        const today = new Date().toLocaleDateString('uz-UZ');
        
        res.json({
            totalUsers: users.length,
            newToday: users.filter(u => new Date(u.registeredAt).toLocaleDateString('uz-UZ') === today).length,
            activeToday: users.filter(u => u.lastLogin && new Date(u.lastLogin).toLocaleDateString('uz-UZ') === today).length,
            admins: users.filter(u => u.role === 'admin').length
        });
    } catch (err) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

app.get('/api/admin/download-klent', adminMiddleware, async (req, res) => {
    try {
        if (await fs.pathExists(klentPath)) {
            res.download(klentPath, 'foydalanuvchi.txt');
        } else {
            res.status(404).json({ error: 'Fayl topilmadi' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// ==================== CISCO KURSI ====================

// Cisco darslarini olish
app.get('/api/cisco/darslar', async (req, res) => {
    try {
        if (!await fs.pathExists(ciscoDarslarPath)) {
            return res.json([]);
        }
        
        const data = await fs.readJson(ciscoDarslarPath);
        
        if (Array.isArray(data)) {
            res.json(data);
        } else if (data.darslar && Array.isArray(data.darslar)) {
            res.json(data.darslar);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Cisco xatolik:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/cisco/darslar/:id', async (req, res) => {
    try {
        const data = await fs.readJson(ciscoDarslarPath);
        const darslar = Array.isArray(data) ? data : (data.darslar || []);
        const dars = darslar.find(d => d.id === parseInt(req.params.id));
        
        if (dars) {
            res.json(dars);
        } else {
            res.status(404).json({ error: 'Dars topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== PYTHON KURSI ====================

// 24 darslik Python ma'lumotlari (agar fayl bo'lmasa ishlatiladi)
const pythonDarslari = [
  {
    "id": 1,
    "nomi": "Python va kiberxavfsizlikka kirish",
    "qisqa_mazmun": "Python nima uchun kiberxavfsizlikda muhim?",
    "category": "basic",
    "level": "Boshlang'ich",
    "badge": "badge-beginner",
    "icon": "🐍",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "libraries": ["sys", "os"],
    "cli_commands": ["python3 --version"],
    "qurilmalar": ["Python 3.x"],
    "topshiriq": "Python versiyangizni aniqlang",
    "batafsil": "<h4>Python kiberxavfsizlikda</h4><p>Python kiberxavfsizlik sohasida eng ko'p qo'llaniladigan dasturlash tillaridan biridir.</p>"
  }
  // Qolgan 23 dars...
];

app.get('/api/python/darslar', async (req, res) => {
    try {
        if (!await fs.pathExists(pythonDarslarPath)) {
            await fs.writeJson(pythonDarslarPath, pythonDarslari, { spaces: 2 });
            return res.json(pythonDarslari);
        }
        
        const darslar = await fs.readJson(pythonDarslarPath);
        
        if (!Array.isArray(darslar) || darslar.length === 0) {
            await fs.writeJson(pythonDarslarPath, pythonDarslari, { spaces: 2 });
            return res.json(pythonDarslari);
        }
        
        res.json(darslar);
    } catch (error) {
        res.json(pythonDarslari);
    }
});

app.get('/api/python/darslar/:id', async (req, res) => {
    try {
        let darslar = pythonDarslari;
        if (await fs.pathExists(pythonDarslarPath)) {
            darslar = await fs.readJson(pythonDarslarPath);
        }
        const dars = darslar.find(d => d.id === parseInt(req.params.id));
        dars ? res.json(dars) : res.status(404).json({ error: 'Dars topilmadi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/python/kutubxonalar', async (req, res) => {
    try {
        let darslar = pythonDarslari;
        if (await fs.pathExists(pythonDarslarPath)) {
            darslar = await fs.readJson(pythonDarslarPath);
        }
        
        const kutubxonalar = {};
        darslar.forEach(d => {
            if (d.libraries && Array.isArray(d.libraries)) {
                d.libraries.forEach(lib => {
                    if (!kutubxonalar[lib]) {
                        kutubxonalar[lib] = { nomi: lib, darslar: [], category: d.category };
                    }
                    kutubxonalar[lib].darslar.push(d.id);
                });
            }
        });
        
        res.json(Object.values(kutubxonalar));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== SYSADMIN KURSI ====================

// 24 darslik SysAdmin ma'lumotlari (agar fayl bo'lmasa ishlatiladi)
const sysadminDarslari = [
  {
    "id": 1,
    "nomi": "Tizim administratorligiga kirish",
    "qisqa_mazmun": "Tizim administratorining vazifalari, mas'uliyati va kundalik ishlari",
    "category": "basic",
    "level": "Boshlang'ich",
    "badge": "badge-beginner",
    "icon": "🖥️",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "libraries": ["bash", "systemctl"],
    "cli_commands": ["whoami", "hostname", "uname -a"],
    "qurilmalar": ["Linux Server"],
    "topshiriq": "Virtual mashina yarating",
    "batafsil": "<h4>Tizim administratorligi</h4><p>Tizim administratori (sysadmin) - kompyuter tizimlari va serverlarni boshqaradi.</p>"
  },
  {
    "id": 2,
    "nomi": "Linux va Windows arxitekturasi",
    "qisqa_mazmun": "Linux va Windows operatsion tizimlarining farqlari",
    "category": "basic",
    "level": "Boshlang'ich",
    "badge": "badge-beginner",
    "icon": "🐧",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "libraries": ["kernel", "systemd"],
    "cli_commands": ["uname -r", "systeminfo"],
    "qurilmalar": ["Linux Server", "Windows Server"],
    "topshiriq": "Linux va Windows farqlarini o'rganing",
    "batafsil": "<h4>Linux vs Windows</h4><p>Linux ochiq kodli, Windows esa yopiq kodli operatsion tizim.</p>"
  }
  // Qolgan 22 dars...
];

app.get('/api/sysadmin/darslar', async (req, res) => {
    try {
        if (!await fs.pathExists(sysadminDarslarPath)) {
            await fs.writeJson(sysadminDarslarPath, sysadminDarslari, { spaces: 2 });
            return res.json(sysadminDarslari);
        }
        
        const darslar = await fs.readJson(sysadminDarslarPath);
        
        if (!Array.isArray(darslar) || darslar.length === 0) {
            await fs.writeJson(sysadminDarslarPath, sysadminDarslari, { spaces: 2 });
            return res.json(sysadminDarslari);
        }
        
        res.json(darslar);
    } catch (error) {
        res.json(sysadminDarslari);
    }
});

app.get('/api/sysadmin/darslar/:id', async (req, res) => {
    try {
        let darslar = sysadminDarslari;
        if (await fs.pathExists(sysadminDarslarPath)) {
            darslar = await fs.readJson(sysadminDarslarPath);
        }
        const dars = darslar.find(d => d.id === parseInt(req.params.id));
        dars ? res.json(dars) : res.status(404).json({ error: 'Dars topilmadi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== UMUMIY STATISTIKA ====================
app.get('/api/stats', async (req, res) => {
    try {
        const users = await readUsers();
        
        let pythonCount = 24;
        try {
            if (await fs.pathExists(pythonDarslarPath)) {
                const pData = await fs.readJson(pythonDarslarPath);
                pythonCount = pData.length || 24;
            }
        } catch (e) {}
        
        let sysadminCount = 24;
        try {
            if (await fs.pathExists(sysadminDarslarPath)) {
                const sData = await fs.readJson(sysadminDarslarPath);
                sysadminCount = sData.length || 24;
            }
        } catch (e) {}
        
        res.json({
            cisco: { total: 24 },
            python: { total: pythonCount },
            sysadmin: { total: sysadminCount },
            totalUsers: users.length
        });
    } catch (err) {
        res.json({ cisco: 24, python: 24, sysadmin: 24, totalUsers: 0 });
    }
});

// ==================== PROGRESS YANGILASH ====================
app.post('/api/progress/:course/:lessonId', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'Token topilmadi' });
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { course, lessonId } = req.params;
        const users = await readUsers();
        const userIndex = users.findIndex(u => u.id === decoded.id);
        
        if (userIndex === -1) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
        
        if (!users[userIndex].completedLessons) users[userIndex].completedLessons = {};
        if (!users[userIndex].completedLessons[course]) users[userIndex].completedLessons[course] = [];
        
        const lessonIdNum = parseInt(lessonId);
        if (!users[userIndex].completedLessons[course].includes(lessonIdNum)) {
            users[userIndex].completedLessons[course].push(lessonIdNum);
            await saveUsers(users);
        }
        
        res.json({ completedLessons: users[userIndex].completedLessons[course] });
    } catch (err) {
        res.status(401).json({ error: 'Token yaroqsiz' });
    }
});

// ==================== SAHIFALAR ====================

// Asosiy sahifalar
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.send('<h1>Cisco & Python & SysAdmin Kurslari</h1><p>Server ishlayapti!</p>');
    }
});

app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'login.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.status(404).send('Login sahifasi topilmadi');
});

app.get('/register', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'register.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.status(404).send('Register sahifasi topilmadi');
});

app.get('/profile', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'profile.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.status(404).send('Profil sahifasi topilmadi');
});

app.get('/admin', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'admin.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.status(404).send('Admin sahifasi topilmadi');
});

// ==================== CISCO SAHIFALARI ====================

app.get('/cisco', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'cisco', 'index.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.redirect('/cisco/darslar');
});

app.get('/cisco/darslar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'cisco', 'darslar.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.send(`
            <h1>Cisco Darslar</h1>
            <p>Ma'lumotlar API orqali yuklanadi</p>
            <script>
                fetch('/api/cisco/darslar').then(r=>r.json()).then(console.log);
            </script>
        `);
    }
});

app.get('/cisco/loyihalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'cisco', 'loyihalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>Cisco Loyihalar</h1>');
});

app.get('/cisco/yuklamalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'cisco', 'yuklamalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>Cisco Yuklamalar</h1>');
});

app.use('/cisco', express.static(path.join(__dirname, 'public', 'cisco')));

// ==================== PYTHON SAHIFALARI ====================

app.get('/python', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'python', 'index.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.redirect('/python/darslar');
});

app.get('/python/darslar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'python', 'darslar.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.send(`
            <h1>Python Darslar</h1>
            <p>Ma'lumotlar API orqali yuklanadi</p>
            <script>
                fetch('/api/python/darslar').then(r=>r.json()).then(console.log);
            </script>
        `);
    }
});

app.get('/python/kutubxonalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'python', 'kutubxonalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>Python Kutubxonalar</h1>');
});

app.get('/python/loyihalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'python', 'loyihalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>Python Loyihalar</h1>');
});

app.get('/python/yuklamalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'python', 'yuklamalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>Python Yuklamalar</h1>');
});

app.use('/python', express.static(path.join(__dirname, 'public', 'python')));

// ==================== SYSADMIN SAHIFALARI ====================

app.get('/sysadmin', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sysadmin', 'index.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.redirect('/sysadmin/darslar');
});

app.get('/sysadmin/darslar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sysadmin', 'darslar.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.send(`
            <h1>SysAdmin Darslar</h1>
            <p>Ma'lumotlar API orqali yuklanadi</p>
            <script>
                fetch('/api/sysadmin/darslar').then(r=>r.json()).then(console.log);
            </script>
        `);
    }
});

app.get('/sysadmin/loyihalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sysadmin', 'loyihalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>SysAdmin Loyihalar</h1>');
});

app.get('/sysadmin/yuklamalar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sysadmin', 'yuklamalar.html');
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.send('<h1>SysAdmin Yuklamalar</h1>');
});

app.use('/sysadmin', express.static(path.join(__dirname, 'public', 'sysadmin')));

// ==================== 404 HANDLER ====================
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Sahifa topilmadi',
        url: req.url
    });
});

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
    console.error('Server xatoligi:', err);
    res.status(500).json({ error: 'Server xatoligi' });
});

// ==================== SERVER START ====================
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(70));
    console.log(`🚀 SERVER ISHLADI: http://localhost:${PORT}`);
    console.log('='.repeat(70));
    
    console.log('\n📌 ASOSIY SAHIFALAR:');
    console.log(`   🏠 Bosh sahifa: http://localhost:${PORT}`);
    console.log(`   📝 Register: http://localhost:${PORT}/register`);
    console.log(`   🔑 Login: http://localhost:${PORT}/login`);
    console.log(`   👤 Profile: http://localhost:${PORT}/profile`);
    console.log(`   👑 Admin: http://localhost:${PORT}/admin`);
    
    console.log('\n📌 CISCO KURSI:');
    console.log(`   📚 Darslar: http://localhost:${PORT}/cisco/darslar`);
    console.log(`   🚀 Loyihalar: http://localhost:${PORT}/cisco/loyihalar`);
    console.log(`   📥 Yuklamalar: http://localhost:${PORT}/cisco/yuklamalar`);
    console.log(`   🔍 API: http://localhost:${PORT}/api/cisco/darslar`);
    
    console.log('\n📌 PYTHON KURSI:');
    console.log(`   🐍 Bosh sahifa: http://localhost:${PORT}/python`);
    console.log(`   📚 Darslar: http://localhost:${PORT}/python/darslar`);
    console.log(`   📚 Kutubxonalar: http://localhost:${PORT}/python/kutubxonalar`);
    console.log(`   🚀 Loyihalar: http://localhost:${PORT}/python/loyihalar`);
    console.log(`   📥 Yuklamalar: http://localhost:${PORT}/python/yuklamalar`);
    console.log(`   🔍 API: http://localhost:${PORT}/api/python/darslar`);
    
    console.log('\n📌 SYSADMIN KURSI:');
    console.log(`   🖥️ Bosh sahifa: http://localhost:${PORT}/sysadmin`);
    console.log(`   📚 Darslar: http://localhost:${PORT}/sysadmin/darslar`);
    console.log(`   🚀 Loyihalar: http://localhost:${PORT}/sysadmin/loyihalar`);
    console.log(`   📥 Yuklamalar: http://localhost:${PORT}/sysadmin/yuklamalar`);
    console.log(`   🔍 API: http://localhost:${PORT}/api/sysadmin/darslar`);
    
    console.log('\n📁 MA\'LUMOTLAR:');
    console.log(`   👥 Foydalanuvchilar: ${klentPath}`);
    console.log('='.repeat(70) + '\n');
});