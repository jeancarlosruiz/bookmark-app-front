import { Input } from "../atoms/input";

interface TagInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  hintText?: string;
}

export default function TagInput({
  value,
  onChange,
  error,
  hintText,
}: TagInputProps) {
  return (
    <Input
      label="Tags"
      name="tags"
      value={value}
      onChange={onChange}
      error={error}
      hintText={hintText}
      placeholder="e.g. Design, Learning, Tools"
    />
  );
}
