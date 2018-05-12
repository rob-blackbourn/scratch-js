import React from 'react'
import PropTypes from 'prop-types'

export default class UnitSelector extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <select>
                        {this.props.fromUnitSelector.domains.map(domain => (<option>{domain}</option>))}
                    </select>
                </div>
                <div>
                    <select>
                        {this.props.fromUnitSelector.systems.map(system => (<option>{system}</option>))}
                    </select>
                </div>
                <div>
                    <select>
                        {this.props.fromUnitSelector.authorities.map(authority => (<option>{authority}</option>))}
                    </select>
                </div>
                <div>
                    <select>
                        {this.props.fromUnitSelector.names.map(name => (<option>{name}</option>))}
                    </select>
                </div>
            </div>
        )
    }
}