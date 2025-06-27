// دالة فحص صلاحية الصورة
async function isImageValid(url) {
    if (typeof url !== "string" || !url.startsWith("http")) return false;

    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok && res.headers.get("Content-Type")?.startsWith("image");
    } catch {
        return false;
    }
}
const pathPrefixThree = location.hostname.includes("github.io") ? "/NEXILY/" : "./";




// إخفاء الفوتر مؤقتًا
document.getElementById("footer-profile-two").style.display = "none";

// إظهار الفوتر بعد 3 ثواني
setTimeout(() => {
    document.getElementById("footer-profile-two").style.display = "unset";

    // إخفاء شاشة التحميل
    const loader = document.getElementById("loader-screen");
    if (loader) loader.style.display = "none";
}, 3000);

// دالة استرجاع صورة بروفايل صالحة أو fallback
async function handleImageProfile(imageUrl, fallbackUrl) {
    const isValid = await isImageValid(imageUrl);
    return isValid ? imageUrl : fallbackUrl;
}


AOS.init();
function showFullImagetwo(src) {
    const modal = document.getElementById("image-modal-two");
    const modalImg = document.getElementById("modal-img-two");
    modalImg.src = src;
    modal.classList.remove("hidden");
}

function closeImagetwo() {
    const modal = document.getElementById("image-modal-two");
    modal.classList.add("hidden");
}

let userId = sessionStorage.getItem("selectedUserId")


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



