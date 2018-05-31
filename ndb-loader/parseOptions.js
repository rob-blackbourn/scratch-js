const parseOptions = {
    delimiter: '^',
    quote: '~',
    escape: '~',
    skip_empty_lines: true
}

/*
** Food Group
*/
const foodGroupFileName = "FD_GROUP.txt"
const foodGroupParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'FdGrp_Desc']
}

/*
** Food Description
*/
const foodDescriptionFileName = "FOOD_DES.txt"
const foodDescriptionParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'FdGrp_Cd',
        'Long_Desc',
        'Shrt_Desc',
        'ComName',
        'ManufacName',
        'Survey',
        'Ref_desc',
        'Refuse',
        'SciName',
        'N_Factor',
        'Pro_Factor',
        'Fat_Factor',
        'CHO_Factor'],
    cast: (value, context) => {
        switch (context.column) {
            case 'Survey':
                return value ? value == 'Y' : null
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
}

/*
** Weight
*/
const weightFileName = "WEIGHT.txt"
const weightParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'Seq',
        'Amount',
        'Msre_Desc',
        'Gm_Wgt',
        'Num_Data_Pts',
        'Std_Dev'],
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
}

const nutrientDefinitionFileName = "NUTR_DEF.txt"
const nutrientDefinitionParseOptions = {
    ...parseOptions,
    columns: [
        'Nutr_No',
        'Units',
        'Tagname',
        'NutrDesc',
        'Num_Dec',
        'SR_Order'
    ],
    cast: (value, context) => {
        switch (context.column) {
            case 'precision':
            case 'sortOrder':
                return Number.parseFloat(value) || null
            default:
                return value
        }
    }
}

const sourceCodeFileName = "SRC_CD.txt"
const sourceCodeParseOptions = {
    ...parseOptions,
    columns: ['Src_Cd', 'SrcCd_Desc']
}

const derivationCodeFileName = "DERIV_CD.txt"
const derivationCodeParseOptions = {
    ...parseOptions,
    columns: ['Deriv_Cd', 'Deriv_Desc']
}

const nutrientDataFileName = "NUT_DATA.txt"
const nutrientDataParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'Nutr_No',
        'Nutr_Val',
        'Num_Data_Pts',
        'Std_Error',
        'Src_Cd',
        'Deriv_Cd',
        'Ref_NDB_No',
        'Add_Nutr_Mark',
        'Num_Studies',
        'Min',
        'Max',
        'DF',
        'Low_EB',
        'Up_EB',
        'Stat_cmt',
        'AddMod_Date',
        'CC'
    ],
    cast: (value, context) => {
        switch (context.column) {
            case 'Add_Nutr_Mark':
                return value ? value === 'Y' : null
            case 'AddMod_Date':
                return value ? new Date(Number.parseFloat(value.slice(3, 7)), Number.parseFloat(value.slice(0, 2), 1)) : null
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
}

const dataSourceFileName = "DATA_SRC.txt"
const dataSourceParseOptions = {
    ...parseOptions,
    columns: ['DataSrc_ID', 'Authors', 'Title', 'Year', 'Journal', 'Vol_City', 'Issue_State', 'Start_Page', 'End_Page']
}

const dataSourceLinkFileName = "DATSRCLN.txt"
const dataSourceLinkParseOptions = {
    ...parseOptions,
    columns: ['NDB_No', 'Nutr_No', 'DataSrc_ID']
}

const langualFactorDescriptionFileName = "LANGDESC.txt"
const langualFactorDescriptionParseOptions = {
    ...parseOptions,
    columns: ['Factor_Code', 'Description']
}

const langualFactorFileName = "LANGUAL.txt"
const langualFactorParseOptions = {
    ...parseOptions,
    columns: ['NDB_No', 'Factor_Code']
}

const footnoteFileName = "FOOTNOTE.txt"
const footnoteParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'Footnt_No',
        'Footnt_Typ',
        'Nutr_No',
        'Footnt_Txt']
}

module.exports = {
    foodGroupFileName,
    foodGroupParseOptions,
    foodDescriptionFileName,
    foodDescriptionParseOptions,
    weightFileName,
    weightParseOptions,
    nutrientDefinitionFileName,
    nutrientDefinitionParseOptions,
    sourceCodeFileName,
    sourceCodeParseOptions,
    derivationCodeFileName,
    derivationCodeParseOptions,
    nutrientDataFileName,
    nutrientDataParseOptions,
    dataSourceFileName,
    dataSourceParseOptions,
    dataSourceLinkFileName,
    dataSourceLinkParseOptions,
    langualFactorDescriptionFileName,
    langualFactorDescriptionParseOptions,
    langualFactorFileName,
    langualFactorParseOptions,
    footnoteFileName,
    footnoteParseOptions,
}