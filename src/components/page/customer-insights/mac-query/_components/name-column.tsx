"use client";

import UserContext from "@/contexts/user/user-context";
import { QueryResultAccount } from "@/lib/customer-insights/types";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { useContext } from "react";

type Props = {
  row: Row<QueryResultAccount>;
};

export function AccountNameColumn({ row }: Props) {
  const userContext = useContext(UserContext);

  return (
    <div className="flex flex-col gap-2 max-w-[400px]">
      <Link
        className="text-wrap font-medium underline underline-offset-2"
        href={`${userContext?.getBasePath()}/customer-insights/accounts/${row.original.account.account_id.toString()}`}
      >
        {row.original.account.name}
      </Link>
      {row.original.account.industry && (
        <div className="text-xs text-muted-foreground text-wrap">
          {row.original.account.industry}
        </div>
      )}
    </div>
  );
}
