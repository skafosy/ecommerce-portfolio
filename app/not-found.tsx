import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-shell empty-state">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>We could not find that page.</h1>
      <p>The product may not exist in this demo collection.</p>
      <Link href="/" className="primary-button mt-6">
        Back to the store ↗
      </Link>
    </div>
  );
}
