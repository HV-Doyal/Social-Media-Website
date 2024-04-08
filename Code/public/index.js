//const { createHash } = require('hash.js');

let name;
let email;
let password;

document.addEventListener("DOMContentLoaded", () => {
    navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

function navigateTo(hash) {
    switch (hash) {
        case "#/signup":
            loadSignupPage();
            break;
        case "#/home":
            loadFeedPage();
            break;
        case "#/profile":
            loadProfilePage();
            break;
        default:
            loadLoginPage();
            break;
    }
}

function renderHeader() {
    return `<header>
            <nav>
                <div class="container">
                    <h2 class="logo">
                        MnK Hub
                    </h2>
                </div>
            </nav>
        </header>`;
}

function renderFooter() {
    return `<footer class="content">
                <p>©Mnk Hub by HVD</p>
            </footer>`;
}

function loadPageContent(content) {
    const app = document.getElementById("app");
    app.innerHTML = renderHeader() + content + renderFooter();
}

function loadSignupPage() {
    const signupContent = `<div id="signup" class="page login-page hidden" style="margin-top: 50px;"> 
                            <div class="login-form">
                                <div class="text">
                                    SIGNUP
                                </div>
                                <form id="signupForm">
                                    <div class="field">
                                        <input id="nameInput" type="text" placeholder="Name">
                                    </div>
                                    <div class="field">
                                        <input id="emailInput" type="text" placeholder="Email">
                                    </div>
                                    <div class="field">
                                        <input id="passwordInput" type="password" placeholder="Password">
                                    </div>
                                    <button id="signupButton">Sign Up</button>
                                    <div class="link">
                                        Already a member?
                                        <a href="#" onclick="loadLoginPage()">Log In</a>
                                    </div>
                                </form>
                            </div>
                        </div>`;
    loadPageContent(signupContent);

    //event listener to the signup form
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        // Save form data into global variables
        name = document.getElementById('nameInput').value;
        email = document.getElementById('emailInput').value;
        password = document.getElementById('passwordInput').value;
    });
}

function loadLoginPage() {
    const loginContent = `<div id="login" class="page login-page hidden">
                            <div class="login-form">
                                <div class="text">
                                    LOGIN
                                </div>
                                <form id="loginForm">
                                    <div class="field">
                                        <input id="emailInput" type="text" placeholder="Email">
                                    </div>
                                    <div class="field">
                                        <input id="passwordInput" type="password" placeholder="Password">
                                    </div>
                                    <button id="loginButton">LOGIN</button>
                                    <div class="link">
                                        Not a member?
                                        <a href="#" onclick="loadSignupPage()">Sign Up</a>
                                    </div>
                                </form>
                            </div>
                        </div>`;
    loadPageContent(loginContent);

    //event listener to the signup form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        // Save form data into global variables
        email = document.getElementById('emailInput').value;
        password = document.getElementById('passwordInput').value;
    });
}

