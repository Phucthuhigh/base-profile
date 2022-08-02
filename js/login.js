const loginBtn = document.getElementById('login-button');

function EmptyInput(arr) {
    const options = ['email', 'password'];
    const errorMessages = document.querySelectorAll('.error-message');
    arr.forEach((element,index) => {
        if (element.value === '') {
            element.parentNode.parentNode.classList.add('error');
            errorMessages[index].style.display = 'block';
            errorMessages[index].innerHTML = `The value of ${options[index]} is none! Please enter your ${options[index]}`;
        } else {
            element.parentNode.parentNode.classList.remove('error');
            errorMessages[index].style.display = 'none';
        }
    })
    let kt = true;
    for (let element of arr) {
        if (element.value === '') {
            kt = false;
            break;
        }
    }
    return kt;
}

function checkEmail(email) {
    const emailErrorMessage = document.querySelector('#email-error-message');
    if (email.value !== '') {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.value)) {
            email.parentNode.parentNode.classList.add('error');
            emailErrorMessage.style.display = 'block';
            emailErrorMessage.innerHTML = 'It may be missing @,domain or something.';
            return false;
        } else {
            email.parentNode.parentNode.classList.remove('error');
            emailErrorMessage.style.display = 'none';
            return true;
        }
    } else return false;
}

function checkEmailAndPassword(email, password,users) {
    const emailOrPassErrorMessage = document.querySelector('#password-or-email-error-message');
    if (email.value !== '' && password.value !== '') {
        let result = users.some((user) => {
            return user.email === email.value && user.password === password.value;
        })
        if (!result) {
            email.parentNode.parentNode.classList.add('error');
            password.parentNode.parentNode.classList.add('error');
            emailOrPassErrorMessage.style.display = 'block';
            emailOrPassErrorMessage.innerHTML = `The email or password you entered incorrectly.`;
            return false;
        } else {
            email.parentNode.parentNode.classList.remove('error');
            password.parentNode.parentNode.classList.remove('error');
            emailOrPassErrorMessage.style.display = 'none';
            return true;
        }
    } else {
        return false;
    }
}

function saveData(users, data) {
    users = data;
    localStorage.setItem('emailInform',JSON.stringify(data));
}

function reloadInput(arr) {
    arr.forEach((element) => {
        element.value = '';
    })
}

function loginAction(e) {
    e.preventDefault();
    const inform = document.querySelectorAll('.information');
    let isEmpty, isEmailAndPasswordChecked, isEmailChecked;
    isEmpty = EmptyInput(inform);
    emailInform = '';
    users = Boolean(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    isEmailChecked = checkEmail(emailInput);
    isEmailAndPasswordChecked = checkEmailAndPassword(emailInput, passwordInput, users);
    if (isEmpty) {
        if (isEmailAndPasswordChecked && isEmailChecked) {
            saveData(emailInform, emailInput.value);
            localStorage.setItem('isLogin', JSON.stringify(true));
            reloadInput(inform);
            location.href = 'index.html';
        }
    }
}

loginBtn.addEventListener('click',loginAction);