const shorturl = document.querySelectorAll(".shorturl");
const copyBtn = document.querySelectorAll(".copybtn");
const copyMsg = document.querySelector(".copiesmsg");
const logoutBtn = document.querySelector("#logout");

copyBtn.forEach((item, index) => item.addEventListener('click', () => {
    navigator.clipboard.writeText(shorturl[index].href);
    copyMsg.style.display = "block";
    setTimeout(() => {
        copyMsg.style.display = "none";
    }, 4000);
}));

logoutBtn.addEventListener(()=>{
    browser.cookies.remove("authId")
})