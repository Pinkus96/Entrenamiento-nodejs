const express = require("express");
const db = require("../../database/db/db");
const ajv = require("../../libs/ajv");
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const table = "users";

let router = express.Router();

router.post("/login", (req, res) => {
    let data = req.body;
    let schema = {
        "$async": true,
        "additionalProperties": false,
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "password": { "type": "string" },
        },
        "required": ["name", "password"],
        "validateLogin": { "table": table, "property": "name" }
    };

    ajv.validate(schema, data)
        .then(valid => {
            db.search(table, data).then(result => {
                let token = jwt.sign({ id: result[0].id, name: result[0].name }, "Hola", {
                    //var token = jwt.sign({}, config.secretKey, {
                    //expiresIn:  31536000 // expires in 1 year.
                    expiresIn: 28800 // expires in 8 hours
                });
                res.status(300).json({ message: "Token Provided", result: { token: token }, data: result })
            });
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                err
            })
        });

});

module.exports = router;