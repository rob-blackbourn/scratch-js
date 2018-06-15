const weightSchema = {
  type: 'object',
  required: ['_id', 'amount', 'description', 'grammeWeight'],
  additionalProperties: false,
  properties: {
    _id: {
      type: 'string',
      description: 'Sequence number.'
    },
    amount: {
      type: 'number',
      description: 'Unit modifier (for example, 1 in "1 cup").'
    },
    description: {
      type: 'string',
      description: 'Description (for example, cup, diced, and 1-inch pieces).'
    },
    grammeWeight: {
      type: 'number',
      description: 'Gram weight.'
    },
    numberOfDataPoints: {
      type: ['number', 'null'],
      description: 'Number of data points.'
    },
    standardDeviation: {
      type: ['number', 'null'],
      description: 'Standard deviation.'
    }
  }
}

const footnoteSchema = {
  type: 'object',
  required: ['type', 'text'],
  additionalProperties: false,
  properties: {
    sequence: {
      type: ['string', 'null'],
      description: 'Sequence number. If a given footnote applies to more than one nutrient number, the same footnote number is used. As a result, this file cannot be indexed and there is no primary key.'
    },
    type: {
      type: 'string',
      description: 'Type of footnote: D = footnote adding information to the food description; M = footnote adding information to measure description; N = footnote providing additional information on a nutrient value. If the Footnt_typ = N, the Nutr_No will also be filled in.'
    },
    text: {
      type: 'string',
      description: 'Footnote text.'
    }
  }
}

const dataSourceSchema = {
  type: 'object',
  required: ['_id', 'title'],
  additionalProperties: false,
  properties: {
    _id: {
      type: 'string',
      description: 'Unique ID identifying the reference/source.'
    },
    authors: {
      type: ['string', 'null'],
      description: 'List of authors for a journal article or name of sponsoring organization for other documents.'
    },
    title: {
      type: 'string',
      description: 'Title of article or name of document, such as a report from a company or trade association.'
    },
    year: {
      type: ['string', 'null'],
      description: 'Year article or document was published.'
    },
    journal: {
      type: ['string', 'null'],
      description: 'Name of the journal in which the article was published.'
    },
    volumeOrCity: {
      type: ['string', 'null'],
      description: 'Volume number for journal articles, books, or reports; city where sponsoring organization is located.'
    },
    issueOrState: {
      type: ['string', 'null'],
      description: 'Issue number for journal article; State where the sponsoring organization is located.'
    },
    startPage: {
      type: ['string', 'null'],
      description: 'Starting page number of article/document.'
    },
    endPage: {
      type: ['string', 'null'],
      description: 'Ending page number of article/document.'
    }
  }
}

const nutrientSchema = {
  type: 'object',
  required: ['_id', 'description', 'precision', 'units', 'value', 'numberOfDataPoints'],
  additionalProperties: false,
  properties: {
    _id: {
      type: 'string',
      description: 'Unique 3-digit identifier code for a nutrient.'
    },
    description: {
      type: 'string',
      description: 'Name of nutrient/food component.'
    },
    precision: {
      type: 'number',
      description: 'Number of double places to which a nutrient value is rounded.'
    },
    units: {
      type: 'string',
      description: 'Units of measure (mg, g, μg, and so on).'
    },
    value: {
      type: 'number',
      description: 'Amount in 100 grams, edible portion.'
    },
    numberOfDataPoints: {
      type: 'number',
      description: ''
    },
    standardError: {
      type: ['number', 'null'],
      description: 'Standard error of the mean. Null if cannot be calculated. The standard error is also not given if the number of data points is less than three.'
    },
    source: {
      type: ['string', 'null'],
      description: 'The source of the data'
    },
    derivation: {
      type: ['string', 'null'],
      description: 'How the value was determined'
    },
    referenceNutritionId: {
      type: ['string', 'null'],
      description: 'NDB number of the item used to calculate a missing value. Populated only for items added or updated starting with SR14.'
    },
    hasAdditive: {
      type: ['boolean', 'null'],
      description: 'Indicates a vitamin or mineral added for fortification or enrichment. This field is populated for ready-toeat breakfast cereals and many brand-name hot cereals in food group 08.'
    },
    numberOfStudies: {
      type: ['number', 'null'],
      description: 'Number of studies.'
    },
    minValue: {
      type: ['number', 'null'],
      description: 'Minimum value.'
    },
    maxValue: {
      type: ['number', 'null'],
      description: 'Maximum value.'
    },
    degreesOfFreedom: {
      type: ['number', 'null'],
      description: 'Degrees of freedom.'
    },
    lowerErrorBound: {
      type: ['number', 'null'],
      description: 'Lower 95% error bound.'
    },
    upperErrorBound: {
      type: ['number', 'null'],
      description: 'Upper 95% error bound.'
    },
    statisticalComment: {
      type: ['string', 'null'],
      description: 'Statistical comments. See definitions below.'
    },
    lastUpdate: {
      type: ['string', 'null'],
      description: 'Indicates when a value was either added to the database or last modified.'
    },
    confidenceCode: {
      type: ['string', 'null'],
      description: 'Confidence Code indicating data quality, based on evaluation of sample plan, sample handling, analytical method, analytical quality control, and number of samples analyzed. Not included in this release, but is planned for future releases.'
    },
    footnotes: {
      type: 'array',
      minItems: 0,
      uniqueItems: false,
      items: footnoteSchema
    },
    dataSources: {
      type: 'array',
      minItems: 0,
      uniqueItems: true,
      items: dataSourceSchema
    }
  }
}

