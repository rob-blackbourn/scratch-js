const weightSchema = {
    bsonType: "object",
    required: ["_id", "amount", "description", "grammeWeight"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: "string",
            description: "Sequence number."
        },
        amount: {
            bsonType: "decimal",
            description: 'Unit modifier (for example, 1 in "1 cup").'
        },
        description: {
            bsonType: "string",
            description: "Description (for example, cup, diced, and 1-inch pieces)."
        },
        grammeWeight: {
            bsonType: "decimal",
            description: "Gram weight."
        },
        numberOfDataPoints: {
            bsonType: "integer",
            description: "Number of data points."
        },
        standardDeviation: {
            bsonType: "decimal",
            description: "Standard deviation."
        }
    }
}

const foodDescriptionSchema = {
    bsonType: "object",
    required: ["_id", "longDescription", "shortDescription"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: 'string',
            description: '5-digit Nutrient Databank number that uniquely identifies a food item. If this field is defined as numeric, the leading zero will be lost.'
        },
        longDescription: {
            bsonType: "string",
            description: "200-character description of food item."
        },
        shortDescription: {
            bsonType: "string",
            description: "60-character abbreviated description of food item. Generated from the 200-character description using abbreviations in Appendix A. If short description is longer than 60 characters, additional abbreviations are made."
        },
        commonName: {
            bsonType: "string",
            description: 'Other names commonly used to describe a food, including local or regional names for various foods, for example, "soda" or "pop" for "carbonated beverages."'
        },
        manufacturerName: {
            bsonType: "string",
            description: "Indicates the company that manufactured the product, when appropriate."
        },
        hasSurvey: {
            bsonType: "bool",
            "description": "Indicates if the food item is used in the USDA Food and Nutrient Database for Dietary Studies (FNDDS) and thus has a complete nutrient profile for the 65 FNDDS nutrients."
        },
        refuseDescription: {
            bsonType: "string",
            description: 'Description of inedible parts of a food item (refuse), such as seeds or bone.'
        },
        refuse: {
            bsonType: "decimal",
            description: "Percentage of refuse."
        },
        scientificName: {
            bsonType: "string",
            description: "Scientific name of the food item. Given for the least processed form of the food (usually raw), if applicable."
        },
        nitrogenFactor: {
            bsonType: "decimal",
            description: "Factor for converting nitrogen to protein (see p. 12)."
        },
        proteinFactor: {
            bsonType: "decimal",
            description: "Factor for calculating calories from protein (see p. 13)."
        },
        fatFactor: {
            bsonType: "decimal",
            description: "Factor for calculating calories from fat (see p. 13)."
        },
        carbohydrateFactor: {
            bsonType: "decimal",
            description: "Factor for calculating calories from carbohydrate (see p. 13)."
        },
        weights: {
            bsonType: "array",
            minItems: 0,
            uniqueItems: true,
            items: weightSchema
        }
    }
}

const foodGroupSchema = {
    bsonType: "object",
    required: ["_id", "description"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: 'string',
            description: 'Food group code'
        },
        description: {
            bsonType: 'string',
            description: 'Food group description'
        },
        foods: {
            bsonType: "array",
            minItems: 0,
            uniqueItems: true,
            items: foodDescriptionSchema
        }
    }
}
