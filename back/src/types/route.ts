import { FastifyInstance, FastifyRequest } from "fastify";

export type RequestType = FastifyRequest<{
	Querystring: Record<string, string>;
	Params: Record<string, string>;
	Body: Record<string, any>;
}>;

export type FastifyInstanceDecorated = FastifyInstance & { authenticate: any };

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: { id: number }; // payload type is used for signing and verifying
		user: {
			id: number;
			email: string;
		}; // user type is return type of `request.user` object
	}
}

export interface APIResult {
	status: "success" | "error"; // can only be one of these
	result: any;
	message: any;
	code: number;
}

export type APIResultError = Pick<APIResult, "message" | "code">;
export type APIResultSuccess = Pick<APIResult, "result" | "code">;
