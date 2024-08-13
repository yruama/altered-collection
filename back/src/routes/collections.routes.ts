import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CollectionsClass from "../classes/collections.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const collectionsClass = new CollectionsClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const language = request.headers['accept-language'] || 'en-GB';

			const collections = await collectionsClass.getCollections();
			await replySuccess(collections, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.get("/generate", async (request: RequestType, reply: FastifyReply) => {
		try {
			const language = request.headers['accept-language'] || 'en-GB';

			const collections = await collectionsClass.generateList();
			await replySuccess(collections, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.get("/altered", async (request: RequestType, reply: FastifyReply) => {
		try {
			const language = request.headers['accept-language'] || 'en-GB';

			const collections = await collectionsClass.getCollectionsFromAltered(language);
			await replySuccess(collections, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
