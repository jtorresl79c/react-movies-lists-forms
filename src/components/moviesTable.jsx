import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from '../services/authService';

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: movie => (
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
            )
        }
    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;

        let columns = this.columns.slice()
        // console.log(columns)
        const user = auth.getCurrentUser()
        // console.log(user)
        if (user && user.isAdmin) {
            columns.push({
                key: "delete",
                content: movie => (
                    <button
                        onClick={() => this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                )
            })
        }

        return (
            <Table
                columns={columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;
