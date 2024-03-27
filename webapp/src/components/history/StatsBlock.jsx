import React from 'react';
import { Heading } from '@chakra-ui/react';

export function StatsBlock({ playerStats }){

    let nombreJugador = playerStats.nombreUsuario;
    console.log(playerStats);

    return (
        <Heading size="lg" marginTop="1em">Historial de {nombreJugador}</Heading>
    );
};