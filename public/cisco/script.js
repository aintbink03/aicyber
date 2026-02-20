// ==================== 24 DARSLIK TO'LIQ KURS MA'LUMOTLARI ====================
const darslar = [
    // DARS 1
    {
        id: 1,
        nomi: "Tarmoq asoslari va OSI modeli",
        qisqa_mazmun: "OSI va TCP/IP modellari, tarmoq qurilmalari, kabel turlari",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "📡",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "1-osi-model.pkt",
        cli_commands: [
            "show ip interface brief - Interfeyslarni ko'rish",
            "show version - Qurilma versiyasi",
            "show interfaces - Tarmoq interfeyslari"
        ],
        qurilmalar: ["Router", "Switch", "Hub", "PC (3)", "Kabel turlari"],
        topshiriq: "OSI modelining 7 qatlamini o'rganing va Packet Tracerda hub va switch farqini ko'ring",
        batafsil: `
            <h4 class="font-bold mb-2">📡 OSI MODELI (7 QATLAM):</h4>
            <div class="grid grid-cols-1 gap-2 mb-4">
                <div class="bg-purple-600/20 p-2 rounded">7. Application - HTTP, FTP, SMTP</div>
                <div class="bg-blue-600/20 p-2 rounded">6. Presentation - SSL, TLS, JPEG</div>
                <div class="bg-green-600/20 p-2 rounded">5. Session - NetBIOS, RPC</div>
                <div class="bg-yellow-600/20 p-2 rounded">4. Transport - TCP, UDP</div>
                <div class="bg-orange-600/20 p-2 rounded">3. Network - IP, ICMP, ARP</div>
                <div class="bg-red-600/20 p-2 rounded">2. Data Link - Ethernet, MAC, VLAN</div>
                <div class="bg-gray-600/20 p-2 rounded">1. Physical - Kabel, Hub, Signal</div>
            </div>
            
            <h4 class="font-bold mb-2">🔌 KABEL TURLARI:</h4>
            <ul class="list-disc list-inside text-gray-300">
                <li>Straight-through (Switch - PC, Router - Switch)</li>
                <li>Crossover (PC - PC, Switch - Switch, Router - Router)</li>
                <li>Console (Switch/Router boshqaruvi)</li>
                <li>Fiber optic (Uzoq masofalar)</li>
            </ul>
        `
    },
    
    // DARS 2
    {
        id: 2,
        nomi: "IPv4 manzillash va subnet mask",
        qisqa_mazmun: "IPv4, Subnet mask, Network ID, Broadcast, Private/Public IP",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "🌐",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "2-ipv4.pkt",
        cli_commands: [
            "ipconfig - IP ko'rish",
            "ipconfig /all - To'liq ma'lumot",
            "ping - Ulanish tekshirish"
        ],
        qurilmalar: ["PC (4)", "Switch (2)", "Router"],
        topshiriq: "192.168.1.0/24 tarmog'ini 4 ta subnetga bo'ling",
        batafsil: `
            <h4 class="font-bold mb-2">🔢 IP KLASSLARI:</h4>
            <table class="w-full text-sm mb-4">
                <tr class="border-b border-gray-700"><th>Class</th><th>Birinchi oktet</th><th>Default mask</th><th>Misol</th></tr>
                <tr><td>A</td><td>1-126</td><td>/8 (255.0.0.0)</td><td>10.0.0.0</td></tr>
                <tr><td>B</td><td>128-191</td><td>/16 (255.255.0.0)</td><td>172.16.0.0</td></tr>
                <tr><td>C</td><td>192-223</td><td>/24 (255.255.255.0)</td><td>192.168.1.0</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">🏠 PRIVATE IP RANGES (RFC 1918):</h4>
            <ul class="list-disc list-inside text-gray-300">
                <li>10.0.0.0/8 (10.0.0.0 - 10.255.255.255)</li>
                <li>172.16.0.0/12 (172.16.0.0 - 172.31.255.255)</li>
                <li>192.168.0.0/16 (192.168.0.0 - 192.168.255.255)</li>
            </ul>
        `
    },
    
    // DARS 3
    {
        id: 3,
        nomi: "Subnetting - Tarmoqlarni bo'lish",
        qisqa_mazmun: "VLSM, CIDR, Subnet hisoblash, Subnet mask jadvali",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "✂️",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "3-subnetting.pkt",
        cli_commands: [
            "show ip route - Routing jadvali",
            "show ip interface brief - Interfeys IP lari"
        ],
        qurilmalar: ["Router (2)", "Switch (2)", "PC (4)"],
        topshiriq: "10.0.0.0/8 tarmog'ini /24 subnetlarga bo'ling",
        batafsil: `
            <h4 class="font-bold mb-2">📊 SUBNET MASK JADVALI:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>CIDR</th><th>Subnet Mask</th><th>Hostlar</th></tr>
                <tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
                <tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
                <tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
                <tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
                <tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
                <tr><td>/29</td><td>255.255.255.248</td><td>6</td></tr>
                <tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">🧮 SUBNET FORMULASI:</h4>
            <p class="text-gray-300">Subnetlar soni = 2^(qarzga olingan bitlar)</p>
            <p class="text-gray-300">Hostlar soni = 2^(qolgan bitlar) - 2</p>
        `
    },
    
    // DARS 4
    {
        id: 4,
        nomi: "ARP va MAC manzillar",
        qisqa_mazmun: "MAC address, ARP protokoli, ARP cache, MAC table",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "🖧",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "4-arp.pkt",
        cli_commands: [
            "arp -a - ARP cache ko'rish",
            "show mac address-table - Switch MAC table",
            "clear arp-cache - ARP tozalash"
        ],
        qurilmalar: ["Switch", "PC (3)", "Router"],
        topshiriq: "Switch MAC table ni o'rganing va ARP cache ni ko'ring",
        batafsil: `
            <h4 class="font-bold mb-2">🔍 ARP ISHLASH PRINSIPI:</h4>
            <ol class="list-decimal list-inside text-gray-300 mb-4">
                <li>PC1 PC2 ga ping yuboradi</li>
                <li>PC1 ARP request broadcast qiladi</li>
                <li>PC2 ARP reply bilan javob beradi</li>
                <li>MAC manzil cache ga saqlanadi</li>
            </ol>
            
            <h4 class="font-bold mb-2">📋 SWITCH MAC TABLE:</h4>
            <pre class="code-block p-2 text-green-400">
Switch# show mac address-table
VLAN    MAC Address       Type      Port
1       0050.7966.6800    DYNAMIC   Fa0/1
1       0060.2F84.4AB6    DYNAMIC   Fa0/2
            </pre>
        `
    },
    
    // DARS 5
    {
        id: 5,
        nomi: "TCP vs UDP - Transport qatlami",
        qisqa_mazmun: "TCP 3-way handshake, UDP, Port raqamlari",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "🔄",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "5-tcp-udp.pkt",
        cli_commands: [
            "show tcp brief - TCP ulanishlar",
            "show udp - UDP statistika",
            "telnet - TCP test"
        ],
        qurilmalar: ["Router", "Server", "PC"],
        topshiriq: "TCP va UDP farqini o'rganing, port raqamlarini eslab qoling",
        batafsil: `
            <h4 class="font-bold mb-2">📊 TCP vs UDP:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Xususiyat</th><th>TCP</th><th>UDP</th></tr>
                <tr><td>Ulanish</td><td>Connection-oriented</td><td>Connectionless</td></tr>
                <tr><td>Ishonchlilik</td><td>✓ (Ack, retransmission)</td><td>✗</td></tr>
                <tr><td>Tezlik</td><td>Sekin</td><td>Tez</td></tr>
                <tr><td>Qo'llanilishi</td><td>HTTP, FTP, Email</td><td>DNS, VoIP, Video</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">🔌 MUHIM PORTLAR:</h4>
            <div class="grid grid-cols-2 gap-2">
                <div>HTTP: 80</div><div>HTTPS: 443</div>
                <div>FTP: 20,21</div><div>SSH: 22</div>
                <div>DNS: 53</div><div>DHCP: 67,68</div>
                <div>SMTP: 25</div><div>POP3: 110</div>
            </div>
        `
    },
    
    // DARS 6
    {
        id: 6,
        nomi: "DHCP - Avtomatik IP tayinlash",
        qisqa_mazmun: "DHCP server, DHCP client, DORA process, DHCP snooping",
        category: "beginner",
        level: "Boshlang'ich",
        badge: "badge-beginner",
        icon: "🎯",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "6-dhcp.pkt",
        cli_commands: [
            "ip dhcp pool NAME - DHCP pool yaratish",
            "network 192.168.1.0 255.255.255.0 - Tarmoq",
            "default-router 192.168.1.1 - Gateway",
            "dns-server 8.8.8.8 - DNS",
            "lease 7 - Muddat",
            "show ip dhcp binding - DHCP mijozlari"
        ],
        qurilmalar: ["Router (DHCP server)", "Switch", "PC (3)"],
        topshiriq: "Routerda DHCP server sozlang, 3 ta PC avtomatik IP olishi kerak",
        batafsil: `
            <h4 class="font-bold mb-2">🔄 DORA PROCESS:</h4>
            <ol class="list-decimal list-inside text-gray-300 mb-4">
                <li><span class="text-blue-400">D</span>iscover - Mijoz DHCP so'raydi (broadcast)</li>
                <li><span class="text-blue-400">O</span>ffer - Server IP taklif qiladi</li>
                <li><span class="text-blue-400">R</span>equest - Mijoz so'rovni qabul qiladi</li>
                <li><span class="text-blue-400">A</span>cknowledge - Server tasdiqlaydi</li>
            </ol>
            
            <h4 class="font-bold mb-2">⚙️ ROUTER KONFIGURATSIYASI:</h4>
            <pre class="code-block p-2 text-green-400">
Router(config)# ip dhcp pool LAN
Router(dhcp-config)# network 192.168.1.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.1.1
Router(dhcp-config)# dns-server 8.8.8.8
Router(dhcp-config)# lease 7
            </pre>
        `
    },
    
    // DARS 7
    {
        id: 7,
        nomi: "VLAN - Virtual Local Area Network",
        qisqa_mazmun: "VLAN yaratish, Access port, Trunk port, VLAN database",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🏷️",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "7-vlan.pkt",
        cli_commands: [
            "vlan 10 - VLAN yaratish",
            "name Sales - VLAN nomi",
            "interface fa0/1 - Portga kirish",
            "switchport mode access - Access port",
            "switchport access vlan 10 - VLAN tayinlash",
            "show vlan brief - VLANlarni ko'rish"
        ],
        qurilmalar: ["Switch (L2)", "PC (4)", "Router"],
        topshiriq: "3 xil VLAN yarating: Sales (10), IT (20), HR (30). Har bir VLAN ga 2 tadan PC ulang",
        batafsil: `
            <h4 class="font-bold mb-2">🏷️ STANDART VLANLAR:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>VLAN ID</th><th>Nomi</th><th>Ishlatilishi</th></tr>
                <tr><td>1</td><td>Default</td><td>Default VLAN (o'zgartirmang)</td></tr>
                <tr><td>2-1001</td><td>Normal</td><td>Foydalanuvchi VLANlari</td></tr>
                <tr><td>1002-1005</td><td>Reserved</td><td>Token Ring, FDDI</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">🔧 SWITCH SOZLAMALARI:</h4>
            <pre class="code-block p-2 text-green-400">
Switch(config)# vlan 10
Switch(config-vlan)# name Sales
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
            </pre>
        `
    },
    
    // DARS 8
    {
        id: 8,
        nomi: "Trunk va DTP",
        qisqa_mazmun: "802.1Q, Trunk port, DTP, Native VLAN, Allowed VLAN",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🌉",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "8-trunk.pkt",
        cli_commands: [
            "switchport mode trunk - Trunk qilish",
            "switchport trunk allowed vlan 10,20 - Ruxsat",
            "switchport trunk native vlan 99 - Native VLAN",
            "show interfaces trunk - Trunklarni ko'rish"
        ],
        qurilmalar: ["Switch (2)", "PC (4)"],
        topshiriq: "2 ta switchni trunk orqali ulang, bir necha VLAN o'tkazilsin",
        batafsil: `
            <h4 class="font-bold mb-2">🔌 TRUNK PORT:</h4>
            <p class="text-gray-300 mb-4">Trunk port bir necha VLAN trafigini olib o'tadi. 802.1Q teglari qo'shiladi.</p>
            
            <h4 class="font-bold mb-2">⚙️ TRUNK SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Switch(config)# interface gig0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk native vlan 99
Switch(config-if)# switchport trunk allowed vlan 10,20,30
            </pre>
            
            <h4 class="font-bold mb-2">⚠️ NATIVE VLAN:</h4>
            <p class="text-gray-300">Teglanmagan trafik native VLAN da yuradi. Ikkala tomonda bir xil bo'lishi kerak.</p>
        `
    },
    
    // DARS 9
    {
        id: 9,
        nomi: "VTP - VLAN Trunking Protocol",
        qisqa_mazmun: "VTP server, client, transparent, VTP pruning",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🔄",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "9-vtp.pkt",
        cli_commands: [
            "vtp domain NAME - Domen nomi",
            "vtp password PASSWORD - Parol",
            "vtp mode server - Server rejimi",
            "vtp version 2 - VTP versiya",
            "show vtp status - VTP holati"
        ],
        qurilmalar: ["Switch (3)", "PC (4)"],
        topshiriq: "VTP serverda VLAN yarating, client switchlar avtomatik qabul qilsin",
        batafsil: `
            <h4 class="font-bold mb-2">🔄 VTP REJIMLARI:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Rejim</th><th>VLAN yaratish</th><th>Tarqatish</th><th>Saqlash</th></tr>
                <tr><td>Server</td><td>✓</td><td>✓</td><td>NVRAM</td></tr>
                <tr><td>Client</td><td>✗</td><td>✓</td><td>RAM</td></tr>
                <tr><td>Transparent</td><td>✓</td><td>✗</td><td>NVRAM</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚠️ MUHIM:</h4>
            <p class="text-gray-300">Revision number muhim. Yangi switch revision number yuqori bo'lsa, VLANlarni o'chirib yuborishi mumkin!</p>
        `
    },
    
    // DARS 10
    {
        id: 10,
        nomi: "Inter-VLAN Routing (Router-on-a-stick)",
        qisqa_mazmun: "Subinterfaces, 802.1Q encapsulation, Router-on-a-stick",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🔄",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "10-intervlan.pkt",
        cli_commands: [
            "interface fa0/0.10 - Subinterface",
            "encapsulation dot1Q 10 - 802.1Q",
            "ip address 192.168.10.1 255.255.255.0 - IP",
            "no shutdown - Yoqish"
        ],
        qurilmalar: ["Router", "Switch (L2)", "PC (4)"],
        topshiriq: "Router-on-a-stick orqali 3 xil VLAN ni bir-biri bilan ulang",
        batafsil: `
            <h4 class="font-bold mb-2">🏗️ ARXITEKTURA:</h4>
            <pre>
            PC1(VLAN10) ──┐
            PC2(VLAN20) ──┼── Switch ── Trunk ── Router
            PC3(VLAN30) ──┘
            </pre>
            
            <h4 class="font-bold mb-2">⚙️ ROUTER SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
            </pre>
        `
    },
    
    // DARS 11
    {
        id: 11,
        nomi: "Static Routing",
        qisqa_mazmun: "Static route, Default route, Floating static, Load balancing",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🗺️",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "11-static.pkt",
        cli_commands: [
            "ip route NETWORK MASK NEXT_HOP - Statik route",
            "ip route 0.0.0.0 0.0.0.0 192.168.1.1 - Default route",
            "show ip route - Routing jadvali",
            "ping - Ulanish test"
        ],
        qurilmalar: ["Router (3)", "Switch (2)", "PC (4)"],
        topshiriq: "3 ta routerli tarmoqda statik route yozing, hamma PC lar bir-biriga ping qilsin",
        batafsil: `
            <h4 class="font-bold mb-2">📝 STATIC ROUTE FORMATI:</h4>
            <pre class="code-block p-2 text-green-400">
ip route [maqsad_network] [mask] [next_hop] [distance]

ip route 192.168.2.0 255.255.255.0 10.0.0.2
ip route 0.0.0.0 0.0.0.0 10.0.0.1  # Default route
            </pre>
            
            <h4 class="font-bold mb-2">⚖️ LOAD BALANCING:</h4>
            <pre class="code-block p-2 text-green-400">
ip route 192.168.2.0 255.255.255.0 10.0.0.2
ip route 192.168.2.0 255.255.255.0 10.0.1.2  # 2 ta yo'l
            </pre>
        `
    },
    
    // DARS 12
    {
        id: 12,
        nomi: "Dynamic Routing - OSPF",
        qisqa_mazmun: "OSPF areas, LSA, DR/BDR, Metric (cost)",
        category: "intermediate",
        level: "O'rta",
        badge: "badge-intermediate",
        icon: "🔄",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "12-ospf.pkt",
        cli_commands: [
            "router ospf 1 - OSPF yoqish",
            "network 192.168.1.0 0.0.0.255 area 0 - Tarmoq qo'shish",
            "show ip ospf neighbor - Qo'shnilar",
            "show ip ospf database - LSDB",
            "show ip route ospf - OSPF route"
        ],
        qurilmalar: ["Router (4)", "Switch (3)", "PC (6)"],
        topshiriq: "4 ta routerli tarmoqda OSPF sozlang, area 0 da hammasi bo'lsin",
        batafsil: `
            <h4 class="font-bold mb-2">🌐 OSPF TERMINLARI:</h4>
            <ul class="list-disc list-inside text-gray-300 mb-4">
                <li>Router ID - Router identifikatori</li>
                <li>Area - OSPF zonasi</li>
                <li>Cost - 100 Mbps / bandwidth</li>
                <li>DR/BDR - Designated router</li>
                <li>LSA - Link State Advertisement</li>
            </ul>
            
            <h4 class="font-bold mb-2">⚙️ OSPF SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0
            </pre>
        `
    },
    
    // DARS 13
    {
        id: 13,
        nomi: "EIGRP - Enhanced Interior Gateway Routing Protocol",
        qisqa_mazmun: "EIGRP, DUAL algorithm, Feasible distance, Successor",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "⚡",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "13-eigrp.pkt",
        cli_commands: [
            "router eigrp 100 - EIGRP yoqish",
            "network 192.168.1.0 - Tarmoq",
            "no auto-summary - Auto-summary o'chirish",
            "show ip eigrp neighbors - Qo'shnilar",
            "show ip eigrp topology - Topologiya"
        ],
        qurilmalar: ["Router (3)", "Switch (2)", "PC (4)"],
        topshiriq: "EIGRP sozlang, auto-summary ni o'chiring",
        batafsil: `
            <h4 class="font-bold mb-2">⚡ EIGRP XUSUSIYATLARI:</h4>
            <ul class="list-disc list-inside text-gray-300 mb-4">
                <li>Cisco proprietary (endigina open standard bo'lgan)</li>
                <li>DUAL algorithm - loop free</li>
                <li>Metric: Bandwidth + Delay</li>
                <li>Rapid convergence</li>
            </ul>
            
            <h4 class="font-bold mb-2">⚙️ EIGRP SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Router(config)# router eigrp 100
Router(config-router)# network 192.168.1.0 0.0.0.255
Router(config-router)# network 10.0.0.0 0.0.0.3
Router(config-router)# no auto-summary
            </pre>
        `
    },
    
    // DARS 14
    {
        id: 14,
        nomi: "Spanning Tree Protocol (STP)",
        qisqa_mazmun: "STP, Root bridge, Port states, BPDU, Loop prevention",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "🌲",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "14-stp.pkt",
        cli_commands: [
            "spanning-tree vlan 1 - STP yoqish",
            "spanning-tree vlan 1 root primary - Root qilish",
            "show spanning-tree - STP holati",
            "show spanning-tree detail - Batafsil"
        ],
        qurilmalar: ["Switch (3)", "PC (2)"],
        topshiriq: "3 ta switchni halqa qilib ulang, STP loop ni oldini olishini ko'ring",
        batafsil: `
            <h4 class="font-bold mb-2">🔄 STP PORT STATES:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>State</th><th>Vaqt</th><th>Nima qiladi</th></tr>
                <tr><td>Blocking</td><td>20 sec</td><td>BPDU eshitadi</td></tr>
                <tr><td>Listening</td><td>15 sec</td><td>BPDU yuboradi/qabul qiladi</td></tr>
                <tr><td>Learning</td><td>15 sec</td><td>MAC o'rganadi</td></tr>
                <tr><td>Forwarding</td><td>-</td><td>Ma'lumot uzatadi</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">👑 ROOT BRIDGE TANLASH:</h4>
            <p class="text-gray-300">Eng kichik Bridge ID (Priority + MAC) root bo'ladi</p>
        `
    },
    
    // DARS 15
    {
        id: 15,
        nomi: "EtherChannel (Link Aggregation)",
        qisqa_mazmun: "Port-channel, PAgP, LACP, Load balancing",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "🔗",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "15-etherchannel.pkt",
        cli_commands: [
            "interface port-channel 1 - Port-channel",
            "channel-group 1 mode active - LACP",
            "channel-group 1 mode desirable - PAgP",
            "show etherchannel summary - Holati"
        ],
        qurilmalar: ["Switch (2)", "PC (2)"],
        topshiriq: "2 ta switchni 4 ta kabel bilan ulang, Etherchannel sozlang",
        batafsil: `
            <h4 class="font-bold mb-2">🔗 PROTOKOLLAR:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Protocol</th><th>Mode</th><th>Ishlab chiqaruvchi</th></tr>
                <tr><td>PAgP</td><td>desirable/auto</td><td>Cisco</td></tr>
                <tr><td>LACP</td><td>active/passive</td><td>IEEE 802.3ad</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ LACP SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Switch(config)# interface range fa0/1-4
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
            </pre>
        `
    },
    
    // DARS 16
    {
        id: 16,
        nomi: "Port Security",
        qisqa_mazmun: "MAC limiting, Sticky MAC, Violation modes, Aging",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "🔒",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "16-port-security.pkt",
        cli_commands: [
            "switchport port-security - Port security",
            "switchport port-security maximum 2 - Max MAC",
            "switchport port-security mac-address sticky - Sticky",
            "switchport port-security violation shutdown - Violation"
        ],
        qurilmalar: ["Switch", "PC (3)"],
        topshiriq: "Switch portiga port security sozlang, faqat 2 ta MAC ruxsat bo'lsin",
        batafsil: `
            <h4 class="font-bold mb-2">⚠️ VIOLATION MODES:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Mode</th><th>Action</th><th>Port holati</th></tr>
                <tr><td>Shutdown</td><td>Port o'chadi</td><td>Err-disabled</td></tr>
                <tr><td>Restrict</td><td>Paket o'tmaydi</td><td>Up</td></tr>
                <tr><td>Protect</td><td>Paket tashlanadi</td><td>Up</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security mac-address sticky
            </pre>
        `
    },
    
    // DARS 17
    {
        id: 17,
        nomi: "Access Control Lists (ACL)",
        qisqa_mazmun: "Standard ACL, Extended ACL, Named ACL, ACL placement",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "🛡️",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "17-acl.pkt",
        cli_commands: [
            "access-list 1 permit 192.168.1.0 0.0.0.255 - Standard",
            "access-list 100 permit tcp any any eq 80 - Extended",
            "ip access-group 1 in - Portga qo'llash",
            "show access-lists - ACL ko'rish"
        ],
        qurilmalar: ["Router", "Switch", "PC (3)", "Server"],
        topshiriq: "Faqat IT bo'limi (192.168.10.0/24) serverga (192.168.100.10) SSH qila olsin",
        batafsil: `
            <h4 class="font-bold mb-2">📋 STANDARD ACL (1-99):</h4>
            <pre class="code-block p-2 text-green-400">
access-list 1 permit 192.168.1.0 0.0.0.255
access-list 1 deny any
interface fa0/0
ip access-group 1 in
            </pre>
            
            <h4 class="font-bold mb-2">🔬 EXTENDED ACL (100-199):</h4>
            <pre class="code-block p-2 text-green-400">
access-list 100 permit tcp 192.168.10.0 0.0.0.255 host 192.168.100.10 eq 22
access-list 100 deny ip any any
            </pre>
            
            <h4 class="font-bold mb-2">⚠️ QOIDALAR:</h4>
            <ul class="list-disc list-inside text-gray-300">
                <li>ACL lar ketma-ket tekshiriladi</li>
                <li>Oxirida implicit deny bor</li>
                <li>Standard ACL manbaga yaqin joylashtiriladi</li>
                <li>Extended ACL maqsadga yaqin joylashtiriladi</li>
            </ul>
        `
    },
    
    // DARS 18
    {
        id: 18,
        nomi: "NAT va PAT",
        qisqa_mazmun: "Static NAT, Dynamic NAT, PAT, NAT overload",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "🌍",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "18-nat.pkt",
        cli_commands: [
            "ip nat inside source static 192.168.1.10 200.1.1.10 - Static",
            "ip nat pool POOL 200.1.1.1 200.1.1.10 netmask 255.255.255.0 - Pool",
            "ip nat inside source list 1 pool POOL overload - PAT",
            "show ip nat translations - NAT jadvali"
        ],
        qurilmalar: ["Router", "Switch", "PC (3)", "Server"],
        topshiriq: "Ichki tarmoqni Internetga chiqaring (PAT orqali)",
        batafsil: `
            <h4 class="font-bold mb-2">🌐 NAT TURLARI:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Tur</th><th>Tavsifi</th><th>Misol</th></tr>
                <tr><td>Static NAT</td><td>1:1 mapping</td><td>Server tashqariga</td></tr>
                <tr><td>Dynamic NAT</td><td>Pool dan IP</td><td>Kamdan kam</td></tr>
                <tr><td>PAT (Overload)</td><td>Port bilan</td><td>Internetga chiqish</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ PAT SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
access-list 1 permit 192.168.1.0 0.0.0.255
ip nat inside source list 1 interface gig0/0 overload
interface fa0/0
 ip nat inside
interface gig0/0
 ip nat outside
            </pre>
        `
    },
    
    // DARS 19
    {
        id: 19,
        nomi: "IPv6 asoslari",
        qisqa_mazmun: "IPv6 address types, EUI-64, Neighbor Discovery, SLAAC",
        category: "advanced",
        level: "Yuqori",
        badge: "badge-advanced",
        icon: "6️⃣",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "19-ipv6.pkt",
        cli_commands: [
            "ipv6 unicast-routing - IPv6 routing",
            "ipv6 address 2001:db8:1::1/64 - IPv6 manzil",
            "ipv6 address autoconfig - SLAAC",
            "show ipv6 interface - IPv6 interfeys",
            "show ipv6 route - IPv6 routing"
        ],
        qurilmalar: ["Router", "Switch", "PC (2)"],
        topshiriq: "IPv6 manzillar bering va ping6 bilan tekshiring",
        batafsil: `
            <h4 class="font-bold mb-2">📌 IPv6 MANZIL TURLARI:</h4>
            <ul class="list-disc list-inside text-gray-300 mb-4">
                <li>Unicast - Bir nuqtaga (Global, Unique Local, Link-local)</li>
                <li>Multicast - FF00::/8 (Ko'p nuqtaga)</li>
                <li>Anycast - Eng yaqiniga</li>
            </ul>
            
            <h4 class="font-bold mb-2">🔢 IPv6 QISQARTIRISH:</h4>
            <p class="text-gray-300">2001:0db8:0000:0000:0000:0000:0000:0001</p>
            <p class="text-gray-300">→ 2001:db8::1</p>
            
            <h4 class="font-bold mb-2">⚙️ IPv6 SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
Router(config)# ipv6 unicast-routing
Router(config)# interface fa0/0
Router(config-if)# ipv6 address 2001:db8:1::1/64
Router(config-if)# ipv6 address fe80::1 link-local
            </pre>
        `
    },
    
    // DARS 20
    {
        id: 20,
        nomi: "VPN va IPSec",
        qisqa_mazmun: "Site-to-site VPN, IPSec, IKE, Tunnel mode",
        category: "expert",
        level: "Ekspert",
        badge: "badge-expert",
        icon: "🔐",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "20-vpn.pkt",
        cli_commands: [
            "crypto isakmp policy 10 - IKE policy",
            "crypto isakmp key KEY address 200.1.1.2 - Pre-shared key",
            "crypto ipsec transform-set TS esp-aes esp-sha-hmac - Transform",
            "crypto map MAP 10 ipsec-isakmp - Crypto map"
        ],
        qurilmalar: ["Router (2)", "Switch (2)", "PC (2)", "Internet cloud"],
        topshiriq: "2 ta ofis orasida VPN tunnel quring",
        batafsil: `
            <h4 class="font-bold mb-2">🔐 IPSec PROTOKOLLARI:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Protocol</th><th>Port</th><th>Ishlatilishi</th></tr>
                <tr><td>IKE</td><td>UDP 500</td><td>Kalit almashish</td></tr>
                <tr><td>ESP</td><td>IP 50</td><td>Shifrlash</td></tr>
                <tr><td>AH</td><td>IP 51</td><td>Autentifikatsiya</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ VPN SOZLASH (qisqa):</h4>
            <pre class="code-block p-2 text-green-400">
crypto isakmp policy 10
 encryption aes
 authentication pre-share
 group 5
crypto isakmp key cisco123 address 200.1.1.2
crypto ipsec transform-set TS esp-aes esp-sha-hmac
crypto map CMAP 10 ipsec-isakmp
 set peer 200.1.1.2
 set transform-set TS
 match address 100
            </pre>
        `
    },
    
    // DARS 21
    {
        id: 21,
        nomi: "Firewall (ASA)",
        qisqa_mazmun: "ASA firewall, Security levels, ACL, NAT on ASA, Inspection",
        category: "expert",
        level: "Ekspert",
        badge: "badge-expert",
        icon: "🔥",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "21-asa.pkt",
        cli_commands: [
            "interface gig0/0 - Interfeys",
            "nameif inside - Nomi",
            "security-level 100 - Xavfsizlik darajasi",
            "ip address 192.168.1.1 255.255.255.0 - IP",
            "access-list INSIDE extended permit ip any any - ACL"
        ],
        qurilmalar: ["ASA Firewall", "Router", "Switch", "PC (2)", "Server"],
        topshiriq: "ASA firewall sozlang: Inside (100) → Outside (0), Inside dan Outside ga ruxsat",
        batafsil: `
            <h4 class="font-bold mb-2">📊 SECURITY LEVELS:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Level</th><th>Interface</th><th>Ishonchlilik</th></tr>
                <tr><td>100</td><td>Inside</td><td>Eng ishonchli</td></tr>
                <tr><td>50</td><td>DMZ</td><td>O'rtacha</td></tr>
                <tr><td>0</td><td>Outside</td><td>Ishonchsiz</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ ASA SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
interface gig0/0
 nameif inside
 security-level 100
 ip address 192.168.1.1 255.255.255.0
 no shutdown

interface gig0/1
 nameif outside
 security-level 0
 ip address 200.1.1.1 255.255.255.0
 no shutdown

access-list INSIDE extended permit ip any any
access-group INSIDE in interface inside
            </pre>
        `
    },
    
    // DARS 22
    {
        id: 22,
        nomi: "Wireless LAN (WiFi)",
        qisqa_mazmun: "WLC, AP, SSID, WPA2/3, Roaming, RF channels",
        category: "expert",
        level: "Ekspert",
        badge: "badge-expert",
        icon: "📶",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "22-wireless.pkt",
        cli_commands: [
            "dot11 ssid COMPANY - SSID",
            "authentication open - Autentifikatsiya",
            "authentication key-management wpa - WPA",
            "wpa-psk ascii PASSWORD - Parol"
        ],
        qurilmalar: ["WLC", "AP", "Laptop (2)", "Smartphone (2)"],
        topshiriq: "WLC orqali 2 ta AP ni boshqaring, WPA2 security sozlang",
        batafsil: `
            <h4 class="font-bold mb-2">📶 WiFi STANDARTLARI:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>Standard</th><th>Tezlik</th><th>Chastota</th></tr>
                <tr><td>802.11b</td><td>11 Mbps</td><td>2.4 GHz</td></tr>
                <tr><td>802.11g</td><td>54 Mbps</td><td>2.4 GHz</td></tr>
                <tr><td>802.11n</td><td>600 Mbps</td><td>2.4/5 GHz</td></tr>
                <tr><td>802.11ac</td><td>1.3 Gbps</td><td>5 GHz</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">🔐 WPA2 SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
dot11 ssid COMPANY
 authentication open
 authentication key-management wpa
 wpa-psk ascii MySecretPassword
            </pre>
        `
    },
    
    // DARS 23
    {
        id: 23,
        nomi: "QoS - Quality of Service",
        qisqa_mazmun: "Traffic shaping, Policing, Queueing, DSCP, CoS",
        category: "expert",
        level: "Ekspert",
        badge: "badge-expert",
        icon: "⚡",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "23-qos.pkt",
        cli_commands: [
            "class-map match-all VOICE - Class map",
            "match dscp ef - DSCP matching",
            "policy-map QOS-POLICY - Policy map",
            "class VOICE - Class",
            "priority percent 30 - Priority queue"
        ],
        qurilmalar: ["Router", "Switch", "IP Phone", "PC"],
        topshiriq: "VoIP trafigiga priority bering (DSCP EF), qolganiga best effort",
        batafsil: `
            <h4 class="font-bold mb-2">🎯 DSCP VALUES:</h4>
            <table class="w-full text-sm mb-4">
                <tr><th>DSCP</th><th>Traffic</th><th>PHB</th></tr>
                <tr><td>EF</td><td>Voice</td><td>Expedited Forwarding</td></tr>
                <tr><td>AF41</td><td>Video</td><td>Assured Forwarding</td></tr>
                <tr><td>CS1</td><td>Best effort</td><td>Class Selector</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ QoS SOZLASH:</h4>
            <pre class="code-block p-2 text-green-400">
class-map match-all VOICE
 match dscp ef
policy-map QOS
 class VOICE
  priority percent 30
 class class-default
  fair-queue
interface fa0/0
 service-policy output QOS
            </pre>
        `
    },
    
    // DARS 24 - 7 QAVATLI BINO
    {
        id: 24,
        nomi: "🏢 7 qavatli bino - Full Enterprise Network",
        qisqa_mazmun: "Complete network design: VLANs, Inter-VLAN, DHCP, NAT, Firewall, WiFi, QoS, Redundancy",
        category: "expert",
        level: "Ekspert",
        badge: "badge-expert",
        icon: "🏢",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        pkt_fayl: "24-enterprise.pkt",
        cli_commands: [
            "vlan 10-70 - Barcha VLANlar",
            "interface vlan 10 - Inter-VLAN",
            "ip dhcp pool - DHCP",
            "ip nat inside source list - NAT",
            "access-list 100 - ACL",
            "router ospf 1 - OSPF",
            "spanning-tree vlan - STP",
            "channel-group 1 - EtherChannel",
            "standby 1 ip - HSRP"
        ],
        qurilmalar: [
            "Core Switch (L3) - 1",
            "Distribution Switch - 2",
            "Access Switch - 7",
            "Router - 2",
            "ASA Firewall - 1",
            "WLC - 1",
            "AP - 7",
            "Server - 5",
            "PC - 21",
            "IP Phone - 7"
        ],
        topshiriq: "7 qavatli binoda to'liq enterprise tarmoq quring. Barcha xizmatlar ishlashi kerak.",
        batafsil: `
            <h4 class="font-bold mb-2 text-xl text-center">🏢 7 QAVATLI BINO - TO'LIQ ARXITEKTURA</h4>
            
            <div class="bg-gray-800 p-4 rounded-lg mb-6">
                <div class="text-center mb-4">
                    <span class="bg-blue-600 px-4 py-1 rounded-full text-sm">INTERNET (ISP)</span>
                </div>
                
                <div class="flex justify-center mb-2">
                    <div class="border-2 border-red-500 p-3 rounded-lg w-48 text-center">
                        <i class="fas fa-shield-alt text-red-500 text-2xl"></i>
                        <div>ASA FIREWALL</div>
                        <div class="text-xs">Security Level 0</div>
                    </div>
                </div>
                
                <div class="flex justify-center mb-2">
                    <div class="border-2 border-purple-500 p-3 rounded-lg w-48 text-center">
                        <i class="fas fa-server text-purple-500 text-2xl"></i>
                        <div>EDGE ROUTER</div>
                        <div class="text-xs">NAT, VPN, QoS</div>
                    </div>
                </div>
                
                <div class="flex justify-center mb-2">
                    <div class="border-2 border-yellow-500 p-3 rounded-lg w-48 text-center">
                        <i class="fas fa-network-wired text-yellow-500 text-2xl"></i>
                        <div>CORE SWITCH (L3)</div>
                        <div class="text-xs">Inter-VLAN, HSRP, OSPF</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="border border-green-500 p-3 rounded-lg text-center">
                        <i class="fas fa-building text-green-500"></i>
                        <div>DISTRIBUTION 1</div>
                        <div class="text-xs">Qavat 1-3</div>
                    </div>
                    <div class="border border-green-500 p-3 rounded-lg text-center">
                        <i class="fas fa-building text-green-500"></i>
                        <div>DISTRIBUTION 2</div>
                        <div class="text-xs">Qavat 4-7</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-7 gap-1 mt-4">
                    <div class="bg-blue-900 p-2 text-center rounded text-xs">7-SERVER<br>VLAN70</div>
                    <div class="bg-indigo-900 p-2 text-center rounded text-xs">6-RAHBAR<br>VLAN60</div>
                    <div class="bg-purple-900 p-2 text-center rounded text-xs">5-HR<br>VLAN50</div>
                    <div class="bg-pink-900 p-2 text-center rounded text-xs">4-MARKET<br>VLAN40</div>
                    <div class="bg-red-900 p-2 text-center rounded text-xs">3-IT<br>VLAN30</div>
                    <div class="bg-orange-900 p-2 text-center rounded text-xs">2-BUXG<br>VLAN20</div>
                    <div class="bg-yellow-900 p-2 text-center rounded text-xs">1-QABUL<br>VLAN10</div>
                </div>
            </div>
            
            <h4 class="font-bold mb-2">📊 VLAN TAQSIMOTI:</h4>
            <table class="w-full text-sm mb-4">
                <tr class="border-b border-gray-700">
                    <th>Qavat</th><th>Bo'lim</th><th>VLAN</th><th>Subnet</th>
                </tr>
                <tr><td>1</td><td>Qabulxona</td><td>10</td><td>192.168.10.0/24</td></tr>
                <tr><td>2</td><td>Buxgalteriya</td><td>20</td><td>192.168.20.0/24</td></tr>
                <tr><td>3</td><td>IT</td><td>30</td><td>192.168.30.0/24</td></tr>
                <tr><td>4</td><td>Marketing</td><td>40</td><td>192.168.40.0/24</td></tr>
                <tr><td>5</td><td>HR</td><td>50</td><td>192.168.50.0/24</td></tr>
                <tr><td>6</td><td>Rahbariyat</td><td>60</td><td>192.168.60.0/24</td></tr>
                <tr><td>7</td><td>Server xonasi</td><td>70</td><td>192.168.70.0/24</td></tr>
            </table>
            
            <h4 class="font-bold mb-2">⚙️ CORE SWITCH KONFIGURATSIYASI:</h4>
            <pre class="code-block p-2 text-green-400 text-xs">
! VLAN yaratish
vlan 10
 name Reception
vlan 20
 name Accounting
vlan 30
 name IT
vlan 40
 name Marketing
vlan 50
 name HR
vlan 60
 name Management
vlan 70
 name Servers

! Inter-VLAN routing
interface vlan 10
 ip address 192.168.10.1 255.255.255.0
 no shutdown
 ip helper-address 192.168.70.10

! Trunk portlar
interface range gig0/1-2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50,60,70
 channel-group 1 mode active

! HSRP
interface vlan 10
 standby 1 ip 192.168.10.254
 standby 1 priority 110
 standby 1 preempt

! OSPF
router ospf 1
 router-id 1.1.1.1
 network 192.168.0.0 0.0.255.255 area 0
            </pre>
        `
    }
];

