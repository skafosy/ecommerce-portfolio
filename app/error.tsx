"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell empty-state">
      <h1>Something interrupted the demo.</h1>
      <p>Please try again. No payment or order has been processed.</p>
      <button type="button" className="primary-button mt-6" onClick={reset}>
        Try again ↗
      </button>
    </div>
  );
}
