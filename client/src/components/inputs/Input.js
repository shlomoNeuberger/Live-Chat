import React from 'react'
import axios from 'axios'

const ENDPOINT = "http://127.0.0.1:3001/api"

class CustomInput extends React.Component {
    timer
    constructor(props) {
        super(props)
        this.state = {
            borderStyle: {}
        }
    }

    componentDidUpdate() {
        if (this.props.error) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                if (this.props.fieldName.toLowerCase !== 'password' && this.props.value)
                    axios.get(`${ENDPOINT}/${this.props.fieldName}/${this.props.value}`)
                        .then(({ data }) => {
                            if (data.isTeaken && this.state.borderStyle.border === undefined) {
                                this.props.setLoginFlag(true)
                                this.setState({
                                    borderStyle: {
                                        border: 'solid',
                                        borderRadius: '3px',
                                        borderColor: 'red'
                                    }
                                })
                            } else if (!data.isTeaken && this.state.borderStyle.border !== undefined) {
                                this.props.setLoginFlag(false)
                                this.setState({
                                    borderStyle: {}
                                })
                            }
                        }).catch(err => console.log(err))
            }, 500)
        }
    }
    /**
     * 
     * @param {Event} e 
     */
    changeHanlder(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div className="input-group mb-3"
                style={this.state.borderStyle}
            >
                <span className="input-group-text" id="basic-addon1">{this.props.name}</span>
                <input
                    onChange={e => { this.props.handler(e.target.value) }}
                    value={this.props.value}
                    type={this.props.type}
                    name={this.props.name}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    aria-label={this.props.name}
                    aria-describedby="basic-addon1" />
                {this.props.children}
            </ div>
        );
    }
}


export default CustomInput