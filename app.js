require('dotenv').config()

const fs = require('node:fs');
const path = require('node:path');


const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');


const commands = [new SlashCommandBuilder()
    .setName('kiwkiw')
    .setDescription('kurkur')
    , new SlashCommandBuilder()
        .setName('hormatcepat')
        .setDescription('shaaap🫡'),
new SlashCommandBuilder()
    .setName('hormat')
    .setDescription('shappPally')
    .addStringOption(option =>
        option.setName('nama')
            .setDescription('shappPally')
            .setRequired(true)), 
new SlashCommandBuilder ()
    .setName('avatar')
    .setDescription('menampilkan foto profil pengguna')
    .addUserOption(option => 
        option.setName('pengguna')
             .setDescription('pilih penguna Discord')
             .setRequired(false)
    ),

new SlashCommandBuilder()
    .setName('say')
    .setDescription('mengulang teks')
    .addStringOption(option =>
        option.setName('teks')
            .setDescription('teks yang ingin diulang')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('gaya')
            .setDescription('pilih gaya teks')
            .setRequired(true)
            .addChoices(
                { name: 'besar', value: 'besar' },
                { name: 'kecil', value: 'kecil' }
            )
    ),

new SlashCommandBuilder()
.setName('ping')
.setDescription('Cek respons PLG Bot'),

new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Menampilkan informasi pengguna')
    .addUserOption(option =>
        option.setName('pengguna')
            .setDescription('Pilih pengguna Discord')
            .setRequired(false)
    ),

new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Menampilkan informasi server'),

new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Menampilkan ikon server'),

new SlashCommandBuilder()
    .setName('plgsaldo')
    .setDescription('Cek saldo kamu (versi slash command)'),

new SlashCommandBuilder()
    .setName('plghelp')
    .setDescription('Daftar semua command PLG BOT'), 









];



// ============================================================
// EMOJI CUSTOM PLG — ganti nilai di bawah dengan ID hasil upload kamu
// Format: '<:nama:ID>' — dapatkan ID dengan mengetik \:nama: di chat Discord
// Selama belum diganti, tombol tetap jalan pakai emoji bawaan (biar tidak error)
// ============================================================
const EMOJI_KOTAK = '❓';    // ❓ tanda tanya bawaan (kuning-oranye di Discord)
// const EMOJI_KOTAK = '<:kotak_plg:1558664907606597733>';  // 🟧 kalau mau balik ke kotak custom kamu
const EMOJI_KOIN  = '<:koin_plg:1558664959653707856>';     // 🪙 kotak aman
const EMOJI_BOM   = '<:stiker_apalu:1558670976890179710>'; // 😎 ranjau → kepala kamu
const EMOJI_APALU = '<:stiker_apalu:1558670976890179710>'; // 😎 maskot PLG



// ===== TEKS PROVOKASI (biar pemain greget! 😈) =====
const teksDiamond = {
    1: [
        '🔥 Awal yang baik! Gas terus!',
        '😎 Satu Diamond aman! Jangan grogi!',
        '💎 Lumayan, keberuntungan mulai terlihat!'
    ],
    2: [
        '😏 Dua Diamond! Tanganmu mulai panas!',
        '🔥 Bagus! Tapi jangan terlalu percaya diri!',
        '💎 Dua aman! Ranjau mulai ketar-ketir!'
    ],
    3: [
        '😈 Insting PLG mulai aktif!',
        '🔥 Tiga Diamond! Berani lanjut?',
        '💰 Hadiahnya mulai menarik, nih!'
    ],
    4: [
        '👀 Empat aman! Lanjut atau Cash Out?',
        '😎 Kamu mulai jago juga!',
        '💎 Jangan sampai terlena!'
    ],
    5: [
        '🤑 Lima Diamond! Hadiahnya makin menarik!',
        '🔥 Makin jauh, makin menegangkan!',
        '😈 Ranjau belum berhasil menghentikanmu!'
    ],
    6: [
        '💎 ENAM AMAN! Fokus, jangan gegabah!',
        '🔥 Kamu sudah dekat dengan rekor!',
        '😏 Berani ambil risiko berikutnya?'
    ],
    7: [
        '😱 TUJUH DIAMOND! Tinggal satu lagi!',
        '🔥 Satu langkah lagi menuju kesempurnaan!',
        '💀 Jangan sampai pesta berakhir!'
    ],
    8: [
        '👑 SEMPURNA! SEMUA DIAMOND DITEMUKAN!',
        '🏆 DELAPAN AMAN! LEGENDA PLG!',
        '💎 PERFECT! PAPAN BERHASIL DITAKLUKKAN!'
    ]
};

const teksRanjau = {
    0: [
        '😂 Baru mulai sudah meledak! Coba lagi, deh!',
        '💣 Waduh! Belum sempat panas sudah tamat!',
        '😏 Coba lagi, masa langsung menyerah?'
    ],
    1: [
        '🤣 Baru dapat satu Diamond, malah meledak!',
        '💥 Yah, awal yang baik berubah jadi petaka!',
        '😈 Satu aman saja belum cukup, bro!'
    ],
    2: [
        '😭 Dua Diamond lalu tumbang! Sakitnya!',
        '💀 Tadi mulai jago, sekarang kena ranjau!',
        '😂 Coba lagi, keberuntungan belum habis!'
    ],
    3: [
        '💥 Tiga aman, tapi ranjau berkata tidak!',
        '😏 Hampir percaya diri, ya?',
        '😭 Lumayan jauh, berakhir juga!'
    ],
    4: [
        '💸 Empat Diamond hilang bersama harapan!',
        '💀 Sudah mulai panas, malah meledak!',
        '😂 Ranjau berhasil menjebakmu!'
    ],
    5: [
        '😭 Lima aman! Pasti bikin nyesek!',
        '💥 Hampir jadi sultan, malah tumbang!',
        '😈 Ranjau menang kali ini!'
    ],
    6: [
        '💀 ENAM AMAN, TAPI MASIH KENA!',
        '😭 Tinggal sedikit lagi, bro!',
        '💣 Keberanianmu diuji sampai akhir!'
    ],
    7: [
        '😭 TUJUH AMAN, SATU LANGKAH LAGI!',
        '💀 Hampir sempurna, tapi meledak!',
        '😱 Ini pasti susah dilupakan!'
    ]
};

// ===== SARAN TEKS CASH OUT (1 sampai 8 benar) =====
const teksCashout = {
    1: [
        '😏 Satu Diamond langsung Cash Out? Hati-hati banget!',
        '💰 Satu aman langsung cair! Setidaknya dapat jajan!',
        '🤑 Cash Out dini? Playernya terlalu hati-hati!'
    ],
    2: [
        '😎 Dua Diamond cair! Lumayan buat hari ini!',
        '💰 Cash Out dua aman! Keputusan tepat!',
        '😏 Dua aman langsung cair, tidak serakah!'
    ],
    3: [
        '🤑 Tiga Diamond cair! Gaji tambahan nih!',
        '😎 Cash Out tiga aman! Dingin kepala!',
        '💰 Tiga aman langsung cair! Bijak sekali!'
    ],
    4: [
        '😈 Empat Diamond cair! Modal sudah kembali!',
        '🤑 Empat aman cair! Profit kecil tapi pasti!',
        '😎 Empat cair! Tidak semua orang seberani ini!'
    ],
    5: [
        '🤑 Lima Diamond cair! Lumayan banget hasilnya!',
        '💰 Lima aman cair! Hoki atau jago?',
        '😏 Lima cair! Jangan serakah, kata pepatah!'
    ],
    6: [
        '😈 Enam Diamond cair! Hampir sempurna!',
        '🤑 Enam aman cair! Tinggal dua lagi tadi!',
        '😎 Enam cair! Player tahu kapan berhenti!'
    ],
    7: [
        '😱 Tujuh Diamond cair! Satu lagi sempurna!',
        '🤑 Tujuh aman cair! Nyaris jadi legenda!',
        '😏 Tujuh cair! Hampir, tapi cukup!'
    ],
    8: [
        '👑 DELAPAN DIAMOND CAIR! SEMPURNA!',
        '🏆 SEMUA DIAMOND DITAKLUKKAN! LEGENDA PLG!',
        '💎 PERFECT CASH OUT! INI BARU SULTAN!'
    ]
};

