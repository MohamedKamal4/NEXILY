AOS.init();
//end import animation library
//----------------------------------------------------------------------------
//start product page
(function protectPage() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        window.location.replace("index.html");
    } else {
        document.body.style.display = "block";
    }
})();


window.addEventListener("scroll", function () {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;

    console.log(window.innerHeight, window.pageYOffset, document.body.scrollHeight);
    if (endOfPage && currentPage < lastPage) {
        currentPage = currentPage + 1;
        getPosts(false, currentPage);
    }
});


//end product page
//----------------------------------------------------------------------------
//start handle show img on github
const pathPrefix = location.hostname.includes("github.io") ? "/NEXILY/" : "./";
//end handle show img on github
//----------------------------------------------------------------------------
//start handle dark mode
document.addEventListener("DOMContentLoaded", () => {
    const BUTTON = document.getElementById("dark-mode");
    const reactButtons = document.getElementsByClassName("react-btn");
    const replayButtons = document.getElementsByClassName("replay-btn");
    const bodyContent = document.getElementsByClassName("body-content");
    const forms = document.getElementsByClassName("react-form"); // ← مجموعة

    // ✅ عناصر الوضع الليلي
    const darkElements = [
        document.body,
        document.getElementById("nav-home"),
        document.getElementById("nav-profile"),
        document.getElementById("logo"),
        ...document.getElementsByClassName("commint-button"),
        ...document.getElementsByClassName("post-description"),
        ...document.getElementsByClassName("post-title"),
        ...reactButtons,
        ...replayButtons,
        ...bodyContent
    ];


    //تطبيق الوضع (ليلي/نهاري) على العناصر
    function applyMode(isDark) {
        darkElements.forEach(el => {
            if (!el) return;
            el.classList.remove(isDark ? "light-mode" : "dark-mode");
            el.classList.add(isDark ? "dark-mode" : "light-mode");
        });

        if (BUTTON) {
            BUTTON.setAttribute("aria-pressed", isDark);
        }
        localStorage.setItem("sync", isDark);
    }

    //تبديل الوضع عند الضغط
    if (BUTTON) {
        BUTTON.addEventListener("click", () => {
            const isPressed = BUTTON.getAttribute("aria-pressed") === "true";
            applyMode(!isPressed);
        });
    }

    //تطبيق الوضع المحفوظ عند تحميل الصفحة
    const saved = localStorage.getItem("sync") === "true";
    applyMode(saved);

    //تفعيل لون التفاعل لكل زر
    Array.from(reactButtons).forEach(btn => {
        let isClicked = false;
        btn.addEventListener("click", function () {
            isClicked = !isClicked;
            this.classList.toggle("clicked", isClicked);
        });
    });

    //منع إرسال النموذج الفعلي (لكل نموذج في الصفحة)
    Array.from(forms).forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    });
});
//end handle dark mode
//---------------------------------------------------------------------------------
//start handle btn show add
const uploadIcon = document.getElementById("upload-icon");
const imageInput = document.getElementById("image-input");
const preview = document.getElementById("preview");
const cancel = document.getElementById("close-btn");

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-add");
    const addBox = document.getElementById("add");

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        addBox.style.display = "flex";
    });

    cancel.addEventListener("click", function () {
        addBox.style.display = "none";
    });
});


// عند الضغط على الأيقونة، نفتح اختيار الملف
uploadIcon.addEventListener("click", () => {
    imageInput.click();
});

// عند اختيار صورة، نعرضها (اختياري)
imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
            document.getElementById("post-form").style.height = "100%"
        };
        reader.readAsDataURL(file);
    }
});
//end handle btn show add
//--------------------------------------------------------------------------
//start handle forms
const forms = document.querySelectorAll("form")
forms.forEach(form => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    })
})
//end handle forms
//--------------------------------------------------------------------------
//start animation logo web site
const text = "N E X I L Y";
const logoText = document.getElementById("logo-text");
let index = 0;
let isDeleting = false;

