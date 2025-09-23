"""
API para suscripciones de newsletter
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from email_service import EmailService
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class NewsletterSubscription(BaseModel):
    email: str
    name: str = None

@app.post("/api/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Suscribir usuario al newsletter"""
    try:
        email_service = EmailService()
        
        # Enviar email de bienvenida
        success = email_service.send_welcome_email(
            subscriber_email=subscription.email,
            subscriber_name=subscription.name
        )
        
        if success:
            return {
                "message": "¡Suscripción exitosa! Revisa tu email.",
                "status": "success"
            }
        else:
            raise HTTPException(status_code=500, detail="Error enviando email")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/api/newsletter/test")
async def test_email():
    """Probar conexión de email"""
    try:
        email_service = EmailService()
        success = email_service.test_connection()
        
        if success:
            return {"message": "Conexión de email exitosa", "status": "success"}
        else:
            return {"message": "Error de conexión", "status": "error"}
            
    except Exception as e:
        return {"message": f"Error: {str(e)}", "status": "error"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
