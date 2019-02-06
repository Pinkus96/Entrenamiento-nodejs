const express = require("express");
const db = require("../../database/db/db");
const ajv = require("../../libs/ajv");

const table = "users";

let router = express.Router();

// ==============================
// Crear un usario  password, name, email, phone
// ==============================
router.post("/create", (req, res) => {
    let data = req.body;
    let schema = {
        "$async": true,
        "additionalProperties": false,
        "type": "object",
        "properties": {
            "password": { "type": "string" },
            "name": { "type": "string", "validateExistance": { "table": table, "property": "name" } },
            "email": { "type": "string", "format": "email", "validateGmail": { "table": table, "property": "email" } },
            "phone": { "type": "integer" }
        },
        "required": ["name", "password"]
    };

    ajv.validate(schema, data)
        .then(valid => {
            data.createdBy = req.decoded['id'];
            db.create(table, data)
                .then(result => {
                    res.status(300).json({
                        status: true,
                        result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status: false,
                        error
                    })
                });
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                err
            })
        });
});

// ==============================
// Obtener todos los usario
// ==============================
router.get("/getAll", (req, res) => {
    db.getAll(table)
        .then(result => {
            res.status(300).json({
                status: true,
                result
            })
        })
        .catch(error => {
            res.status(500).json({
                status: false,
                error
            })
        });
});

// ==============================
// Buscar un usario
// ==============================
router.get("/search", (req, res) => {
    try {
        let search = whereSearch(req.query.whereSearch, req.query.searchItem);
        if (search) {
            db.search(table, search)
                .then(result => {
                    res.status(300).json({
                        status: true,
                        result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status: false,
                        error
                    })
                });
        } else {
            res.status(400).json({
                status: false,
                message: `${req.query.whereSearch} no es objeto de busqueda.`
            })
        }
    } catch (err) {

    }


});

function whereSearch(where, item) {
    switch (where) {
        case "name":
            return { name: item };
        case "email":
            return { email: item };
        case "id":
            return { id: item };
        default:
            return {};
    }
}

// ==============================
// Actualizar un usario por ID
// ==============================
router.put("/update", (req, res) => {
    let data = req.body;
    let schema = {
        "$async": true,
        "additionalProperties": false,
        "type": "object",
        "properties": {
            "id": { "type": "string", "format": "uuid" },
            "name": { "type": "string", "validateExistance": { "table": table, "property": "name" } },
            "email": { "type": "string", "format": "email", "validateGmail": { "table": table, "property": "email" } },
            "phone": { "type": "integer" }
        },
        "required": ["id"]
    };

    ajv.validate(schema, data)
        .then(valid => {
            db.update(table, data)
                .then(result => {
                    res.status(300).json({
                        status: true,
                        result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status: false,
                        error
                    })
                });
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                err
            })
        });
});

// ==============================
// Eliminar un usuario por ID
// ==============================
router.delete("/delete", (req, res) => {
    let data = req.body;
    let schema = {
        "$async": true,
        "additionalProperties": false,
        "type": "object",
        "properties": {
            "id": { "type": "string", "format": "uuid" }
        },
        "required": ["id"]
    };

    ajv.validate(schema, data)
        .then(valid => {
            data.active = false;
            db.update(table, data)
                .then(result => {
                    res.status(300).json({
                        status: true,
                        result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status: false,
                        error
                    })
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