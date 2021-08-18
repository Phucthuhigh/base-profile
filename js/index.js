function findUsers(users, data) {
    return users.findIndex(user => user.email === data);
}

const loginOrSignupBox = document.querySelector('#login-signup-box');
const informBox = document.querySelector('#inform-box');

if (JSON.parse(localStorage.getItem('isLogin'))) {
    loginOrSignupBox.style.display = 'none';
    informBox.style.display = 'block';
} else {
    loginOrSignupBox.style.display = 'block';
    informBox.style.display = 'none';
}

let users;
if (localStorage.getItem('users') !== null) {
    users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    const emailInform = JSON.parse(localStorage.getItem('emailInform'));
    let index = findUsers(users,emailInform);

    const nameInform = document.querySelector('#name-inform');
    const description = document.querySelector('#description');
    nameInform.innerHTML = `${users[index].name}`;
    description.innerHTML = `Email: ${emailInform}`;

    const input = document.querySelector('#file-input');
    const img = document.querySelector('#avtimg');
    img.src = users[index].img;
    input.addEventListener('change', () => {
        const reader = new FileReader();
        reader.onload = () => {
            users[index].img = reader.result;
            img.src = reader.result;
            localStorage.setItem('users', JSON.stringify(users));
        }
        reader.readAsDataURL(input.files[0]);
    })

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('isLogin',JSON.stringify(false));
        location.href = 'login.html';
    })
} else {
    users = [];
}

const registerBtn = document.querySelector('#register-btn');
const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', () => location.href = 'login.html');
registerBtn.addEventListener('click', () => location.href = 'register.html');