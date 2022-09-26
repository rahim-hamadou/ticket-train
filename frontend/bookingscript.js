fetch(`http://localhost:3000/bookings/`)
  .then((response) => response.json())
  .then(function (data) {
    if (data.data.length < 1) {
      document.querySelector("#noTrips").style.display = "block";
    }
    if (data.data.length >= 1) {
      for (let i = 0; i < data.data.length; i++) {
        const hours = new Date(data.data[i].date).getHours();
        const minutes = new Date(data.data[i].date).getMinutes();
        const newDateParse = new Date(data.data[i].date) - Date.now();
        const newDate = new Date(newDateParse);
        const hoursDeparture = newDate.getHours() - 1;
        const daysDeparture = newDate.getDate();
        const minutesDeparture = newDate.getMinutes();

        document.querySelector(".tripIncoming").innerHTML += `
        <div class="tripValided">
        <span class="departure-valided">${data.data[i].departure} > ${
          data.data[i].arrival
        }</span>
        <span>${hours}:${minutes < 10 ? "0" + minutes : minutes}</span>
        <span class="price-valided">${data.data[i].price}€</span>
        <span class="time-valided">${
          newDateParse < 0
            ? "Your train is already gone 😖"
            : newDateParse > 8.64e7
            ? `Departure in ${daysDeparture} days`
            : hoursDeparture < 1
            ? `Departure in ${minutesDeparture} minutes`
            : `Departure in ${hoursDeparture} hours`
        }
        </span>
      </div>
      `;
      }
    }
  });