const foodSchema = {
  type: 'object',
  required: ['_id', 'longDescription', 'shortDescription'],
  additionalProperties: false,
  properties: {
    _id: {
      type: 'string',
      description: '5-digit Nutrient Databank number that uniquely identifies a food item. If this field is defined as numeric, the leading zero will be lost.'
    },
    group: {
      type: 'string',
      description: 'The food group'
    },
    longDescription: {
      type: 'string',
      description: '200-character description of food item.'
    },
    shortDescription: {
      type: 'string',
      description: '60-character abbreviated description of food item. Generated from the 200-character description using abbreviations in Appendix A. If short description is longer than 60 characters, additional abbreviations are made.'
    },
    commonName: {
      type: ['string', 'null'],
      description: 'Other names commonly used to describe a food, including local or regional names for various foods, for example, "soda" or "pop" for "carbonated beverages."'
    },
    manufacturerName: {
      type: ['string', 'null'],
      description: 'Indicates the company that manufactured the product, when appropriate.'
    },
    hasSurvey: {
      type: ['boolean', 'null'],
      'description': 'Indicates if the food item is used in the USDA Food and Nutrient Database for Dietary Studies (FNDDS) and thus has a complete nutrient profile for the 65 FNDDS nutrients.'
    },
    refuseDescription: {
      type: ['string', 'null'],
      description: 'Description of inedible parts of a food item (refuse), such as seeds or bone.'
    },
    refuse: {
      type: ['number', 'null'],
      description: 'Percentage of refuse.'
    },
    scientificName: {
      type: ['string', 'null'],
      description: 'Scientific name of the food item. Given for the least processed form of the food (usually raw), if applicable.'
    },
    nitrogenFactor: {
      type: ['number', 'null'],
      description: 'Factor for converting nitrogen to protein (see p. 12).'
    },
    proteinFactor: {
      type: ['number', 'null'],
      description: 'Factor for calculating calories from protein (see p. 13).'
    },
    fatFactor: {
      type: ['number', 'null'],
      description: 'Factor for calculating calories from fat (see p. 13).'
    },
    carbohydrateFactor: {
      type: ['number', 'null'],
      description: 'Factor for calculating calories from carbohydrate (see p. 13).'
    },
    weights: {
      type: 'array',
      minItems: 0,
      uniqueItems: true,
      items: weightSchema
    },
    nutrients: {
      type: 'array',
      minItems: 0,
      uniqueItems: true,
      items: nutrientSchema
    },
    footnotes: {
      bsonType: 'array',
      minItems: 0,
      uniqueItems: false,
      items: footnoteSchema
    }
  }
}

export {
  foodSchema,
  nutrientSchema,
  dataSourceSchema,
  footnoteSchema,
  weightSchema
}
