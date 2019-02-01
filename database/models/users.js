const config = require("../../config/config")
const rethink = require('rethinkdbdash')(config.rethinkdb);

module.exports = class User {
    constructor(
        password,
        name,
        email,
        phone

    ) {
        this.id = rethink.uuid(username);
        this.password = password;
        this.name = name;
        this.email = email;
        this.phone = phone;

        this.active = true;
    }
}