import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

export interface DockItem {
  title: string;
  icon: ReactNode;
  href: string;
  onClick?: () => void;
}

interface DockNavigationProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const DockNavigation = ({ 
  items, 
  desktopClassName = '', 
  mobileClassName = '' 
}: DockNavigationProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleClick = (item: DockItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href.startsWith('/')) {
      navigate(item.href);
    }
  };

  return (
    <TooltipProvider>
      <Dock 
        className={cn(
          'p-1.5',
          isMobile ? mobileClassName : desktopClassName
        )}
        iconSize={isMobile ? 30 : 40}
        iconMagnification={isMobile ? 42 : 54}
        iconDistance={120}
      >
        {items.map((item, index) => (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <DockIcon
                onClick={() => handleClick(item)}
                className="bg-white/20 dark:bg-black/20 backdrop-blur hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
              >
                <div className="flex items-center justify-center h-full w-full text-black dark:text-white">
                  {item.icon}
                </div>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm text-xs font-medium"
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </Dock>
    </TooltipProvider>
  );
}; 