function type() {
    if (!isDeleting) {
        logoText.textContent = text.substring(0, index + 1);
        index++;
        if (index === text.length) {
            isDeleting = true;
            setTimeout(type, 1500); // انتظر قبل الحذف
            return;
        }
    } else {
        logoText.textContent = text.substring(0, index - 1);
        index--;
        if (index === 1) {
            isDeleting = false;
        }
    }
    setTimeout(type, isDeleting ? 100 : 200); // سرعة الحذف أسرع من الكتابة
}
//end animation logo web site
//---------------------------------------------------------------------------
//start hamdle sign out btn
function showSignOut() {
    const linkBoxes = document.querySelectorAll(".links");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
        linkBoxes.forEach(linksBox => {
            if (!linksBox.querySelector("#sign-out-btn")) {
                const signOutItem = document.createElement("li");
                signOutItem.innerHTML = `
                    <button type="button" id="sign-out-btn" class="block px-4 py-2 w-full cursor-pointer focus:outline-2 text-sm hover:bg-amber-500 rounded-sm">
                        Sign out
                    </button>
                `;
                linksBox.appendChild(signOutItem);
            }
        });

        document.querySelectorAll("#sign-out-btn").forEach(btn => {
            btn.addEventListener("click", () => {

                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                localStorage.removeItem("data");
                sessionStorage.removeItem("data");
                let alertbox = document.getElementById("alert-box")
                alertbox.style.left = "-5%"
                alertbox.style.backgroundColor = "green"
                alertbox.innerHTML = "Sign Out Successfully Please Wait..."
                setTimeout(() => {
                    alertbox.style.left = "-100%"
                }, 1000);
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            });
        });

    } else {
        if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html";
        }
    }
}
//end hamdle sign out btn
//-----------------------------------------------------------------------------------
//start handle post image
function isImageValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}
//end handle post image
//---------------------------------------------------------------------------------------
//start get post data

async function isImageValid(url) {
    if (typeof url !== "string") return false;
    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok && res.headers.get("Content-Type")?.startsWith("image");
    } catch {
        return false;
    }
}

async function handleImageProfile(img, fallback) {
    if (typeof img !== "string") {
        if (img && typeof img.url === "string") {
            img = img.url;
        } else {
            return fallback;
        }
    }

    const isValid = await isImageValid(img);
    return isValid ? img : fallback;
}

function handelPostImage(imgElement) {
    if (!imgElement || !(imgElement instanceof HTMLImageElement)) return;

    // في حالة الرابط غير موجود أو مش صورة صحيحة
    if (!imgElement.src || !imgElement.src.startsWith("http")) {
        imgElement.style.display = "none";
    }
}

function toggleControl(button) {
    const container = button.parentElement;
    const controlBox = container.querySelector('.control');
    controlBox.classList.toggle('hidden');
}

document.addEventListener("click", function (e) {
    const allControls = document.querySelectorAll(".control");
    allControls.forEach(control => {
        if (!control.contains(e.target) && !e.target.closest(".dropdown-btn")) {
            control.classList.add("hidden");
        }
    });
});
let currentPage = 1;
let lastPage = 1;

