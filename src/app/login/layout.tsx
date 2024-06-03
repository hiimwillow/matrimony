import { ModeToggle } from "@/components/theme-switch";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="absolute right-3 top-3">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
