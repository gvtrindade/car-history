import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  data: string | number;
};

export default function CarData({ label, data }: Props) {
  return (
    <div>
      <Label className="font-bold text-lg underline">{label}</Label>
      <p className="ml-2">{data}</p>
    </div>
  );
}
