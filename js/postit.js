const secretKey = CryptoJS.enc.Utf8.parse("123456789012345678901234");
const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

function setUser() {
    const name = document.getElementById("name").value.trim();

    if (name === "") {
        alert("Please enter your full name.");
        return;
    }

    document.getElementById("displayName").textContent = name;
    document.getElementById("userForm").classList.add("hidden");
    document.getElementById("postForm").classList.remove("hidden");
}

function createPost() {
    const userName = document.getElementById("displayName").textContent;
    const post = document.getElementById("post").value.trim();

    if (post === "") {
        alert("Please enter a caption.");
        return;
    }

    const date = new Date().toLocaleString();

    const postData = {
        userName: userName,
        post: post,
        date: date
    };

    const originalPost = JSON.stringify(postData);

    const encrypted = CryptoJS.AES.encrypt(
        originalPost,
        secretKey,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString();

    const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        secretKey,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString(CryptoJS.enc.Utf8);

    const postContainer = document.createElement("div");
    postContainer.className = "post";

    const originalTitle = document.createElement("h3");
    originalTitle.textContent = "ORIGINAL POST";

    const originalOutput = document.createElement("pre");
    originalOutput.className = "original";
    originalOutput.textContent = originalPost;

    const encryptedTitle = document.createElement("h4");
    encryptedTitle.textContent = "ENCRYPTED";

    const encryptedOutput = document.createElement("pre");
    encryptedOutput.className = "encrypted";
    encryptedOutput.textContent = encrypted;

    const decryptedTitle = document.createElement("h4");
    decryptedTitle.textContent = "DECRYPTED";

    const decryptedOutput = document.createElement("pre");
    decryptedOutput.className = "decrypted";
    decryptedOutput.textContent = decrypted;

    postContainer.appendChild(originalTitle);
    postContainer.appendChild(originalOutput);
    postContainer.appendChild(encryptedTitle);
    postContainer.appendChild(encryptedOutput);
    postContainer.appendChild(decryptedTitle);
    postContainer.appendChild(decryptedOutput);

    document.getElementById("thread").prepend(postContainer);
    document.getElementById("post").value = "";
}
