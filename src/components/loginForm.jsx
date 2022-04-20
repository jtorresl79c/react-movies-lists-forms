import React from 'react'
import Joi from 'joi-browser'
import Forms from './common/form'
import { login } from '../services/authService'


export default class loginForm extends Forms {
    constructor(props) {
        super(props)
        this.state = {
            data: { username: '', password: '' },
            errors: {}
        }
    }

    schema = {
        username: Joi.string().required().label('Username'), // .label solo cambia la primera palabra, la primera palara es el nombre de la propiedad, por default
        // se mostraria -- "username" is not allowed to be empty -- PERO al poner label() ahora se ve -- "Username" is not allowed to be empty -- 
        // mismo caso para password (la propiedad abajo)
        password: Joi.string().required().label('Password')
    }

    componentDidMount() {

    }

    doSubmit = async () => {
        try {
            const { data } = this.state
            const { data: jwt } = await login(data.username, data.password)
            localStorage.setItem('token', jwt)
            // this.props.history.push('/')
            window.location = '/' // Esto hara que se redireccione a la pagina principal PERO recargando la pagina,
            // de esta forma cuando se mande a llamar a localStorage.getItem('token') en App.js NO SE OBTENDRA UN VALOR NULO
        } catch (ex) {
            // Recuerda que HAY UN MUNDO DE ERRORES pero no por eso debemos pensar en cada error, porque se supone
            // que nuestra app la mayoria del tiempo debe funcionar correctamente, recuerda los 10- Expected vs Unexpected Errors
            // los errores inesperados son errores genericos que ya capturamos con los interceptors, mientras que los Expected son
            // errores que no son inesperados, por ejemplo, si eliminamos un usuario que no existe, el error es esperado, en este caso
            // de abajo un error 400 significa 'Invalid email or password', algo esperado y logico, no un error de servidor.
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors }
                errors.username = ex.response.data
                this.setState( { errors } )
            }
        }

        
    }

    render() {
        // const { data, errors } = this.state
        // console.log(Object.keys(errors).length)
        return (
            // Select text to wrap -> CTRL+SHIFT+P -> Write wrap

            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" className="form-control" id="username" value={data.username} onChange={ this.handleChange  } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={data.password} onChange={ this.handleChange  } className="form-control" id="password" />
                    </div> */}

                    {/* El codigo de los input es muy repetitivo, por lo que podemos pasarlo a un componente */}
                    {/* #TSEUN543 */}
                    {/* <Input name="username" label="Username" onChange={this.handleChange} value={data.username} error={errors.username} /> */}
                    {/* <Input name="password" label="Password" onChange={this.handleChange} value={data.password} error={errors.password} /> */}

                    {/* Ahora para renderizar los Inputs se manda a llamar a una funcion que esta en form.jsx */}
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}


                    {this.renderButton('Login')}
                </form>
            </div>
        )
    }
}
