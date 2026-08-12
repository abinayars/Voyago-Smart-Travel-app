const wishlistContainer = document.getElementById("wishlistContainer");
const wishlistModal = document.getElementById("wishlistModal");
const openWishlistModal = document.getElementById("openWishlistModal");
const closeWishlistModal = document.getElementById("closeWishlistModal");
const saveWishlistBtn = document.getElementById("saveWishlistBtn");

const wishDestination = document.getElementById("wishDestination");
const wishCountry = document.getElementById("wishCountry");
const wishImage = document.getElementById("wishImage");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderWishlist() {
    wishlistContainer.innerHTML = "";

    wishlist.forEach((place, index) => {
        wishlistContainer.innerHTML += `
        <div class="wish-card">
            <img src="${place.image}" alt="${place.destination}">
            <h3>${place.destination}</h3>
            <p>${place.country}</p>
            <button onclick="deleteWish(${index})">Delete</button>
        </div>
        `;
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

openWishlistModal.onclick = () => {
    wishlistModal.style.display = "flex";
};

closeWishlistModal