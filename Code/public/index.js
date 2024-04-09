let name;
let email;
let password;
let getEmail;

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

function loadPost() {
    const postContent = `<div class="feed">
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
            <div class="interactive-buttons">
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
    </div>`;

    // Get the feeds container
    const feedsContainer = document.querySelector('.feeds');

    // Append the post content to the feeds container
    feedsContainer.insertAdjacentHTML('beforeend', postContent);
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

    //Event listener to the signup form submit button
    document.getElementById('signupButton').addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get user input values
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        // Check if any field is empty
        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Validate password complexity
        if (!validatePassword(password)) {
            const errorData = { error: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.' };
            console.error('Error:', errorData.error);
            alert(errorData.error);
            return;
        }

        // Create user object with the input values
        const userData = {
            name,
            email,
            password,
            posts: [],
            following: [],
            followers: []
        };

        try {
            // Send HTTP POST request to server with user data
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('User registered successfully!');
                loadFeedPage();
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.error);
                // Display error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

// Function to validate password complexity
function validatePassword(password) {
    const minLength = 8;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=]/; // Add more symbols if needed

    if (password.length < minLength ||
        !lowercaseRegex.test(password) ||
        !uppercaseRegex.test(password) ||
        !numberRegex.test(password) ||
        !symbolRegex.test(password)) {
        return false;
    }

    return true;
}

async function loadLoginPage() {
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

    // Event listener for the login form submission
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get email and password entered by the user
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        try {
            // Send a POST request to the server to authenticate the user
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Check if the request was successful
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message); // Display success message
                loadFeedPage();
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.error); // Display error message

                // Display alert for incorrect password or user not found
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error scenario
        }
    });
}

function loadFeedPage() {
    const feedContent = `<section id="home" class="page home-page">
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
                                    <h4>${name}</h4>
                                </div>
                            </a>
                            <div class="sidebar">
                                <a class="menu-item active">
                                    <span><i class="uil uil-home"></i></span> <h3>Home</h3>
                                </a>
                                <a class="menu-item">
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
                                <!-- Posts will be loaded dynamically here -->
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </section>`;

    loadPageContent(feedContent);
    // Load posts into the feeds section
    loadPost();
    loadPost();
    loadPost();
    loadPost();
    loadPost();
    loadPost();
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