import { useLanguage } from '@/contexts/LanguageContext';

const LANGUAGES = {
  en: { nativeName: 'English' },
  fil: { nativeName: 'Filipino' },
  ilo: { nativeName: 'Ilocano' },
} as const;

type LanguageCode = keyof typeof LANGUAGES;

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({
  className = '',
}: LanguageSelectorProps): JSX.Element {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as LanguageCode)}
      className={`border border-gray-300 rounded-sm px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-hidden focus:ring-1 focus:ring-primary-600 focus:border-primary-600 ${className}`}
    >
      {Object.entries(LANGUAGES).map(([code, lang]) => (
        <option key={code} value={code}>
          {lang.nativeName}
        </option>
      ))}
    </select>
  );
}