function loadFeedPage() {
    const feedContent = `<section id="home" class="page home-page ">
    <div id="page-container">
        <div id="content-wrap">
            <main>
                <div class="container">
                    <div class="left">
                        <a class="profile">
                            <div class="profile-picture">
                                <img src="./assets/profile-1.jpg">
                            </div>
                            <div class="handle">
                                <h4>Harsh Doyal</h4>
                                <p class="text-muted">
                                    @HVD
                                </p>
                            </div>
                        </a>
                        <div class="sidebar">
                            <a class="menu-item active">
                                <span><i class="uil uil-home"></i></span> <h3>Home</h3>
                            </a>
                            <a class="menu-item ">
                                <span><i class="uil uil-message"></i></span> <h3>Messages</h3>
                            </a>
                        </div>
                    </div>

                    <div class="middle">
                        <form class="create-post">
                            <div class="profile-picture">
                                <img src="./assets/profile-1.jpg">
                            </div>
                            <input type="text" placeholder="What's on your mind?" id="create-post">
                            <input type="submit" value="Post" class="btn btm-primary">
                        </form>

                        <div class="feeds">
                            <div class="feed">
                                <div class="head">
                                    <div class="user">
                                        <div class="profile-picture">
                                            <img src="./assets/profile-10.jpg">
                                        </div>
                                        <div class="info">
                                            <h3>Tom</h3>
                                            <small>General, 15 MINUTES AGO</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo">
                                    <img src="./assets/feed-1.jpg">
                                </div>
                                <div class="action-button">
                                    <div class="interavtive-buttons">
                                        <span><i class="uil uil-heart"></i></span>
                                        <span><i class="uil uil-comment-alt"></i></span>
                                    </div>
                                </div>
                                <div class="caption">
                                    <p><b>Tom</b> GameGon 2024, LA</p>
                                </div>
                                <div class="comments text-muted">
                                    View all 10 comments
                                </div>
                            </div>
                            <div class="feed">
                                <div class="head">
                                    <div class="user">
                                        <div class="profile-picture">
                                            <img src="./assets/profile-9.jpg">
                                        </div>
                                        <div class="info">
                                            <h3>Moon</h3>
                                            <small>Baldur's Gate 3, 2 HOURS AGO</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo">
                                    <img src="./assets/feed-2.jpg">
                                </div>
                                <div class="action-button">
                                    <div class="interavtive-buttons">
                                        <span><i class="uil uil-heart"></i></span>
                                        <span><i class="uil uil-comment-alt"></i></span>
                                    </div>
                                </div>
                                <div class="caption">
                                    <p><b>Moon</b> Beautiful View</p>
                                </div>
                                <div class="comments text-muted">
                                    View all 26 comments
                                </div>
                            </div>
                            <div class="feed">
                                <div class="head">
                                    <div class="user">
                                        <div class="profile-picture">
                                            <img src="./assets/profile-8.jpg">
                                        </div>
                                        <div class="info">
                                            <h3>Hanzo</h3>
                                            <small>Baldur's Gate 3, 5 HOURS AGO</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo">
                                    <img src="./assets/feed-3.jpg">
                                </div>
                                <div class="action-button">
                                    <div class="interavtive-buttons">
                                        <span><i class="uil uil-heart"></i></span>
                                        <span><i class="uil uil-comment-alt"></i></span>
                                    </div>
                                </div>
                                <div class="caption">
                                    <p><b>Hanzo</b> New Character vibes</p>
                                </div>
                                <div class="comments text-muted">
                                    View all 5 comments
                                </div>
                            </div>
                            <div class="feed">
                                <div class="head">
                                    <div class="user">
                                        <div class="profile-picture">
                                            <img src="./assets/profile-13.jpg">
                                        </div>
                                        <div class="info">
                                            <h3>Jenny</h3>
                                            <small>PUBG MOBILE, 15 HOURS AGO</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo">
                                    <img src="./assets/feed-4.jpg">
                                </div>
                                <div class="action-button">
                                    <div class="interavtive-buttons">
                                        <span><i class="uil uil-heart"></i></span>
                                        <span><i class="uil uil-comment-alt"></i></span>
                                    </div>
                                </div>
                                <div class="caption">
                                    <p><b>Jenny</b> Having fun with friends</p>
                                </div>
                                <div class="comments text-muted">
                                    View all 250 comments
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    </div>
</section>`;
    loadPageContent(feedContent);
}

function loadProfilePage() {
    const profileContent = `<div class="text-center my-4">
                                <h2>Profile Page</h2>
                                <div class="border-2 border-gray-300 rounded p-4 m-2">
                                <p><strong>Name:</strong> John Doe</p>
                                <p><strong>Username:</strong> johndoe123</p>
                                <p><strong>Bio:</strong> This is a sample bio.</p>
                            </div>
                            </div>`;
    loadPageContent(profileContent);
}