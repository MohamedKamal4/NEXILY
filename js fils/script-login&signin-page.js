let signForm = document.getElementById("signup-form");
let loginform = document.getElementById("login-form");
let login = document.getElementById("login");
let back = document.getElementById("box");
const bgLeft = document.querySelector(".bg-left");
const bgRight = document.querySelector(".bg-right");

function handleDefultBack() {
    loginform.classList.add("animate-login");
    bgRight.classList.remove("active");
    signForm.classList.add("signup");
    bgLeft.classList.add("active");
}

handleDefultBack()


document.getElementById("show-btn").addEventListener("click", function () {
    bgLeft.classList.add("active");
    bgRight.classList.remove("active");

    signForm.classList.remove("animate-signin");
    signForm.classList.add("signup");

    loginform.classList.remove("login");
    loginform.classList.add("animate-login");
});

document.getElementById("show-btn-two").addEventListener("click", function () {
    bgLeft.classList.remove("active");
    bgRight.classList.add("active");

    signForm.classList.remove("signup");
    signForm.classList.add("animate-signin");

    loginform.classList.remove("animate-login");
    loginform.classList.add("login");
});



document.getElementById("login-btn").addEventListener("click", function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let rememberMe = document.getElementById("default-checkbox");


    if (username === "" || password === "") {
        showError("You Can't Leave Any Field Empty");
    } else {
        axios.post('https://tarmeezacademy.com/api/v1/login', {
            username: `${username}`,
            password: `${password}`
        })
            .then(function (response) {
                showSuccess("Login Successfully please wait...");

                if (rememberMe.checked) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("data", JSON.stringify(response.data));
                } else {
                    sessionStorage.setItem("data", JSON.stringify(response.data));
                    sessionStorage.setItem("token", response.data.token);
                }
                let storedData = JSON.parse(localStorage.getItem("data"));
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 5000);
            })
            .catch(function (error) {
                showError(`${error.response.data.message}`);
            })
    }
})



document.getElementById("status-message-two").style.display = "none";


document.getElementById("welcome-text").textContent = `Welcome To`;
document.getElementById("signup-btn").addEventListener("click", function () {
    const fileInput = document.getElementById("file-upload");
    const fullNameInput = document.getElementById("full-name");
    const usernameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password-two");
    const passwordInputTwo = document.getElementById("password-Three");

    if (
        !fullNameInput.value.trim() ||
        !usernameInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value.trim() ||
        !passwordInputTwo.value.trim()
    ) {
        showErrortwo("Please fill in all fields");
        return;
    }

    if (passwordInput.value !== passwordInputTwo.value) {
        showErrortwo("Passwords do not match");
        return;
    }

    const formData = new FormData();
    formData.append("username", usernameInput.value);
    formData.append("password", passwordInputTwo.value);
    formData.append("name", fullNameInput.value);
    formData.append("email", emailInput.value);

    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    // UI updates
    document.getElementById("hidden").style.display = "none";
    document.getElementById("show-btn").style.display = "none";
    document.getElementById("status-message-two").style.display = "flex";
    document.getElementById("status-message-two").innerHTML =
        ` <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>`


    axios.post('https://tarmeezacademy.com/api/v1/register', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then(response => {
            // Reset UI and inputs
            document.getElementById("hidden").style.display = "flex";
            document.getElementById("show-btn").style.display = "flex";
            document.getElementById("status-message-two").style.display = "none";
            document.getElementById("welcome-text").textContent = `Successful`;
            document.getElementById("welcome-text").style.color = "green";
            fullNameInput.value = "";
            usernameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
            passwordInputTwo.value = "";
            fileInput.value = "";
            // animate switch
            handleShowBtnOne();
            handleShowBtnTwo();
            handleShowBtnThree();
            setTimeout(() => {
                signForm.classList.remove("animate-signin");
                signForm.classList.remove("signup");
                signForm.classList.add("signup");
                loginform.classList.remove("login");
                loginform.classList.add("animate-login");
                document.getElementById("welcome-text").textContent = `Welcome To`;
            }, 1000);
        })
        .catch(error => {
            showErrortwo(error.response?.data?.message || "Registration failed.");
            console.error(error);
        });
});

function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerText = message;
    errorDiv.style.display = "block";

    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 3000);
}
function showSuccess(message) {
    const errorDiv = document.getElementById("succss-message");
    errorDiv.innerText = message;
    errorDiv.style.display = "block";
}
function showErrortwo(message) {
    const errorDiv = document.getElementById("error-message-two");
    errorDiv.innerText = message;
    errorDiv.style.display = "block";

    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 6000);
}


function handleShowBtnOne() {
    const passwordInput = document.getElementById("password");
    const showPassBtn = document.getElementById("show-pass-one");

    // إخفاء الزر في البداية
    showPassBtn.style.display = "none";

    // عند الكتابة في الحقل
    passwordInput.addEventListener("input", function () {
        if (this.value.trim() === "") {
            showPassBtn.style.display = "none";
            passwordInput.type = "password"; // ترجيع الحالة
        } else {
            showPassBtn.style.display = "flex";
        }
    });

    // عند الضغط على زر الإظهار
    showPassBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}

handleShowBtnOne();


function handleShowBtnTwo() {
    const passwordInput = document.getElementById("password-two");
    const showPassBtn = document.getElementById("show-pass-two");

    // إخفاء الزر في البداية
    showPassBtn.style.display = "none";

    // عند الكتابة في الحقل
    passwordInput.addEventListener("input", function () {
        if (this.value.trim() === "") {
            showPassBtn.style.display = "none";
            passwordInput.type = "password"; // ترجيع الحالة
        } else {
            showPassBtn.style.display = "flex";
        }
    });

    // عند الضغط على زر الإظهار
    showPassBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}

handleShowBtnTwo();



function handleShowBtnThree() {
    const passwordInput = document.getElementById("password-Three");
    const showPassBtn = document.getElementById("show-pass-Three");

    // إخفاء الزر في البداية
    showPassBtn.style.display = "none";

    // عند الكتابة في الحقل
    passwordInput.addEventListener("input", function () {
        if (this.value.trim() === "") {
            showPassBtn.style.display = "none";
            passwordInput.type = "password"; // ترجيع الحالة
        } else {
            showPassBtn.style.display = "flex";
        }
    });

    // عند الضغط على زر الإظهار
    showPassBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}

handleShowBtnThree();



document.getElementById("file-upload").addEventListener("change", function () {
    const fileName = this.files[0]?.name || "No file chosen";
    document.getElementById("file-name").textContent = fileName;
});

