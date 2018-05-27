import { connect } from 'react-redux'
import { 
    setDomain,
    setAuthority, 
    setSystem, 
    setUnit,
    setValue,
    setStyle,
    toggleSettings
} from '../../actions'
import ValueDisplay from '../../components/Converter/ValueDisplay'

const mapStateToPropsFactory = isSource => state => {

    const target = isSource ? state.unitExplorer.source : state.unitExplorer.destination

    return {
        value: target.value,
        style: target.style,
        isSettingsOpen: target.isSettingsOpen
    }
}

const mapDispatchToPropsFactory = isSource => dispatch => (
    {
        onValueChanged: value => dispatch(setValue(value ? value : null, isSource)),
        onStyleChanged: (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision) => dispatch(setStyle(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource)),
        toggleSettings: () => dispatch(toggleSettings(isSource))
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(ValueDisplay)