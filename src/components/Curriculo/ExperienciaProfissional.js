import React from 'react'
import './style.css'
import business from '../../assets/icons/business.svg'
import data from '../../assets/icons/date.svg'

const ExperienciaProfissional = (props) => {

    const {cargo, empresa, dataInicio, dataFim, atual} = props
    
    const periodo = atual === "S" ? "Atual" : ""; 

    return (
        <section className="section-exp">
                <p className="p-cargo">{cargo}</p>
                <div className="empresa">
                    <img className="icon-business" src={business} alt="ícone de empresa - prédio"/>
                    <p className="p-empresa">{empresa}</p>
                    <img className="icon-calendar" src={data} alt="ícone de calendário" />
                    <p className="p-periodo">{dataInicio} - {dataFim} {periodo}</p>
                </div>
                <hr className="linha"/>
        </section>
    )
}

export default ExperienciaProfissional