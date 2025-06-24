import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Translate } from '@phosphor-icons/react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-pastel-blue hover:text-pastel-purple hover:bg-pastel-blue/10 border-0 rounded-xl"
        >
          <Translate weight="fill" className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')} 
          className={`rounded-lg ${i18n.language === 'en' ? 'bg-pastel-blue/10 text-pastel-blue' : ''}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('zh')} 
          className={`rounded-lg ${i18n.language === 'zh' ? 'bg-pastel-blue/10 text-pastel-blue' : ''}`}
        >
          中文 (Chinese)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher; 