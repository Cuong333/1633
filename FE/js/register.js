registerForm.addEventListener('submit', register);

async function register(event) {
    event.preventDefault();

    // Validate password confirmation
    if (passwordInput.value !== passwordConfirmInput.value) {
        errorDisplay.innerHTML = 'Passwords do not match';
        return;
    }

    // Prepare user data
    const userData = {
        fullName: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await fetch('/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('User  registered successfully. Please login.');
            window.location.href = './login.html';
        } else {
            errorDisplay.innerHTML = data.error || 'Registration failed';
        }
    } catch (error) {
        console.error('Error during registration:', error);
        errorDisplay.innerHTML = 'An error occurred. Please try again later.';
    }
}