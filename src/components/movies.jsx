import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
// import { getMovies } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom"; // NavLink
import _ from "lodash";
import httpServices from "../services/httpServices";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 2,
        sortColumn: { path: "title", order: "asc" }
    };

    async componentDidMount() {
        // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        // this.setState({ movies: getMovies(), genres });
        // console.log("componentDidMount");
        // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        const { data: genresResponse } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...genresResponse];
        const { data: movies } = await getMovies();
        this.setState({ genres, movies });
    }

    // Esto elimina un movie del array de movies PERO del array de movies LOCAL no GLOBAL (siendo el array global lo que esta 
    // dentro de import { getMovies } from "../services/fakeMovieService") y es el local porque vemos que mandamos a llamar al
    // this.state.movies, podemos ver que esto es una COPIA del array movies del fakeMovieService porque se manda a llamar a
    // getMovies(), por ello a diferencia de newMovie.doSubmit() (el cual guardaba un movie en el array de movies global y al
    // cambiar de pagina la data era persistence y se seguia viendo el movie agregado) PERO aqui si nosotros eliminamos una pelicula
    // y navegamos de una pagina a otra Y REGRESAMOS a /movies EL MOVIE RECIEN ELIMINADO VOLVERA A APARECER y esto por lo mismo, 
    // estamos manipulando el array de movies local en vez del global que esta dentro del fakeMovieService.js.
    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if(ex.response && ex.response.status === 404)
                alert("This movie has already been deleted.");
            this.setState({ movies: originalMovies });
        }



    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies
        } = this.state;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter(m => m.genre._id === selectedGenre._id)
                : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        let currentPage = this.state.currentPage;
        const { pageSize, sortColumn } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data: movies } = this.getPagedData();

        // Esto se agrego porque si eliminabamos todos los elementos de una pagina, la pagina quedaba en blanco,
        // pero lo que queriamos es que se pasara a la ultima pagina llena, esto lo arregla
        if(Math.ceil(totalCount / pageSize) < currentPage){
            currentPage = currentPage - 1;
            this.setState({currentPage})
        }

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary">New movie</Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
