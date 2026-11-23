import type { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Web3Atlas · Web3 Knowledge",
    template: "%s · Web3Atlas",
  },
  description:
    "Web3Atlas — a multilingual Web3 knowledge platform covering ecosystem, security, glossary and chronicle.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
