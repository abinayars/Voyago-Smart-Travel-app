

// ======================================
// SMART TRIP PLANNER
// ======================================

// Elements
const itineraryContainer = document.getElementById("itineraryContainer");
const addDayBtn = document.getElementById("addDayBtn");

const tripModal = document.getElementById("tripModal");
const openTripModal = document.getElementById("openTripModal");
const closeTripModal = document.getElementById("closeTripModal");
const tripForm = document.getElementById("tripForm");

const overviewDestination = document.getElementById("overviewDestination");
const overviewDates = document.getElementById("overviewDates");
const overviewBudget = document.getElementById("overviewBudget");
const overviewStatus = document.getElementById("overviewStatus");
const tripNotes = document.getElementById("tripNotes");
const savePlannerBtn = document.getElementById("savePlannerBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

let dayCount = 0;
let itinerary = [];

// ===============================
// Backend API
// ===============================
const API_URL = "http://localhost:5000/api/trips";

// ===============================
// Save Itinerary
// ===============================

function saveItinerary() {

    localStorage.setItem(
        "itineraryData",
        JSON.stringify(itinerary)
    );

}

// ===============================
// Open Modal
// ===============================

if (openTripModal) {

    openTripModal.addEventListener("click", () => {

        tripModal.style.display = "flex";

    });

}

// ===============================
// Close Modal
// ===============================

if (closeTripModal) {

    closeTripModal.addEventListener("click", () => {

        tripModal.style.display = "none";

    });

}

// ===============================
// Close when clicking outside
// ===============================

window.addEventListener("click", (e) => {

    if (e.target === tripModal) {

        tripModal.style.display = "none";

    }

});

 // ===============================
// Create Trip
// ===============================

if (tripForm) {

   tripForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        // Get Form Values
        const tripName = document.getElementById("tripName").value.trim();
        const destination = document.getElementById("tripDestination").value.trim();
        const startDate = document.getElementById("tripStartDate").value;
        const endDate = document.getElementById("tripEndDate").value;
        const travelers = document.getElementById("tripTravelers").value;
        const budget = document.getElementById("tripBudget").value;
        const status = document.getElementById("tripStatus").value;

        // Validation
        if (
            !tripName ||
            !destination ||
            !startDate ||
            !endDate ||
            !travelers ||
            !budget
        ) {
            alert("Please fill all fields.");
            return;
        }


       // Create Trip Object
const trip = {
    tripName,
    destination,
    startDate,
    endDate,
    travelers,
    budget,
    status
};
   // Save Trip locally
localStorage.setItem("tripData", JSON.stringify(trip));
fetch("http://localhost:5000/api/trips", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(trip)

})
.then(response => response.json())
.then(data => {

    console.log("Trip saved to MongoDB:", data);

})
.catch(error => {

    console.error("Error:", error);

});

// Update Overview Cards
overviewDestination.textContent = trip.destination;
overviewDates.textContent = `${trip.startDate} → ${trip.endDate}`;
overviewBudget.textContent = `₹${trip.budget}`;
overviewStatus.textContent = trip.status;
console.log("Trip Created Successfully!");

// Close Modal
tripModal.style.display = "none";

// Reset Form
tripForm.reset();

});

}
// ===============================
// Create Day Card
// ===============================
function createDayCard(day) {

    const dayCard = document.createElement("div");
    dayCard.className = "day-card";

    dayCard.innerHTML = `
        <div class="day-header">
            <h3>📅 Day ${day.day}</h3>

            <button class="add-activity-btn">
                + Add Activity
            </button>

            <button class="delete-day-btn">
                🗑 Delete Day
            </button>
        </div>

        <div class="activity-list"></div>
    `;

    itineraryContainer.appendChild(dayCard);

    const activityList = dayCard.querySelector(".activity-list");

    day.activities.forEach(activity => {
        createActivity(activityList, day.day - 1, activity);
    });

  dayCard.querySelector(".add-activity-btn")
.addEventListener("click", () => {

    const newActivity = {

        time: "",
        name: ""

    };

    itinerary[day.day - 1].activities.push(newActivity);

    saveItinerary();

    renderItinerary();

});  

    dayCard.querySelector(".delete-day-btn")
        .addEventListener("click", () => {

            itinerary.splice(day.day - 1, 1);

            itinerary.forEach((d, index) => {
                d.day = index + 1;
            });

            dayCount = itinerary.length;

            saveItinerary();

            renderItinerary();

        });

} 

