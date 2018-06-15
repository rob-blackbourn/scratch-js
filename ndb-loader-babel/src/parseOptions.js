const parseOptions = {
    delimiter: '^',
    quote: '~',
    escape: '~',
    skip_empty_lines: true
}

function asStringOrNull(value) {
    return value ? value : null
}

function asFloatOrNull(value) {
    return value ? Number.parseFloat(value) : null
}

function asBoolOrNull(value) {
    return value ? value == 'Y' : null
}

function asDateOrNull(value) {
    return value ? new Date(Number.parseFloat(value.slice(3, 7)), Number.parseFloat(value.slice(0, 2), 1)) : null
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
                return asBoolOrNull(value)
            case 'Refuse':
            case 'N_Factor':
            case 'Pro_Factor': 
            case 'Fat_Factor':
            case 'CHO_Factor': 
                return asFloatOrNull(value)
            default:
                return asStringOrNull(value)
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
                return asFloatOrNull(value)
            default:
                return asStringOrNull(value)
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
            case 'Num_Dec':
            case 'SR_Order':
                return asFloatOrNull(value)
            default:
                return asStringOrNull(value)
        }
    }
}

const sourceCodeFileName = "SRC_CD.txt"
const sourceCodeParseOptions = {
    ...parseOptions,
    columns: ['Src_Cd', 'SrcCd_Desc'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

const derivationCodeFileName = "DERIV_CD.txt"
const derivationCodeParseOptions = {
    ...parseOptions,
    columns: ['Deriv_Cd', 'Deriv_Desc'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
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
                return asBoolOrNull(value)
            case 'AddMod_Date':
                return asDateOrNull(value)
            case 'Nutr_Val':
            case 'Num_Data_Pts':
            case 'Std_Error': 
            case 'Num_Studies':
            case 'Min': 
            case 'Max': 
            case 'DF': 
            case 'Low_EB': 
            case 'Up_EB': 
                return asFloatOrNull(value)
            default:
                return asStringOrNull(value)
        }
    }
}

const dataSourceFileName = "DATA_SRC.txt"
const dataSourceParseOptions = {
    ...parseOptions,
    columns: ['DataSrc_ID', 'Authors', 'Title', 'Year', 'Journal', 'Vol_City', 'Issue_State', 'Start_Page', 'End_Page'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

const dataSourceLinkFileName = "DATSRCLN.txt"
const dataSourceLinkParseOptions = {
    ...parseOptions,
    columns: ['NDB_No', 'Nutr_No', 'DataSrc_ID'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

const langualFactorDescriptionFileName = "LANGDESC.txt"
const langualFactorDescriptionParseOptions = {
    ...parseOptions,
    columns: ['Factor_Code', 'Description'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

const langualFactorFileName = "LANGUAL.txt"
const langualFactorParseOptions = {
    ...parseOptions,
    columns: ['NDB_No', 'Factor_Code'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

const footnoteFileName = "FOOTNOTE.txt"
const footnoteParseOptions = {
    ...parseOptions,
    columns: [
        'NDB_No',
        'Footnt_No',
        'Footnt_Typ',
        'Nutr_No',
        'Footnt_Txt'],
    cast: (value, context) => {
        return asStringOrNull(value)
    }
}

export {
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