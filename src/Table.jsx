import React from 'react'
import './Table.css'

const Table = ({ countries }) => {
    return (
        <>
            <h3>Live Cases by Country</h3>
            <div className="table">
                {
                    countries.map(({ country, cases }) => (
                        <tr>
                            <td>{country}</td>
                            <td><strong>{cases}</strong></td>
                        </tr>
                    ))
                }
            </div>
        </>
    )
}

export default Table