function ambilTeks(daftar, jumlah) {
    const pilihan = daftar[jumlah] || ['💥 Permainan berakhir! Coba lagi nanti!'];
    return pilihan[Math.floor(Math.random() * pilihan.length)];
}


function buatRanjau(jumlahRanjau) {
    const ranjau = new Set();

    while (ranjau.size < jumlahRanjau) {
        ranjau.add(Math.floor(Math.random() * 9));
    }

    return ranjau;
}


const daftarPengali = {
    1: [1.12, 1.25, 1.43, 1.67, 2.00, 2.50, 3.33, 5.00],
    2: [1.75, 2.00, 2.30, 2.70, 3.20, 3.80, 4.50],
    3: [2.00, 2.50, 3.10, 3.90, 5.00, 6.50],
    4: [2.40, 3.20, 4.30, 5.80, 8.00],
    5: [3.00, 4.20, 6.00, 8.50],
    6: [4.00, 6.00, 9.00],
    7: [5.50, 9.00],
    8: [8.00]
};    



const permainanMines = new Map();

const fileSaldo = path.join(__dirname, 'saldo.json');

function bacaSaldo() {
    try {
        return JSON.parse(
            fs.readFileSync(fileSaldo, 'utf8')
        );
    } catch (error) {
        console.log('💾 saldo.json belum ada — akan dibuat otomatis saat pertama kali menyimpan.');
        return {};
    }
}

function simpanSaldo(saldo) {
    fs.writeFileSync(
        fileSaldo,
        JSON.stringify(saldo, null, 4)
    );
}

const saldoPemain = bacaSaldo();

// ===== SISTEM LEVEL (XP dari chat, ala UwU) =====
const fileLevel = path.join(__dirname, 'level.json');

function bacaLevel() {
    try {
        return JSON.parse(
            fs.readFileSync(fileLevel, 'utf8')
        );
    } catch (error) {
        console.log('💾 level.json belum ada — akan dibuat otomatis saat pertama kali menyimpan.');
        return {};
    }
}

function simpanLevel(level) {
    fs.writeFileSync(
        fileLevel,
        JSON.stringify(level, null, 4)
    );
}

const dataLevel = bacaLevel();
const cooldownXP = new Map(); // userId → waktu terakhir dapat XP
const BONUS_LEVEL_UP = 200000; // 💰 hadiah koin saat naik level

// ===== OWNER & TOKO =====
const OWNER_ID = process.env.OWNER_ID; // id Discord kamu (owner) — isi di file .env

const daftarShop = [
    { id: 1, nama: '🍭 Permen PLG', harga: 50000, efek: 'xp2x', durasi: 60 * 60 * 1000 }, // ✨ pakai: XP 2x selama 1 jam
    { id: 2, nama: '🎩 Topi PLG', harga: 150000 },
    { id: 3, nama: '🐱 Maskot Apalu', harga: 300000 },
    { id: 4, nama: '👑 Mahkota Sultan', harga: 1000000 },
    { id: 5, nama: '💎 Diamond Permanen', harga: 2500000 }
];

// ===== FUNGSI BERSAMA (dipakai versi prefix & slash — biar tidak duplikat) =====
function buatEmbedSaldo(target) {
    if (!saldoPemain[target.id]) {
        saldoPemain[target.id] = { saldo: 500000, klaimTerakhir: 0 };
        simpanSaldo(saldoPemain);
    }

    const saldo = saldoPemain[target.id].saldo;
    const level = hitungLevel((dataLevel[target.id] || { xp: 0 }).xp).level;

    return new EmbedBuilder()
        .setColor(0xFFD700) // emas ala PLG
        .setTitle(`${EMOJI_KOIN} Saldo ${target.username}`)
        .setThumbnail(target.displayAvatarURL({ size: 256 }))
        .addFields(
            { name: '💰 Saldo', value: `${saldo.toLocaleString('id-ID')} koin`, inline: true },
            { name: '⭐ Level', value: `${level}`, inline: true }
        );
}

function buatEmbedHelp() {
    // data command disimpan dalam ARRAY
    const daftarCommand = [
        { kategori: '💰 Ekonomi', isi: '`plgsaldo` — cek saldo kamu/teman\n`plgdaily` — klaim 250.000 koin / 24 jam\n`plgsend @user <jumlah>` — kirim koin ke teman\n`plgwork` — kerja, dapat koin (cooldown 1 jam)\n`plgrob @user` — merampok teman! (cooldown 1 jam)\n`plgadd <jumlah> @user` — tambah saldo (khusus owner)' },
        { kategori: '🎮 Game', isi: '`plgmines <bet> <mines>` — main Mines\n`plgcoinflip <bet> <heads/tails>` — judi koin double or nothing' },
        { kategori: '📊 Statistik', isi: '`plgstats` — statistik mines kamu\n`plgtop` — top 10 saldo terkaya\n`plgtoplevel` — top 10 level tertinggi' },
        { kategori: '🛒 Toko', isi: '`plgshop` — lihat & beli item pakai koin\n`plgshop buy <nomor>` — beli item\n`plgshop use <nomor>` — pakai item (🍭 Permen = XP 2x 1 jam)' },
        { kategori: '⭐ Level & Profil', isi: '`plglevel` — kartu level + rank kamu\n`plgprofile` — kartu profil lengkap\n💡 Naik level dapat bonus 200.000 koin!' },
        { kategori: '🔧 Slash Command', isi: '`/plgsaldo` — cek saldo (versi slash)\n`/plghelp` — daftar command (versi slash)\n`/servericon` — icon server (sudah diperbaiki!)' }
    ];

    return new EmbedBuilder()
        .setColor(0xFFD700) // emas ala PLG
        .setTitle(`${EMOJI_APALU} PLG BOT — DAFTAR COMMAND`)
        .addFields(
            // .map() = ubah setiap item array menjadi satu field
            daftarCommand.map(cmd => ({
                name: cmd.kategori,
                value: cmd.isi,
                inline: false
            }))
        )
        .setFooter({ text: 'PLG BOT 😎' });
}

// Level 0→1 butuh 100 XP, 1→2 butuh 200 XP, 2→3 butuh 300 XP, dst.
function hitungLevel(totalXp) {
    let level = 0;
    let xpProgress = totalXp;

    while (xpProgress >= 100 * (level + 1)) {
        xpProgress -= 100 * (level + 1);
        level++;
    }

    return { level, xpProgress, xpNeeded: 100 * (level + 1) };
}

function tambahXP(idUser, jumlah) {
    if (!dataLevel[idUser]) dataLevel[idUser] = { xp: 0 };

    const levelLama = hitungLevel(dataLevel[idUser].xp).level;
    dataLevel[idUser].xp += jumlah;
    simpanLevel(dataLevel);

    const levelBaru = hitungLevel(dataLevel[idUser].xp).level;
    return { levelLama, levelBaru };
}





const rest = new REST({ version: '10' });
rest.setToken(process.env.TOKEN);
rest.put(Routes.applicationCommands('1557315967737004063'),
    { body: commands.map(command => command.toJSON()) })
    .then(() => console.log('COMMAND BERHASIL TERDAFTAR!'));



console.log('PLG BOT berhasil di buat!');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.once('clientReady', () => {
    console.log('PLG BOT ONLINE!');
});


