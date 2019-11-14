window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2dce02b8c8f061f1551fab598b0ad76c/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    const { temperature, summary, icon } = data.currently;
                    // Set DOM elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone.replace(/Asia\//g, "");
                    // Formula for celsuis
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));


                    // Change units
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });



    }
    // seticons from skycons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "#D40732" });
        const currentIcon = icon.replace(/ - /g, "_");
        skycons.play();
        return skycons.set(iconID, currentIcon);
    }

});