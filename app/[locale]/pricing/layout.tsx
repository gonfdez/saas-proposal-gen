import type { Metadata } from "next";
import Header from "@/components/header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description: "SaaS Proposal generator pricing and plans",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PricingLayout({ children, params }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
