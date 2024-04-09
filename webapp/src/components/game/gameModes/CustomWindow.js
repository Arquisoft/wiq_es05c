import React from 'react';
import { useEffect, useState} from 'react';
import {
    Box,
    Heading,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
  } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';


export function CustomWindow({darkMode}){

    const [valueTime, changeTime] = useState(20);
    const [valueQuestionNum, changeQuestion] = useState(20);

    const {t} = useTranslation();

    let backgroundColor = darkMode ? '#3F3F3F' : '#D3B1C2';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    return (
        <Box id='main-custom-box'>
            <Heading margin="2em" textAlign="center" color={titles}>{t('modoCustomTitle')}</Heading>
        <Box id="box-for-preguntas" margin="5em">
            <Heading margin="2em" textAlign="left" size="md" color={text}>{t('customModeNumPreguntas')}</Heading>
        <Slider
            flex='1'
            focusThumbOnChange={false}
            value={valueQuestionNum}
            onChange={changeQuestion}
            max={50} min={1}
            colorScheme='pink'
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px' children={valueQuestionNum} />
        </Slider>
      </Box>
        <Box id="box-for-time" margin="5em">
            <Heading margin="2em" textAlign="left" size="md" color={text}>{t('customModeNumTiempo')}</Heading>
        <Slider
            flex='1'
            focusThumbOnChange={false}
            value={valueTime}
            onChange={changeTime}
            max={60} min={5}
            colorScheme='yellow'
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px' children={valueTime} />
        </Slider>
      </Box>
      </Box>
    );
}