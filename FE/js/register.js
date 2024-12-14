const { register } = require("module");

const registerForm = document.getElementById('frm-register');
const name = document.getElementById('frm-register-name');
const email = document.getElementById('frm-register-email');
const password = document.getElementById('frm-register-password');
const passwordConfirm = document.getElementById('frm-register-password-confirm');
const error = document.getElementById('frm-register-error');

registerForm.addEventListener('submit', register);

async function register(event) {
    event.preventDefault();

    if (password.value !== passwordConfirm.value) {
        error.innerHTML = 'Passwords do not match';
        return;
    }

    const response = await fetch('http://locallhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value

        }),
    });

    const data = await response.json();
    if (response.ok){
        error.innerHTML = 'User registered successfully';
        registerForm.reset();
        } else {
            error.innerHTML = data.error;
    }
}
