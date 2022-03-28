import React from 'react'

export default function select({ data, onChange, name, value, selectedPropertyName, label }) {
    // Como ultima cosa, defiende el porque hicimos un select.jsx aparte y no usamos otra vez el input.jsx
    // si hubieramos usado el input.jsx se hubiera tenido que agregar muchos if en orden para que el select
    // funcionara como queriamos, por lo que hacer un componente aparte select.jsx fue la desicion correcta
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select value={value} onChange={(e) => onChange(e, selectedPropertyName)} className="form-select" name={name} id={name}>
                <option value="0" disabled>Seleccione una opcion</option>
                {data.map(obj => <option key={obj._id} value={obj._id}>{obj.name}</option>)}
            </select>
        </div>
    )
}
