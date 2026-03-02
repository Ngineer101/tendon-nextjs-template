export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-20 text-center font-sans">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
        Generic Template
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Launch your next idea.</h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
        A clean, minimal landing page you can reuse for products, startups, and side projects.
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
        <a
          href="#"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Get Started
        </a>
        <a
          href="#"
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          Learn More
        </a>
      </div>
    </main>
  );
}
