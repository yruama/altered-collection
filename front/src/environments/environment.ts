interface Environment {
	production: boolean;
	environmentName: string;
	apiURL: string;
	assetsURL: string;
	tcgdexUrl: string;
}

export const environment: Environment = {
	production: false,
	environmentName: "",
	apiURL: "",
	assetsURL: "",
	tcgdexUrl: "https://api.tcgdex.net/v2"
};
