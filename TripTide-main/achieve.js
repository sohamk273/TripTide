document.addEventListener('DOMContentLoaded', function() {
    const countryInput = document.getElementById('country-name');
    const checkButton = document.getElementById('check-button');
    const badgeContainer = document.getElementById('badge-container');
    const noCountryMessage = document.getElementById('no-country-message');

    const badges = {
        "usa": "usa.jpg",
        "france": "france.jpg",
        "japan": "japan.jpg",
        "india": "india.png",
        // Add more countries and badge image names here
    };

    checkButton.addEventListener('click', function() {
        const countryName = countryInput.value.trim().toLowerCase();
        badgeContainer.innerHTML = ""; // Clear previous badges
        noCountryMessage.style.display = "none"; //hide no country message

        if (badges[countryName]) {
            const badgeImage = document.createElement('img');
            badgeImage.src = badges[countryName];
            badgeContainer.appendChild(badgeImage);
        } else {
            noCountryMessage.style.display = "block";
        }
    });
});