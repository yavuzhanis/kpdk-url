from sqlalchemy import Column, Integer, String
from database import Base

class Url(Base):
    __tablename__ = "urls"
    id = Column(Integer, primary_key=True, index=True)
    uzun_url = Column(String, nullable=False)
    kisa_kod = Column(String, unique=True, index=True)
    tiklama_sayisi = Column(Integer, default=0)
