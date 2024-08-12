import { User } from "@type/user";
import { knex } from "../app";
import Error_user from "@errors/user.json";

export default class CoreUser {
	/**
	 * Get a user from database by his email
	 * @param {string} email
	 * @returns {*}  {Promise<User>}
	 * @memberof CoreUser
	 */
	async getByEmail(email: string): Promise<User> {
		try {
			const user = await knex
				.select("*")
				.from("USER")
				.where("EMAIL", email);

			if (user.length <= 0) throw new InternalError(Error_user.READ.NOT_FOUND.single);
			return user[0];
		} catch (error) {
			console.error("[CORE_USER.getByEmail] : ", error);
			throw error;
		}
	}

	/**
	 * Add a new user in database
	 * @param {User} user
	 * @returns {*}  {Promise<number[]>}
	 * @memberof CoreUser
	 */
	async add(user: User): Promise<number[]> {
		try {
			const userCreated = await knex("USER").insert({
				EMAIL: user.EMAIL,
				USERNAME: user.USERNAME,
				PASSWORD: user.PASSWORD,
				UUID: Math.floor(Math.random() * 9000 + 1000).toString()
			});

			return userCreated;
		} catch (error) {
			console.error("[CORE_USER.add] : ", error);
			throw error;
		}
	}

	/**
	 * Check if a user exist by his email
	 * @param {string} email
	 * @returns {*}  {Promise<boolean>}
	 * @memberof CoreUser
	 */
	async isExisting(email: string): Promise<boolean> {
		try {
			const user = await knex.select("*").from("USER").where("EMAIL", email)

			if (user.length <= 0) throw new InternalError(Error_user.CREATE.ALREADY_EXISTS);
			return true;
		} catch (error) {
			console.error("[CORE_USER.isExisting] : ", error);
			throw error;
		}
	}
}
