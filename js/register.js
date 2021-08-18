const registerBtn = document.getElementById('register-button');

function EmptyInput(arr) {
    const options = ['name','email','password','password confirmation'];
    const errorMessages = document.querySelectorAll('.error-message');
    arr.forEach((element, index) => {
        if (element.value == '') {
            element.parentNode.parentNode.classList.add('error');
            errorMessages[index].style.display = 'block';
            errorMessages[index].innerHTML = `The value of ${options[index]} is none! Please enter your ${options[index]}`;
            errorMessages[index].style.color = 'red';
        } else {
            errorMessages[index].style.display = 'none';
            element.parentNode.parentNode.classList.remove('error');
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

function checkName(name, users) {
    const nameErrorMessage = document.querySelector('#name-error-message');
    if (name.value !== '') {
        let kt = false;
        for (char of name.value) {
            if ((char >= 'A' && char <= 'Z')) {
                kt = true;
                break;
            }
        }
        if (kt && name.value.length >= 4) {
            let result = true;
            if (users !== null) {
                for (let user of users) {
                    if (user.name === name.value) {
                        result = false;
                        break;
                    }
                }
            }
            if (result) {
                nameErrorMessage.style.display = 'none';
                name.parentNode.parentNode.classList.remove('error');
                return true;
            } else {
                name.parentNode.parentNode.classList.add('error');
                nameErrorMessage.style.display = 'block';
                nameErrorMessage.innerHTML = 'Name has been already existed.';
                nameErrorMessage.style.color = 'red';
                return false;
            }
            
        } else {
            name.parentNode.parentNode.classList.add('error');
            nameErrorMessage.style.display = 'block';
            nameErrorMessage.innerHTML = 'The name must have at least one letter in capital.';
            nameErrorMessage.style.color = 'red';
            return false;
        }
    } else {
        return false;
    }
}

function checkEmail(email, users) {
    const emailErrorMessage = document.querySelector('#email-error-message');
    if (email.value !== '') {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.value)) {
            email.parentNode.parentNode.classList.add('error');
            emailErrorMessage.style.display = 'block';
            emailErrorMessage.innerHTML = 'It may be missing @,domain or something.';
            emailErrorMessage.style.color = 'red';
            return false;
        } else {
            let result = true;
            if (users !== null) {
                for (let user of users) {
                    if (user.email === email.value) {
                        result = false;
                        break;
                    }
                }
            }
            if (result) {
                email.parentNode.parentNode.classList.remove('error');
                emailErrorMessage.style.display = 'none';
                return true;
            } else {
                email.parentNode.parentNode.classList.add('error');
                emailErrorMessage.style.display = 'block';
                emailErrorMessage.innerHTML = 'Email has been already existed.';
                emailErrorMessage.style.color = 'red';
                return false;
            }
        }
    } else {
        return false;
    }
}

function checkPassword(password, passwordConfirm) {
    const passwordErrorMessage = document.querySelector('#password-error-message');
    const passwordConfirmErrorMessage = document.querySelector('#password-confirm-error-message');
    if (password.value !== '' && passwordConfirm.value !== '') {
        if (password.value.length < 8) {
            password.parentNode.parentNode.classList.add('error');
            passwordErrorMessage.style.display = 'block';
            passwordErrorMessage.innerHTML = 'Your length password is too short';
            passwordErrorMessage.style.color = 'red';
            return false;
        }
        else if (password.value !== passwordConfirm.value) {
            passwordConfirm.parentNode.parentNode.classList.add('error');
            passwordConfirmErrorMessage.style.display = 'block';
            passwordConfirmErrorMessage.innerHTML = 'The password you re-entered is not the same as the previous password!';
            passwordConfirmErrorMessage.style.color = 'red';
            return false;
        }
        else {
            passwordConfirm.parentNode.parentNode.classList.remove('error');
            passwordErrorMessage.style.display = 'none';
            passwordConfirmErrorMessage.style.display = 'none';
            return true;
        }
    } else {
        return false;
    }
}

function saveData(data, arr) {
    console.log(arr);
    arr.push(data);
    console.log(arr);
    localStorage.setItem('users', JSON.stringify(arr));
}

function reloadInput(arr) {
    arr.forEach((element) => {
        element.value = '';
    })
}

function registerAction(e) {
    e.preventDefault();
    const informationInput = document.querySelectorAll('.information');
    let users;
    if (localStorage.getItem('users') !== null) {
        users = JSON.parse(localStorage.getItem('users'));
    } else {
        users = [];
    }
    let isNameCheck, isEmailCheck, isPasswordCheck, isEmpty;
    isEmpty = EmptyInput(informationInput);
    const nameInput = document.querySelector('#name-input');
    isNameCheck = checkName(nameInput, users);
    const emailInput = document.querySelector('#email-input');
    isEmailCheck = checkEmail(emailInput, users);
    const passwordInput = document.querySelector('#password-input');
    const passwordConfirmation = document.querySelector('#password-confirm-input');
    isPasswordCheck = checkPassword(passwordInput,passwordConfirmation);
    if (isEmpty) {
        if (isNameCheck && isEmailCheck && isPasswordCheck) {
            saveData({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                img: '../img/white-image.png'
            }, users)
            reloadInput(informationInput);
            location.href = 'login.html';
        }
    }
}

registerBtn.addEventListener('click',registerAction);