// ===============================
// Add Day
// ===============================
if (addDayBtn) {

    addDayBtn.addEventListener("click", () => {

        dayCount++;

        itinerary.push({

            day: dayCount,
            activities: []

        });

        saveItinerary();

        renderItinerary();

    });

}         
// ===============================
// Load Trip from MongoDB
// ===============================

fetch("http://localhost:5000/api/trips")

.then(response => response.json())

.then(trips => {

    if (trips.length > 0) {

        const latestTrip = trips[trips.length - 1];

        overviewDestination.textContent = latestTrip.destination;
        overviewDates.textContent =
            `${latestTrip.startDate.substring(0,10)} → ${latestTrip.endDate.substring(0,10)}`;
        overviewBudget.textContent = `₹${latestTrip.budget}`;
        overviewStatus.textContent = latestTrip.status;

    }

})

.catch(error => {

    console.error("Error loading trips:", error);

});
// ===============================
// Render Itinerary
// ===============================
function renderItinerary() {

    itineraryContainer.innerHTML = "";

    itinerary.forEach(day => {

        createDayCard(day);

    });

}

// ===============================
// Load Itinerary
// ===============================
function loadItinerary() {

    const saved = JSON.parse(localStorage.getItem("itineraryData"));

    if (!saved) return;

    itinerary = saved;

    dayCount = itinerary.length;

    renderItinerary();

}
// ===============================
// Travel Notes
// ===============================

if (tripNotes) {

    // Load saved notes
    const savedNotes = localStorage.getItem("tripNotes");

    if (savedNotes) {
        tripNotes.value = savedNotes;
    }

    // Auto-save while typing
    tripNotes.addEventListener("input", () => {

        localStorage.setItem(
            "tripNotes",
            tripNotes.value
        );

    });

}

// ===============================
// Initialize Planner
// ===============================
loadItinerary();
// ===============================
// Create Activity
// ===============================

function createActivity(activityList, dayIndex, activity = { time: "", name: "" }) {

    const activityDiv = document.createElement("div");
    activityDiv.className = "activity-item";

    activityDiv.innerHTML = `
        <div class="activity-row">
            <input type="time" class="activity-time" value="${activity.time}">
            <input type="text" class="activity-name" placeholder="Activity Name" value="${activity.name}">
            <button class="delete-activity">🗑</button>
        </div>
    `;

    activityList.appendChild(activityDiv);


    const timeInput = activityDiv.querySelector(".activity-time");
    const nameInput = activityDiv.querySelector(".activity-name");

    updateActivity();

    function updateActivity() {

    const activityIndex =
        Array.from(activityList.children).indexOf(activityDiv);

    if (!itinerary[dayIndex].activities[activityIndex]) {

        itinerary[dayIndex].activities.push({
            time: "",
            name: ""
        });

    }

    itinerary[dayIndex].activities[activityIndex] = {

        time: timeInput.value,
        name: nameInput.value

    };

    saveItinerary();

}
    timeInput.addEventListener("input", updateActivity);
    nameInput.addEventListener("input", updateActivity);

    activityDiv.querySelector(".delete-activity")
        .addEventListener("click", () => {

            const activityIndex =
                Array.from(activityList.children).indexOf(activityDiv);

            itinerary[dayIndex].activities.splice(activityIndex, 1);

            saveItinerary();

            activityDiv.remove();

        });

}
// ===============================
// Save Planner Button
// ===============================

if (savePlannerBtn) {

    savePlannerBtn.addEventListener("click", () => {

        saveItinerary();

        localStorage.setItem(
            "tripNotes",
            tripNotes.value
        );

        alert("✅ Planner Saved Successfully!");

    });

}
// ===============================
// Download PDF
// ===============================

if (downloadPdfBtn) {

    downloadPdfBtn.addEventListener("click", () => {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Voyago Smart Trip Planner", 20, 20);

        doc.setFontSize(14);

        doc.text("Destination: " + overviewDestination.textContent, 20, 40);
        doc.text("Travel Dates: " + overviewDates.textContent, 20, 50);
        doc.text("Budget: " + overviewBudget.textContent, 20, 60);
        doc.text("Status: " + overviewStatus.textContent, 20, 70);

        doc.text("Travel Notes:", 20, 90);

        const notes = tripNotes.value || "No notes added.";

        doc.text(notes, 20, 100);

        doc.save("Voyago_Trip_Plan.pdf");

    });

}