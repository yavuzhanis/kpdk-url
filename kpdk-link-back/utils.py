import random
import string
import qrcode
from io import BytesIO
import base64

def rastgele_kod(uzunluk=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=uzunluk))

def qrcode_uret(url: str) -> str:
    qr = qrcode.make(url)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")
