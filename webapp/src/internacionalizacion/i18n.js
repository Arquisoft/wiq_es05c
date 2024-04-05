//fichero de configuración de internacionalización

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN
        },
        es: {
            translation: translationES
        }
    },
    
    lng: "es", //idioma predeterminado
    fallbackLng: "en", //idioma de respaldo por si no funciona el idioma predeterminado

    interpolation: {
        escapeValue: false
    }
});

export default i18n;