bot.on('messageCreate', async message => {
    if (message.author.bot) return;

    const teksPesan = message.content.toLowerCase().trim();

    // ===== XP DARI CHAT (cooldown 60 detik, ala UwU) =====
    const sekarang = Date.now();
    const terakhirXP = cooldownXP.get(message.author.id) || 0;

    if (sekarang - terakhirXP >= 60000) {
        cooldownXP.set(message.author.id, sekarang);

        // setiap chat = 5 sampai 15 XP (acak), 2x kalau lagi pakai boost 🍭 Permen PLG
        let xpDidapat = 5 + Math.floor(Math.random() * 11);

        const dataPemain = saldoPemain[message.author.id];
        if (dataPemain && dataPemain.boostXP && dataPemain.boostXP > Date.now()) {
            xpDidapat *= 2;
        }

        const { levelLama, levelBaru } = tambahXP(
            message.author.id,
            xpDidapat
        );

        if (levelBaru > levelLama) {
            // pastikan punya data saldo
            if (!saldoPemain[message.author.id]) {
                saldoPemain[message.author.id] = { saldo: 500000, klaimTerakhir: 0 };
            }

            // hadiah naik level! 💰
            saldoPemain[message.author.id].saldo += BONUS_LEVEL_UP;
            simpanSaldo(saldoPemain);

            await message.reply({
                content:
                    `🎉 Selamat! Kamu naik ke **LEVEL ${levelBaru}**!\n` +
                    `💰 Bonus: **${BONUS_LEVEL_UP.toLocaleString('id-ID')} koin** masuk ke saldo!\n` +
                    `🏦 Saldo sekarang: **${saldoPemain[message.author.id].saldo.toLocaleString('id-ID')} koin**`,
                allowedMentions: { repliedUser: false }
            });
        }
    }

    // PLG DAILY
    if (teksPesan === 'plgdaily') {
        const idPemain = message.author.id;
        const waktuSekarang = Date.now();
        const hadiahHarian = 250000;
        const saldoAwal = 500000;
        const jedaHarian = 24 * 60 * 60 * 1000;

        if (!saldoPemain[idPemain]) {
            saldoPemain[idPemain] = {
                saldo: saldoAwal,
                klaimTerakhir: 0
            };
        }

        const pemain = saldoPemain[idPemain];

        if ( pemain.klaimTerakhir !== 0 &&
            waktuSekarang - pemain.klaimTerakhir < jedaHarian
        ) {
            const sisaWaktu =
                jedaHarian - (waktuSekarang - pemain.klaimTerakhir);
            const totalMenit = Math.ceil(sisaWaktu / 60000);
            const jam = Math.floor(totalMenit / 60);
            const menit = totalMenit % 60;

            await message.reply(
                `⏳ Kamu sudah klaim hadiah harian!\n` +
                `Coba lagi dalam **${jam} jam ${menit} menit**.\n` +
                `💰 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
            );
            return;
        }

        pemain.saldo += hadiahHarian;
        pemain.klaimTerakhir = waktuSekarang;
        simpanSaldo(saldoPemain);

        await message.reply(
            `🎁 **PLG DAILY BERHASIL!**\n` +
            `💰 Hadiah: **${hadiahHarian.toLocaleString('id-ID')} koin**\n` +
            `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
        );
        return;
    }

    // PLG WORK (kerja dapat koin, cooldown 1 jam)
    if (teksPesan === 'plgwork') {
        const idPemain = message.author.id;
        const waktuSekarang = Date.now();
        const jedaKerja = 60 * 60 * 1000; // 1 jam

        if (!saldoPemain[idPemain]) {
            saldoPemain[idPemain] = { saldo: 500000, klaimTerakhir: 0, kerjaTerakhir: 0 };
        }

        const pemain = saldoPemain[idPemain];
        pemain.kerjaTerakhir = pemain.kerjaTerakhir || 0;

        if (waktuSekarang - pemain.kerjaTerakhir < jedaKerja) {
            const sisaMenit = Math.ceil(
                (jedaKerja - (waktuSekarang - pemain.kerjaTerakhir)) / 60000
            );

            await message.reply(
                `⏳ Kamu sudah kerja! Istirahat dulu...\n` +
                `Coba lagi dalam **${sisaMenit} menit**.\n` +
                `💰 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
            );
            return;
        }

        // daftar pekerjaan (dipilih acak)
        const daftarKerja = [
            '🍜 jaga warung',
            '📦 kerja jadi kurir',
            '🎮 ngeboost akun game',
            '🧹 bersih-bersih rumah',
            '🍔 kerja di fast food',
            '💻 jadi programmer',
            '🎨 gambar untuk klien',
            '🛒 jualan online'
        ];
        const kerja = daftarKerja[Math.floor(Math.random() * daftarKerja.length)];

        // gaji 1.000 sampai 5.000 koin (acak)
        const gaji = 1000 + Math.floor(Math.random() * 4001);

        pemain.saldo += gaji;
        pemain.kerjaTerakhir = waktuSekarang;
        simpanSaldo(saldoPemain);

        await message.reply(
            `💼 **Kamu kerja: ${kerja}!**\n` +
            `💰 Gaji: **${gaji.toLocaleString('id-ID')} koin**\n` +
            `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
        );
        return;
    }

    const bagian = message.content.trim().split(/\s+/);

    // PLG SALDO (cek saldo sendiri/teman)
    if (bagian[0].toLowerCase() === 'plgsaldo') {
        let target = message.author;

        // cek saldo teman: plgsaldo @user
        if (message.guild && bagian[1]) {
            const mention = bagian[1].match(/^<@!?(\d+)>$/);
            if (mention) {
                const member = await message.guild.members.fetch(mention[1]).catch(() => null);
                if (member) target = member.user;
            }
        }

        await message.reply({ embeds: [buatEmbedSaldo(target)] });
        return;
    }

    // PLG HELP (daftar semua command)
    if (bagian[0].toLowerCase() === 'plghelp') {
        await message.reply({ embeds: [buatEmbedHelp()] });
        return;
    }

    // PLG LEVEL
    if (bagian[0].toLowerCase() === 'plglevel') {
        let target = message.author;

        // cek apakah ada mention: plglevel @user
        if (message.guild && bagian[1]) {
            const mention = bagian[1].match(/^<@!?(\d+)>$/);
            if (mention) {
                const member = await message.guild.members.fetch(mention[1]).catch(() => null);
                if (member) target = member.user;
            }
        }

        const totalXp = (dataLevel[target.id] || { xp: 0 }).xp;
        const { level, xpProgress, xpNeeded } = hitungLevel(totalXp);
        const xpLeft = xpNeeded - xpProgress;
        const persen = Math.floor((xpProgress / xpNeeded) * 100);

        // RANK = urutan dari XP terbesar
        const ranking = Object.entries(dataLevel).sort((a, b) => b[1].xp - a[1].xp);
        const rank = ranking.findIndex(([id]) => id === target.id) + 1;

        // progress bar 10 kotak
        const isi = Math.round((xpProgress / xpNeeded) * 10);
        const bar = '🟪'.repeat(isi) + '⬛'.repeat(10 - isi);

        const embed = new EmbedBuilder()
            .setColor(0xFF66CC) // pink ala UwU
            .setTitle(`${EMOJI_APALU} ${target.username}`)
            .setThumbnail(target.displayAvatarURL({ size: 256 }))
            .setDescription(
                `🏅 **RANK ${rank > 0 ? '#' + rank : '-'}]**   ⭐ **LEVEL ${level}**\n\n` +
                `**XP PROGRESS**\n` +
                `${bar}  **${xpProgress} / ${xpNeeded}**`
            )
            .addFields(
                { name: 'PROGRESS', value: `${persen}%`, inline: true },
                { name: 'XP LEFT', value: `${xpLeft}`, inline: true },
                { name: 'TOTAL XP', value: `${totalXp}`, inline: true }
            );

        await message.reply({ embeds: [embed] });
        return;
    }

    // PLG SEND (kirim koin ke teman)
    if (bagian[0].toLowerCase() === 'plgsend') {
        const pengirim = message.author;

        // terima dua urutan: plgsend @user 50000 ATAU plgsend 50000 @user (ala UwU)
        let mention = null;
        let jumlah = NaN;

        for (const arg of bagian.slice(1, 3)) {
            const cocokMention = arg.match(/^<@!?(\d+)>$/);
            if (cocokMention) {
                mention = cocokMention;
            } else {
                jumlah = Number(arg);
            }
        }

        if (!mention) {
            await message.reply(
                'Gunakan format: `plgsend @user <jumlah>` atau `plgsend <jumlah> @user`\n' +
                'Contoh: `plgsend @Budi 50000`'
            );
            return;
        }

        if (!Number.isSafeInteger(jumlah) || jumlah < 1) {
            await message.reply('❌ Jumlah harus angka bulat minimal 1.');
            return;
        }

        if (!message.guild) {
            await message.reply('❌ Command ini hanya bisa dipakai di server!');
            return;
        }

        const member = await message.guild.members.fetch(mention[1]).catch(() => null);
        if (!member) {
            await message.reply('❌ User tidak ditemukan!');
            return;
        }

        const penerima = member.user;

        if (penerima.id === pengirim.id) {
            await message.reply('❌ Tidak bisa kirim ke diri sendiri!');
            return;
        }

        if (penerima.bot) {
            await message.reply('❌ Tidak bisa kirim ke bot!');
            return;
        }

        // pastikan dua-duanya punya data saldo
        if (!saldoPemain[pengirim.id]) {
            saldoPemain[pengirim.id] = { saldo: 500000, klaimTerakhir: 0 };
        }
        if (!saldoPemain[penerima.id]) {
            saldoPemain[penerima.id] = { saldo: 500000, klaimTerakhir: 0 };
        }

        const saldoPengirim = saldoPemain[pengirim.id];

        if (jumlah > saldoPengirim.saldo) {
            await message.reply(
                `❌ Saldo tidak cukup! Saldo kamu: **${saldoPengirim.saldo.toLocaleString('id-ID')} koin**`
            );
            return;
        }

        // ===== KONFIRMASI DENGAN TOMBOL (ala UwU) =====
        const saldoSetelah = saldoPengirim.saldo - jumlah;

        const embedKonfirmasi = new EmbedBuilder()
            .setColor(0xFF66CC) // pink ala UwU
            .setTitle('💵 Konfirmasi Transfer')
            .setDescription(
                `Apakah kamu yakin ingin mengirim ${EMOJI_KOIN} **${jumlah.toLocaleString('id-ID')}** ke ${penerima}?\n\n` +
                `**From:** ${pengirim}\n` +
                `**To:** ${penerima}\n` +
                `**Amount:** ${jumlah.toLocaleString('id-ID')} ${EMOJI_KOIN}\n` +
                `**Your balance after:** ${saldoSetelah.toLocaleString('id-ID')} ${EMOJI_KOIN}`
            )
            .setFooter({ text: '⚠️ Dibatalkan otomatis dalam 30 detik' });

        const barisTombol = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`plgsend_yes_${pengirim.id}`)
                .setEmoji('✅')
                .setLabel('Konfirmasi')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`plgsend_no_${pengirim.id}`)
                .setEmoji('❌')
                .setLabel('Batal')
                .setStyle(ButtonStyle.Danger)
        );

        const pesan = await message.reply({
            embeds: [embedKonfirmasi],
            components: [barisTombol]
        });

        // tunggu tombol dipencet, maksimal 30 detik
        const klik = await pesan.awaitMessageComponent({
            filter: (i) => i.user.id === pengirim.id,
            time: 30000
        }).catch(() => null);

        // waktu habis → footer berubah + tombol dimatikan
        if (!klik) {
            embedKonfirmasi.setFooter({ text: '⏰ Waktu habis — transfer dibatalkan' });
            await pesan.edit({
                embeds: [embedKonfirmasi],
                components: [
                    new ActionRowBuilder().addComponents(
                        barisTombol.components.map(tombol =>
                            ButtonBuilder.from(tombol).setDisabled(true)
                        )
                    )
                ]
            }).catch(() => {});
            return;
        }

        // tombol BATAL
        if (klik.customId.startsWith('plgsend_no_')) {
            await klik.update({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x808080)
                        .setTitle('❌ Transfer Dibatalkan')
                        .setDescription('Tidak ada koin yang terkirim.')
                ],
                components: []
            });
            return;
        }

        // tombol KONFIRMASI → cek ulang saldo (bisa berubah selama 30 detik!)
        if (saldoPemain[pengirim.id].saldo < jumlah) {
            await klik.update({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('❌ Saldo Tidak Cukup')
                        .setDescription('Saldo kamu berubah saat menunggu. Transfer dibatalkan.')
                ],
                components: []
            });
            return;
        }

        // transfer!
        saldoPemain[pengirim.id].saldo -= jumlah;
        saldoPemain[penerima.id].saldo += jumlah;
        simpanSaldo(saldoPemain);

        await klik.update({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x2ECC71)
                    .setTitle(`${EMOJI_KOIN} Transfer Berhasil!`)
                    .setDescription(
                        `📤 Dikirim: **${jumlah.toLocaleString('id-ID')} koin** ke ${penerima}\n` +
                        `📥 Saldo ${penerima.username}: **${saldoPemain[penerima.id].saldo.toLocaleString('id-ID')} koin**\n` +
                        `🏦 Saldo kamu sekarang: **${saldoPemain[pengirim.id].saldo.toLocaleString('id-ID')} koin**`
                    )
            ],
            components: []
        });
        return;
    }

    // PLG COINFLIP (judi koin: heads/tails, double or nothing)
    if (bagian[0].toLowerCase() === 'plgcoinflip') {
        if (bagian.length !== 3) {
            await message.reply(
                'Gunakan format: `plgcoinflip <bet> <heads/tails>`\n' +
                'Contoh: `plgcoinflip 10000 heads`'
            );
            return;
        }

        const taruhan = Number(bagian[1]);
        if (!Number.isSafeInteger(taruhan) || taruhan < 1) {
            await message.reply('❌ Taruhan harus angka bulat minimal 1.');
            return;
        }

        const sisi = bagian[2].toLowerCase();
        const pilihanValid = ['heads', 'kepala', 'h', 'tails', 'ekor', 't'];
        if (!pilihanValid.includes(sisi)) {
            await message.reply('❌ Pilih `heads` (kepala) atau `tails` (ekor)!');
            return;
        }

        const idPemain = message.author.id;

        if (!saldoPemain[idPemain]) {
            saldoPemain[idPemain] = { saldo: 500000, klaimTerakhir: 0 };
        }

        const pemain = saldoPemain[idPemain];

        if (taruhan > pemain.saldo) {
            await message.reply(
                `❌ Saldo tidak cukup! Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
            );
            return;
        }

        // koin dilempar! 🪙
        const hasil = Math.random() < 0.5 ? 'heads' : 'tails';
        const pilihHeads = ['heads', 'kepala', 'h'].includes(sisi);
        const menang =
            (pilihHeads && hasil === 'heads') ||
            (!pilihHeads && hasil === 'tails');

        if (menang) {
            pemain.saldo += taruhan; // menang: untung sebesar taruhan
            simpanSaldo(saldoPemain);

            const embed = new EmbedBuilder()
                .setColor(0x2ECC71) // 🟢 menang
                .setTitle('🪙 COIN FLIP — MENANG!')
                .setDescription(
                    `Koinnya: **${hasil.toUpperCase()}** 🪙\n` +
                    `🎉 Kamu menang **+${taruhan.toLocaleString('id-ID')} koin**!\n` +
                    `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
                );

            await message.reply({ embeds: [embed] });
        } else {
            pemain.saldo -= taruhan; // kalah: taruhan hangus
            simpanSaldo(saldoPemain);

            const embed = new EmbedBuilder()
                .setColor(0xFF0000) // 🔴 kalah
                .setTitle('🪙 COIN FLIP — KALAH!')
                .setDescription(
                    `Koinnya: **${hasil.toUpperCase()}** 🪙\n` +
                    `😭 Kamu kalah **-${taruhan.toLocaleString('id-ID')} koin**!\n` +
                    `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
                );

            await message.reply({ embeds: [embed] });
        }
        return;
    }

    // PLG STATS (statistik mines)
    if (bagian[0].toLowerCase() === 'plgstats') {
        const data = saldoPemain[message.author.id];
        const mines = (data && data.mines) || { main: 0, menang: 0, kalah: 0, terbesar: 0 };
        const winrate = mines.main > 0
            ? Math.floor((mines.menang / mines.main) * 100)
            : 0;

        const embed = new EmbedBuilder()
            .setColor(0xFFD700) // emas ala PLG
            .setTitle(`${EMOJI_APALU} Statistik Mines — ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL({ size: 256 }))
            .addFields(
                { name: '🎮 Total Main', value: `${mines.main}x`, inline: true },
                { name: '🟢 Menang', value: `${mines.menang}x`, inline: true },
                { name: '🔴 Kalah', value: `${mines.kalah}x`, inline: true },
                { name: '📊 Winrate', value: `${winrate}%`, inline: true },
                { name: '🏆 Koin Terbesar', value: `${mines.terbesar.toLocaleString('id-ID')} koin`, inline: true }
            );

        await message.reply({ embeds: [embed] });
        return;
    }

    // PLG SHOP (toko item pakai koin)
    if (bagian[0].toLowerCase() === 'plgshop') {
        const idPemain = message.author.id;

        if (!saldoPemain[idPemain]) {
            saldoPemain[idPemain] = { saldo: 500000, klaimTerakhir: 0 };
        }

        const pemain = saldoPemain[idPemain];

        // BELI: plgshop buy <nomor item>
        if (bagian[1] && bagian[1].toLowerCase() === 'buy') {
            const item = daftarShop.find(i => i.id === Number(bagian[2]));

            if (!item) {
                await message.reply(
                    '❌ Item tidak ditemukan! Ketik `plgshop` untuk lihat daftar item.'
                );
                return;
            }

            if (pemain.saldo < item.harga) {
                await message.reply(
                    `❌ Saldo tidak cukup! ${item.nama} harga **${item.harga.toLocaleString('id-ID')} koin**, saldo kamu **${pemain.saldo.toLocaleString('id-ID')} koin**.`
                );
                return;
            }

            pemain.saldo -= item.harga;
            pemain.item = pemain.item || [];
            pemain.item.push(item.nama);
            simpanSaldo(saldoPemain);

            await message.reply(
                `🛒 **Pembelian Berhasil!**\n` +
                `📦 Item: ${item.nama}\n` +
                `💸 Harga: **${item.harga.toLocaleString('id-ID')} koin**\n` +
                `🏦 Saldo tersisa: **${pemain.saldo.toLocaleString('id-ID')} koin**\n` +
                `🎒 Item kamu: ${pemain.item.join(', ')}`
            );
            return;
        }

        // PAKAI: plgshop use <nomor item>
        if (bagian[1] && bagian[1].toLowerCase() === 'use') {
            const item = daftarShop.find(i => i.id === Number(bagian[2]));

            if (!item || !item.efek) {
                await message.reply('❌ Item tidak ditemukan atau tidak punya efek! (hanya 🍭 Permen PLG yang bisa dipakai)');
                return;
            }

            pemain.item = pemain.item || [];
            const index = pemain.item.indexOf(item.nama);

            if (index === -1) {
                await message.reply(`❌ Kamu belum punya ${item.nama}! Beli dulu: \`plgshop buy ${item.id}\``);
                return;
            }

            // pakai item! ✨
            pemain.item.splice(index, 1);
            pemain.boostXP = Date.now() + item.durasi;
            simpanSaldo(saldoPemain);

            await message.reply(
                `✨ **${item.nama} dipakai!**\n` +
                `⚡ Efek: dapat **XP 2x** selama **1 jam**!\n` +
                `🎒 Sisa item: ${pemain.item.length > 0 ? pemain.item.join(', ') : 'habis'}`
            );
            return;
        }

        // tampilkan daftar toko
        const embed = new EmbedBuilder()
            .setColor(0xFFD700) // emas ala PLG
            .setTitle('🛒 PLG SHOP')
            .setDescription(
                daftarShop
                    .map(i => `**${i.id}.** ${i.nama} — 💰 ${i.harga.toLocaleString('id-ID')} koin${i.efek ? ' — ✨ bisa dipakai (XP 2x 1 jam)' : ''}`)
                    .join('\n') +
                `\n\nCara beli: \`plgshop buy <nomor>\` · Cara pakai: \`plgshop use <nomor>\``
            )
            .addFields(
                { name: '💰 Saldo kamu', value: `${pemain.saldo.toLocaleString('id-ID')} koin`, inline: true },
                { name: '🎒 Item kamu', value: (pemain.item && pemain.item.length > 0) ? pemain.item.join(', ') : 'Belum ada', inline: true }
            );

        await message.reply({ embeds: [embed] });
        return;
    }

    // PLG TOP LEVEL (leaderboard level tertinggi)
    if (bagian[0].toLowerCase() === 'plgtoplevel') {
        const ranking = Object.entries(dataLevel)
            .sort((a, b) => b[1].xp - a[1].xp)
            .slice(0, 10); // top 10 saja

        if (ranking.length === 0) {
            await message.reply('Belum ada yang punya XP. Ayo chat biar dapat XP! 💬');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFF66CC) // pink ala UwU
            .setTitle('🏆 TOP 10 LEVEL PLG')
            .setDescription(
                ranking.map(([id, data], index) => {
                    const level = hitungLevel(data.xp).level;
                    return `**${index + 1}.** <@${id}> — ⭐ Level **${level}** (${data.xp} XP)`;
                }).join('\n')
            );

        await message.reply({ embeds: [embed] });
        return;
    }

    // PLG ADD (tambah saldo — KHUSUS OWNER BOT)
    if (bagian[0].toLowerCase() === 'plgadd') {
        if (message.author.id !== OWNER_ID) {
            await message.reply('❌ Command ini khusus owner bot!');
            return;
        }

        // cari mention dan jumlah (urutan fleksibel, seperti plgsend)
        let mention = null;
        let jumlah = NaN;

        for (const arg of bagian.slice(1, 3)) {
            const cocokMention = arg.match(/^<@!?(\d+)>$/);
            if (cocokMention) {
                mention = cocokMention;
            } else {
                jumlah = Number(arg);
            }
        }

        if (!mention || !Number.isSafeInteger(jumlah) || jumlah < 1) {
            await message.reply(
                'Gunakan format: `plgadd <jumlah> @user`\n' +
                'Contoh: `plgadd 100000 @Budi`'
            );
            return;
        }

        if (!message.guild) {
            await message.reply('❌ Command ini hanya bisa dipakai di server!');
            return;
        }

        const member = await message.guild.members.fetch(mention[1]).catch(() => null);
        if (!member) {
            await message.reply('❌ User tidak ditemukan!');
            return;
        }

        if (!saldoPemain[member.user.id]) {
            saldoPemain[member.user.id] = { saldo: 500000, klaimTerakhir: 0 };
        }

        saldoPemain[member.user.id].saldo += jumlah;
        simpanSaldo(saldoPemain);

        await message.reply(
            `✅ **Saldo ditambahkan!**\n` +
            `👤 User: ${member.user}\n` +
            `💰 Jumlah: **+${jumlah.toLocaleString('id-ID')} koin**\n` +
            `🏦 Saldo ${member.user.username}: **${saldoPemain[member.user.id].saldo.toLocaleString('id-ID')} koin**`
        );
        return;
    }

    // PLG TOP (leaderboard saldo terkaya)
    if (bagian[0].toLowerCase() === 'plgtop') {
        const ranking = Object.entries(saldoPemain)
            .sort((a, b) => b[1].saldo - a[1].saldo)
            .slice(0, 10); // top 10 saja

        if (ranking.length === 0) {
            await message.reply('Belum ada data saldo. Ayo mulai main! 🎮');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFFD700) // emas ala PLG
            .setTitle('💰 TOP 10 SALDO PLG')
            .setDescription(
                ranking.map(([id, data], index) =>
                    `**${index + 1}.** <@${id}> — 💰 **${data.saldo.toLocaleString('id-ID')} koin**`
                ).join('\n')
            );

        await message.reply({ embeds: [embed] });
        return;
    }

    // PLG ROB (merampok teman, 50% berhasil, cooldown 1 jam)
    if (bagian[0].toLowerCase() === 'plgrob') {
        const idPemain = message.author.id;

        // target: plgrob @user
        const mention = bagian[1] ? bagian[1].match(/^<@!?(\d+)>$/) : null;

        if (!message.guild || !mention) {
            await message.reply(
                'Gunakan format: `plgrob @user`\n' +
                'Contoh: `plgrob @Budi`'
            );
            return;
        }

        const member = await message.guild.members.fetch(mention[1]).catch(() => null);
        if (!member) {
            await message.reply('❌ User tidak ditemukan!');
            return;
        }

        const target = member.user;

        if (target.id === idPemain) {
            await message.reply('❌ Tidak bisa merampok diri sendiri!');
            return;
        }

        if (target.bot) {
            await message.reply('❌ Tidak bisa merampok bot!');
            return;
        }

        if (!saldoPemain[idPemain]) {
            saldoPemain[idPemain] = { saldo: 500000, klaimTerakhir: 0, robTerakhir: 0 };
        }
        if (!saldoPemain[target.id]) {
            saldoPemain[target.id] = { saldo: 500000, klaimTerakhir: 0 };
        }

        const pemain = saldoPemain[idPemain];
        const korban = saldoPemain[target.id];
        pemain.robTerakhir = pemain.robTerakhir || 0;

        // cooldown 1 jam
        const jedaRob = 60 * 60 * 1000;
        const waktuSekarang = Date.now();

        if (waktuSekarang - pemain.robTerakhir < jedaRob) {
            const sisaMenit = Math.ceil((jedaRob - (waktuSekarang - pemain.robTerakhir)) / 60000);
            await message.reply(`⏳ Kamu baru saja merampok! Coba lagi dalam **${sisaMenit} menit**.`);
            return;
        }

        if (korban.saldo < 1000) {
            await message.reply(`😴 ${target.username} terlalu miskin untuk dirampok! (saldo < 1.000 koin)`);
            return;
        }

        pemain.robTerakhir = waktuSekarang;

        // 50% berhasil merampok!
        const berhasil = Math.random() < 0.5;
        const curian = Math.max(1000, Math.floor(korban.saldo * 0.1)); // 10% saldo target
        const denda = 1000;

        if (berhasil) {
            korban.saldo -= curian;
            pemain.saldo += curian;
            simpanSaldo(saldoPemain);

            const embed = new EmbedBuilder()
                .setColor(0x2ECC71) // 🟢 berhasil
                .setTitle('😈 ROB BERHASIL!')
                .setDescription(
                    `Kamu berhasil merampok ${target}!\n` +
                    `💰 Curian: **${curian.toLocaleString('id-ID')} koin** (10% saldo dia)\n` +
                    `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
                );

            await message.reply({ embeds: [embed] });
        } else {
            const bayarDenda = Math.min(denda, pemain.saldo);
            pemain.saldo -= bayarDenda;
            simpanSaldo(saldoPemain);

            const embed = new EmbedBuilder()
                .setColor(0xFF0000) // 🔴 tertangkap
                .setTitle('🚔 KAMU TERTANGKAP!')
                .setDescription(
                    `Kamu ketahuan saat merampok ${target}! 😅\n` +
                    `💸 Denda: **${bayarDenda.toLocaleString('id-ID')} koin**\n` +
                    `🏦 Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
                );

            await message.reply({ embeds: [embed] });
        }
        return;
    }

    // PLG PROFILE (kartu profil lengkap: saldo + level + stats + item)
    if (bagian[0].toLowerCase() === 'plgprofile') {
        let target = message.author;

        // lihat profil teman: plgprofile @user
        if (message.guild && bagian[1]) {
            const mention = bagian[1].match(/^<@!?(\d+)>$/);
            if (mention) {
                const member = await message.guild.members.fetch(mention[1]).catch(() => null);
                if (member) target = member.user;
            }
        }

        const dataSaldo = saldoPemain[target.id] || { saldo: 0 };
        const saldo = dataSaldo.saldo || 0;
        const mines = dataSaldo.mines || { main: 0, menang: 0, kalah: 0, terbesar: 0 };
        const xp = (dataLevel[target.id] || { xp: 0 }).xp;
        const { level } = hitungLevel(xp);

        // rank saldo & rank level
        const rankSaldo = Object.entries(saldoPemain)
            .sort((a, b) => b[1].saldo - a[1].saldo)
            .findIndex(([id]) => id === target.id) + 1;
        const rankLevel = Object.entries(dataLevel)
            .sort((a, b) => b[1].xp - a[1].xp)
            .findIndex(([id]) => id === target.id) + 1;

        const items = (dataSaldo.item && dataSaldo.item.length > 0)
            ? dataSaldo.item.join(', ')
            : 'Belum ada';

        const embed = new EmbedBuilder()
            .setColor(0xFFD700) // emas ala PLG
            .setTitle(`${EMOJI_APALU} ${target.username}`)
            .setThumbnail(target.displayAvatarURL({ size: 256 }))
            .addFields(
                { name: '💰 Saldo', value: `${saldo.toLocaleString('id-ID')} koin`, inline: true },
                { name: '⭐ Level', value: `**${level}** (${xp} XP)`, inline: true },
                { name: '🏅 Rank', value: `#${rankSaldo > 0 ? rankSaldo : '-'} saldo · #${rankLevel > 0 ? rankLevel : '-'} level`, inline: false },
                { name: '🎮 Mines', value: `${mines.main}x main · 🟢 ${mines.menang} · 🔴 ${mines.kalah}`, inline: true },
                { name: '🏆 Koin Terbesar', value: `${mines.terbesar.toLocaleString('id-ID')} koin`, inline: true },
                { name: '🎒 Item', value: items, inline: false }
            )
            .setFooter({ text: 'PLG BOT 😎' });

        await message.reply({ embeds: [embed] });
        return;
    }

    if (bagian[0].toLowerCase() !== 'plgmines') return;

    if (bagian.length !== 3) {
        await message.reply(
            'Gunakan format: `plgmines <taruhan> <jumlah ranjau>`\n' +
            'Contoh: `plgmines 50000 2`'
        );
        return;
    }

  const taruhan = Number(bagian[1]);
    const jumlahRanjau = Number(bagian[2]);
    const idPemain = message.author.id;

    if (!Number.isSafeInteger(taruhan) || taruhan < 1) {
        await message.reply('❌ Taruhan harus angka bulat minimal 1.');
        return;
    }

    if (!Number.isInteger(jumlahRanjau) ||
        jumlahRanjau < 1 || jumlahRanjau > 8) {
        await message.reply('❌ Jumlah ranjau harus antara 1 sampai 8.');
        return;
    }

    if (!saldoPemain[idPemain]) {
        saldoPemain[idPemain] = {
            saldo: 500000,
            klaimTerakhir: 0
        };
    }

    const pemain = saldoPemain[idPemain];

    if (taruhan > pemain.saldo) {
        await message.reply(
            `❌ Saldo tidak cukup! Saldo kamu: **${pemain.saldo.toLocaleString('id-ID')} koin**`
        );
        return;
    }

    pemain.saldo -= taruhan;

    // catat statistik: mulai main
    pemain.mines = pemain.mines || { main: 0, menang: 0, kalah: 0, terbesar: 0 };
    pemain.mines.main++;

    simpanSaldo(saldoPemain);

    const ranjau = buatRanjau(jumlahRanjau);
    const baris = [];

    for (let i = 0; i < 3; i++) {
        const tombol = [];

        for (let j = 0; j < 3; j++) {
            const nomor = i * 3 + j;

            tombol.push(
                new ButtonBuilder()
                    .setCustomId(`mines_${nomor}`)
                    .setEmoji(EMOJI_KOTAK)
                    .setStyle(ButtonStyle.Secondary)
            );
        }

        baris.push(new ActionRowBuilder().addComponents(tombol));
    }

    baris.push(
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('mines_cashout')
                .setEmoji(EMOJI_KOIN)
                .setLabel('Cash Out')
                .setStyle(ButtonStyle.Success)
        )
    );

    const pengaliAwal = daftarPengali[jumlahRanjau][0];
    const nextAwal = Math.floor(taruhan * pengaliAwal);

    const embed = new EmbedBuilder()
        .setColor(0x3498DB) // 🔵 biru saat bermain
        .setTitle(`${EMOJI_APALU} PLG MINES`)
        .setDescription(
            `💰 Saldo tersisa: **${pemain.saldo.toLocaleString('en-US')}**\n` +
            `Pilih kotak!`
        )
        .addFields(
            { name: 'Bet:', value: `${taruhan.toLocaleString('en-US')}`, inline: true },
            { name: 'Mines:', value: `${jumlahRanjau}`, inline: true },
            { name: 'Cash Out:', value: `0 (0.00x)`, inline: true },
            { name: 'Next:', value: `${nextAwal.toLocaleString('en-US')} (${pengaliAwal.toFixed(2)}x)`, inline: true }
        );

    const pesan = await message.reply({
        embeds: [embed],
        components: baris
    });

    permainanMines.set(pesan.id, {
        pemain: idPemain,
        ranjau,
        jumlahRanjau,
        dibuka: new Set(),
        taruhan
    });

    // bersihkan otomatis kalau game tidak dilanjutkan selama 10 menit
    setTimeout(() => {
        if (permainanMines.delete(pesan.id)) {
            pesan.edit({
                components: pesan.components.map(row =>
                    new ActionRowBuilder().addComponents(
                        row.components.map(tombol =>
                            ButtonBuilder.from(tombol).setDisabled(true)
                        )
                    )
                )
            }).catch(() => {});
        }
    }, 10 * 60 * 1000); // 10 menit   
    
});



