import React, { Component } from 'react'
import Input from './common/input'

export default class loginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: { username: '', password: '' },
            errors: {}
        }
    }

    componentDidMount() {

    }


    handleChange = ({ currentTarget: input }) => { // ': input' es como si fuera un 'as', por lo que es un alias
        const account = { ...this.state.account }

        account[input.name] = input.value
        console.log(account)
        this.setState({ account })
    }

    validate = () => {
        const errors = {}
        const { account } = this.state

        if(account.username.trim() === '')
            errors.username = 'Username is required.'
        if(account.password.trim() === '')
            errors.password = 'Password is required'

        // return { username: 'Username is required.' }
        return Object.keys(errors).length === 0 ? null : errors
    }

    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate()
        console.log(errors)
        this.setState({ errors: errors || {} })
        if(errors) return

        // Call the server
        const username = this.state.account.username
        console.log(username)
    }

    render() {
        const { account } = this.state
        return (
            // Select text to wrap -> CTRL+SHIFT+P -> Write wrap

            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" id="username" value={account.username} onChange={ this.handleChange  } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={account.password} onChange={ this.handleChange  } className="form-control" id="password" />
                    </div> */}

                    {/* El codigo de los input es muy repetitivo, por lo que podemos pasarlo a un componente */}
                    <Input name="username" label="Username" onChange={this.handleChange} value={this.state.account.username} />
                    { !(this.state.errors.username == null) ? this.state.errors.username : null }

                    <Input name="password" label="Password" onChange={this.handleChange} value={this.state.account.password} />


                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
