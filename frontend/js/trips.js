console.log("Trips.js Loaded");
const tripContainer = document.getElementById("tripContainer");
const tripSearch = document.getElementById("tripSearch");
let allTrips = [];

// Load Trips from MongoDB
async function loadTrips() {

    try {

        const response = await fetch("http://localhost:5000/api/trips");
        console.log(response);

        const trips = await response.json();
        allTrips = trips;
        console.log(trips);
        alert("Total Trips: " + trips.length);

        tripContainer.innerHTML = "";

        
       allTrips.forEach((trip, index) => {

    console.log("Rendering Trip:", trip);

    const card = document.createElement("div");
    card.className = "trip-card";

    card.innerHTML = `
        <h2>${trip.tripName}</h2>

        <p><strong>📍 Destination:</strong> ${trip.destination}</p>

        <p><strong>📅 Dates:</strong>
        ${trip.startDate ? trip.startDate.substring(0,10) : "N/A"}
        →
        ${trip.endDate ? trip.endDate.substring(0,10) : "N/A"}
        </p>

        <p><strong>💰 Budget:</strong> ₹${trip.budget}</p>

        <p><strong>🚦 Status:</strong> ${trip.status}</p>
        <button class="edit-trip-btn"
        onclick="editTrip('${trip._id}')">
    ✏ Edit
</button>
        <button class="delete-trip-btn"
         onclick="deleteTrip('${trip._id}')"> 
         🗑 Delete 
         </button>
    `;

    tripContainer.appendChild(card);

});

    }

    catch (error) {

        console.error(error);

    }

}

loadTrips();

async function deleteTrip(id) {

    const confirmDelete = confirm("Delete this trip?");

    if (!confirmDelete) return;

    try {
             const response = await fetch(
            `http://localhost:5000/api/trips/${id}`,
            {
                method: "DELETE"
            }
        );
        const data = await response.json();

        alert(data.message);

        loadTrips();

    }

    catch (error) {

        console.error(error);
        }
    }
 async function editTrip(id) {

    const newName = prompt("Enter new Trip Name:");

    if (!newName) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/trips/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tripName: newName
                })
            }
        );  
      const data = await response.json();

        alert(data.message);

        loadTrips();

    }

    catch (error) {

        console.error(error);

    }

}    
// ==========================
// Search Trips
// ==========================

if (tripSearch) {

    tripSearch.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".trip-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });
    

}