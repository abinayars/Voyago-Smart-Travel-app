// ===============================
// Protect Pages
// ===============================

const protectedPages = [
    "dashboard.html",
    "planner.html",
    "trips.html",
    "expenses.html",
    "wishlist.html",
    "profile.html"
];

const currentPage = window.location.pathname.split("/").pop();

const token = localStorage.getItem("token");

if (protectedPages.includes(currentPage) && !token) {

    alert("Please login first.");

    window.location.href = "login.html";

}
const counters = document.querySelectorAll(".counter");

let started = false;

window.addEventListener("scroll", () => {

    const statsSection = document.querySelector(".stats");

    if (statsSection) {

        const sectionTop = statsSection.offsetTop - 300;

        if (window.scrollY >= sectionTop && !started) {

            counters.forEach(counter => {

                const target = +counter.getAttribute("data-target");

                let count = 0;

                const speed = target / 120;

                const update = () => {

                    if (count < target) {

                        count += speed;

                        if (count > target) count = target;

                        if (target === 50000) {
                            counter.innerText = Math.floor(count).toLocaleString() + "+";
                        } else if (target === 95) {
                            counter.innerText = Math.floor(count) + "%";
                        } else {
                            counter.innerText = Math.floor(count) + "+";
                        }

                        requestAnimationFrame(update);

                    }

                };

                update();

            });

            started = true;

        }

    }

});

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}
function toggleRegisterPassword(){

    const password = document.getElementById("regPassword");

    if(password.type === "password"){

        password.type = "text";

    }else{

        password.type = "password";

    }

}
window.onload = function () {
    window.scrollTo(0, 0);
};
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        console.log("Searching:", value);

        // We will connect this to the Planner,
        // Trips and Wishlist after the backend is ready.
    });
}
const bellBtn = document.getElementById("bellBtn");
const notificationBox = document.getElementById("notificationBox");

if (bellBtn && notificationBox) {

    bellBtn.addEventListener("click", () => {

        if (notificationBox.style.display === "block") {
            notificationBox.style.display = "none";
        } else {
            notificationBox.style.display = "block";
        }

    });

}
window.addEventListener("scroll", () => {

    const nav = document.getElementById("navbar");

    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

});
// ==========================
// Profile Dropdown
// ==========================

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

if (profileBtn && profileDropdown) {

    profileBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

    document.addEventListener("click", function () {

        profileDropdown.classList.remove("show");

    });

}
// ==========================
// Register Validation
// ==========================

function validateRegister(event){

    event.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(name === ""){
        alert("Please enter your full name.");
        return;
    }

    if(email === ""){
        alert("Please enter your email.");
        return;
    }

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        return;
    }

    if(password===""){
        alert("Please enter a password.");
        return;
    }

    if(confirmPassword===""){
        alert("Please confirm your password.");
        return;
    }

    if(password!==confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    alert("Registration Successful!");

    window.location.href="dashboard.html";
}
// ==========================
// Login Validation
// ==========================


        

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {
                


                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                alert(data.message);

                window.location.href = "dashboard.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            alert("Server not running.");

        }

    });

}

// ===============================
// Wishlist Modal
// ===============================

const wishlistModal = document.getElementById("wishlistModal");
const openWishlistModal = document.getElementById("openWishlistModal");
const closeWishlistModal = document.getElementById("closeWishlistModal");

if (openWishlistModal && wishlistModal) {

    openWishlistModal.addEventListener("click", () => {
        wishlistModal.style.display = "flex";
    });

}

if (closeWishlistModal && wishlistModal) {

    closeWishlistModal.addEventListener("click", () => {
        wishlistModal.style.display = "none";
    });

}

window.addEventListener("click", (e) => {

    if (e.target === wishlistModal) {
        wishlistModal.style.display = "none";
    }

});
// ===============================
// Save Wishlist
// ===============================

const saveWishlistBtn = document.getElementById("saveWishlistBtn");

if (saveWishlistBtn) {

    saveWishlistBtn.addEventListener("click", async () => {

        const destination = document.getElementById("wishDestination").value.trim();
        const country = document.getElementById("wishCountry").value.trim();
        const image = document.getElementById("wishImage").value.trim();

        if (!destination || !country || !image) {

            alert("Please fill all fields.");
            return;

        }

        try {

            const response = await fetch("http://localhost:5000/api/wishlist", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    destination,
                    country,
                    image
                })

            });

            if (response.ok) {

                alert("Destination added successfully!");

                document.getElementById("wishDestination").value = "";
                document.getElementById("wishCountry").value = "";
                document.getElementById("wishImage").value = "";

                wishlistModal.style.display = "none";

                loadWishlist();

            } else {

                alert("Failed to save destination.");

            }

        } catch (error) {

            console.error(error);
            alert("Server error.");

        }

    });

}
// ===============================
// Load Wishlist
// ===============================

async function loadWishlist() {

    const wishlistContainer = document.getElementById("wishlistContainer");

    if (!wishlistContainer) return;

    try {

        const response = await fetch("http://localhost:5000/api/wishlist");

        const wishlist = await response.json();

        wishlistContainer.innerHTML = "";


        wishlist.forEach((place) => {

            wishlistContainer.innerHTML += `

                <div class="wish-card">

                    <img src="${place.image}" alt="${place.destination}">

                    <h3>${place.destination}</h3>

                    <p>${place.country}</p>

                    <button onclick="deleteWishlist('${place._id}')">
                        Remove
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load wishlist.");

    }

}

// Automatically load wishlist when the page opens
