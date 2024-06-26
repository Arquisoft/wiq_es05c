import React from 'react';
import { useState} from 'react';
import {
    Box,
    Heading,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
  } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';



export function CustomWindow({darkMode, setTime, setNQuestions}){

    const [valueTime, changeTime] = useState(20);
    const [valueQuestionNum, changeQuestion] = useState(20);

    const {t} = useTranslation();
    const navigate = useNavigate();

    //let backgroundColor = darkMode ? '#3F3F3F' : '#D3B1C2';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    const handleClickCancelar = () => {
        navigate("/home");
    };

      const handleClickJugar = () => {
        console.log('valueTime', valueTime);
        console.log('valueQuestionNum', valueQuestionNum);
        setTime(valueTime*1000);
        setNQuestions(valueQuestionNum);
        navigate("/gameCustom");
    };

    return (
        <Box id='main-custom-box'>
            <Heading margin="2em" textAlign="center" color={titles}>{t('modoCustomTitle')}</Heading>
        <Box id="box-for-preguntas" margin="4em">
            <Heading margin="2em" textAlign="left" size="md" color={text}>{t('customModeNumPreguntas')}</Heading>
        <Slider data-testid='slider-custom-preguntas'
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
        <Box id="box-for-time" margin="4em">
            <Heading margin="2em" textAlign="left" size="md" color={text}>{t('customModeNumTiempo')}</Heading>
        <Slider data-testid='slider-custom-time'
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
      <Box id='buttons-section-custom' display="flex" flexDirection="row" justifyContent="flex-end">
        <button data-testid="button-custom-cancelar" onClick={handleClickCancelar} margin="2em" 
        style={{
          width: '6em',
          height: '3em',
          padding: '0.5em',
          margin: '2em',
          border: '2px solid #000', // añade un borde de 2px de color negro
          color: '#000', // establece el color del texto a negro
          backgroundColor: '#fff', // establece el color de fondo a blanco
        }}>
          {t('cancelar')}
        </button>
        <button data-testid="button-custom-jugar" onClick={handleClickJugar} margin="2em"
        style={{
          width: '6em',
          height: '3em',
          padding: '0.5em',
          margin: '2em',
          border: '2px solid #000', // añade un borde de 2px de color negro
          color: '#000', // establece el color del texto a negro
          backgroundColor: '#fff', // establece el color de fondo a blanco
        }}>
          {t('jugar')}
        </button>
        </Box>  
      </Box>
    );
}