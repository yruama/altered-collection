import * as Knex from "knex";

import fastify, { FastifyReply, FastifyRequest } from "fastify";

import blippPlugin from "fastify-blipp";
import { consoleErrorWithline } from "@core/utils.core";
import cors from "@fastify/cors";
/* eslint-disable */
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import jwt from "@fastify/jwt";
import path from "path";
import { setGlobals } from "./config/global";
import start from "./scripts/getAlteredData";

dotenv.config();

export const knex = Knex.knex({
	client: "mysql",
	connection: {
		host: process.env.DATABASE_HOST,
		port: 3306,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	}
});

export const app = fastify({
	logger: true
});

const secret = process.env.JWT_SECRET;

app.register(jwt, {
	secret: secret!
});

app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});

app.register(fastifyStatic, {
	root: path.join(__dirname, "assets"),
	prefix: "/assets/" // optional: default '/'
});

app.register(blippPlugin);
app.register(import("./routes/user.routes") as any, { prefix: "api/v1/user" });
app.register(import("./routes/test.routes") as any, { prefix: "api/v1/test" });
app.register(import("./routes/cards.routes") as any, { prefix: "api/v1/cards" });
app.register(import("./routes/types.routes") as any, { prefix: "api/v1/types" });
app.register(import("./routes/rarity.routes") as any, { prefix: "api/v1/rarity" });
app.register(import("./routes/factions.routes") as any, { prefix: "api/v1/factions" });
app.register(import("./routes/subtypes.routes") as any, { prefix: "api/v1/subtypes" });
app.register(import("./routes/collections.routes") as any, { prefix: "api/v1/collections" });
app.register(cors, {
	// put your options here
});

(async function main(): Promise<void> {
	// Run the server!
	try {
		setGlobals();
		consoleErrorWithline();
		await app.listen({ port: 3000 });
		// start();
		// app.blipp();
	} catch (err) {
		console.error("Error on main : ", err);

		app.log.error(err);
		process.exit(1);
	}
})();
