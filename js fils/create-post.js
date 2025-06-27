document.addEventListener("DOMContentLoaded", function () {
    createPost();
});

function createPost() {
    const headPost = document.getElementById("head-post");
    const bodyPost = document.getElementById("body-post");
    const addPost = document.getElementById("add-post");
    const imageInput = document.getElementById("image-input");

    addPost.addEventListener("click", () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const file = imageInput.files[0];

        const formData = new FormData();
        formData.append("title", headPost.value);
        formData.append("body", bodyPost.value);
        if (file) {
            formData.append("image", file);
        }

        axios.post('https://tarmeezacademy.com/api/v1/posts', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function (response) {
                let alertbox = document.getElementById("alert-box")
                alertbox.style.left = "-5%"
                alertbox.style.backgroundColor = "green"
                alertbox.innerHTML = "Post Created Successfully Please Wait..."
                setTimeout(() => {
                    alertbox.style.left = "-100%"
                }, 1000);
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 2000);
            })
    });
}



