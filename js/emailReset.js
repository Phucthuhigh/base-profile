function saveEmail(email, users) {
    users = email;
    localStorage.setItem('emailToReset', JSON.stringify(users));
}

function checkEmailExisted(email, users) {
    return users.some((user) => {
        return user.email === email;
    })
}

function nextStep(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const errorMessage = document.querySelector('.error-message');
    const users = JSON.parse(localStorage.getItem('users'));
    let emailToReset = '';
    if (emailInput.value !== '') {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailInput.value)) {
            let result = checkEmailExisted(emailInput.value, users);
            if (result) {
                emailInput.parentNode.parentNode.classList.remove('error');
                errorMessage.style.display = 'none';
                saveEmail(emailInput.value, emailToReset);
                location.href = 'resetPassword.html';
            } else {
                emailInput.parentNode.parentNode.classList.add('error');
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = 'The email has not existed.';
                errorMessage.style.color = 'red';
            }
        } else {
            emailInput.parentNode.parentNode.classList.add('error');
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = 'It may be missing @,domain or something.';
            errorMessage.style.color = 'red';
        }
    } else {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'The value of email is none! Please enter your email';
        errorMessage.style.color = 'red';
        emailInput.parentNode.parentNode.classList.add('error');
    }
}

const nextBtn = document.querySelector('#reset-pass-btn');
nextBtn.addEventListener('click',nextStep);