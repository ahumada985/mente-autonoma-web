/**
 * Formulario de suscripción al newsletter
 */

async function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    const name = document.getElementById('newsletter-name').value;
    
    if (!email) {
        showMessage('Por favor ingresa tu email', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
    }
    
    try {
        // Mostrar loading
        showMessage('Suscribiendo...', 'loading');
        
        // Enviar suscripción
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showMessage('¡Suscripción exitosa! Revisa tu email.', 'success');
            // Limpiar formulario
            document.getElementById('newsletter-email').value = '';
            document.getElementById('newsletter-name').value = '';
        } else {
            showMessage('Error en la suscripción. Intenta de nuevo.', 'error');
        }
        
    } catch (error) {
        showMessage('Error de conexión. Intenta de nuevo.', 'error');
        console.error('Error:', error);
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('newsletter-message');
    
    // Limpiar mensaje anterior
    messageDiv.innerHTML = '';
    messageDiv.className = 'newsletter-message';
    
    // Agregar clase según el tipo
    messageDiv.classList.add(type);
    
    // Agregar mensaje
    messageDiv.innerHTML = message;
    
    // Mostrar mensaje
    messageDiv.style.display = 'block';
    
    // Ocultar después de 5 segundos (excepto loading)
    if (type !== 'loading') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Event listener para el formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            subscribeNewsletter();
        });
    }
});
