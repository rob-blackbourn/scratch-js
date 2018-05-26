import { connect } from 'react-redux'
import { 
    getSuggestions,
    setConverter
} from '../../actions'
import UnitCompleter from '../../components/Converter/UnitCompleter'

const mapStateToPropsFactory = isSource => state => {

    const target = isSource ? state.unitExplorer.source : state.unitExplorer.destination

    return {
        text: target.text,
        usage: target.usage,
        maxItems: target.maxItems,
        suggestions: target.suggestions
    }
}

const mapDispatchToPropsFactory = isSource => dispatch => (
    {
        onSuggestionChanged: (text, usage, maxItems) => dispatch(getSuggestions(text, usage, maxItems, isSource)),
        onConverterChanged: converter => dispatch(setConverter(converter, isSource)),
    }
)

export default isSource => connect(mapStateToPropsFactory(isSource), mapDispatchToPropsFactory(isSource))(UnitCompleter)