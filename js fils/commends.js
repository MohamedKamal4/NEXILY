function createCommend(event, id) {
    event.preventDefault();

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const form = document.querySelector(`#post-${id}`);
    const textarea = form.querySelector("textarea");
    const commentText = textarea?.value.trim();
    let alertbox = document.getElementById("alert-box")



    if (!commentText) {
        alertbox.style.left = "-5%"
        alertbox.style.backgroundColor = "red"
        alertbox.innerHTML = "Please Write Your Comment"

        setTimeout(() => {
            alertbox.style.left = "-100%"
        }, 3000);
        return;
    }

    axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
        { body: commentText },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
        .then(function (response) {
            console.log("✅ تم إرسال التعليق:", response.data);
            textarea.value = ""; // تفريغ الحقل
            getCommends(event, id)
        })
        .catch(function (error) {
            console.error("❌ خطأ في إرسال التعليق:", error.response?.data?.message || error.message);
        });
}
