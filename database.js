const fs = require("fs");
const sanitize = require("sanitize-filename");

class Database {
	read(file) {
		try {
			return fs.readFileSync(process.cwd() + "/sandbox/" + file).toString()
		} catch (e) {
			console.log(e);
			return e.code;
		}
	}

	write(file, data) {
		try {
			if (!data) fs.unlinkSync(process.cwd() + "/sandbox/" + file);
			fs.writeFileSync(process.cwd() + "/sandbox/" + file, data);
		} catch (e) {
			console.log(e);
			return e.code;
		}
	}
}

const database = new Database();

module.exports = new Proxy(database, {
	set(target, property, value, receiver)
	{
		target.write(sanitize(property), value.toString());
		return true;
	},
	get(target, property, receiver)
	{
		const ret = target.read(sanitize(property));
		return ret ? ret : null;
	}
});
