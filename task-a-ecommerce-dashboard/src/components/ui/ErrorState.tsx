import type { ReactNode } from "react";
import { Button } from "./Button";
import { AlertIcon } from "./icons";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  action,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-white px-8 py-12 text-center ring-1 ring-slate-200"
    >
      <div className="mb-5 grid size-14 place-items-center rounded-full bg-rose-50 text-rose-500">
        <AlertIcon width={28} height={28} />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-slate-500">{message}</p>
      <div className="mt-6 flex gap-3">
        {onRetry && <Button onClick={onRetry}>Try again</Button>}
        {action}
      </div>
    </div>
  );
}
