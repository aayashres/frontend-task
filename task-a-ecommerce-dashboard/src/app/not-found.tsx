import { ButtonLink } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      message="The page or product you're looking for doesn't exist or has been moved."
      action={<ButtonLink href="/products">Browse products</ButtonLink>}
    />
  );
}
