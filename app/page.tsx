export default function Page() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-400">BrightLaunch</h1>
      <p className="mt-4 text-lg text-gray-300">Affordable, professional websites for small businesses & nonprofits.</p>
      <div className="mt-8 space-x-4">
        <a href="#services" className="px-4 py-2 bg-blue-600 rounded text-white">Services</a>
        <a href="#contact" className="px-4 py-2 bg-gray-700 rounded text-white">Contact</a>
      </div>
    </main>
  );
}
