import React from 'react'

// name, label y error se mantuvieron porque la etiqueta label lo usa de forma separado, asi como el id en la etiqueta
// input y el error lo utiliza la etiqueta div

// se pone ...rest como forma de declaracion
export default function input({ name, label, error, ...rest}) { // No importa el orden en el que
    // los establescamos, porque los estamos destructurando, SE RECIBE UN OBJETO no parametros de funciones.
    return (
        <div className="mb-3">
            {/* Recordemos que JSX es mas cercano a Javascript que ha HTML, por lo tanto no podemos usar 'for' porque
            eso es una palabra reservada para el 'for loop' por eso cuando queramos usar el atributo 'for' de los
            label de html, en vez de poner 'for' se usa el 'htmlFor' */}
            <label htmlFor={name} className="form-label">{label}</label>
            {/* se pone {...rest} para que se establescan todas las propiedades */}
            {/* name={name} se pone porque ...rest TRAE TODAS LAS PROPIEDADES excepto las ya declaradas (que en esta caso
                son name, label y error)*/} 
            <input name={name} className="form-control" id={name} {...rest}/>
            { error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
