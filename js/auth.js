// ===============================
// FRESHCART AUTHENTICATION
// ===============================

// Get registered users from Local Storage
function getUsers() {
    return JSON.parse(localStorage.getItem("freshcartUsers")) || [];
}


// Save users to Local Storage
function saveUsers(users) {
    localStorage.setItem("freshcartUsers", JSON.stringify(users));
}


// ===============================
// SIGNUP
// ===============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        // Check password
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Get existing users
        const users = getUsers();

        // Check whether email already exists
        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            alert("An account with this email already exists!");
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        // Add user
        users.push(newUser);

        // Save user
        saveUsers(users);

        alert("Account created successfully! 🎉");

        // Go to user page
        window.location.href = "user.html";
    });
}