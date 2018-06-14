const MongoClient = require('mongodb').MongoClient

const {
    foodGroupFileName, foodGroupParseOptions,
    foodDescriptionFileName, foodDescriptionParseOptions,
    weightFileName, weightParseOptions,
    nutrientDefinitionFileName, nutrientDefinitionParseOptions,
    nutrientDataFileName, nutrientDataParseOptions,
    sourceCodeFileName, sourceCodeParseOptions,
    derivationCodeFileName, derivationCodeParseOptions,
    footnoteFileName, footnoteParseOptions,
    dataSourceFileName, dataSourceParseOptions,
    dataSourceLinkFileName, dataSourceLinkParseOptions
} = require('./parseOptions')

const { arrayToObject, arrayToObjectList } = require('./utils')

const { parseCsvFileAsync } = require('./parseUtils')

const { foodSchema } = require('./schema')

async function loadDataAsync(folder) {

    const foodGroupPathName = folder + '/' + foodGroupFileName
    const foodDescriptionPathName = folder + '/' + foodDescriptionFileName
    const weightPathName = folder + '/' + weightFileName
    const nutrientDefinitionPathName = folder + '/' + nutrientDefinitionFileName
    const nutrientDataPathName = folder + '/' + nutrientDataFileName
    const sourceCodePathName = folder + '/' + sourceCodeFileName
    const derivationCodePathName = folder + '/' + derivationCodeFileName
    const footnotePathName = folder + '/' + footnoteFileName
    const dataSourcePathName = folder + '/' + dataSourceFileName
    const dataSourceLinkPathName = folder + '/' + dataSourceLinkFileName
        
    const weights = arrayToObjectList(
        await parseCsvFileAsync(weightPathName, weightParseOptions), 
        x => x.NDB_No,
        x => (
            {
                _id: x.Seq,
                amount: x.Amount,
                description: x.Msre_Desc,
                grammeWeight: x.Gm_Wgt,
                numberOfDataPoints: x.Num_Data_Pts,
                standardDeviation: x.Std_Dev
            }
        )
    )
    const footnotes = arrayToObjectList(
        await parseCsvFileAsync(footnotePathName, footnoteParseOptions),
        x => x.NDB_No,
        x => ({
            Nutr_No: x.Nutr_No,
            sequence: x.Footnt_No,
            type: x.Footnt_Typ,
            text: x.Footnt_Txt
        })
    )
    const sourceCodes = arrayToObject(
        await parseCsvFileAsync(sourceCodePathName, sourceCodeParseOptions),
        x => x.Src_Cd,
        x => x.SrcCd_Desc
    )
    const derivationCodes = arrayToObject(
        await parseCsvFileAsync(derivationCodePathName, derivationCodeParseOptions),
        x => x.Deriv_Cd,
        x => x.Deriv_Desc
    )
    const dataSources = arrayToObject(
        await parseCsvFileAsync(dataSourcePathName, dataSourceParseOptions),
        x => x.DataSrc_ID,
        x => ({
            _id: x.DataSrc_ID,
            authors: x.Authors,
            title: x.Title,
            year: x.Year,
            journal: x.Journal,
            volumeOrCity: x.Vol_City,
            issueOrState: x.Issue_State,
            startPage: x.Start_Page,
            endPage: x.End_Page})
    )
    const dataSourceLinks = arrayToObjectList(
        await parseCsvFileAsync(dataSourceLinkPathName, dataSourceLinkParseOptions),
        x => x.NDB_No,
        x => ({
            Nutr_No: x.Nutr_No,
            dataSource: dataSources[x.DataSrc_ID]
        })
    )
    const nutrientDefinitions = arrayToObject(
        await parseCsvFileAsync(nutrientDefinitionPathName, nutrientDefinitionParseOptions),
        x => x.Nutr_No,
        x => ({
            units: x.Units,
            tagname: x.Tagname,
            description: x.NutrDesc,
            precision: x.Num_Dec,
            sortOrder: x.SR_Order
        })
    )
    const nutrientData = arrayToObjectList(
        await parseCsvFileAsync(nutrientDataPathName, nutrientDataParseOptions),
        x => x.NDB_No,
        x => ({
            _id: x.Nutr_No,
            description: nutrientDefinitions[x.Nutr_No].description,
            precision: nutrientDefinitions[x.Nutr_No].precision,
            units: nutrientDefinitions[x.Nutr_No].units,
            value: x.Nutr_Val,
            numberOfDataPoints: x.Num_Data_Pts,
            standardError: x.Std_Error,
            source: sourceCodes[x.Src_Cd] || null,
            derivation: derivationCodes[x.Deriv_Cd] || null,
            referenceNutritionId: x.Ref_NDB_No,
            hasAdditive: x.Add_Nutr_Mark,
            numberOfStudies: x.Num_Studies,
            minValue: x.Min,
            maxValue: x.Max,
            degreesOfFreedom: x.DF,
            lowerErrorBound: x.Low_EB,
            upperErrorBound: x.Up_EB,
            statisticalComment: x.Stat_cmt,
            lastUpdate: x.AddMod_Date ? x.AddMod_Date.toISOString() : null,
            confidenceCode: x.CC,
            footnotes: (footnotes[x.NDB_No] || [])
                .filter(y => y.Nutr_No === x.Nutr_No)
                .map(y => ({ sequence: y.sequence, type: y.type, text: y.text })),
            dataSources: (dataSourceLinks[x.NDB_No] || []).filter(y => y.Nutr_No === x.Nutr_No).map(y => y.dataSource)
        })
    )

    const foodGroups = arrayToObject(
        await parseCsvFileAsync(foodGroupPathName, foodGroupParseOptions), 
        x => x.NDB_No,
        x => x.FdGrp_Desc
    )

    const foodDescriptions = arrayToObject(
        await parseCsvFileAsync(foodDescriptionPathName, foodDescriptionParseOptions),
        x => x.NDB_No,
        x => ({
            _id: x.NDB_No,
            group: foodGroups[x.FdGrp_Cd],
            longDescription: x.Long_Desc,
            shortDescription: x.Shrt_Desc,
            commonName: x.ComName,
            manufacturerName: x.ManufacName,
            hasSurvey: x.Survey,
            refuseDescription: x.Ref_desc,
            refuse: x.Refuse,
            scientificName: x.SciName,
            nitrogenFactor: x.N_Factor,
            proteinFactor: x.Pro_Factor,
            fatFactor: x.Fat_Factor,
            carbohydrateFactor: x.CHO_Factor,
            weights: weights[x.NDB_No] || [],
            nutrients: nutrientData[x.NDB_No] || [],
            footnotes: (footnotes[x.NDB_No] || [])
                .filter(y => !y.Nutr_No)
                .map(y => ({ type: y.type, text: y.text }))
        })
    )

    return foodDescriptions
}

async function saveDataAsync(foods, url) {
    const connection = await MongoClient.connect(url)
    const db = connection.db("example2")
    const foodCollection = await db.createCollection('food', {
        validator: {
            $jsonSchema: foodSchema
        }
    })

    const result = await foodCollection.insertMany(foods)

    await connection.close()

    return result
}

async function mainAsync() {
    const foods = await loadDataAsync(__dirname + '/sr28asc')
    const result = await saveDataAsync(Object.values(foods), 'mongodb://localhost:27017/example2')
    return result
}

function main() {
    mainAsync()
        .then(result => {
            console.log("Done", result)
        })
        .catch(error => {
            console.log(error)
        })
}

main()
