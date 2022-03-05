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
        // ¿Porque ponemos 'errors: errors || {}'?, tiene que ver con #TSEUN543, especificamente cuando ponemos errors.username, digamos que tenemos 
        // 'this.setState({ errors })', this.validate nos regresara un objeto con propiedades O un null, si nos regresa un objeto con propiedades al
        // poner errors.username (aunque no exista la propiedad username y solo exista la propiedad password) o se imprime el valor de la propiedad o
        // simplemente se imprimira undefined (porque si no esta la propiedad pues retorna eso) PERO si this.validate() retorna un null, cuando se
        // ponga errors.username es como si pusieramos null.username, eso es TOTALMENTE diferente a que si pusieramos {}.username, el primero (null.username)
        // no tiene sentido y obviamente retornara un error EN CAMBIO {}.username solo retornara undefined y no se vera nada en pantalla, es porque que no
        // no podemos poner simplemente 'this.setState({ errors })', porque si no existen errores estariamos poniento 'this.state({ null })'. Es por eso que
        // ponemos el ||, si es null automaticamente ponemos un objeto en blanco y si no pues se pone el objeto errors con sus respectivos mensajes de errores
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
                    {/* #TSEUN543 */}
                    { !(this.state.errors.username == null) ? this.state.errors.username : null }

                    <Input name="password" label="Password" onChange={this.handleChange} value={this.state.account.password} />


                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
