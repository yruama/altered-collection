import CoreUser from "../core/user.core";
import Error_user from "@errors/user.json";
import { User } from "@type/user";
import _bcrypt from "bcrypt";
import { app } from "../app";

export default class ClassUser {
	private readonly coreUser: CoreUser;

	constructor() {
		this.coreUser = new CoreUser();
	}

	/**
	 * Sign in a user
	 * @param {User} user
	 * @returns {*}  {Promise<User>}
	 * @memberof ClassUser
	 */
	async signIn(user: User): Promise<User> {
		try {
			const userData = await this.coreUser.getByEmail(user.EMAIL);

			if (userData) {
				if (_bcrypt.compareSync(user.PASSWORD, userData.PASSWORD)) {

					const payload = {
						email: userData.EMAIL,
						id: userData.ID!
					}

					const options = {
						expiresIn: 3600 * 24 * 7 // 1 heure * 24 heures * 7 jours ==> 1 semaine
					};

					const token = app.jwt.sign(payload, options);
					userData.token = token;
					delete (userData as Partial<User>).PASSWORD;

					return userData;
				} else {
					throw new InternalError(Error_user.MISC.NOT_AUTHENTIFIED);
				}
			} else {
				throw new InternalError(Error_user.READ.NOT_FOUND.single);
			}
		} catch (error) {
			console.error("[CLASS_USER.signIn] : ", error);
			throw error;
		}
	}

	/**
	 * Sign up a user
	 * @param {User} user
	 * @returns {*}  {Promise<User>}
	 * @memberof ClassUser
	 */
	async signUp(user: User): Promise<User> {
		try {
			// check if user already exist, no need to throw, the error is handled in the core
			await this.coreUser.isExisting(user.EMAIL);

			const salt = _bcrypt.genSaltSync(10);
			const cryptedPassword = _bcrypt.hashSync(user.PASSWORD, salt);

			user.PASSWORD = cryptedPassword;

			await this.coreUser.add(user);

			return user;
		} catch (error) {
			console.error("[CLASS_USER.signUp] : ", error);
			throw error;
		}
	}
}
