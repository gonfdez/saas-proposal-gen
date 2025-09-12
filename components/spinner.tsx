import { Loader2 } from "lucide-react";

export default function Spinner({ size }: { size?: string |number }) {
  return <Loader2 className="animate-spin text-gray-500" size={size} />
}

