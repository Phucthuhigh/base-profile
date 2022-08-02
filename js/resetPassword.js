const resetPassBtn = document.getElementById('reset-pass-btn');

function EmptyInput(arr) {
    const options = ['password','password confirmation'];
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

function checkPassword(password, passwordConfirm) {
    const passwordErrorMessage = document.querySelector('#password-error-message');
    const passwordConfirmErrorMessage = document.querySelector('#confirm-password-error-message');
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

function findEmailToResetInUsers(users,email) {
    return users.findIndex((user) => {
        return user.email === email;
    })
}

function isPasswordNewSamePasswordPre(passwordPrevios, password) {
    if (passwordPrevios === password) {
        return true;
    } else {
        return false;
    }
}

function saveData(users, ...args) {
    users.push(...args);
    localStorage.setItem('users', JSON.stringify(users));
}

function resetPassAction(e) {
    e.preventDefault();
    const passesToReset = document.querySelectorAll('.information');
    let isEmpty, isPassChecked;
    isEmpty = EmptyInput(passesToReset);
    isPassChecked = checkPassword(passesToReset[0],passesToReset[1]);
    const passwordErrorMessage = document.querySelector('#password-error-message');
    const passwordConfirmErrorMessage = document.querySelector('#confirm-password-error-message');
    const users = JSON.parse(localStorage.getItem('users'));
    const emailToReset = JSON.parse(localStorage.getItem('emailToReset'));
    if (isEmpty) {
        if (isPassChecked) {
            let index = findEmailToResetInUsers(users,emailToReset);
            if (index != -1) {
                if (!isPasswordNewSamePasswordPre(users[index].password,passesToReset[0].value)) {
                    passesToReset[0].parentNode.parentNode.classList.remove('error');
                    passesToReset[1].parentNode.parentNode.classList.remove('error');
                    passwordConfirmErrorMessage.style.display = 'none';
                    passwordErrorMessage.style.display = 'none';
                    users[index].password = passesToReset[0].value;
                    saveData(users);
                    location.href = 'login.html';
                } else {
                    passesToReset[0].parentNode.parentNode.classList.add('error');
                    passwordConfirmErrorMessage.style.display = 'block';
                    passwordConfirmErrorMessage.innerHTML = 'The password you entered is same as the previous password!';
                    passwordConfirmErrorMessage.style.color = 'red';
                    passesToReset[1].parentNode.parentNode.classList.add('error');
                    passwordErrorMessage.style.display = 'block';
                    passwordErrorMessage.innerHTML = 'The password you entered is same as the previous password!';
                    passwordErrorMessage.style.color = 'red';
                }
            }
        }
    }
}

resetPassBtn.addEventListener('click', resetPassAction);