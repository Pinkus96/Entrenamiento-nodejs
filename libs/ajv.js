const Ajv = require('ajv');
let ajv = new Ajv();
const db = require('../database/db/db');

ajv.addKeyword("validateExistance", {
    async: true,
    validate: (schema, data) => new Promise((resolve, reject) => {
        if (schema.table && schema.property) {
            let filter = {};
            filter[schema.property] = data;
            db.search(schema.table, filter).then((result) => {
                if (result.length === 0) {
                    resolve(true);
                } else {
                    // reject(new Ajv.ValidationError([{
                    //     keyword: "alreadyExists",
                    //     params: schema.properties
                    // }]));;
                    reject({
                        mensaje: "alreadyExists",
                        params: schema.property
                    });
                }
            });
        } else {
            console.log("Schema no provisto de tabla o propiedades.")
            reject(false);
        }
    })
});

ajv.addKeyword("validateLogin", {
    async: true,
    validate: (schema, data) => new Promise((resolve, reject) => {
        if (schema.table && schema.property) {
            db.search(schema.table, data).then((result) => {
                if (result.length === 1) {
                    resolve(true);
                } else {
                    // reject(new Ajv.ValidationError([{
                    //     keyword: "alreadyExists",
                    //     params: schema.properties
                    // }]));;
                    reject({
                        mensaje: "Name or password incorrect",
                        params: schema.property
                    });
                }
            });
        } else {
            console.log("Schema no provisto de tabla o propiedades.")
            reject(false);
        }
    })
});

ajv.addKeyword("validateGmail", {
    async: true,
    validate: (schema, data) => new Promise((resolve, reject) => {
        if (schema.table && schema.property) {
            let pos = data.search("gmail");
            if (pos > 0) {
                let filter = {};
                filter[schema.property] = data;
                db.search(schema.table, filter).then((result) => {
                    if (result.length === 0) {
                        resolve(true);
                    } else {
                        // reject(new Ajv.ValidationError([{
                        //     keyword: "alreadyExists",
                        //     params: schema.properties
                        // }]));;
                        reject({
                            mensaje: "alreadyExists",
                            params: schema.property
                        });
                    }
                });
            } else {
                // reject(new Ajv.ValidationError([{
                //     keyword: "Its not a email valid",
                //     email: data
                // }]));;
                reject({
                    mensaje: "Invalid Email",
                    params: schema.property
                });
            }

        } else {
            console.log("Schema no provisto de tabla o propiedades.")
            reject(false);
        }
    })
});

module.exports = ajv;