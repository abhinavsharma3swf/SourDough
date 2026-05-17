export function WelcomePage() {
    return (
        <main className="min-h-screen bg-[#efbd84]">
            <section className="relative min-h-screen overflow-hidden">
                {/* DARK HERO */}
                <div className="relative min-h-[620px] bg-[#6b2d05] px-4 pt-24 sm:min-h-[680px] md:min-h-[720px]">
                    {/* NAV */}
                    <nav className="mx-auto flex w-fit rounded-full bg-[#9a5a32] px-6 py-2 shadow-md">
                        <div className="flex items-center gap-6 text-sm font-bold text-amber-50">
                            <a href="/login">Home</a>
                            <a href="/about" >About</a>
                            <a href="/login">Login</a>
                        </div>
                    </nav>

                    {/* TITLE */}
                    <h1
                        className="mx-auto mt-14 max-w-xl text-center text-5xl font-black leading-tight text-[#fff4cf] sm:text-6xl md:text-7xl"
                        style={{ fontFamily: "Cooper Black, serif" }}
                    >
                        Homemade Sourdough Bread
                    </h1>

                    {/* WAVE */}
                    <div className="absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-none">
                        <svg
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                            className="block h-36 w-full sm:h-44 md:h-52"
                        >
                            <path
                                fill="#efbd84"
                                d="M0,192L60,213.3C120,235,240,277,360,256C480,235,600,149,720,122.7C840,96,960,128,1080,117.3C1200,107,1320,53,1380,26.7L1440,0L1440,320L0,320Z"
                            />
                        </svg>
                    </div>

                    {/* CENTERED IMAGE */}
                    <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
                        <img
                            src="/breadImage.jpg"
                            alt="Homemade sourdough bread"
                            className="h-64 w-64 rounded-full object-cover shadow-2xl sm:h-80 sm:w-80 md:h-96 md:w-96"
                        />
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <section
                    id="about"
                    className="mx-auto max-w-3xl px-6 pb-16 pt-40 text-center text-[#5a2605] sm:pt-48 md:pt-56"
                >
                    <h2 className="mb-4 font-serif text-3xl font-bold">
                        Simple ingredients. Honest process.
                    </h2>
                </section>
            </section>
        </main>
    );
}