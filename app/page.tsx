import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-dm-sans  dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-3 py-32 px-16  sm:items-start">
        <h1 className="text-7xl font-black">Mindfielida</h1>
        <h3 className="text-2xl font-light">
          A network for knowledge and thought, for those interested in pursuing
          knowledge and thought.
        </h3>
      </main>
    </div>
  );
}
