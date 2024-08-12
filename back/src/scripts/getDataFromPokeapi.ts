import { PokeInfos, Pokemon } from "../types/pokemon";

import CoreEvolution from "../core/evolution.core";
import CorePokemon from "../core/pokemon.core";
import CoreShape from "../core/shape.core";
import CoreTalent from "../core/talent.core";
import CoreType from "../core/type.core";
import { Talent } from "../types/talent";
/* eslint-disable */
import axios from "axios";
import fs from "fs";

async function start() {
	console.log("Start !");

	// getShapes();
	// getTypes();
	// await prisma.pokemon.deleteMany({})
	// getPokemonsFromFile()
	// getXPokemon(133, 1);
	// getXPokemon(2, 1011);
	// updatePokemonFromFile(0)
	 getTalent();
}

async function getXPokemon(start: number, end: number) {
	const allPokemon: string[] = [];
	for (let index = start; index < end + start; index++) {
		getOnePokemonAndFormatIt(index);
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
	}
}

async function getOnePokemonAndFormatIt(i: number): Promise<string> {
	try {
		const pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);
		const pokemonSpeciesData = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + i);

		const pokemonObject: Pokemon = {
			POKEMON_ID: 0,
			NAME_FR: "",
			NAME_EN: "",
			DESCRIPTION_FR: "",
			DESCRIPTION_EN: "",
			CATEGORY: "",
			TYPE_ID_1: 0,
			TYPE_ID_2: 0,
			TALENT: "",
			SHAPE: 0,
			GENERATION: 0,
			INFORMATION: {
				height: 0,
				weight: 0,
				statistics: ""
			},
			EVOLUTION: 0,
			COLOR: "",
			artwork: "",
			miniature: ""
		};

		console.log("get data of", i, "th pokemon");

		const pokemon = pokemonData.data;
		const pokemonSpecies = pokemonSpeciesData.data;

		const pokeInfos: PokeInfos = {
			height: pokemon.height,
			weight: pokemon.weight,
			statistics: JSON.stringify(
				pokemon.stats.map((_stats: any) => {
					return { value: _stats.base_stat, name: _stats.stat.name };
				})
			)
		};

		pokemonObject.POKEMON_ID = i;
		pokemonObject.INFORMATION = pokeInfos;

		pokemonObject.NAME_EN = pokemonSpecies.names.find((_name: any) => _name.language.name === "en").name;
		pokemonObject.NAME_FR = pokemonSpecies.names.find((_name: any) => _name.language.name === "fr").name;
		pokemonObject.DESCRIPTION_FR =
			pokemonSpecies.flavor_text_entries.length > 0
				? pokemonSpecies.flavor_text_entries
						.filter((_flavor: any) => _flavor.language.name === "fr")
						.at(-1)
						?.flavor_text.replace("\n", " ")
				: "none";
		pokemonObject.DESCRIPTION_EN =
			pokemonSpecies.flavor_text_entries.length > 0
				? pokemonSpecies.flavor_text_entries
						.filter((_flavor: any) => _flavor.language.name === "en")
						.at(-1)
						.flavor_text.replace("\n", " ")
				: "none";

		pokemonObject.DESCRIPTION_FR = pokemonObject.DESCRIPTION_FR ? pokemonObject.DESCRIPTION_FR : "none";

		const types = pokemon.types.map((_type: any) => {
			return { name: _type.type.name };
		});
		const coreTypes = new CoreType();

		if (types[0]) {
			const type = await coreTypes.getByEnglishName(types[0].name);
			if (type && type.ID) pokemonObject.TYPE_ID_1 = type.ID;
		}
		if (types[1]) {
			const type = await coreTypes.getByEnglishName(types[1].name);
			if (type && type.ID) pokemonObject.TYPE_ID_2 = type.ID;
		}

		const talents = [];
		for (const talent of pokemon.abilities) {
			talents.push({
				id: talent.ability.url.split("/").at(talent.ability.url.split("/").length - 2),
				hidden: talent.is_hidden
			});
		}

		pokemonObject.CATEGORY = pokemonSpecies.genera.find((_genera: any) => _genera.language.name === "en").genus;
		pokemonObject.TALENT = JSON.stringify(talents);
		if (pokemonSpecies?.shape) {
			const shape = await new CoreShape().getByEnglishName(pokemonSpecies?.shape.name.replace("-", ""));
			if (shape && shape.ID) pokemonObject.SHAPE = shape.ID;
		} else {
			pokemonObject.SHAPE = -1;
		}

		pokemonObject.GENERATION = getGeneration(pokemonSpecies.generation.name.split("-")[1]);
		pokemonObject.COLOR = pokemonSpecies.color.name;

		//addEvolutions(pokemonSpecies.evolution_chain.url);
		console.log("pokemonSpecies.evolution_chain.url => ", pokemonSpecies.evolution_chain.url);
		pokemonObject.EVOLUTION = parseInt(pokemonSpecies.evolution_chain.url.split("/").at(-2));

		await new CorePokemon().add(pokemonObject);
	} catch (error) {
		console.error("[getOnePokemon error ] => ", i, " - ", error);
		throw "Error";
	}

	return "";
}

