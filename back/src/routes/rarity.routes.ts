import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import ClassRarity from "src/classes/rarity.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const rarityClass = new ClassRarity();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const cards = await rarityClass.getAll();
			await replySuccess(cards, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {

			const language = request.headers['accept-language'] || 'en-GB';

			const cards = await rarityClass.add(request.body.rarity);
			await replySuccess(cards, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
