import React, { useState } from 'react';
import CardEvento from '../../components/Cards/CardEvento';
import IndexHeader from '../../components/Headers/IndexHeader';
import Search from '../../components/Search/Search';
import imgHeader from '../../assets//img/grupo-de-pessoas-speed-hiring.jpg';
import './style.css'
import useData from '../../hooks/useData'

import {
    Container,
    Form,
    Row,
    Col
  } from "reactstrap";

const Home = () => {
    const [value, setValue] = useState('');

    const updateValue = (value) => setValue(value);

    const dataHeader = {
        title: "speed hiring",
        urlImg: imgHeader,
        description: "Tornando rápido e fácil a busca de novos candidatos, facilitando o processo de contratação."
    }

    
   const eventoList = useData('https://speedhiring-8423b.firebaseio.com/eventos.json');

    return(
        <>
        <IndexHeader props={dataHeader} />
        <div className="search-highlight">
            <Container>
                <Row>
                    <Col className="mx-auto" md="10">
                        <Form className="register-form search-form search-form-color" onSubmit={e => e.preventDefault()}>
                            <Search onChange={updateValue} maxLength="40" />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        <Container>
            <h3>Valor digitado: {value}</h3>
            {eventoList &&
                <div className="box-flex mt-5">
                    {eventoList && eventoList.map((evento, index) => (<CardEvento key={index} evento={evento}/>))}
                </div>
            }
        </Container>
        </>
    )
};

export default Home;