async function getPosts(page = 1) {
    const body = document.getElementById("posts");

    try {
        const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${page}`);
        const data = response.data.data;

        function gatCommendsUsers(id) {
            axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
                .then(function (response) {
                    const loader = document.getElementById("loader-screen");
                    loader.style.display = "none";
                    let usersComments = response.data.data.comments;
                    const container = document.getElementById(`comment-users-${id}`);
                    if (container && usersComments.length !== 0) {
                        container.innerHTML = ""; // تنظيف أولاً
                        usersComments.slice(0, 3).forEach(user => {
                            let imgIcon = user.author.profile_image;
                            if (!imgIcon || typeof imgIcon !== "string" || imgIcon[0] === '/' || !imgIcon.startsWith("http")) {
                                imgIcon = `${pathPrefix}assets/images/man-avatar.png`; // صورة بديلة محلية
                            }
                            container.innerHTML += `
                            <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" src="${imgIcon}" alt="">
                            `;
                        });
                        if (usersComments.length > 3) {
                            container.innerHTML += `
                            <a class="flex items-center justify-center w-5 h-5 text-[7px] font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+${usersComments.length - 3}</a>
                            `;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }



        const storedData = localStorage.getItem("data") || sessionStorage.getItem("data");
        const parsedData = JSON.parse(storedData);
        const iduser = sessionStorage.getItem("selectedUserId");
        const parsedDatauser = JSON.parse(iduser);
        const userDataTwo = parsedDatauser;
        const userData = parsedData;
        const avatar = `${pathPrefix}assets/images/man-avatar.png`
        let userPhoto = document.querySelector(".user-photo")
        let userInfo = document.getElementById("user-info")
        userInfo.innerHTML = ` 
        <span class="block text-sm ">@ ${userData.user.username}</span>
        <span class="block text-xs truncate">${userData.user.email}</span>
        `
        const avatarURLNav = await handleImageProfile(userData.user.profile_image, avatar);
        userPhoto.src = avatarURLNav;
        const fallbackImageTwo = `${pathPrefix}assets/images/man-avatar.png`;
        // body.innerHTML = "";
        document.getElementById("nav-home").style.display = "unset";

        for (const post of data) {
            let imageUrl = typeof post.image === "string" ? post.image : (post.image?.url || "");
            let imageUrlTwo = typeof post.author.profile_image === "string" ? post.author.profile_image : (post.author.profile_image?.url || "");



            const isValidTwo = await isImageValid(imageUrlTwo);
            if (!isValidTwo) imageUrlTwo = fallbackImageTwo;

            const id = post.id;
            body.innerHTML += `
            <div id="post-${id}" class="post m-auto rounded-lg shadow-sm md:w-3xl sm:w-2xl w-[95%]" data-aos="zoom-in">
                    <div class="header flex justify-between items-center">
                        <div class="user py-[10px] px-[20px] flex items-center justify-start gap-3 ">
                            <a class="link-profile">
                                <img
                                    class="w-8 h-8 cursor-pointer rounded-full icon-user"
                                    src="${imageUrlTwo}"
                                    alt="user photo"
                                    data-id="${post.author.id}"
                                </img>
                            </a>
                            <div class="flex justify-between flex-col gap-1 items-start">
                                <span class="text-sm font-bold">${post.author.name}</span>
                                <span class="text-sm tracking-[2px]" style="font-size: 8px;">@ ${post.author.username}</span>
                            </div>
                        </div>
                        <div class="edit-post px-8 relative">
                        </div>
                    </div>

                    <img
                        onclick="showFullImage('${imageUrl}')"
                        class="img-post p-[10px] h-[350px] w-[100%] object-cover cursor-pointer"
                        src="${imageUrl}"
                        alt="post image"
                    />

                   

                    <div class="details p-[10px] flex flex-col justify-between gap-3">
                    <h5 class="post-title text-3xl font-bold tracking-tight">${post.title}</h5>
                    <p class="post-description text-sm font-normal">${post.body}</p>
                    <div class="commint-box w-full flex flex-col justfiy-between items-start p-4"></div>
                    <div class=" flex items-center justify-between h-8">
                        <span class="w-[50%] inline-block font-bold py-1 text-[10px]">${post.created_at}</span>
                        <div class="w-[50%] flex gap-3 justify-end items-center">
                        <div id="comment-users-${id}"  
                        class="flex cursor-pointer -space-x-2 rtl:space-x-reverse" 
                        onclick="event.preventDefault(); getCommends(event, ${id})">
                        </div>
                        <span class="quantity-commend flex items-center text-[8px] font-normal tracking-[2px] cursor-pointer" onclick="getCommends(event, ${id})">
                            ${post.comments_count === 0 ? "No Comments" : post.comments_count + " comments"}
                        </span>
                        </div>
                    </div>
                        <div class=" flex flex-col items-center justify-between">
                            <form id="post-${id}" class="flex justify-between items-end react-form w-[100%] bg-transparent flex gap-2" onsubmit="event.preventDefault(),createCommend(event, ${id});">
                                <div class="send w-[15%] h-[100%] p-0 mb-2">
                                    <button type="submit" class="send-btn w-full h-full"><i
                                            class="fa-solid fa-paper-plane hover:text-xl transition-all duration-300 cursor-pointer"></i></button>
                                </div>

                                <div class="commint w-[70%]">
                                    <textarea 
                                    rows="1"
                                    placeholder="Speak Now..."
                                    class="commend-input auto-grow flex justify-center items-center rounded-lg w-full text-sm  border border-gray-600 resize-none overflow-hidden bg-transparent"
                                    ></textarea>
                                </div>

                                <div class="love bg-transparent w-[15%] h-[100%] p-0 mb-2">
                                    <button type="button" class="react-btn bg-transparent w-full h-full"><i
                                            class="fa-solid bg-transparent fa-heart hover:text-xl transition-all duration-300 cursor-pointer"></i></button>
                                </div>

                                <audio id="send-sound" src="assets/sound/happy-pop-2-185287.mp3" preload="auto"></audio>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            if (post.author.id === userData.user.id) {
                const allHeadPosts = body.querySelectorAll('.edit-post');
                const currentPost = allHeadPosts[allHeadPosts.length - 1]; // آخر بوست تمت إضافته

                currentPost.innerHTML = `
                    <button type="button" onclick="toggleControl(this)"  class="dropdown-btn flex text-sm rounded-full md:me-0 border-0 outline-0">
                        <i class="fa-solid fa-ellipsis text-xl cursor-pointer"></i>
                    </button>
                    <div class="z-50 control hidden my-4 text-base list-none divide-y rounded-lg shadow-sm"
                        style="background-color: rgba(128, 128, 128, 0.295); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
                        <ul class="py-2">
                            <li class="py-2 px-10 text-xs tracking-[2px] hover:bg-amber-500 hover:text-white cursor-pointer">
                                <button class="cursor-pointer w-full h-full" onclick="editPost(${id})">Edit</button>
                            </li>
                            <li class="py-2 px-10 text-xs tracking-[2px] hover:bg-amber-500 hover:text-white cursor-pointer">
                                <button class="cursor-pointer w-full h-full" onclick="deletepost(${id})">Delete</button>
                            </li>
                        </ul>
                    </div>
                `;

            }





            const allImages = body.querySelectorAll(".img-post");
            const imgElement = allImages[allImages.length - 1];

            const isValid = await isImageValid(imageUrl);
            if (!isValid && imgElement) imgElement.style.display = "none";

            handelPostImage(imgElement); // ← هنا فقط

            gatCommendsUsers(id); // ← استدعاء بعد إدراج العنصر

        }



        body.addEventListener("click", function (e) {
            const target = e.target;

            if (target.classList.contains("icon-user")) {
                const postId = target.dataset.id;

                if (postId) {
                    const clickedUserId = parseInt(postId);
                    const currentUserId = parseInt(userData?.user?.id); // تأكد من النوع

                    // حفظ ID المستخدم الذي تم الضغط عليه
                    sessionStorage.setItem("selectedUserId", clickedUserId);

                    // توجيه للصفحة المناسبة
                    if (clickedUserId === currentUserId) {
                        window.location.href = "profile-page.html";
                    } else {
                        window.location.href = "other-profile-page.html";
                    }
                }
            }


            if (target.closest(".send-btn")) {
                const audio = target.closest("form").querySelector("#send-sound");
                if (audio) {
                    audio.currentTime = 0;
                    audio.play();
                }
            }

            if (target.closest(".react-btn")) {
                const btn = target.closest(".react-btn");
                btn.classList.toggle("clicked");
            }
        });


        const textareas = document.querySelectorAll(".auto-grow");
        textareas.forEach((el) => {
            el.addEventListener("input", function () {
                this.style.height = "auto";
                this.style.height = this.scrollHeight + "px";
            });
        });

    } catch (error) {
        if (document.location.href.includes("index.html")) {
            body.innerHTML = `
            <div class="spinner"></div>
        <h1 class="tracking-[8px]">${error.message}</h1>
        `;
        }
    }
}
window.addEventListener("scroll", function () {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
    if (endOfPage) {
        currentPage = currentPage + 1;
        getPosts(currentPage)
    }
})

