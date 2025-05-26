from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from .database import Base, engine, SessionLocal
from models import Url
from utils import rastgele_kod, qrcode_uret
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kün Link Kısaltıcı", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme aşamasında tüm kaynaklara izin ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrlInput(BaseModel):
    uzun_url: str

@app.post("/kisa-url")
def create_short_url(data: UrlInput):
    db: Session = SessionLocal()
    kod = rastgele_kod()
    while db.query(Url).filter(Url.kisa_kod == kod).first():
        kod = rastgele_kod()

    yeni = Url(uzun_url=data.uzun_url, kisa_kod=kod)
    db.add(yeni)
    db.commit()
    db.refresh(yeni)

    tam_url = f"https://kun.link/{kod}"
    qr_kodu = qrcode_uret(tam_url)

    return {
        "kisa_url": tam_url,
        "qr_base64": qr_kodu
    }

@app.get("/{kisa_kod}")
def redirect_to_url(kisa_kod: str):
    db: Session = SessionLocal()
    kayit = db.query(Url).filter(Url.kisa_kod == kisa_kod).first()
    if kayit:
        kayit.tiklama_sayisi += 1
        db.commit()
        return RedirectResponse(url=kayit.uzun_url)
    raise HTTPException(status_code=404, detail="Link bulunamadı.")

@app.get("/istatistik/{kisa_kod}")
def get_stats(kisa_kod: str):
    db: Session = SessionLocal()
    kayit = db.query(Url).filter(Url.kisa_kod == kisa_kod).first()
    if kayit:
        return {
            "uzun_url": kayit.uzun_url,
            "kisa_kod": kayit.kisa_kod,
            "tiklama_sayisi": kayit.tiklama_sayisi
        }
    raise HTTPException(status_code=404, detail="İstatistik bulunamadı.")
