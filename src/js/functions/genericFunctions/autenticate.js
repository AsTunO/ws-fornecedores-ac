document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.querySelector('.container-login');
    loginContainer.classList.add('show');
    
    document.querySelector('.login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'ARMAZEM' && password === '4RM4Z3M') {
            console.log("opa")
            window.location.href = '../../../src/mainPage.html';
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
        return false;
    });
});
