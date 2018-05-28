const fs = require('fs');
const parse = require('csv-parse');

const parseOptions = {
    delimiter: '^',
    quote: '~',
    escape: '~',
    skip_empty_lines: true
}

fs.createReadStream(
    __dirname + '/sr28asc/FD_GROUP.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['FdGrp_Cd', 'FdGrp_Desc']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/FOOD_DES.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'FdGrp_Cd', 'Long_Desc', 'Shrt_Desc', 'ComName', 'ManufacName', 'Survey', 'Ref_desc', 'Refuse', 'SciName', 'N_Factor', 'Pro_Factor', 'Fat_Factor', 'CHO_Factor'],
    cast: (value, context) => {
        switch (context.column) {
            case 'Survey':
                return value == 'Y'
            case 'Refuse':
            case 'N_Factor':
            case 'Pro_Factor': 
            case 'Fat_Factor':
            case 'CHO_Factor': 
                return Number.parseFloat(value) || null
            default:
                return value
        }
    }
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/WEIGHT.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'Seq', 'Amount', 'Msre_Desc', 'Gm_Wgt', 'Num_Data_Pts', 'Std_Dev'],
    cast: (value, context) => {
        switch (context.column) {
            case 'Amount':
            case 'Gm_Wgt':
            case 'Num_Data_Pts': 
            case 'Std_Dev':
                return Number.parseFloat(value) || null
            default:
                return value
        }
    }
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/NUTR_DEF.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['Nutr_No', 'Units', 'Tagname', 'NutrDesc', 'Num_Dec', 'SR_Order'],
    cast: (value, context) => {
        switch (context.column) {
            case 'Num_Dec':
            case 'SR_Order':
                return Number.parseFloat(value) || null
            default:
                return value
        }
    }
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/SRC_CD.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['Src_Cd', 'SrcCd_Desc']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/DERIV_CD.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['Deriv_Cd', 'Deriv_Desc']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/NUT_DATA.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'Nutr_No', 'Nutr_Val', 'Num_Data_Pts', 'Std_Error', 'Src_Cd', 'Deriv_Cd', 'Ref_NDB_No', 'Add_Nutr_Mark', 'Num_Studies', 'Min', 'Max', 'DF', 'Low_EB', 'Up_EB', 'Stat_cmt', 'AddMod_Date', 'CC'],
    cast: (value, context) => {
        switch (context.column) {
            case 'Nutr_Val':
            case 'Num_Data_Pts':
            case 'Std_Error': 
            case 'Num_Studies':
            case 'Min': 
            case 'Max': 
            case 'DF': 
            case 'Low_EB': 
            case 'Up_EB': 
                return Number.parseFloat(value) || null
            default:
                return value
        }
    }
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/DATA_SRC.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['DataSrc_ID', 'Authors', 'Title', 'Year', 'Journal', 'Vol_City', 'Issue_State', 'Start_Page', 'End_Page']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/DATSRCLN.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'Nutr_No', 'DataSrc_ID']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/LANGDESC.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['Factor_Code', 'Description']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/LANGUAL.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'Factor_Code']
}, (err, data) => {
    console.log(data)
}))

fs.createReadStream(
    __dirname + '/sr28asc/FOOTNOTE.txt',
    { encoding: 'latin1' }
).pipe(parse({
    ...parseOptions,
    columns: ['NDB_No', 'Footnt_No', 'Footnt_Typ', 'Nutr_No', 'Footnt_Txt']
}, (err, data) => {
    console.log(data)
}))
