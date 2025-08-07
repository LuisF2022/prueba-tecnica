'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEs from '@/locales/es'
import translationEn from '@/locales/en'

// Se especifican las traducciones en idiomas ingles y español
const resources = {
    en: translationEn,
    es: translationEs,
}

// Se valida que i18n no este iniciado para prevenir repetir inicializacion
if (!i18n.isInitialized) {

    // Se usa languageDetector para detectar el idioma que tiene el navegador y usar por defecto Ingles en caso de no especificar las traducciones
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        })
}

export default i18n