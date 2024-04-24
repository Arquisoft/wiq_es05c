import React from 'react';
import './Footer.css'; // Asegúrate de importar tu archivo de estilos si es necesario

import { useTranslation } from 'react-i18next';


const Footer = ({darkMode}) => {
  const apiUri = process.env.REACT_APP_API_URI ||'http://localhost:8000'; 

  
  const {t} = useTranslation();

  return(  
  <footer className="footer" data-testid="footer">
    <div className="sec-footer">
    <p>{t('subject')}</p>
    </div>
    <div className="sec-footer">
      <img src={darkMode ? "/logoGitHubBlanco.png" : "/logoGitHub.png"} alt="Logo Github" style={{ width: '20px', marginRight: '5px' }} />
      <a href="https://github.com/Arquisoft/wiq_es05c" target="_blank" rel="noopener noreferrer">
        {t('github')}
      </a>
    </div>
      <div className="sec-footer">
      <img src="/logoEii.png" alt="Logo EII" style={{ width: '20px', marginRight: '5px' }} />
      <a href="https://ingenieriainformatica.uniovi.es" target="_blank"rel="noopener noreferrer">{t('university')}</a>
    </div>
    <div className="sec-footer">

    <a href={`${apiUri}:8000/api-doc`} target="_blank" rel="noopener noreferrer">{t('APIDOCS')}</a>
    </div>
  </footer>
  );
};

export default Footer;
