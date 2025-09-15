import { OnThisDay } from './OnThisDay';
import { PPVFlashback } from './PPVFlashback';

interface PPVSectionProps {
  month?: number;
  day?: number;
  promotion?: string;
}

export function PPVSection({ month, day, promotion }: PPVSectionProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <OnThisDay month={month} day={day} />
      <PPVFlashback compact={true} />
    </div>
  );
}
