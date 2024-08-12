import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import ClassUser from "../classes/user.class";
import { replySuccess, replyError } from "@core/route.core";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const classUser = new ClassUser();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	/**
	 * Sign in route
	 * @memberof UserRoutes
	 * @description Sign in route
	 * @path {POST} /sign-in
	 * @body {User} - User object
	 * @example_success
	 * // returns the user data
	 * {
	 * 		"statusCode": 200,
	 * 		"data": {
	 * 			"ID": 1,
	 * 			"USERNAME": "username",
	 * 			"EMAIL": "email",
	 * 			"PASSWORD": "password",
	 * 			"FIRSTNAME": "firstname",
	 * 			"LASTNAME": "lastname",
	 * 			"UUID": "uuid"
	 * 		}
	 * }
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"
	 * 		}
	 * }
	 */
	fastify.post("/sign-in", async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signIn(request.body.user);
			await replySuccess(userData, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Sign up route
	 * @memberof UserRoutes
	 * @description Sign up route
	 * @path {POST} /sign-up
	 * @body {User} - User object
	 * @example_success
	 * // returns the user data
	 * {
	 * 		"statusCode": 200,
	 * 		"data": {
	 * 			"ID": 1,
	 * 			"USERNAME": "username",
	 * 			"EMAIL": "email",
	 * 			"PASSWORD": "password",
	 * 			"FIRSTNAME": "firstname",
	 * 			"LASTNAME": "lastname",
	 * 			"UUID": "uuid"
	 * 		}
	 * }
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"
	 * 		}
	 * }
	 */
	fastify.post("/sign-up", async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signUp(request.body.user);
			await replySuccess(userData, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	/**
	 * Verify if user isconnected
	 * @memberof UserRoutes
	 * @description Verify if user isconnected
	 * @path {GET} /getByToken
	 * @example_success
	 * // returns a boolean
	 * {
	 * 		"statusCode": 200,
	 * 		"data": true
	 * }
	 * @example_error
	 * // returns an error
	 * {
	 * 		"statusCode": 500,
	 * 		"error": {
	 * 			"message": "Internal Server Error",
	 * 			"description": "Error description"	
	 * 		}
	 * 	}
	 */
	fastify.get("/getByToken", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {

			if (request.user) await replySuccess(true, reply, "get");
			else await replySuccess(false, reply, "get");

		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
