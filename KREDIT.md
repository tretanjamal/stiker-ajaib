# Kredit

## Pengembang
- Jamaluddin, UPTD SMPN 2 Robatal (Instagram: tretanjamal). Konsep, rancangan pembelajaran, dan pengembangan.
- Viky Fahma Faza, S.Pd., SD Al Irsyad Al Islamiyah Tulungagung. Pengembang.

Grafik karakter, benda, dan UI: SVG buatan sendiri. Suara efek: sintesis WebAudio.

## Aset AI (dibuat kreator, 11 November 2026)
Gambar dibuat dengan ChatGPT memakai prompt di docs/ASET-PROMPT.md (gaya induk + deskripsi per aset), lalu diubah ukuran dan dikompres ke WebP:
- assets/img/bg-a1-kamar, bg-a2-taman, bg-a3-lab-es, bg-a4-gua, bg-judul (latar 1280x720)
- assets/img/foto-bingkai, prop-lemari, prop-rak-mainan (latar transparan)
- assets/img/peta-dunia (peta misi)
- assets/img/potret-nara-senang, potret-kiko-senang: dipotong dari lembar potret karakter (potret-sheet), dipakai di layar hasil dan sertifikat.
- assets/img/nara-netral, nara-senang, nara-bingung, kiko-cemas, kiko-netral, kiko-senang: dipotong dari lembar pose ChatGPT (13 November 2026, prompt di PROMPT-ASET-TAMBAHAN.md bagian 1-2), dipakai di layar judul dan semua ruangan.
- assets/img/medali-sertifikat: ChatGPT (13 November 2026, prompt bagian 3), dipakai di sertifikat.
- Key art untuk thumbnail (tidak ikut zip); judul ditambahkan manual.

Musik (instrumental) dibuat kreator dengan generator musik AI memakai prompt di docs/ASET-PROMPT.md bagian B; dikonversi ke mp3 mono 64 kbps dengan fade masuk/keluar: assets/audio/musik-judul, musik-a1..a4, musik-hasil. (Nama alat dan tanggal tiap lagu: ISI SEBELUM PUBLIKASI.)

## Font (dibundel, lisensi SIL Open Font License 1.1)
- Fredoka (The Fredoka Project Authors): assets/fonts/fredoka-latin-600/700-normal.woff2, lisensi assets/fonts/OFL-Fredoka.txt
- Nunito (The Nunito Project Authors): assets/fonts/Nunito-Bold.ttf, Nunito-Black.ttf, lisensi assets/fonts/OFL-Nunito.txt

## Foto dan ikon
- Foto pengembang milik masing-masing pengembang dan dipakai atas izin mereka.
  - dev-foto (Jamaluddin): latar dihapus dengan rembg (model u2netp).
  - dev-foto-2 (Viky Fahma Faza): latar merah dihapus dengan penghapus warna latar (tools/proses-viky.py).
- Ikon Instagram (assets/img/ikon-instagram): logo merek dagang Instagram (Meta), dipakai hanya sebagai penanda akun media sosial pengembang. Tidak ada tautan keluar di dalam gim.
