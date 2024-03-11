document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "http://localhost:8080/home";
});
document.getElementById("signupButton").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "http://localhost:8080/login";
});
function showPage() {
    const pages = document.querySelectorAll('.page');
    const path = window.location.pathname;

    // Hide all pages
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    // Show the page corresponding to the path
    if (path === '/' || path === '/login') {
        document.getElementById('login').classList.remove('hidden');
    } else if (path === '/signup') {
        document.getElementById('signup').classList.remove('hidden');
    } else if (path === '/home') {
        document.getElementById('home').classList.remove('hidden');
    } else if (path === '/M00953762') {
        document.getElementById('M00953762').classList.remove('hidden');
    }
}

// Initial call to show the correct page based on the URL path
showPage();

// Event listener to handle changes in the URL path
window.addEventListener('popstate', showPage);
