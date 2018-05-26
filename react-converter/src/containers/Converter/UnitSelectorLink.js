import { connect } from 'react-redux'
import { 
    setDomain,
    setAuthority, 
    setSystem, 
    setUnit,
    setValue,
    setStyle
} from '../../actions'
import UnitSelector from '../../components/Converter/UnitSelector'

const mapStateToPropsFactory = isSource => state => {

    const target = isSource ? state.unitExplorer.source : state.unitExplorer.destination

    return {
        domain: target.domain,
        authority: target.authority,
        system: target.system,
        unitConverter: target.unitConverter,
        domains: target.domains,
        authorities: target.authorities,
        systems: target.systems,
        units: target.units,
        value: target.value,
        style: target.style
    }
}

const mapDispatchToPropsFactory = isSource => dispatch => (
    {
        onDomainChanged: domain => dispatch(setDomain(domain ? domain : null, isSource)),
        onAuthorityChanged: authority => dispatch(setAuthority(authority ? authority : null, isSource)),
        onSystemChanged: system => dispatch(setSystem(system ? system : null, isSource)),
        onUnitChanged: unit => dispatch(setUnit(unit ? unit : null, isSource)),
        onValueChanged: value => dispatch(setValue(value ? value : null, isSource)),
        onStyleChanged: (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision) => dispatch(setStyle(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource))
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(UnitSelector)