function editPost(id) {
    let body = document.getElementById("body");
    console.log(id)
    const div = document.createElement("div");
    div.className = `box-edit`;
    div.id = `box-edit-${id}`;
    div.innerHTML = `
        <div id="edit" class="add fixed top-0 right-0 m-auto inset-0 w-[100%] flex justify-center items-center z-4000000"
            style="min-height: 200px;background-color: rgba(128, 128, 128, 0.295); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
            <form id="post-form"
                class="react-form w-[90%] max-w-md max-h-[90%] overflow-auto flex flex-col gap-5 justify-between items-center bg-white p-6 rounded-lg">
                <div class="body-input w-[100%] max-h-[20%] flex justify-between items-center">
                    <textarea rows="1" id="edit-head" required placeholder="What Do You think..."
                        class="auto-grow flex justify-center bg-gray-50 border border-gray-300 text-gray-900 items-center rounded-lg w-full text-sm resize-none overflow-hidden"></textarea>
                    <i class="fa-regular fa-image text-end w-[20%] text-xl text-blue-500" id="upload-icon"
                        style="cursor: pointer;"></i>
                </div>
                <div class="w-[100%]">
                    <textarea rows="1" id="edit-body" required placeholder="Subject..."
                        class="auto-grow flex justify-center bg-gray-50 border border-gray-300 text-gray-900 items-center rounded-lg w-full text-sm resize-none overflow-hidden"></textarea>
                </div>
                <div class="img-input w-[100%] max-h-[70%]" onclick="removeimage()">
                    <input type="file" id="image-input" accept="image/*" style="display: none;" />
                    <img id="edit-preview" class="w-full  h-full object-cover none" />
                </div>
                <div class="btn flex w-[100%] h-[10%] justify-center items-center gap-2">
                    <button type="button" id="update-post" onclick="edit(${id})"
                        data-id="${id}"
                        class="w-[50%] cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Update</button>
                    <button type="button" onclick="closeform(${id})"
                        class="w-[50%] cursor-pointer text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                </div>
            </form>
        </div>
    `;
    body.appendChild(div);

    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then(function (response) {
            const data = response.data.data;
            document.getElementById("edit-head").value = data.title;
            document.getElementById("edit-body").value = data.body;
            const preview = document.getElementById("edit-preview");

            const isImageEmpty = typeof data.image === "object" && Object.keys(data.image).length === 0;
            if (!data.image || isImageEmpty) {
                preview.style.display = "none";
            } else {
                preview.src = data.image;
                preview.style.display = "block";
            }
        })
        .catch(console.log);
}
function edit(postId) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const title = document.getElementById("edit-head").value;
    const body = document.getElementById("edit-body").value;
    axios.put(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
        title,
        body
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        let alertbox = document.getElementById("alert-box")
        alertbox.style.left = "-5%"
        alertbox.style.backgroundColor = "green"
        alertbox.innerHTML = "Post Edited Successfully Please Wait..."
        setTimeout(() => {
            alertbox.style.left = "-100%"
        }, 2000);
        console.log("Post updated", response);
        closeform(postId);
        getPosts();
    }).catch(function (error) {
        console.log("Update error", error);
    });
}

