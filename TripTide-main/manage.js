document.addEventListener("DOMContentLoaded", function() {
    loadDestinations();
    document.getElementById("addButton").addEventListener("click", addDestination);
});

function addDestination() {
    const name = document.getElementById("placeName").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
    const photoInput = document.getElementById("photoUpload");

    if (!name || !location) {
        alert("Please enter place name and location!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;

        const destination = {
            id: Date.now(),
            name,
            location,
            description,
            image: imageData || "https://via.placeholder.com/250", // Default image if no upload
            visited: false
        };

        let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
        destinations.push(destination);
        localStorage.setItem("destinations", JSON.stringify(destinations));

        loadDestinations();
    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        reader.onload({ target: { result: "" } }); // Trigger manually with empty image
    }

    // Clear input fields
    document.getElementById("placeName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";
    document.getElementById("photoUpload").value = "";
}

function loadDestinations() {
    const travelList = document.getElementById("travel-list");
    travelList.innerHTML = "";

    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];

    destinations.forEach(dest => {
        const card = document.createElement("div");
        card.classList.add("travel-card");

        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p><strong>Location:</strong> ${dest.location}</p>
            <p>${dest.description}</p>
            <button onclick="toggleVisited(${dest.id})">
                ${dest.visited ? "✅ Visited" : "Mark as Visited"}
            </button>
            <button class="delete" onclick="deleteDestination(${dest.id})">
                🗑 Delete
            </button>
        `;

        travelList.appendChild(card);
    });
}

function toggleVisited(id) {
    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];

    destinations = destinations.map(dest => {
        if (dest.id === id) {
            dest.visited = !dest.visited;
        }
        return dest;
    });

    localStorage.setItem("destinations", JSON.stringify(destinations));
    loadDestinations();
}

function deleteDestination(id) {
    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
    destinations = destinations.filter(dest => dest.id !== id);

    localStorage.setItem("destinations", JSON.stringify(destinations));
    loadDestinations();
}