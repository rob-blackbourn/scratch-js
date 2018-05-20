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
        systems: target.systems,
        authorities: target.authorities,
        names: target.names,
        value: target.value,
        style: target.style
    }
}

const mapDispatchToPropsFactory = isSource => dispatch => (
    {
        onDomainChanged: domain => dispatch(setDomain(domain, isSource)),
        onAuthorityChanged: authority => dispatch(setAuthority(authority, isSource)),
        onSystemChanged: system => dispatch(setSystem(system, isSource)),
        onNameChanged: name => dispatch(setName(name, isSource)),
        onValueChanged: value => dispatch(setValue(value, isSource)),
        onStyleChanged: (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision) => dispatch(setStyle(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource))
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(UnitSelector)