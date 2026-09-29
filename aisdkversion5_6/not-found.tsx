import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">

        <h1 className="text-4xl font-bold text-gray-900">
          Conversation not found
        </h1>

        <p className="mt-3 text-gray-500">
          This conversation does not exist
          or you don't have access to it.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-6 px-5 py-3 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
        >
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}