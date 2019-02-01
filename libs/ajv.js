const Ajv = require('ajv');
let ajv = new Ajv();
const db = require('../database/db/db');

ajv.addKeyword("validateGmail", {
    async: true,
    validate: (schema, data) => new Promise((resolve, reject) => {
        if (schema.table && schema.property) {
            let pos = data.search("gmail");
            if (pos > 0) {
                let filter = {};
                filter[schema.property] = data;
                db.common.search(schema.table, filter).then((result) => {
                    if (result.totalFound === 0) {
                        resolve(true);
                    } else {
                        reject(new Ajv.ValidationError([{
                            keyword: "alreadyExists",
                            params: schema.properties
                        }]));;
                    }
                });
            } else {
                reject(new Ajv.ValidationError([{
                    keyword: "Its not a email valid",
                    email: data
                }]));;
            }

        } else {
            console.log("Schema no provisto de tabla o propiedades.")
            resolve(true);
        }

    })
});

module.exports = ajv;