fetch(`https://train-backend-demo.vercel.app/carts/`)
	.then((response) => response.json())
	.then(function (data) {
		if (data.data.length < 1) {
			document.querySelector("#cart").style.display = "block";
		}
		if (data.data.length >= 1) {
			for (let i = 0; i < data.data.length; i++) {
				const hours = new Date(data.data[i].date).getHours();
				const minutes = new Date(data.data[i].date).getMinutes();
				document.querySelector(".tripWish").innerHTML += `
      <div class="tripSelect " style="display: visible;">
							<span>${data.data[i].departure} > ${data.data[i].arrival}</span>
        <span>${hours}:${minutes < 10 ? "0" + minutes : minutes}</span> <span class='price'>${
					data.data[i].price
				}€</span>
        <span class="btnSupp">X</span>
						</div>
      `;
			}
			for (let i = 0; i < document.querySelectorAll(".btnSupp").length; i++) {
				document.querySelectorAll(".btnSupp")[i].addEventListener("click", function () {
					fetch(
						`https://train-backend-demo.vercel.app/carts/deletecart?departure=${data.data[i].departure}&arrival=${data.data[i].arrival}&price=${data.data[i].price}&date=${data.data[i].date}`,
						{ method: "DELETE" },
					)
						.then((response) => response.json())
						.then((data) => {
							if (data.data.length < 1) {
								document.querySelector("#cart").style.display = "block";
								document.querySelector("#howMuch").textContent = "Total : ";
							}
							this.parentNode.remove();
							let numbers = [];
							for (let i = 0; i < document.querySelectorAll(".price").length; i++) {
								numbers.push(
									Number(
										document
											.querySelectorAll(".price")
											[i].textContent.slice(document.querySelectorAll(".price")[i].length, -1),
									),
								);
							}
							document.querySelector("#howMuch").textContent =
								"Total : " + numbers.reduce((acc, curr) => acc + curr) + "€";
						});
				});
			}
			let numbers = [];
			for (let i = 0; i < document.querySelectorAll(".price").length; i++) {
				numbers.push(
					Number(
						document
							.querySelectorAll(".price")
							[i].textContent.slice(document.querySelectorAll(".price")[i].length, -1),
					),
				);
			}
			document.querySelector("#howMuch").textContent =
				"Total : " + numbers.reduce((acc, curr) => acc + curr) + "€";
		}
	});

document.querySelector("#buyTrip").addEventListener("click", () => {
	fetch(`https://train-backend-demo.vercel.app/carts`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.data[0]);
			for (let i = 0; i < data.data.length; i++) {
				fetch(
					`https://train-backend-demo.vercel.app/bookings/book?departure=${data.data[i].departure}&arrival=${data.data[i].arrival}&date=${data.data[i].date}&price=${data.data[i].price}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
					},
				).then((response) => response.json());
			}
			fetch("https://train-backend-demo.vercel.app/carts/deleteAll", {
				method: "DELETE",
			});
			window.location.assign("bookings.html");
		});
});
