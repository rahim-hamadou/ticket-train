// result
const infoResult = document.querySelector(".infoResult");

const imgResult = document.querySelector(".card img");

const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", () => {
  console.log("click");
  const departureInput = document.querySelector("#departure-input").value;
  const arrivalInput = document.querySelector("#arrival-input").value;
  const dateInput = document.querySelector("#date-input").value;

  fetch(
    `http://localhost:3000/trips?departure=${departureInput}&arrival=${arrivalInput}&date=${dateInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data.length === 0) {
        imgResult.src = "./images/notfound.png";
        infoResult.textContent = "No trip found.";
      } else {
        document.querySelector("#resultats").innerHTML = "";
        for (let i = 0; i < data.data.length; i++) {
          const hours = new Date(data.data[i].date).getHours();
          const minutes = new Date(data.data[i].date).getMinutes();
          document.querySelector("#resultats").innerHTML += `
  			<div class='tripIdea'>
  			<span class='departure-result'>${data.data[i].departure} ></span>
  			<span class='arrival-result'>${data.data[i].arrival}</span>
  			<span class='time-result'>${hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }</span>
  			<span class='price-result'>${data.data[i].price}€</span>
				<span><button class='bookBtn tripIdeaBuy'>Book</button></span>
  			</div>
  			`;
          for (
            let i = 0;
            i < document.querySelectorAll(".bookBtn").length;
            i++
          ) {
            document
              .querySelectorAll(".bookBtn")
              [i].addEventListener("click", () => {
                fetch(
                  `http://localhost:3000/carts/cart?departure=${data.data[i].departure}&arrival=${data.data[i].arrival}&date=${data.data[i].date}&price=${data.data[i].price}`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  },
                  window.location.assign("cart.html")
                );
              });
          }
        }
      }
    });
});
