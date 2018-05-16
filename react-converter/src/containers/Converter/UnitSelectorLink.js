import { connect } from 'react-redux'
import { 
    setDomain,
    setSystem, 
    setAuthority, 
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
        system: target.unitIdentifier.system,
        authority: target.unitIdentifier.authority,
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
        onSystemChanged: system => dispatch(setSystem(system, isSource)),
        onAuthorityChanged: authority => dispatch(setAuthority(authority, isSource)),
        onNameChanged: name => dispatch(setName(name, isSource)),
        onValueChanged: value => dispatch(setValue(value, isSource)),
        onStyleChanged: (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision) => dispatch(setStyle(isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource))
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(UnitSelector)