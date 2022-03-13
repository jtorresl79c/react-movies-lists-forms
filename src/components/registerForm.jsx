import React from 'react'
import Form from './common/form'
import Joi from 'joi-browser'

export default class registerForm extends Form {
    constructor(props) {
        super(props)
        this.state = {
            // this.data SIEMPRE debe de existir, pero lo que esta dentro puede tener el nombre que querramos
            data: { username: '', password: '', name: '' },
            errors: {}
        }
    }

    // 'schema' siempre tiene que estar, porque para cada componente seran propieades diferentes las que querremos validar,
    // tambien porque form.jsx manda a llamar a this.schema, por lo que si lo omitimos el programa tronara
    schema = {
        username: Joi.string()
            .required()
            .label('Username'), 
        // .label solo cambia la primera palabra, la primera palara es el nombre de la propiedad, por default
        // se mostraria -- "username" is not allowed to be empty -- PERO al poner label() ahora se ve -- "Username" is not allowed to be empty -- 
        // mismo caso para password (la propiedad abajo)
        password: Joi.string()
            .required()
            .min(5)
            .label('Password'),
        name: Joi.string().required()
            .label('Name')

    }

    // doSubmit() tambien tiene que estar siempre, porque no siempre vamos a querer hacer lo mismo cuando enviemos un 
    // formulario (tambien porque al darle submit este se ejecuta en el form.jsx)
    doSubmit = () => {
        const username = this.state.data.username
        console.log(username)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* El primer parametro SIEMPRE tiene que ser igual al nombre de la propiedad dentro del this.data */}
                    {this.renderInput('username', 'Username')}
                    {/* El tercer parametro es opcional, indica el type del input, por default es text */}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}


                    {this.renderButton('Register')}
                </form>
            </div>
        )
    }
}
