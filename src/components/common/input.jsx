import React from 'react'

export default function input(props) {
    return (
        <div className="mb-3">
            {/* Recordemos que JSX es mas cercano a Javascript que ha HTML, por lo tanto no podemos usar 'for' porque
            eso es una palabra reservada para el 'for loop' por eso cuando queramos usar el atributo 'for' de los
            label de html, en vez de poner 'for' se usa el 'htmlFor' */}
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input type="text" name={props.name} className="form-control" id={props.name} value={props.value} onChange={props.onChange} />
        </div>
    )
}
