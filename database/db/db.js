const config = require("../../config/config")
const rethink = require('rethinkdbdash')(config.rethinkdb);

const active = { active: true };

getAll = (table) => {
    return new Promise((resolve, reject) => {
        try {
            rethink.table(table)
                .filter(active)
                .run()
                .then((result) => {
                    if (result.errors) {
                        reject(result);
                    } else {
                        resolve(result)
                    }
                })
                .error((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

getById = (table, id) => {
    return new Promise((resolve, reject) => {
        try {
            rethink.table(table)
                .filter(active)
                .get(id)
                .run()
                .then((result) => {
                    if (result.errors) {
                        reject(result);
                    } else {
                        resolve(result)
                    }
                })
                .error((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

create = (table, data) => {
    return new Promise((resolve, reject) => {
        try {
            data.active = true;
            rethink.table(table)
                .insert(data, { returnChanges: true })
                .run()
                .then((result) => {
                    if (result.errors) {
                        reject(result);
                    } else {
                        resolve(result)
                    }
                })
                .error((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

update = (table, data) => {
    return new Promise((resolve, reject) => {
        try {
            rethink.table(table)
                .get(data.id)
                .update(data, { returnChanges: true })
                .run()
                .then((result) => {
                    if (result.errors) {
                        reject(result);
                    } else {
                        resolve(result)
                    }
                })
                .error((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

search = async(table, searchItem) => {
    return new Promise((resolve, reject) => {
        try {
            searchItem.active = true;
            rethink.table(table)
                .filter(searchItem)
                .run()
                .then((result) => {
                    if (result.errors) {
                        reject(result);
                    } else {
                        resolve(result)
                    }
                })
                .error((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    search
};