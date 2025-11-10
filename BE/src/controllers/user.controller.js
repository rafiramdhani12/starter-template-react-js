import userService from "../services/user.service.js";

export class UserController {
	static async getUsers(req, res) {
		try {
			const users = await userService.getAllUsers();
			res.status(200).json({
				status: "success",
				data: users,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
			console.error(`error from getUsers in userController ${error.message}`);
		}
	}

	static async getById(req, res) {
		try {
			const { id } = req.params;
			const user = await userService.getUserById(id);
			res.status(200).json({
				status: "success",
				data: user,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
			console.error(`error from getById in userController ${error.message}`);
		}
	}

	static async getByUsername(req, res) {
		try {
			const { username } = req.params;
			const user = await userService.getUserByUsername(username);
			res.status(200).json({
				status: "success",
				data: user,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
			console.error(`error from getByUsername in userController ${error.message}`);
		}
	}

	static async createUser(req, res) {
		try {
			const { nama, username, password, role } = req.body;
			if (!nama || !username || !password || !role) {
				return res.status(400).json({
					status: "error",
					message: "All fields are required",
				});
			}

			const newUser = await userService.createUser({
				nama,
				username,
				password,
				role,
			});

			res.status(201).json({
				status: "success",
				data: newUser,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
			console.error(`error from createUsers in userController ${error.message}`);
		}
	}

	static async updateUser(req, res) {
		try {
			const { id } = req.params;
			const { nama, username, password, role } = req.body;

			const updated = await userService.updateUser({
				id,
				nama,
				username,
				password,
				role,
			});

			res.status(200).json({
				status: "success",
				data: updated,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
		}
	}

	static async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const deleted = await userService.deleteUser(id);
			res.status(200).json({
				status: "success",
				data: deleted,
			});
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message });
		}
	}
}

export default UserController;
