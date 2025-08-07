'use client'

import { useTranslation } from "react-i18next";

interface SpinnerProps {
    showText?: boolean
}

const Spinner = ({ showText = true }: SpinnerProps) => {
    const { t } = useTranslation(['commons']);
    return (
        <div className="flex justify-center items-center">
            <div className="border-4 w-6 h-6 border-t-transparent rounded-full animate-spin border-black mr-2"></div>
            {showText && <div className="animate-pulse">{t('spinnerText')}</div>}
        </div>
    )
}

export default Spinner