async function getdata(userId) {

    try {

        const response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`);
        const userData = response.data.data;

        const avatarFallback = `${pathPrefixThree}assets/images/man-avatar.png`;
        const storedData = localStorage.getItem("data") || sessionStorage.getItem("data");
        const parsedData = JSON.parse(storedData);
        const meData = parsedData;

        // استبدال صورة البروفايل إذا كانت غير صالحة
        const avatarURL = await handleImageProfile(
            typeof userData.profile_image === "string"
                ? userData.profile_image
                : userData.profile_image?.url || "",
            avatarFallback
        );

        const avatarURLmain = await handleImageProfile(
            typeof meData.user.profile_image === "string"
                ? meData.user.profile_image
                : meData.user.profile_image?.url || "",
            avatarFallback
        );


        // تغيير الصورة في النافبار
        let userPhoto = document.querySelector(".user-photo");
        if (userPhoto) {
            userPhoto.src = avatarURLmain;
        }


        // تعبئة البيانات في معلومات المستخدم
        document.getElementById("user-info-two").innerHTML = `
            <span class="block text-sm ">@ ${meData.user.username}</span>
            <span class="block text-xs truncate">${meData.user.email}</span>
        `;

        document.getElementById("hero-section-profile").innerHTML = `
          <div id="details" class="details flex flex-wrap md:flex-nowrap justify-center items-center px-[10%] items-center mh-[300px] md:mb-[100px]">
                <div class="img flex justify-center items-center relative w-full h-[100px] md:h-[200px] mx-auto">
                    <img src="${avatarURL}"
                        class="w-[100px] h-[100px] sm:h-[150px] sm:w-[150px] md:w-[200px] md:h-[200px] rounded-full"
                        alt="">
                </div>
                <div class="name-numbers w-full h-[50%] flex flex-col justify-between items-center gap-5 md:pt-8 pb-10">
                    <div class="name px-4 pt-10 md:w-full md:flex md:justify-start md:items-center md:gap-2">
                        <h1 class="tracking-[5px] text-md sm:text-xl md:text-2xl md:text-start md:justify-start md:items-start font-bold text-center flex flex-col justify-center gap-4 items-center"
                            style="text-transform: capitalize;">
                            ${userData.name}
                            <span class="text-xs sm:text-sm md:text-md m-0 p-0 flex justify-center items-center tracking-[3px]">@${userData.username}</span>
                        </h1>
                    </div>
                    <div class="numbers flex justify-center items-center md:justify-start w-[100%] h-[50%] gap-5">
                        <div class="posts w-[50px] h-[50px] flex flex-col justify-center items-center p-10">
                            <span class="font-bold">${userData.posts_count}</span>
                            <h3 class="text-xs m-0 p-0 tracking-[3px]">Posts</h3>
                        </div>
                        <div class="Comments w-[120px] h-[50px] flex flex-col justify-center items-center p-10">
                            <span class="font-bold" id="comments-quantity">0</span>
                            <h3 class="text-xs m-0 p-0 tracking-[3px]">Comments</h3>
                        </div>
                        <div class="Images w-[50px] h-[50px] flex flex-col justify-center items-center p-10">
                            <span class="font-bold" id="images-quantity">0</span>
                            <h3 class="text-xs m-0 p-0 tracking-[3px]">Images</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[100%]">
                <div class="taps flex justify-center items-center pb-[100px]  px-2">
                    <ul class="w-[90%] sm:w-[80%] md:w-[70%] md:h-[50px] h-[40px] flex justify-between items-center gap-0.5 tracking-[2px]" id="tabs">
                        <li id="post-tap"
                            class="clicked-two cursor-pointer text-white w-[50%] h-[100%] flex justify-center items-center text-xs active">
                            Posts</li>
                        <li id="images"
                            class="cursor-pointer text-white w-[50%] h-[100%] flex justify-center items-center text-xs ">
                            Images</li>
                    </ul>
                </div>
                <div class="posts-profile" id="posts-profile"></div>
                <div class="images-profile md:w-[80%] mb-[200px] m-auto flex flex-wrap justify-center items-center gap-[2%] p-2" id="images-profile"></div>
            </div>
        `;
        axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
            .then(function (response) {
                let posts = response.data.data;

                let totalComments = posts.reduce((sum, post) => sum + post.comments_count, 0);
                document.getElementById("comments-quantity").innerHTML = `${totalComments}`
            });

        axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
            .then(async function (response) {
                const posts = response.data.data;
                const postsContainer = document.getElementById("posts-profile");

                // helper functions for image validation
                async function isImageValid(url) {
                    if (typeof url !== "string") return false;

                    try {
                        const res = await fetch(url, { method: "HEAD" });
                        return res.ok && res.headers.get("Content-Type")?.startsWith("image");
                    } catch {
                        return false;
                    }
                }


                if (posts.length !== 0) {
                    for (const post of posts) {
                        const postId = post.id;

                        const avatar = `${pathPrefixThree}assets/images/man-avatar.png`;
                        const profileImage = await handleImageProfile(
                            typeof post.author.profile_image === "string"
                                ? post.author.profile_image
                                : post.author.profile_image?.url || "",
                            avatar
                        );

                        let postImageHTML = "";
                        const isPostImageValid = await isImageValid(post.image);
                        if (isPostImageValid) {
                            postImageHTML = `<img onclick="showFullImage('${post.image}')" class="img-post p-[10px] h-[350px] w-[100%] object-cover cursor-pointer" src="${post.image}" alt="post image" />`;
                        }

                        postsContainer.innerHTML += `
                        <div id="post-${postId}" class="post m-auto rounded-lg shadow-sm md:w-3xl sm:w-2xl w-[95%]" data-aos="zoom-in">
                            <div class="flex justify-between items-center w-[100%]">
                                <div class="user py-[10px] px-[20px] flex items-center justify-start gap-3 ">
                                    <img class="w-8 h-8 cursor-pointer rounded-full" src="${profileImage}" alt="user photo">
                                    <div class="flex justify-between flex-col gap-1 items-start">
                                    <span class="text-sm font-bold">${post.author.name}</span>
                                    <span class="text-sm tracking-[2px]" style="font-size: 8px;">@ ${post.author.username}</span>
                                    </div>
                                </div>
                                <div class="edit-post px-12 relative">
                                </div>
                            </div>
    
                            ${postImageHTML}
                            <div class="details p-[10px] flex flex-col justify-between gap-3">
                                <h5 class="post-title text-3xl font-bold tracking-tight">${post.title}</h5>
                                <p class="post-description text-sm font-normal" style=" word-break: break-word; overflow-wrap: break-word;">${post.body}</p>
                                <div class="commint-box w-full flex flex-col justfiy-between items-start p-4"></div>
                                <div class=" flex flex-col items-center justify-between">
                                    <div class="w-[100%] flex gap-3 justify-center items-center py-5">
                                        <span class="w-[50%] inline-block font-bold py-1 text-[10px]">${post.created_at}</span>
                                        <div class="w-[50%] flex gap-3 justify-end items-center">
                                            <div id="comment-users-${userId}" class="flex cursor-pointer -space-x-2 rtl:space-x-reverse" onclick="event.preventDefault(); getCommends(event, ${userId})"></div>
                                            <span class="quantity-commend flex items-center text-[8px] font-normal tracking-[2px] cursor-pointer" onclick="getCommendsTwo(event, ${postId})">
                                                ${post.comments_count === 0 ? "No Comments" : post.comments_count + " comments"}
                                            </span>
                                        </div>
                                   </div>
                            <form id="post-${postId}" class="flex justify-between items-end react-form w-[100%] bg-transparent flex gap-2" onsubmit="event.preventDefault(),createCommend(event, ${postId});">
                                    <div class="send w-[15%] h-[100%] p-0 mb-2">
                                        <button type="submit" class="send-btn w-full h-full"><i
                                                class="fa-solid fa-paper-plane hover:text-xl transition-all duration-300 cursor-pointer"></i></button>
                                    </div>
    
                                    <div class="commint w-[70%]">
                                        <textarea 
                                        rows="1"
                                        placeholder="Speak Now..."
                                        class="auto-grow-two flex justify-center items-center rounded-lg w-full text-sm  border border-gray-600 resize-none overflow-hidden bg-transparent"
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

                        if (post.author.id === meData.user.id) {

                            const allHeadPosts = postsContainer.querySelectorAll('.edit-post');
                            const currentPost = allHeadPosts[allHeadPosts.length - 1];

                            currentPost.innerHTML = `
                                                        <button type="button" onclick="toggleControl(this)"  class="dropdown-btn flex text-sm rounded-full md:me-0 border-0 outline-0">
                                                            <i class="fa-solid fa-ellipsis text-xl cursor-pointer"></i>
                                                        </button>
                                                        <div class="z-50 control hidden my-4 text-base list-none divide-y rounded-lg shadow-sm"
                                                            style="background-color: rgba(128, 128, 128, 0.295); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
                                                            <ul class="py-2">
                                                                <li class="py-2 px-10 text-xs tracking-[2px] hover:bg-amber-500 hover:text-white cursor-pointer">
                                                                    <button class="cursor-pointer">Edit</button>
                                                                </li>
                                                                <li class="py-2 px-10 text-xs tracking-[2px] hover:bg-amber-500 hover:text-white cursor-pointer">
                                                                    <button class="cursor-pointer">Delete</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    `;
                        }
                    }

                    document.body.addEventListener("click", function (e) {
                        // زر الإرسال
                        let sendBtn = e.target.closest("button.send-btn");
                        if (sendBtn) {
                            const form = sendBtn.closest("form");
                            if (form) {
                                const audio = form.querySelector("audio");
                                if (audio) {
                                    audio.currentTime = 0;
                                    audio.play();
                                }
                            }
                        }

                        // زر الإعجاب (القلب)
                        let heartBtn = e.target.closest(".react-btn");
                        if (heartBtn) {
                            const icon = heartBtn.querySelector("i");
                            if (icon) {
                                icon.classList.toggle("clicked");
                            } else {
                                heartBtn.classList.toggle("clicked");
                            }
                        }
                    });



                    const textareasTwo = document.querySelectorAll(".auto-grow-two");

                    textareasTwo.forEach((el) => {
                        el.addEventListener("input", function () {
                            this.style.height = "auto";
                            this.style.height = this.scrollHeight + "px";
                        });
                    });
                } else {
                    postsContainer.innerHTML = `<h1 class="w-[100%] text-center text-3xl font-bold my-[150px] tracking-[5px]">No Posts Yet</h1>`;
                }

                async function isImageValid(url) {
                    try {
                        const res = await fetch(url, { method: "HEAD" });
                        return res.ok && res.headers.get("Content-Type")?.startsWith("image");
                    } catch {
                        return false;
                    }
                }


                const imagesBox = document.getElementById("images-profile");
                let imageCount = 0;
                imagesBox.innerHTML = ""; // نفرّغ الحاوية أولًا

                for (const el of posts) {
                    const valid = await isImageValid(el.image);
                    if (valid) {
                        imageCount++;
                        imagesBox.innerHTML += `
                            <img
                                onclick="showFullImagetwo('${el.image}')"
                                class="img-only md:p-[10px] h-[150px] md:h-[200px] w-[48%] md:w-[32%] object-cover cursor-pointer"
                                src="${el.image}"
                                alt="post image"
                            />
                        `;
                    }
                }

                // تحديث العداد أو عرض رسالة لا توجد صور
                if (imageCount > 0) {
                    document.getElementById("images-quantity").innerText = `${imageCount}`;
                    const hide = document.getElementById("hide");
                    if (hide) hide.style.display = "none";
                } else {
                    imagesBox.innerHTML = `<h1 id="hide" class="w-full text-center text-3xl font-bold my-36 tracking-[5px]">No Images Yet</h1>`;
                    document.getElementById("images-quantity").innerText = "0";
                }


            })
            .catch(function (error) {
                console.log(error);
            });
        //start handle taps profile page
        document.getElementById("images-profile").style.display = "none"
        document.getElementById("post-tap").addEventListener("click", function () {
            document.getElementById("posts-profile").style.display = "unset"
            document.getElementById("images-profile").style.display = "none"
            document.getElementById("images").classList.remove("clicked-two")
            this.classList.add("clicked-two")
        })
        document.getElementById("images").addEventListener("click", function () {
            document.getElementById("posts-profile").style.display = "none"
            document.getElementById("images-profile").style.display = "flex"
            document.getElementById("post-tap").classList.remove("clicked-two")
            this.classList.add("clicked-two")
        })



    } catch (error) {
        console.error("حدث خطأ:", error);
    }
}

