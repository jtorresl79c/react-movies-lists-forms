import React, { Component } from 'react'

export default class loginForm extends Component {
    username = React.createRef(); // Refs
    
    componentDidMount(){
        this.username.current.focus() // Un ejemplo en donde lo podriamos usar, cuando el componente cargue, automaticamente
        // se pondria en focus este input, aunque otra solucion mejor si quisieramos agregar este comportamiento seria poner
        // el atributo autoFocus directamente en el Input. Por eso nos dicen que tengamos cuidado con los refs, ya que utilizando
        // el single source of truth es la forma normal para manipular datos en vez de los refs.
    }

    handleSubmit = e => {
        e.preventDefault()

        // Call the server
        const username = this.username.current.value // Refs
        console.log(username)
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
                        <input type="email" ref={this.username} className="form-control" id="username" /> {/* Refs */}
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
