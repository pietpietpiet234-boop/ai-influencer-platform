export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">AI Influencer Platform</h1>
      <p className="text-lg text-gray-600 mb-8">
        Create and manage AI-generated influencers
      </p>
      <div className="flex gap-4">
        <a
          href="/api/auth/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
