import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import TestClass from "../classes/test.class";

const testClass = new TestClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			console.log("zhekefkzrek")
			const testData = await testClass.get();
            console.log("TestData : ", testData)
			await replySuccess(testData, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
