import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './common/input'

export default class loginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: { username: '', password: '' },
            errors: {}
        }
    }

    schema =  {
        username: Joi.string().required().label('Username'), // .label solo cambia la primera palabra, la primera palara es el nombre de la propiedad, por default
        // se mostraria -- "username" is not allowed to be empty -- PERO al poner label() ahora se ve -- "Username" is not allowed to be empty -- 
        // mismo caso para password (la propiedad abajo)
        password: Joi.string().required().label('Password')
    }

    componentDidMount() {

    }

    validateProperty = ({ name: inputName, value: inputValue }) => { // Antes tenia el nombre de validateInput - inputValue = lo que se escribio
        const obj = { [inputName]: inputValue }
        const schema = { [inputName] : this.schema[inputName] }
        // const options = {
        //     abortEarly: false
        // }

        

        const {error} = Joi.validate(obj, schema) // podriamos pensar que se nos olvido pasar 'options' pero no es asi, cuando se hacia la validacion al 
        // presionar el boton de Login, nosotros queremos que se evalue TODO porque al hacer eso se consiguen todos los mensajes de error, si no lo poniamos,
        // al detectar el primer input vacio ya no evaluaba los demas inputs y solo evaluaba el primero, pero cuando pasamos el tercer argumento options forzabamos
        // a que se evaluara completamente todos los inputs, en este caso siempre estaremos validando solo uno y por lo tanto el tercer argumento no nos brinda
        // ninguna ayuda y seria inecesario

        return (error ? error.details[0].message : null)

        // return error.details

        // return null || message - Lo que tiene que retornar esta funcion
    }


    handleChange = ({ currentTarget: input }) => { // ': input' es como si fuera un 'as', por lo que es un alias
        // input = event, input es el objeto event, solo que aqui lo estamos destructurando - currentTarget retorna el element // en este caso element es igual a 'input'
        
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input)
        if(errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const account = { ...this.state.account }
        account[input.name] = input.value
        // console.log(account)
        this.setState({ account, errors })
        
    }

    validate = () => {
        const options = {
            abortEarly: false
        }
        
        // antes estaba como const result, pero es mejor destructurarlo a { error }, al fin de cuentas el que nos importa es la propiedad error
        const {error} = Joi.validate(this.state.account, this.schema, options) 
        // objecto que queremos validar, el schema creado arriba en donde el nombre de las propiedades validades deben de ser igual en los dos
        // y el tercero es porque cuando Joi.validate se ejecuta y encuentra un error de validacion es como un break, ya no sigue evaluando
        // si queremos que siga la evaluacion y no detenga el codigo, se pone abortEarly: false

        // result.error = null || result.error = {properties} - posibles resultados de result.error

        // result retorna un objeto con varias propiedades, la que nos interesa por ahora es la propiedad error, esta propiedad retorna un null
        // si no hay ningun problema de validacion (que se pusieron dentro del obj schema) PERO si existen problemas de validacion esta propiedad
        // error retorna un obj con varias propiedades, de aqui en adelante nos enfocaremos en dicho objeecti
        
        //Quiero que retornes null SI result.error es NULL, como null es falsy ponemoms el !, de esta forma lo logramos
        if(!error) return null // result.error puede retornar null o un obj, si es null sabemos que se toma como falsy y su es una propiedad lo toma como truty
        // retornamos null si no existen errores, por lo tanto todo el codigo de abajo tenemos la certeza que solo se ejecutara cuando HAY errores

        const errors = {}
        for(let item of error.details) errors[item.path[0]] = item.message
        return errors
    }

    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate()
        // console.log(errors)
        // ¿Porque ponemos 'errors: errors || {}'?, tiene que ver con #TSEUN543, especificamente cuando ponemos errors.username, digamos que tenemos 
        // 'this.setState({ errors })', this.validate nos regresara un objeto con propiedades O un null, si nos regresa un objeto con propiedades al
        // poner errors.username (aunque no exista la propiedad username y solo exista la propiedad password) o se imprime el valor de la propiedad o
        // simplemente se imprimira undefined (porque si no esta la propiedad pues retorna eso, un undefined) PERO si this.validate() retorna un null, cuando se
        // ponga errors.username es como si pusieramos null.username, eso es TOTALMENTE diferente a que si pusieramos {}.username, el primero (null.username)
        // no tiene sentido y obviamente retornara un error EN CAMBIO {}.username solo retornara undefined y no se vera nada en pantalla, es porque que no
        // no podemos poner simplemente 'this.setState({ errors })', porque si no existen errores estariamos poniento 'this.state({ null })'. Es por eso que
        // ponemos el ||, si es null automaticamente ponemos un objeto en blanco y si no pues se pone el objeto errors con sus respectivos propiedades que nos
        // indican los errores
        this.setState({ errors: errors || {} })
        if(errors) return

        // Call the server
        const username = this.state.account.username
        console.log(username)
    }

    render() {
        const { account, errors } = this.state
        // console.log(Object.keys(errors).length)
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
                    {/* #TSEUN543 */}
                    <Input name="username" label="Username" onChange={this.handleChange} value={account.username} error={errors.username} />

                    <Input name="password" label="Password" onChange={this.handleChange} value={account.password} error={errors.password} />


                    <button className="btn btn-primary" disabled={ this.validate() }>Login</button>
                </form>
            </div>
        )
    }
}
