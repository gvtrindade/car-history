type Props = {
  label: string;
  data: string | number;
};

export default function CarData({ label, data }: Props) {
  return (
    <>
      <p className="font-bold">{label}</p>
      <p className="ml-2">{data}</p>
    </>
  );
}
