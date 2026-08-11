"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function FilterLink({ href, children, className }: { href: string, children: ReactNode, className?: string }) {
  return (
    <Link 
      href={href} 
      scroll={false} 
      className={className}
    >
      {children}
    </Link>
  );
}
