import React from 'react'

export default function input({ name, label, value, onChange, error }) {
    return (
        <div className="mb-3">
            {/* Recordemos que JSX es mas cercano a Javascript que ha HTML, por lo tanto no podemos usar 'for' porque
            eso es una palabra reservada para el 'for loop' por eso cuando queramos usar el atributo 'for' de los
            label de html, en vez de poner 'for' se usa el 'htmlFor' */}
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="text" name={name} className="form-control" id={name} value={value} onChange={onChange} />
            { error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
