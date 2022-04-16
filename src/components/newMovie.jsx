import React from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
// import { getGenres } from '../services/fakeGenreService'
// import {saveMovie} from '../services/fakeMovieService'
import { getGenres } from '../services/genreService'
import {saveMovie} from '../services/movieService'

export default class newMovie extends Form {
    constructor(props) {
        super(props)
        this.state = {
            // this.data SIEMPRE debe de existir, pero lo que esta dentro puede tener el nombre que querramos
            data: { title: '', stock: '', rate: '', selectedGenre: '0' },
            errors: {},
            genres: []
        }
    }

    // 'schema' siempre tiene que estar, porque para cada componente seran propieades diferentes las que querremos validar,
    // tambien porque form.jsx manda a llamar a this.schema, por lo que si lo omitimos el programa tronara
    schema = {
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        // .label solo cambia la primera palabra, la primera palara es el nombre de la propiedad, por default
        // se mostraria -- "title" is not allowed to be empty -- PERO al poner label() ahora se ve -- "title" is not allowed to be empty -- 
        // mismo caso para stock (la propiedad abajo)
        selectedGenre: Joi.invalid('0').required(),
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

    async componentDidMount() {
        const { data: genres } = await getGenres()
        this.setState({ genres })
    }

    // doSubmit() tambien tiene que estar siempre, porque no siempre vamos a querer hacer lo mismo cuando enviemos un 
    // formulario (tambien porque al darle submit este se ejecuta en el form.jsx)
    doSubmit = async () => {
        // const title = this.state.data.title
        const { data } = this.state
        let movie = {}

        movie._id = null
        movie.title = data.title
        movie.genreId = data.selectedGenre
        movie.numberInStock = data.stock
        movie.dailyRentalRate = data.rate

        // console.log(movie)
        // Cuando se guarda un nuevo movie usando saveMovie() y retornemos a /movies (en donde esta el filtro) el movie agregado al array
        // de movies que esta en fakeMovieService.js AUN SEGUIRA, algo nuevo que acabamos de aprender, si bien en movies.jsx y newMovie.jsx
        // usando su propio import n from '../services/fakeMovieService' al parecer en js funciona como si fuera vuex o redux, osea que se
        // es persistente la data, eso quiere decir que no necesitamos vuex o redux OBLIGATORIAMENTE para conseguir un resultado similiar
        // y que con vanilla js podemos lograr algo parecido.
        const movieid = await saveMovie(movie)

        this.props.history.push("/movies")
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
