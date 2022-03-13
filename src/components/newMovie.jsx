import React, { Component } from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
import { getGenres } from '../services/fakeGenreService'

export default class newMovie extends Form {
    constructor(props) {
        super(props)
        this.state = {
            // this.data SIEMPRE debe de existir, pero lo que esta dentro puede tener el nombre que querramos
            data: { title: '', stock: '', rate: '', selectedGenre: '0' },
            errors: {},
            genres: getGenres() || []
        }
    }

    // 'schema' siempre tiene que estar, porque para cada componente seran propieades diferentes las que querremos validar,
    // tambien porque form.jsx manda a llamar a this.schema, por lo que si lo omitimos el programa tronara
    schema = {
        title: Joi.string()
            .required()
            .label('Title'),
        // .label solo cambia la primera palabra, la primera palara es el nombre de la propiedad, por default
        // se mostraria -- "title" is not allowed to be empty -- PERO al poner label() ahora se ve -- "title" is not allowed to be empty -- 
        // mismo caso para stock (la propiedad abajo)
        selectedGenre: Joi.invalid('0'),
        stock: Joi.number()
            .required()
            .integer()
            .min(0)
            .max(100)
            .label('Stock'),
        rate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label('Rate')

    }

    // doSubmit() tambien tiene que estar siempre, porque no siempre vamos a querer hacer lo mismo cuando enviemos un 
    // formulario (tambien porque al darle submit este se ejecuta en el form.jsx)
    doSubmit = () => {
        const title = this.state.data.title
        console.log(title)
    }

    render() {
        let genres = this.state.genres
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* El primer parametro SIEMPRE tiene que ser igual al nombre de la propiedad dentro del this.data */}
                    {this.renderInput('title', 'Title')}


                    {/* label,selectNameValue, propertyNameInData, data */}
                    {this.renderSelect('Genre', 'genres', 'selectedGenre', genres)}


                    {/* El tercer parametro es opcional, indica el type del input, por default es text */}
                    {this.renderInput('stock', 'Number in stock', 'stock')}
                    {this.renderInput('rate', 'Rate')}



                    {this.renderButton('Save')}
                </form>
            </div>
        )
    }
}