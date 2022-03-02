import React, { Component } from 'react'

export default class loginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            account: { username: '', password: '' }
        }
    }
    
    componentDidMount(){

    }


    handleChange = ( { currentTarget: input } ) => { // ': input' es como si fuera un 'as', por lo que es un alias
        const account = { ...this.state.account }

        account[input.name] = input.value
        console.log(account)
        this.setState({account})
    }

    handleSubmit = e => {
        e.preventDefault()

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
                    <div className="mb-3">
                        {/* Recordemos que JSX es mas cercano a Javascript que ha HTML, por lo tanto no podemos usar 'for' porque
                        eso es una palabra reservada para el 'for loop' por eso cuando queramos usar el atributo 'for' de los
                        label de html, en vez de poner 'for' se usa el 'htmlFor' */}
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" id="username" value={account.username} onChange={ this.handleChange  } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={account.password} onChange={ this.handleChange  } className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
