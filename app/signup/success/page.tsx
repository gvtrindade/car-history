import Title from "@/app/ui/title";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <Title>Success</Title>
      <p>Thank you for signing up for Car History!</p>
      <p>A validation email has been sent to your @</p>
      <p>Please check your inbox</p>
    </div>
  );
}
