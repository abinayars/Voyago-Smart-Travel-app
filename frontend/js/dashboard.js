const totalTrips = document.getElementById("totalTrips");
const totalBudget = document.getElementById("totalBudget");
const completedTrips = document.getElementById("completedTrips");
const upcomingTrips = document.getElementById("upcomingTrips");

const upcomingDestination = document.getElementById("upcomingDestination");
const upcomingDate = document.getElementById("upcomingDate");
const upcomingBudget = document.getElementById("upcomingBudget");

async function loadDashboard() {

    try {

      const response = await fetch("http://localhost:5000/api/trips", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

        const trips = await response.json();

        totalTrips.textContent = trips.length;
 let budget = 0;
        let completed = 0;
        let upcoming = 0;

        trips.forEach(trip => {

            budget += Number(trip.budget);

            if (trip.status === "Completed") {

                completed++;

            } else {

                upcoming++;

            }

        });
        totalBudget.textContent = "₹" + budget;

        completedTrips.textContent = completed;

        upcomingTrips.textContent = upcoming;

        if (trips.length > 0) {

            const latest = trips[trips.length - 1];

            upcomingDestination.textContent = latest.destination;

            upcomingDate.textContent =
                latest.startDate.substring(0,10) +
                " → " +
                latest.endDate.substring(0,10);

            upcomingBudget.textContent =
                "₹" + latest.budget;
                 }

    }

    catch(error){

        console.error(error);

    }

}

loadDashboard();