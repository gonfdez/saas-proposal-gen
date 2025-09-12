import { Link } from "@/i18n/navigation";
import { Origami } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"} className={`flex items-center gap-2 w-fit ${className || ""}`}>
      <Origami className="!size-5 text-primary" />
      <span className="text-base font-semibold">Proposal AI</span>
    </Link>
  )
}