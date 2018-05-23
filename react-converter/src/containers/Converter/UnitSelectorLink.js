import { connect } from 'react-redux'
import { 
    setDomain,
    setAuthority, 
    setSystem, 
    setName,
    setValue,
    setStyle
} from '../../actions'
import UnitSelector from '../../components/Converter/UnitSelector'

const mapStateToPropsFactory = isSource => state => {

    const target = isSource ? state.unitExplorer.source : state.unitExplorer.destination

    return {
        isSource,
        domain: target.unitIdentifier.domain,
        authority: target.unitIdentifier.authority,
        system: target.unitIdentifier.system,
        name: target.unitIdentifier.name,
        domains: target.domains,
        authorities: target.authorities,
        systems: target.systems,
        names: target.names,
        value: target.value,
        style: target.style
    }
}

const mapDispatchToPropsFactory = isSource => dispatch => (
    {
        onDomainChanged: domain => dispatch(setDomain(domain ? domain : null, isSource)),
        onAuthorityChanged: authority => dispatch(setAuthority(authority ? authority : null, isSource)),
        onSystemChanged: system => dispatch(setSystem(system ? system : null, isSource)),
        onNameChanged: name => dispatch(setName(name ? name : null, isSource)),
        onValueChanged: value => dispatch(setValue(value ? value : null, isSource)),
        onStyleChanged: (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision) => dispatch(setStyle(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource))
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(UnitSelector)