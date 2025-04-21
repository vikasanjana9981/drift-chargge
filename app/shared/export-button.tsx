'use client';

import cn from 'app/packages/utils/class-names';
import { exportToCSV } from 'app/packages/utils/export-to-csv';
import { PiArrowLineUpBold } from 'react-icons/pi';
import { Button } from 'rizzui';

type ExportButtonProps = {
  data: unknown[];
  header: string;
  fileName: string;
  className?: string;
};

export default function ExportButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  return (
    <Button
      variant={"outline" as any}
      onClick={() => exportToCSV(data, header, fileName)}
      className={cn('w-full lg:w-auto', className)}
    >
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      Export
    </Button>
  );
}
