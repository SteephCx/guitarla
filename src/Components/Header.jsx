import {Fragment} from 'react'

export default function Header(){

    const name = "juan"
    const total = 100


    return(
        <Fragment>
        <p>Hola: {name}</p>
        <p>Total a pagar : {total} </p>
        </Fragment>
    )
} 

