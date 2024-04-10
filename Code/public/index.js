let userData = {
    name: '',
    email: '',
    posts: [],
    following: [],
    followers: []
};

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
                    <img src="./assets/profile-10.jpg" alt="picture">
                </div>
                <div class="info">
                    <h3>Tom</h3>
                    <small>General, 15 MINUTES AGO</small>
                </div>
            </div>
        </div>
        <div class="photo">
            <img src="./assets/feed-1.jpg" alt="picture">
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
    const signupContent = `<div id="signup" class="page login-page " style="margin-top: 50px;"> 
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

    return !(password.length < minLength ||
        !lowercaseRegex.test(password) ||
        !uppercaseRegex.test(password) ||
        !numberRegex.test(password) ||
        !symbolRegex.test(password));

    
}

function loadLoginPage() {
    const loginContent = `<div id="login" class="page login-page ">
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

        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message); // Display success message
                handleLoginResponse(responseData);
                loadFeedPage();
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.error); // Display error message
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function handleLoginResponse(responseData) {
    if (responseData.userData) {
        // Directly updates the global userData variable
        userData.name = responseData.userData.name || '';
        userData.email = responseData.userData.email || '';
        userData.password = ''; //empty for security reasons
        userData.posts = responseData.userData.posts || [];
        userData.following = responseData.userData.following || [];
        userData.followers = responseData.userData.followers || [];

        // Log the updated userData to console
        console.log(userData);
    } else {
        console.error('Login failed or no user data provided.');
    }
}

function uploadFile(){
    console.log("Change pfp button clicked")
    //Clear server response
    serverResponse.innerHTML = "";

    //Get file that we want to upload
    let fileArray = document.getElementById("FileInput").files;
    if(fileArray.length !== 1){
        serverResponse.innerHTML = "Please select file to upload.";
        return;
    }

    //Put file inside FormData object
    const formData = new FormData();
    formData.append('myFile', fileArray[0]);

    //Set up HTTP Request
    let httpReq = new XMLHttpRequest();
    httpReq.onload = () => {
        let response = JSON.parse(httpReq.responseText);
        if("error" in response)//Error from server
            serverResponse.innerHTML = response.error;
        else
            serverResponse.innerHTML = "File uploaded successfully";
    };

    //Send off message to upload file
    httpReq.open('POST', '/upload');
    httpReq.send(formData);
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
                                    <img src="./assets/profile-1.jpg" alt="picture">
                                </div>
                                <div class="handle">
                                    <h4>${userData.name}</h4>
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
                                    <img src="./assets/profile-1.jpg" alt="picture">
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