// document.getElementById("footer-profile").style.display = "unset";
function getCommendsTwo(event, id) {
    const box = event.target.closest('.details').querySelector('.commint-box');
    box.innerHTML = `<div class="spinner"></div>`;

    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then(async function (response) {
            let comments = response.data.data.comments;
            box.innerHTML = "";

            for (let [index, el] of comments.entries()) {
                let user = el.author;
                let Image = el.author.profile_image;
                let avatar = `${pathPrefix}assets/images/man-avatar.png`;
                let date = el.author.created_at.split("").slice(0, 10).join("")
                box.style.margin = "20px 0px"
                box.style.borderTop = "1px solid rgba(128, 128, 128, 0.418)"
                box.style.borderBottom = "1px solid rgba(128, 128, 128, 0.418)"
                const imageUrl = await handleImageProfile(Image, avatar);

                const audioId = `send-sound-two-${id}-${index}`;

                box.innerHTML += `
                    <div class="one-commint rounded-lg flex justfiy-between items-center w-full ">
                        <div class="w-full flex items-start justify-between p-2 gap-2">
                         
                            <div class="user-img flex pt-1 w-[15%] items-center justify-center gap-3">
                                    <img
                                        class="w-8 h-8 cursor-pointer rounded-full"
                                        src="${imageUrl}"
                                        data-user-id="${user.id}" 
                                        onclick="saveUserIdToSession(event)"
                                        onerror="this.onerror=null; this.src='assets/images/default-image.png';"
                                        alt="user photo"
                                    >  
                            </div>    
                                
                            <div class="body-content w-[85%] p-2 ">
                                <div class="flex gap-2">
                                    <span class="text-md tracking-[2px] font-bold">${user.name}</span>
                                    <span class="text-sm flex jusustify-center items-center tracking-[2px]" style="font-size: 8px;">@${user.username}</span>
                                </div>
                                <div class="text-sm font-semibold tracking-[1px] py-[10px]" style=" word-break: break-word; overflow-wrap: break-word;">
                                    <p>${el.body}</p>
                                </div>
                                <form class="react-form-two flex items-center justify-between gap-3">
                                    <div>
                                        <span class="text-[8px] tracking-[2px]">
                                            ${date}
                                        </span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <div class="p-0 m-0">
                                            <button type="button" class="replay-btn text-[10px] tracking-[2px]  border-0 bg-transparent">Replay</button>
                                        </div>
                                        <div class="p-0 m-0">
                                            <button type="button" class="react-btn-two w-full h-full"><i class="fa-solid fa-heart text-sm md:text-md xl:text-xl hover:text-md md:hover:text-xl xl:hover:text-2xl transition-all duration-300 cursor-pointer"></i></button>
                                        </div>
                                            <audio id="${audioId}" src="assets/sound/happy-pop-2-185287.mp3" preload="auto"></audio>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
            }



            function isImageValid(url) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                    img.src = url;
                });
            }


            // دالة التعامل الآمن مع صورة البروفايل
            async function handleImageProfile(img, fallback) {
                // تأكد أن img نص صالح أو حاول استخراج الرابط منه
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
        })

        .catch(function (error) {
            console.log(error);
        });
}


function saveUserIdToSession(event) {
    const userId = event.target.getAttribute("data-user-id");
    if (userId) {
        sessionStorage.removeItem("selectedUserId");
        sessionStorage.setItem("selectedUserId", userId);
        window.location.href = "other-profile-page.html";
    }
}


getdata(userId)

function showSignOut() {
    const linkBoxes = document.querySelectorAll(".links");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
        linkBoxes.forEach(linksBox => {
            if (!linksBox.querySelector("#sign-out-btn")) {
                const signOutItem = document.createElement("li");
                signOutItem.innerHTML = `
                    <button type="button" id="sign-out-btn" class="block w-full text-center cursor-pointer px-4 py-2 focus:outline-2 text-sm hover:bg-amber-500 rounded-sm">
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
                }, 1000); setTimeout(() => {
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
showSignOut();
