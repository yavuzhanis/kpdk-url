

````markdown
# Kün Link Kısaltıcı (kpdk-url)

Bu proje, Kapadokya Üniversitesi için geliştirilmiş, uzun URL'leri kısaltan ve takip edilebilen bir link kısaltıcı uygulamasıdır. Aynı zamanda her kısa link için otomatik QR kod üretimi ve tıklanma sayacı gibi özellikler içermektedir.

---

## Özellikler

- Uzun URL'yi kısa ve kolay paylaşılabilir hale getirme  
- Her kısa link için otomatik QR kod oluşturma  
- Tıklanma sayısını takip etme ve istatistik sayfası  
- Next.js tabanlı frontend ile kullanıcı dostu arayüz  
- FastAPI backend ile hızlı ve güvenilir API  
- SQLite veritabanı ile basit veri yönetimi (isteğe göre PostgreSQL vb. değiştirilebilir)

---

## Teknolojiler

- **Backend:** Python, FastAPI, SQLAlchemy, qrcode  
- **Frontend:** Next.js, React, Tailwind CSS  
- **Veritabanı:** SQLite (dilerseniz değiştirebilirsiniz)  

---

## Kurulum

### Backend için

1. Sanal ortam oluşturup aktif edin:

```bash
python3 -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate
````

2. Gerekli paketleri yükleyin:

```bash
pip install -r requirements.txt
```

3. Uygulamayı başlatın:

```bash
uvicorn main:app --reload
```

Backend API'si `http://localhost:8000` adresinde çalışacaktır.

### Frontend için

1. Frontend klasörüne gidin:

```bash
cd frontend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Frontend'i başlatın:

```bash
npm run dev
```

Frontend varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## Kullanım

* Uzun URL'yi girip "Kısalt" butonuna basarak kısa link ve QR kod oluşturabilirsiniz.
* Oluşturulan kısa linke tıklanma sayısı backend tarafından takip edilir.
* İstatistikler sayfasından link performansını görebilirsiniz.



## İletişim

Herhangi bir soru veya öneri için:
[yavuzhanis@gmail.com](mailto:yavuzhanis@gmail.com)
[GitHub Profili](https://github.com/yavuzhanis)

---

Teşekkürler!

