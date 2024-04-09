import React from 'react';
import './Footer.css'; // Asegúrate de importar tu archivo de estilos si es necesario

import { useTranslation } from 'react-i18next';


const Footer = ({darkMode}) => {

  
  const {t} = useTranslation();

  return(  
  <footer className="footer" data-testid="footer">
    <div className="sec-footer">
    <p>{t('subject')}</p>
    </div>
    <div className="sec-footer">
      <img src={darkMode ? "/logoGitHubBlanco.png" : "/logoGitHub.png"} alt="Logo Github" style={{ width: '20px', marginRight: '5px' }} />
      <a href="https://github.com/Arquisoft/wiq_es04c" target="_blank" rel="noopener noreferrer">
        {t('github')}
      </a>
    </div>
      <div className="sec-footer">
      <img src="/logoEii.png" alt="Logo EII" style={{ width: '20px', marginRight: '5px' }} />
      <a href="https://ingenieriainformatica.uniovi.es" target="_blank"rel="noopener noreferrer">{t('university')}</a>
    </div>
  </footer>
  );
};

export default Footer;
