import React from 'react';
import './Footer.css'; // Asegúrate de importar tu archivo de estilos si es necesario

const Footer = () => (
  <footer className="footer">
    <div className="sec-footer">
    <p>Trabajo de Arquitectura del Software</p>
    </div>
    <div className="sec-footer">
      <img src="/logoGitHub.png" alt="Github" style={{ width: '20px', marginRight: '5px' }} />
      <a href="https://github.com/Arquisoft/wiq_es04c" target="_blank" rel="noopener noreferrer">
        Github del Proyecto
      </a>
    </div>
      <div className="sec-footer">
      <a href="https://ingenieriainformatica.uniovi.es" target="_blank"rel="noopener noreferrer">Escuela de Ingeniería Informática</a>
    </div>
  </footer>
);

export default Footer;
