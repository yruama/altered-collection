import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import ClassFactions from "src/classes/factions.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const factionsClass = new ClassFactions();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const cards = await factionsClass.getAll();
			await replySuccess(cards, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {

			const language = request.headers['accept-language'] || 'en-GB';

			const cards = await factionsClass.add(request.body.factions);
			await replySuccess(cards, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
