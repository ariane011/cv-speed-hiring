import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col } from "reactstrap";

import ListaCardParticipante from '../../components/Cards/CardParticipante/ListaCardParticipante';
import AccessCode from '../../components/AccessCode/AccessCode';
import useData from '../../hooks/useData';
import useCheckCodeLocal from '../../hooks/useCheckCodeLocal';
import './evento.css';
    
    
const Evento = () => {
    const {empresaId, eventoId} = useParams();
    const evento = useData(`https://speedhiring-8423b.firebaseio.com/eventos/${eventoId}.json`);
    const [participantes, setParticipantes] =useState([]);
    const [showList, setShowList] = useState(false);
    const isCode = useCheckCodeLocal(`code${empresaId}`);
    
    const updateShowList = (value) => setShowList(value);
    
    useEffect(() => {
        const urlParticipantes = `https://speedhiring-8423b.firebaseio.com/participantes/${empresaId}/${eventoId}.json`;

        const fetchData = async (url) => {
            try {
                const data = await fetch(url);
                const json = await data.json();

                if(json) {
                    setParticipantes(json);
                }                
            } catch (error) {
                console.log(error);
            }
        }

        if(showList || isCode) {
            fetchData(urlParticipantes);
        }

    }, [showList, isCode, empresaId, eventoId]);

    return(
        <>
        <div className="section section-dark section-nucleo-icons image-top">
            <Container>
            <Row>
                <Col lg="6" md="12">
                <h1 className="title">{evento.nomeEvento}</h1>
                <hr />
                <div className="description">
                    <p>{evento.descricao}</p>
                    <hr />
                    <p><i className="nc-icon nc-tag-content" />
                    <b> Categoria: </b> {evento.categoria}</p>
                    <p><i className="nc-icon nc-button-play" />
                    <b> Início: </b> {evento.dataInicio}</p>
                    <p><i className="nc-icon nc-button-power" />
                    <b> Conclusão: </b> {evento.dataFim}</p>
                </div>
                </Col>
                <Col className="mt-5">
                    <img src={evento.img} className="col-md-12" alt="banner com a divulgação do evento"></img>
                </Col>
            </Row>
            </Container>
        </div>{" "}
        {showList || isCode
            ? <div className="image-top-participante text-center">
                <h2>Participantes</h2>
                <hr />
                <ListaCardParticipante participantes={participantes} />
            </div>
            : <Container>
                <AccessCode onChange={updateShowList} empresaId={empresaId} />
            </Container>
        }
        </>
    )
}

export default Evento;