async function addEvolutions(url: string) {
	const evolutionObject = {
		GENDER: 0,
		HELD_ITEM: "",
		ITEM: "",
		KNOW_MOVE: "",
		KNOW_MOVE_TYPE: "",
		LOCATION: "",
		MIN_AFFECTION: 0,
		MIN_BEAUTY: 0,
		MIN_HAPPINESS: 0,
		MIN_LEVEL: 0,
		NEEDS_OVERWORLDS_RAIN: 0,
		PARTY_SPECIES: "",
		PARTY_TYPE: "",
		RELATIVE_PHYSICAL_STATS: 0,
		TIME_OF_DAY: "",
		TRADE_SPECIES: "",
		TRIGGER: "",
		POKEMON_ID: 0,
		CHAIN_ID: 0,
		LEVEL: 0
	};

	const evolutionData = (await axios.get(url)).data;
	const chainId = evolutionData.id;
	const evolution = evolutionData.chain;

	const evolutionChain = await new CoreEvolution().getByChainID(chainId);
	if (evolutionChain.length === 0) addEvolution(evolution, evolutionObject, 0, chainId);
}

async function addEvolution(evolution: any, evolutionObject: any, level: any, chain_id: string) {
	evolutionObject.POKEMON_ID = parseInt(evolution.species.url.split("/").at(-2));
	evolutionObject.CHAIN_ID = parseInt(chain_id);
	evolutionObject.LEVEL = level;

	if (evolution.evolution_details.length > 0) {
		const e = evolution.evolution_details[0];

		evolutionObject.GENDER = e ? e.gender : 0;
		evolutionObject.HELD_ITEM = e ? e.held_item?.name : "";
		evolutionObject.ITEM = e ? e.item?.name : "";
		evolutionObject.KNOW_MOVE = e ? e.known_move?.name : "";
		evolutionObject.KNOW_MOVE_TYPE = e ? e.known_move_type?.name : "";
		evolutionObject.LOCATION = e ? e.location?.name : "";
		evolutionObject.MIN_AFFECTION = e ? e.min_affection : 0;
		evolutionObject.MIN_BEAUTY = e ? e.min_beauty : 0;
		evolutionObject.MIN_HAPPINESS = e ? e.min_happiness : 0;
		evolutionObject.MIN_LEVEL = e ? e.min_level : 0;
		evolutionObject.NEEDS_OVERWORLDS_RAIN = e ? Number(e.needs_overworld_rain) : 0;
		evolutionObject.PARTY_SPECIES = e ? e.party_species?.name : "";
		evolutionObject.PARTY_TYPE = e ? e.party_type?.name : "";
		evolutionObject.RELATIVE_PHYSICAL_STATS = e ? e.relative_physical_stats : 0;
		evolutionObject.TIME_OF_DAY = e ? e.time_of_day : "";
		evolutionObject.TRADE_SPECIES = e ? e.trade_species?.name : "";
		evolutionObject.TRIGGER = e ? e.trigger.name : "";
	}

	await new CoreEvolution().add(evolutionObject);

	if (evolution.evolves_to.length > 0) {
		level = level + 1;
		for (const e of evolution.evolves_to) {
			addEvolution(e, evolutionObject, level, chain_id);
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(true);
				}, 500);
			});
		}
	}
}

async function getTypes() {
	try {
		const pokeType = await axios.get("https://pokeapi.co/api/v2/type/");
		const coreType = new CoreType();

		console.log(pokeType.data.results);

		for (const type of pokeType.data.results) {
			coreType.add({ NAME: type.name });
		}
	} catch (error) {
		console.error(error);
	}
}

async function getShapes() {
	try {
		const pokeShape = await axios.get("https://pokeapi.co/api/v2/pokemon-shape/");
		const coreShape = new CoreShape();

		console.log(pokeShape.data.results);

		for (const type of pokeShape.data.results) {
			coreShape.add({ NAME: type.name });
		}
	} catch (error) {
		console.error(error);
	}
}

async function getTalent() {
	const allTalent = await axios.get("https://pokeapi.co/api/v2/ability/?offset=00&limit=960");

	let i = 1;
	for (const url of allTalent.data.results) {
		console.log("i : ", i);
		const talentData = (await axios.get(url.url)).data;

		const talent: Talent = {
			NAME_EN: talentData.names.find((_name: any) => _name.language.name == "en").name,
			NAME_FR: talentData.names.find((_name: any) => _name.language.name == "fr")
				? talentData.names.find((_name: any) => _name.language.name == "fr").name
				: talentData.names.find((_name: any) => _name.language.name == "en").name,
			DESCRIPTION_EN:
				talentData.flavor_text_entries.length > 0
					? talentData.flavor_text_entries
							.filter((_flavor: any) => _flavor.language.name == "en")
							.at(-1)
							.flavor_text.replace("\n", " ")
					: "",
			DESCRIPTION_FR:
				talentData.flavor_text_entries.length > 0
					? (talentData.flavor_text_entries
							.filter((_flavor: any) => _flavor.language.name == "fr"))
							.at(-1)
							?.flavor_text.replace("\n", " ") ?? ""
					: "",
					TALENT_ID: i.toString()
		};

		const coreTalent = new CoreTalent();
		coreTalent.add(talent);
		i++;

		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
	}
}

function getGeneration(romanNumber: string): number {
	switch (romanNumber) {
		case "i":
			return 1;
			break;
		case "ii":
			return 2;
			break;
		case "iii":
			return 3;
			break;
		case "iv":
			return 4;
			break;
		case "v":
			return 5;
			break;
		case "vi":
			return 6;
			break;
		case "vii":
			return 7;
			break;
		case "viii":
			return 8;
			break;
		case "ix":
			return 9;
			break;
		default:
			return 1;
			break;
	}
}

export default start;
