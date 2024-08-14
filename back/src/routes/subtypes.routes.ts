import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import ClassTypes from "src/classes/subtype.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const subtypesClass = new ClassTypes();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const cards = await subtypesClass.getAll();
			await replySuccess(cards, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {

			const language = request.headers['accept-language'] || 'en-GB';

			const cards = await subtypesClass.add(request.body.type);
			await replySuccess(cards, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