// Izohlar
let comments = [
    {
        id: 1,
        user: "Jasur",
        avatar: "J",
        color: "bg-purple-600",
        text: "7 qavatli bino loyihasi juda zo'r chiqibdi. Rahmat!",
        time: "2024-01-15T10:30:00",
        likes: 12
    },
    {
        id: 2,
        user: "Admin",
        avatar: "A",
        color: "bg-blue-600",
        text: "@Jasur, foydali bo'lganidan xursandman. Keyingi darsda VLAN sozlamalarini batafsil ko'ramiz.",
        time: "2024-01-15T11:15:00",
        likes: 5
    }
];

// ==================== GLOBAL O'ZGARUVCHILAR ====================
let activeLessonId = 1;
let completedLessons = [];
let currentFilter = 'all';
let searchTerm = '';

// ==================== LOCALSTORAGE BILAN ISHLASH ====================
function loadProgress() {
    const saved = localStorage.getItem('cisco-progress');
    if (saved) {
        completedLessons = JSON.parse(saved);
    }
    updateProgressUI();
}

function saveProgress() {
    localStorage.setItem('cisco-progress', JSON.stringify(completedLessons));
    updateProgressUI();
}

function updateProgressUI() {
    const count = completedLessons.length;
    const percent = (count / 24) * 100;
    
    document.getElementById('completed-count').textContent = count;
    document.getElementById('progress-bar').style.width = percent + '%';
    
    renderLessonsList();
}

