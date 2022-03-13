import React from 'react'

export default function select({ data, onChange, name, value, selectedPropertyName, label }) {
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
