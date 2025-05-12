
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { prepareExportData, downloadFile, getCurrentDateString } from '../utils/exportUtils';

interface JsonExportButtonProps {
  results: any;
  isDisabled: boolean;
}

const JsonExportButton: React.FC<JsonExportButtonProps> = ({ results, isDisabled }) => {
  const { toast } = useToast();

  const handleExport = () => {
    const data = prepareExportData(results);
    if (!data) {
      toast({
        title: "Esportazione fallita",
        description: "Nessun dato disponibile per l'esportazione.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const fileName = `watson-analysis-${getCurrentDateString()}.json`;
    
    // Create and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Esportazione completata",
      description: "L'analisi è stata esportata correttamente.",
    });
  };

  return (
    <Button 
      onClick={handleExport}
      disabled={isDisabled}
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <FileText className="h-4 w-4" />
      Esporta JSON
    </Button>
  );
};

export default JsonExportButton;
