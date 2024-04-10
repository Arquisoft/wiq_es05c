import React from 'react';
import { useEffect, useState} from 'react';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableContainer,} from '@chakra-ui/react';
import {Heading, Divider} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';




export function Ranking({darkMode}){

    const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
    let rankingEndpoint = apiEndpoint+`/getRankingDiarias`;

    //http://localhost:8000/getRankingDiarias
    const [ranking, setRanking] = useState([]);

    //para la internacionalización
    const {t} = useTranslation();


    useEffect(() => {
        fetch(rankingEndpoint)
          .then(response => response.json())
          .then(ranking => {
            console.log(ranking);
            setRanking(ranking);
          })
          .catch(error => {
            console.error('Error cargando el ranking:', error);
          });
      }, []);

    //Mock de usuarios
    const users = [
        { user: 'Usuario 1', diariasAcertadas: 10 },
        { user: 'Usuario 2', diariasAcertadas: 8 },
        { user: 'Usuario 3', diariasAcertadas: 5 },
        { user: 'Usuario 4', diariasAcertadas: 5 },
        { user: 'Usuario 5', diariasAcertadas: 4 },
        { user: 'Usuario 6', diariasAcertadas: 4 },
        { user: 'Usuario 7', diariasAcertadas: 3 },
        { user: 'Usuario 8', diariasAcertadas: 3 },
        { user: 'Usuario 9', diariasAcertadas: 2 },
        { user: 'Usuario 10', diariasAcertadas: 1 },
    ];

    let backgroundColor = darkMode ? '#3F3F3F' : '#D3B1C2';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Heading size="lg" color={titles} marginTop="1em" marginBottom="1em">{t('rankingTitle')}</Heading>
            <Divider orientation='horizontal' marginBottom="1em"/>
            <TableContainer>
            <Table minWidth="50vw" variant='simple' color={text} textAlign="center">
                <Thead>
                    <Tr >
                        <Th color={text} textAlign="center">{t('rankingPos')}</Th>
                        <Th color={text} textAlign="center">{t('rankingUserName')}</Th>
                        <Th color={text} textAlign="center">{t('rankingAcertadasDiarias')}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {ranking.map((user, index) => (
                    <Tr key={index}>
                        <Td textAlign="center">{index + 1}</Td>
                        <Td textAlign="center">{user.user}</Td>
                        <Td textAlign="center">{user.diariasAcertadas}</Td>
                    </Tr>
                ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th color={text} textAlign="center">{t('rankingPos')}</Th>
                        <Th color={text} textAlign="center">{t('rankingUserName')}</Th>
                        <Th color={text} textAlign="center">{t('rankingAcertadasDiarias')}</Th>
                    </Tr>
                </Tfoot>
            </Table>
            </TableContainer>
        </div>
    );
}