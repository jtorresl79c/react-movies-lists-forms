import React from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
// import { register } from '../services/userService' // Solo importamos uno en especifico
import * as userService from '../services/userService' // Importamos todo
import { loginWithJwt } from '../services/authService'

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
            .label('Username')
            .email(), 
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
    doSubmit = async () => {
        const username = this.state.data.username
        console.log(username)

        try {
            // AJAX = http response
            const response = await userService.register(this.state.data) // Esto retorna una respuesta http, recuerda que este
            // tipo de respuesta retorna muchas cosas en su cuerpo, el que siempre usamos nosotros es data, el data de esta
            // respuesta retorna un objecto que contiene la info del usuario recien registrado, si bien eso es bueno de saber
            // lo interesante es que al momento de registrar un usuario, el servidor nos retorna un token jwt, recuerda que en un
            // spa tener un jwt valido es sinonimo de estar logueado, por lo que podriamos decir que al momento de registrarse nos
            // podemos autologear


            // Los headers que empiezan con 'x' son headers personalizados, que los headers personalizas empiezen con 'x' es un estandar en la industria.
            let token = response.headers['x-auth-token'] // El jwt que el AJAX retorna no se encuentra en el data, como se dijo 
            // arriba en el data esta exclusivamente la info del registro, el jwt se encuentra en los headers de la respuesta,
            // en el backend: routes/user.js/router.post es en donde se asigna el header a la respuesta y con ello se le da el jwt.  
            
            
            // localStorage.setItem('token', token) // Seteamos el token en el localStorage, para que el usuario pueda acceder a la aplicacion, se puede decir
            // que con esto logueamos al ususario automaticamente
            loginWithJwt(token) // Esta funcion se encuentra en authService.js, la cual se encarga de hacer el login con el jwt


            this.props.history.push('/')
        } catch (ex) { // Aqui se pone ex en vez de error porque realmente esperamos una
            // excepcion, y no un error (aunque recuerda que al final son lo mismo, solo
            // es semantica)

            // Aqui ex.response lo ponemos porque queremos que esto se ejecute solo si existe un
            // error y el .status === 400 
            if(ex.response && ex.response.status === 400){
                // Esto es cosa de la libreria JOI, recuperamos cualquier error que pueda existir
                // en this.state.errors y lo recuperamos para no borrar un mensaje que ya exista
                const errors = {...this.state.errors}
                // Aqui se pone el error que retorno el servidor
                errors.username = ex.response.data
                
                this.setState({ errors })
            }
        }

    }

    render() {
        return (
            <div>
                <h1>Register</h1>
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