function deletepost(id) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            let alertbox = document.getElementById("alert-box")
            alertbox.style.left = "-5%"
            alertbox.style.backgroundColor = "red"
            alertbox.innerHTML = "Deleted Successfully Please Wait..."

            setTimeout(() => {
                alertbox.style.left = "-100%"
            }, 2000);

            getPosts();
            getDataFromLocalStorage()
        })
        .catch(function (error) {
            console.log("Delete error", error);
        });
}
function removeimage() {
    document.getElementById("image-input").value = "";
    document.getElementById("edit-preview").style.display = "none";
}
function closeform(id) {
    const editBox = document.getElementById("box-edit-" + id);
    if (editBox) editBox.remove();
}




//end get post data
//-----------------------------------------------------------------------------
//start get commends
// دالة التحقق من صلاحية الصورة
function isImageValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// دالة التعامل مع صورة البروفايل
async function handleImageProfile(img, fallback) {
    if (typeof img !== "string") {
        if (img && typeof img.url === "string") {
            img = img.url;
        } else {
            return fallback;
        }
    }

    const isValid = await isImageValid(img);
    return isValid ? img : fallback;
}

// ------------------------------
// الدالة الأساسية للتعليقات
function getCommends(event, id) {
    const box = event.target.closest('.details').querySelector('.commint-box');
    box.innerHTML = `<div class="spinner"></div>`;

    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then(async function (response) {
            let comments = response.data.data.comments;
            box.innerHTML = "";

            for (let [index, el] of comments.entries()) {
                let user = el.author;
                let Image = user.profile_image;
                let avatar = `${pathPrefix}assets/images/man-avatar.png`;
                let date = user.created_at.split("").slice(0, 10).join("");

                const imageUrl = await handleImageProfile(Image, avatar);
                const audioId = `send-sound-${id}-${index}`;

                box.innerHTML += `
                    <div class="one-commint rounded-lg flex justfiy-between items-center w-full ">
                        <div class="w-full flex items-start justify-between p-2 gap-2">
                            <div class="user-img flex pt-1 w-[15%] items-center justify-center gap-3">
                                <a class="link-profile">
                                    <img
                                        class="w-8 h-8 cursor-pointer rounded-full icon-user"
                                        src="${imageUrl}"
                                        alt="user photo"
                                        data-user-id="${user.id}"
                                        onclick="saveUserIdToSession(event)"
                                    />
                                </a>
                            </div>    
                            <div class="body-content w-[85%] p-2">
                                <div class="flex gap-2">
                                    <span class="text-md tracking-[2px] w-[200px] font-bold">${user.name}</span>
                                    <span class="text-sm flex justify-center items-center tracking-[2px]" style="font-size: 8px;">@${user.username}</span>
                                </div>
                                <div class="text-sm font-semibold tracking-[1px] py-[10px]" style="word-break: break-word; overflow-wrap: break-word;">
                                    <p>${el.body}</p>
                                </div>
                                <form class="react-form-two flex items-center justify-between gap-3">
                                    <div>
                                        <span class="text-[8px] tracking-[2px]">${date}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <div class="p-0 m-0">
                                            <button type="button" class="replay-btn text-[10px] tracking-[2px] border-0 bg-transparent">Replay</button>
                                        </div>
                                        <div class="p-0 m-0">
                                            <button type="button" class="react-btn w-full h-full">
                                                <i class="fa-solid fa-heart text-sm md:text-md xl:text-xl hover:text-md md:hover:text-xl xl:hover:text-2xl transition-all duration-300 cursor-pointer"></i>
                                            </button>
                                        </div>
                                        <audio id="${audioId}" src="assets/sound/happy-pop-2-185287.mp3" preload="auto"></audio>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
            }

            // الأحداث بعد التحميل
            document.body.addEventListener("click", function (e) {
                // تشغيل الصوت عند إرسال
                if (e.target.closest(".send-btn")) {
                    const form = e.target.closest("form");
                    if (form) {
                        const audio = form.querySelector("#send-sound");
                        if (audio) {
                            audio.currentTime = 0;
                            audio.play();
                        }
                    }
                }

                // زر الإعجاب
                if (e.target.closest(".react-btn")) {
                    const btn = e.target.closest(".react-btn");
                    const icon = btn.querySelector("i");
                    if (icon) {
                        icon.classList.toggle("clicked");
                    } else {
                        btn.classList.toggle("clicked");
                    }
                }
            });

            // زر Replay
            box.querySelectorAll(".replay-btn").forEach((btn) => {
                btn.addEventListener("click", function () {
                    const form = btn.closest("form").querySelector(".reply");
                    const isOpened = form.classList.contains("in");

                    if (!isOpened) {
                        form.classList.remove("out");
                        form.classList.add("in");
                        this.style.transform = "rotate(45deg)";
                    } else {
                        form.classList.remove("in");
                        form.classList.add("out");
                        this.style.transform = "rotate(0deg)";
                    }

                    this.style.transition = "0.5s ease-in-out";
                });
            });

            // تنسيقات بسيطة للصندوق
            box.style.margin = "20px 0px";
            box.style.borderTop = "1px solid rgba(128, 128, 128, 0.418)";
            box.style.borderBottom = "1px solid rgba(128, 128, 128, 0.418)";
        })
        .catch(function (error) {
            console.log(error);
        });
}


function saveUserIdToSession(event) {
    const userId = event.target.getAttribute("data-user-id");
    if (userId) {
        // مسح الـ ID القديم (اختياري لأن setItem بيغطي على القديم)
        sessionStorage.removeItem("selectedUserId");

        // حفظ الـ ID الجديد
        sessionStorage.setItem("selectedUserId", userId);

        // توجيه المستخدم للصفحة الخاصة بالبروفايل (لو مطلوب)
        window.location.href = "other-profile-page.html";
    }
}

getPosts()
//end get commends
//-----------------------------------------------------------------------------
//start handle click on image post 
function showFullImage(src) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    modalImg.src = src;
    modal.classList.remove("hidden");
}

function closeImage() {
    const modal = document.getElementById("image-modal");
    modal.classList.add("hidden");
}
//end handle click on image post
//-----------------------------------------------------------------------------------
//recall functions
type();
showSignOut();
// getDataFromLocalStorage()
