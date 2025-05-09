
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InputMethodToggleProps {
  inputMethod: "text" | "file";
  setInputMethod: (method: "text" | "file") => void;
  onFileSwitch?: () => void;
}

const InputMethodToggle: React.FC<InputMethodToggleProps> = ({
  inputMethod,
  setInputMethod,
  onFileSwitch
}) => {
  return (
    <RadioGroup 
      value={inputMethod} 
      onValueChange={(value) => {
        setInputMethod(value as "text" | "file");
        if (value === "file" && onFileSwitch) {
          setTimeout(onFileSwitch, 100);
        }
      }}
      className="flex items-center space-x-4 mb-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="text" id="text" />
        <Label htmlFor="text">Text</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="file" id="file" />
        <Label htmlFor="file">Text file</Label>
      </div>
    </RadioGroup>
  );
};

export default InputMethodToggle;
