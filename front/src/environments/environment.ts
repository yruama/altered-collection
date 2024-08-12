interface Environment {
	production: boolean;
	environmentName: string;
	apiURL: string;
	assetsURL: string;
	cardsdexUrl: string;
}

export const environment: Environment = {
	production: false,
	environmentName: "",
	apiURL: "",
	assetsURL: "",
	cardsdexUrl: "https://api.cardsdex.net/v2"
};
