import React, { Component } from 'react'

export default class loginForm extends Component {
    handleSubmit = e => {
        e.preventDefault()

        // Call the server
        console.log('Submitted')
    }

    render() {
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
                        <input type="email" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
