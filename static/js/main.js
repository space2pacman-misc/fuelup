let Main = {
	template: "#main"
}

let Station = {
	template: "#station",
	data() {
		return {
			captions: ["Имя", "Адрес", "Статус", "Оплата картой"],
			hash: "list",
			stations: {
				default: [],
				filtered: []
			},
			search: "",
			map: {
				defaultPosition: [55.738699, 37.767555]
			}
		}
	},
	watch: {
		"$route"() {
			this.hash = this.getHash();
		},
		"search"(value) {
			this.stations.filtered = this.stations.default.filter(station => {
				return station.Name.includes(value);
			})
		}
	},
	methods: {
		getStatusStation(status) {
			return status ? "Работает" : "Не работает";
		},
		getStationAddress(address) {
			if(address === "empty_api_address") {
				return "Адрес отсутствует";
			} else {
				return address;
			}
		},
		getStatusPostPay(status) {
			return status ? "text-success" : "text-danger";
		},
		getHash() {
			let hash = this.$route.hash.slice(1);

			if(hash.length === 0) {
				this.$router.push({ hash: `#${this.hash}` })
			}

			return hash;
		}
	},
	mounted() {
		this.hash = this.getHash();
		this.$root.$request("station").then(response => {
			this.stations.default = response;
			this.stations.filtered = response;
		})
	}
}

let Price = {
	template: "#price",
	data() {
		return {
			captions: ["Тип топлива", "Цена"],
			prices: []
		}
	},
	methods: {
		getProductType(id) {
			let product = {
				type: null,
				status: null
			};

			switch(id) {
				case "a80":
					product.type = "АИ-80";
					product.status = "#000022";

					break;
				case "a92":
					product.type = "АИ-92";
					product.status = "#000932";

					break;
				case "a92_premium":
					product.type = "АИ-92 Премиум";
					product.status = "#001242";

					break;
				case "a95":
					product.type = "АИ-95";
					product.status = "#005384";

					break;
				case "a95_premium":
					product.type = "АИ-95 Премиум";
					product.status = "#0094c6";

					break;
				case "a98":
					product.type = "АИ-98";
					product.status = "#0079a1";

					break;
				case "a98_premium":
					product.type = "АИ-98 Премиум";
					product.status = "#005e7c";

					break;
				case "diesel":
					product.type = "Дизель";
					product.status = "#176d88";

					break;
				case "diesel_premium":
					product.type = "Дизель премиум";
					product.status = "#2c7a93";

					break;
				case "diesel_winter":
					product.type = "Дизель зимний";
					product.status = "#3f869d";

					break;
				case "propane":
					product.type = "Пропан";
					product.status = "orange";

					break;
				case "metan":
					product.type = "Метан";
					product.status = "green";

					break;
			}

			return product;
		}
	},
	mounted() {
		this.$root.$request("price").then(response => {
			this.prices = response;
		})
	}
}

let routes = [
	{
		path: "/",
		component: Main
	},
	{
		path: "/station",
		component: Station
	},
	{
		path: "/price",
		component: Price
	}
];
let router = new VueRouter({ routes });
let app = new Vue({
	el: "#app",
	data: {
		api: {
			port: 8080,
			address: "localhost",
			protocol: "http"
		}
	},
	methods: {
		$request(url) {
			return fetch(`${this.api.protocol}://${this.api.address}:${this.api.port}/api/${url}`).then(response => {
				return response.json();
			});
		}
	},
	router
});