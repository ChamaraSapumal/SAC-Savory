export default function NotFound() {
  return (
    <>
      {/* This example requires updating your template:
          <html class="h-full">
          <body class="h-full">
        */}
      <main
        className="grid h-screen  place-items-center bg-cover bg-center px-6 py-24 sm:py-32 lg:px-8"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", // Unsplash image link
        }}
      >
        <div className="text-center p-6 rounded-lg">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-green-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-green-900 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/sac-savory"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Go back home
            </a>
            <a
              href="/sac-savory/contactus"
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
