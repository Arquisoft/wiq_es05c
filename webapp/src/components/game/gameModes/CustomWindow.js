import React from 'react';
import { useEffect, useState} from 'react';
import {Table} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';




export function CustomWindow({darkMode}){

    let backgroundColor = darkMode ? '#3F3F3F' : '#D3B1C2';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    return (
        <p>Customizate</p>
    );
}