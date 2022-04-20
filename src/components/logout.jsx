import React, { Component } from 'react'

import auth from '../services/authService'

export default class Logout extends Component {

    componentDidMount(){
        auth.logout()
        window.location.href = '/' // Se pone esto en vez de un push o replace porque al regresar
        // a la pagina principal queremos que se lea de nuevo el localStorage y al menos que la pagina
        // se recargue completamente la app no sabra que ya se elimino que el token del localStorage
    }

    render() {
        return null // Al retornar un null no se renderiza nada y la pagina se ve en blanco
        // pero como arriba se establece el window.location pues ni se nota que no se esta
        // renderizando algo
    }
}