// ==================== DARSLAR RO'YXATINI CHIZISH ====================
function renderLessonsList() {
    const container = document.getElementById('lessons-list');
    if (!container) return;
    
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
    
    document.getElementById('lessons-count').textContent = filtered.length + ' ta';
    
    let html = '';
    filtered.forEach(dars => {
        const isCompleted = completedLessons.includes(dars.id);
        const isActive = dars.id === activeLessonId;
        
        html += `
            <div class="lesson-card p-3 rounded-lg cursor-pointer ${isActive ? 'active' : ''}" data-lesson-id="${dars.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="text-xl">${dars.icon}</span>
                        <div>
                            <div class="font-medium text-sm">${dars.id}. ${dars.nomi}</div>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-xs ${dars.badge} px-2 py-0.5 rounded-full">${dars.level}</span>
                                ${isCompleted ? '<i class="fas fa-check-circle text-green-500 text-xs"></i>' : ''}
                            </div>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-600 text-xs"></i>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', () => {
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
    
    const html = `
        <div>
            <div class="flex items-start justify-between mb-6">
                <div>
                    <div class="flex items-center space-x-3 mb-2">
                        <span class="text-3xl">${dars.icon}</span>
                        <span class="text-xs ${dars.badge} px-3 py-1 rounded-full">${dars.level}</span>
                        ${isCompleted ? '<span class="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full"><i class="fas fa-check-circle mr-1"></i>Tugallangan</span>' : ''}
                    </div>
                    <h2 class="text-2xl font-bold">${dars.id}. ${dars.nomi}</h2>
                    <p class="text-gray-400 mt-2">${dars.qisqa_mazmun}</p>
                </div>
                
                <div class="flex space-x-2">
                    <button class="complete-btn bg-gray-800 hover:bg-gray-700 p-3 rounded-xl transition" data-id="${dars.id}">
                        <i class="fas ${isCompleted ? 'fa-check-circle text-green-500' : 'fa-circle'}"></i>
                    </button>
                </div>
            </div>
            
            <div class="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <iframe width="100%" height="100%" src="${dars.video_url}" frameborder="0" allowfullscreen></iframe>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="md:col-span-2">
                    ${dars.batafsil}
                    
                    <h4 class="font-bold mb-2 mt-4">📝 Topshiriq:</h4>
                    <p class="text-gray-300 bg-gray-800 p-4 rounded-lg">${dars.topshiriq}</p>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-gray-800 rounded-lg p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-download text-blue-500 mr-2"></i>
                            Yuklab olish
                        </h4>
                        <button class="download-pkt w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition flex items-center justify-center space-x-2" data-filename="${dars.pkt_fayl}">
                            <i class="fas fa-file-archive"></i>
                            <span>${dars.pkt_fayl}</span>
                        </button>
                        <p class="text-xs text-gray-500 text-center mt-2">Packet Tracer 8.2+ uchun</p>
                    </div>
                    
                    <div class="bg-gray-800 rounded-lg p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-terminal text-blue-500 mr-2"></i>
                            CLI komandalar
                        </h4>
                        <div class="space-y-2">
                            ${dars.cli_commands.map(cmd => `
                                <div class="bg-black p-2 rounded text-green-400 text-xs font-mono">${cmd}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 rounded-lg p-4">
                        <h4 class="font-bold mb-3 flex items-center">
                            <i class="fas fa-server text-blue-500 mr-2"></i>
                            Qurilmalar
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${dars.qurilmalar.map(q => `
                                <span class="bg-gray-700 px-2 py-1 rounded text-xs">${q}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('lesson-content').innerHTML = html;
    
    document.querySelector('.complete-btn')?.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        toggleComplete(id);
    });
    
    document.querySelector('.download-pkt')?.addEventListener('click', (e) => {
        const filename = e.currentTarget.dataset.filename;
        downloadFile(filename);
    });
}

// ==================== DARSNI TUGALLASH ====================
function toggleComplete(lessonId) {
    const index = completedLessons.indexOf(lessonId);
    if (index === -1) {
        completedLessons.push(lessonId);
        showToast('✅ Dars tugallandi!');
    } else {
        completedLessons.splice(index, 1);
        showToast('⏳ Dars tugallanmagan deb belgilandi');
    }
    
    saveProgress();
    loadLesson(lessonId);
}

// ==================== FILTER ====================
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

// ==================== SEARCH ====================
document.getElementById('search-toggle')?.addEventListener('click', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
        document.getElementById('search-input').focus();
    }
});