bot.on('interactionCreate', async interaction => {
    

if (interaction.isButton()) {
    // tombol PLG SEND (konfirmasi transfer)
    if (interaction.customId.startsWith('plgsend_')) {
        const idPengirim = interaction.customId.split('_')[2];

        // yang klik bukan pengirim → kasih tau saja (yang urus tetap si pengirim)
        if (interaction.user.id !== idPengirim) {
            await interaction.reply({
                content: '❌ Ini bukan konfirmasi transfer kamu!',
                ephemeral: true
            }).catch(() => {});
        }
        return;
    }

    if (
        !interaction.customId.startsWith('mines_') &&
        interaction.customId !== 'mines_cashout'
    ) return;

    const idPesan = interaction.message.id;
    const game = permainanMines.get(idPesan);


    if (interaction.customId === 'mines_cashout') {
        if (!game) {
            await interaction.reply({
                content: 'Permainan sudah berakhir.',
                ephemeral: true
            });
            return;
        }

        if (interaction.user.id !== game.pemain) {
            await interaction.reply({
                content: 'Permainan ini bukan milikmu!',
                ephemeral: true
            });
            return;
        }

        if (game.dibuka.size === 0) {
            await interaction.reply({
                content: 'Buka minimal satu kotak aman sebelum Cash Out!',
                ephemeral: true
            });
            return;
        }

        const pengali = daftarPengali[game.jumlahRanjau][game.dibuka.size - 1];
        const hadiah = Math.floor(game.taruhan * pengali);

        // catat statistik: menang
        const pemainMenang = saldoPemain[game.pemain];
        pemainMenang.mines = pemainMenang.mines || { main: 0, menang: 0, kalah: 0, terbesar: 0 };
        pemainMenang.mines.menang++;
        if (hadiah > pemainMenang.mines.terbesar) {
            pemainMenang.mines.terbesar = hadiah;
        }

        saldoPemain[game.pemain].saldo += hadiah;
        simpanSaldo(saldoPemain);
        permainanMines.delete(idPesan);

        // buka SEMUA kotak: ranjau → merah + kepala, kotak aman → hijau + koin
        const komponenNonaktif = interaction.message.components.map(row =>
            new ActionRowBuilder().addComponents(
                row.components.map(button => {
                    const tombol = ButtonBuilder.from(button);

                    // tombol Cash Out → cukup dinonaktifkan saja
                    if (tombol.data.custom_id === 'mines_cashout') {
                        return tombol.setDisabled(true);
                    }

                    const posisi = Number(
                        tombol.data.custom_id.replace('mines_', '')
                    );

                    if (game.ranjau.has(posisi)) {
                        // ranjau → MERAH + kepala apalu
                        tombol.setEmoji(EMOJI_BOM).setStyle(ButtonStyle.Danger);
                    } else {
                        // semua kotak aman (sudah dibuka ATAU belum) → HIJAU + koin
                        tombol.setEmoji(EMOJI_KOIN).setStyle(ButtonStyle.Success);
                    }

                    return tombol.setDisabled(true);
                })
            )
        );

        const embed = new EmbedBuilder()
            .setColor(0x2ECC71) // 🟢 hijau saat cash out (menang)
            .setTitle(`${EMOJI_KOIN} CASH OUT BERHASIL!`)
            .setDescription(`💬 ${ambilTeks(teksCashout, game.dibuka.size)}`)
            .addFields(
                { name: 'Kotak aman:', value: `${game.dibuka.size}`, inline: true },
                { name: 'Pengali:', value: `${pengali}x`, inline: true },
                { name: 'Hadiah:', value: `${hadiah.toLocaleString('id-ID')} koin`, inline: true },
                { name: '💰 Saldo:', value: `${saldoPemain[game.pemain].saldo.toLocaleString('id-ID')} koin`, inline: true }
            );

        await interaction.update({
            embeds: [embed],
            components: komponenNonaktif
        });

        return;
    }


    if (!game) {
        await interaction.reply({
            content: 'Permainan tidak ditemukan atau sudah berakhir.',
            ephemeral: true
        });
        return;
    }

    if (interaction.user.id !== game.pemain) {
        await interaction.reply({
            content: 'Permainan ini bukan milikmu!',
            ephemeral: true
        });
        return;
    }

    const nomor = Number(
        interaction.customId.replace('mines_', '')
    );

    if (!Number.isInteger(nomor) || nomor < 0 || nomor > 8) return;

    if (game.dibuka.has(nomor)) {
        await interaction.reply({
            content: 'Kotak ini sudah dibuka!',
            ephemeral: true
        });
        return;
    }

    game.dibuka.add(nomor);

    const baris = interaction.message.components.map(row =>
        new ActionRowBuilder().addComponents(
            row.components.map(button => {
                const tombol = ButtonBuilder.from(button);

                if (button.customId === interaction.customId) {
                    const kenaRanjau = game.ranjau.has(nomor);

                    tombol
                        .setEmoji(kenaRanjau ? EMOJI_BOM : EMOJI_KOIN)
                        .setStyle(kenaRanjau ? ButtonStyle.Danger : ButtonStyle.Success)
                        .setDisabled(true);
                }

                return tombol;
            })
        )
    );

    if (game.ranjau.has(nomor)) {
        permainanMines.delete(idPesan);

        // catat statistik: kalah
        const pemainKalah = saldoPemain[game.pemain];
        if (pemainKalah) {
            pemainKalah.mines = pemainKalah.mines || { main: 0, menang: 0, kalah: 0, terbesar: 0 };
            pemainKalah.mines.kalah++;
            simpanSaldo(saldoPemain);
        }

        const embed = new EmbedBuilder()
            .setColor(0xFF0000) // 🔴 merah saat kena ranjau
            .setTitle('💥 KENA RANJAU!')
            .setDescription(`💬 ${ambilTeks(teksRanjau, game.dibuka.size - 1)}`);

        await interaction.update({
            embeds: [embed],
            components: baris.map(row =>
                new ActionRowBuilder().addComponents(
                    row.components.map(button => {
                        const tombol = ButtonBuilder.from(button);
                        const posisi = Number(
                            tombol.data.custom_id.replace('mines_', '')
                        );

                                             if (game.ranjau.has(posisi)) {
                            // ranjau → MERAH
                            tombol.setEmoji(EMOJI_BOM).setStyle(ButtonStyle.Danger);
                        } else {
                            // semua kotak aman (sudah dibuka ATAU belum) → HIJAU + koin
                            tombol.setEmoji(EMOJI_KOIN).setStyle(ButtonStyle.Success);
                        }

                        return tombol.setDisabled(true);   
                    })
                )
            )
        });

        return;
    }

 
const aman = game.dibuka.size;
const daftar = daftarPengali[game.jumlahRanjau];

const pengali = daftar[aman - 1];
const hadiahSekarang = Math.floor(game.taruhan * pengali);

const pengaliBerikutnya = daftar[aman];
const teksBerikutnya = pengaliBerikutnya === undefined
    ? 'Semua Diamond ditemukan!'
    : `${Math.floor(game.taruhan * pengaliBerikutnya).toLocaleString('en-US')} (${pengaliBerikutnya.toFixed(2)}x)`;

const embed = new EmbedBuilder()
    .setColor(0x3498DB) // 🔵 biru saat bermain
    .setTitle(`${EMOJI_APALU} PLG MINES`)
    .setDescription(
        `${EMOJI_KOIN} Kotak aman: **${aman}**\n` +
        `💬 ${ambilTeks(teksDiamond, aman)}`
    )
    .addFields(
        { name: 'Bet:', value: `${game.taruhan.toLocaleString('en-US')}`, inline: true },
        { name: 'Mines:', value: `${game.jumlahRanjau}`, inline: true },
        { name: 'Cash Out:', value: `${hadiahSekarang.toLocaleString('en-US')} (${pengali.toFixed(2)}x)`, inline: true },
        { name: 'Next:', value: `${teksBerikutnya}`, inline: true }
    );

await interaction.update({
    embeds: [embed],
    components: baris
});
  

    return;
}

  



    if (!interaction.isChatInputCommand()) return;
    
   
 

   
 
 

    if (interaction.commandName === 'ping') {
        const ping = bot.ws.ping;
        await interaction.reply(
            `🏓 Pong! Ping WebSocket: ${ping} ms`
        );
    }

    if (interaction.commandName === 'kiwkiw') {
        await interaction.reply('kurkur');
    }

    if (interaction.commandName === 'hormatcepat') {
        await interaction.reply('shaaap🫡');
    }

    if (interaction.commandName === 'hormat') {
        const nama = interaction.options.getString('nama');
        await interaction.reply(`shapp ${nama} 🫡`);
    }

    if (interaction.commandName === 'say') {
        const teks = interaction.options.getString('teks');
        const gaya = interaction.options.getString('gaya');

        if (gaya === 'besar') {
            await interaction.reply(teks.toUpperCase());
        } else if (gaya === 'kecil') {
            await interaction.reply(teks.toLowerCase());
        }
    }

    if (interaction.commandName === 'avatar') {
        const pengguna =
            interaction.options.getUser('pengguna') || interaction.user;

        const avatar = pengguna.displayAvatarURL({ size: 1024 });

        await interaction.reply({
            embeds: [{
                title: `Avatar ${pengguna.username}`,
                image: { url: avatar },
                color: 0xFFA500
            }]
        });
    }
 
    if (interaction.commandName === 'userinfo') {
        const pengguna =
            interaction.options.getUser('pengguna') || interaction.user;

        await interaction.reply({
            embeds: [{
                title: `Informasi ${pengguna.username}`,
                fields: [
                    {
                        name: 'Nama pengguna',
                        value: pengguna.username,
                        inline: true
                    },
                    {
                        name: 'ID Discord',
                        value: pengguna.id,
                        inline: true
                    },
                    {
                        name: 'Akun dibuat',
                        value: `<t:${Math.floor(pengguna.createdTimestamp / 1000)}:F>`
                    }
                ],
                color: 0xFFA500
            }]
        });
    }
   

        if (interaction.commandName === 'serverinfo') {
        const server = interaction.guild;

        if (!server) {
            await interaction.reply({
                content: 'Command ini hanya bisa digunakan di server Discord.',
                ephemeral: true
            });
            return;
        }

        await interaction.reply({
            embeds: [{
                title: `Informasi Server: ${server.name}`,
                fields: [
                    {
                        name: 'Nama Server',
                        value: server.name,
                        inline: true
                    },
                    {
                        name: 'ID Server',
                        value: server.id,
                        inline: true
                    },
                    {
                        name: 'Jumlah Anggota',
                        value: `${server.memberCount}`,
                        inline: true
                    }
                ],
                color: 0xFFA500
            }]
        });
    }

    // ===== PERBAIKAN: /servericon (dulunya terdaftar tapi tidak ada handler!) =====
    if (interaction.commandName === 'servericon') {
        if (!interaction.guild) {
            await interaction.reply({
                content: '❌ Command ini hanya bisa dipakai di server!',
                ephemeral: true
            });
            return;
        }

        if (!interaction.guild.icon) {
            await interaction.reply({
                content: '❌ Server ini tidak punya icon!',
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle(`🖼️ Icon server: ${interaction.guild.name}`)
            .setImage(interaction.guild.iconURL({ size: 1024 }));

        await interaction.reply({ embeds: [embed] });
        return;
    }

    // ===== SLASH COMMAND PLG (contoh: /plgsaldo & /plghelp) =====
    if (interaction.commandName === 'plgsaldo') {
        await interaction.reply({ embeds: [buatEmbedSaldo(interaction.user)] });
        return;
    }

    if (interaction.commandName === 'plghelp') {
        await interaction.reply({ embeds: [buatEmbedHelp()] });
        return;
    }
});
    


  

bot.login(process.env.TOKEN);

// ===== jangan biarkan bot crash karena error kecil =====
process.on('unhandledRejection', (error) => {
    console.error('⚠️ Error tidak tertangani:', error);
});

process.on('uncaughtException', (error) => {
    console.error('⚠️ Error fatal:', error);
});
