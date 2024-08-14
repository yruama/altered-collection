import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CardsClass from "../classes/cards.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const cardsClass = new CardsClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;
			const max = request.query.limit ? parseInt(request.query.max) : null;
			const language = request.headers['accept-language'] || 'en-GB';

			const cards = await cardsClass.getWithPagination(offset, limit, max, language);
			await replySuccess(cards, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {

			const language = request.headers['accept-language'] || 'en-GB';

			const cards = await cardsClass.getWithFiler(request.body.filter);
			await replySuccess(cards, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