document.getElementById('search-input')?.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    document.getElementById('search-clear').classList.toggle('hidden', !searchTerm);
    renderLessonsList();
});

document.getElementById('search-clear')?.addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    searchTerm = '';
    document.getElementById('search-clear').classList.add('hidden');
    renderLessonsList();
});

// ==================== FILE DOWNLOAD ====================
function downloadFile(filename) {
    showToast(`📥 Yuklanmoqda: ${filename}`);
    
    setTimeout(() => {
        showToast(`✅ ${filename} yuklandi!`);
    }, 1500);
}

// ==================== TOAST ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== IZOHLAR ====================
function renderComments() {
    const container = document.getElementById('comments-list');
    if (!container) return;
    
    let html = '';
    comments.sort((a, b) => new Date(b.time) - new Date(a.time)).forEach(comment => {
        const timeAgo = getTimeAgo(comment.time);
        
        html += `
            <div class="flex space-x-3">
                <div class="w-8 h-8 ${comment.color} rounded-full flex items-center justify-center text-sm flex-shrink-0">${comment.avatar}</div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <span class="font-medium">${comment.user}</span>
                        <span class="text-xs text-gray-500">${timeAgo}</span>
                    </div>
                    <p class="text-gray-300 text-sm mt-1">${comment.text}</p>
                    <div class="flex items-center space-x-4 mt-2">
                        <button class="like-comment text-xs text-gray-500 hover:text-blue-400" data-id="${comment.id}">
                            <i class="far fa-heart mr-1"></i>${comment.likes}
                        </button>
                        <button class="reply-comment text-xs text-gray-500 hover:text-blue-400">
                            <i class="far fa-comment mr-1"></i>Javob
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getTimeAgo(time) {
    const now = new Date();
    const past = new Date(time);
    const diff = Math.floor((now - past) / 1000);
    
    if (diff < 60) return 'hozir';
    if (diff < 3600) return Math.floor(diff / 60) + ' min oldin';
    if (diff < 86400) return Math.floor(diff / 3600) + ' soat oldin';
    return Math.floor(diff / 86400) + ' kun oldin';
}

document.getElementById('submit-comment')?.addEventListener('click', () => {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    
    if (!text) {
        showToast('❌ Izoh yozing!');
        return;
    }
    
    const newComment = {
        id: comments.length + 1,
        user: 'Foydalanuvchi',
        avatar: 'F',
        color: 'bg-green-600',
        text: text,
        time: new Date().toISOString(),
        likes: 0
    };
    
    comments.push(newComment);
    renderComments();
    input.value = '';
    showToast('✅ Izoh qoldirildi!');
});

// ==================== USER MENU ====================
document.getElementById('user-menu-btn')?.addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#user-menu-btn') && !e.target.closest('#user-dropdown')) {
        document.getElementById('user-dropdown')?.classList.add('hidden');
    }
});

// ==================== PROGRESS RESET ====================
document.getElementById('reset-progress')?.addEventListener('click', () => {
    if (confirm('Progressni tozalashni xohlaysizmi?')) {
        completedLessons = [];
        saveProgress();
        loadLesson(activeLessonId);
        showToast('🔄 Progress tozalandi');
    }
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading-overlay')?.classList.remove('hidden');
    
    setTimeout(() => {
        loadProgress();
        renderLessonsList();
        renderComments();
        loadLesson(1);
        
        document.getElementById('loading-overlay')?.classList.add('hidden');
    }, 1000);
    
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