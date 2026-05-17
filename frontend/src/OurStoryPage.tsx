import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

export const OurStoryPage = ({session} : any) => {

    const [showOrderPopup, setShowOrderPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOrderPopup(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen bg-[#efbd84] text-[#4b2105]">
            {/* HERO */}
            <section className="relative overflow-hidden bg-[#6b2d05] px-6 pb-28 pt-20 text-center text-[#fff4cf]">
                {/* NAV */}
                <nav className="mx-auto mb-16 flex w-fit rounded-full bg-[#9a5a32] px-6 py-2 shadow-md">
                    <div className="flex items-center gap-6 text-sm font-bold text-amber-50">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </nav>

                <h1
                    className="mx-auto max-w-3xl text-5xl font-black leading-tight sm:text-6xl md:text-7xl"
                    style={{ fontFamily: "Cooper Black, serif" }}
                >
                    Our Story
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-amber-100 sm:text-xl">
                    Homemade sourdough made with simple ingredients, and a commitment to honest, high-quality bread.
                </p>

                {/* WAVE */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        className="block h-28 w-full sm:h-36 md:h-44"
                    >
                        <path
                            fill="#efbd84"
                            d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,224C840,235,960,213,1080,181.3C1200,149,1320,107,1380,85.3L1440,64L1440,320L0,320Z"
                        />
                    </svg>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="/breadImage.jpg"
                            alt="Fresh homemade sourdough bread"
                            className="h-72 w-72 rounded-full object-cover shadow-2xl sm:h-96 sm:w-96"
                        />
                    </div>

                    {/* TEXT */}
                    {/* TEXT */}
                    <div className="rounded-[2rem] bg-[#fff4cf] p-8 shadow-xl">
                        <h2
                            className="mb-5 text-4xl font-black text-[#6b2d05]"
                            style={{ fontFamily: "Cooper Black, serif" }}
                        >
                            A Taste Inspired by Living in Germany
                        </h2>

                        <p className="text-lg leading-8">
                            Our sourdough journey started after moving back from Germany, where bread
                            was part of everyday life. The bakeries, fresh loaves, and simple approach
                            to quality ingredients shaped the way we think about bread.
                        </p>

                        <p className="mt-5 text-lg leading-8">
                            After returning home, we wanted to recreate that same experience. Honest
                            bread made with organic flour, water, salt, and sourdough starter. No
                            unnecessary preservatives, no shortcuts, and no complicated ingredients.
                        </p>

                        <p className="mt-5 text-lg leading-8">
                            Every loaf is made to order after confirming by the baker, so it is always fresh with the homemade quality that makes sourdough
                            worth sharing.
                        </p>
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-[2rem] bg-[#f8d39f] p-8 text-center shadow-lg">
                        <h3 className="mb-3 text-2xl font-bold text-[#6b2d05]">
                            Organic Flour
                        </h3>
                        <p className="leading-7">
                            We start with quality organic flour to create a cleaner, better-tasting
                            loaf.
                        </p>
                    </div>

                    <div className="rounded-[2rem] bg-[#fff4cf] p-8 text-center shadow-lg">
                        <h3 className="mb-3 text-2xl font-bold text-[#6b2d05]">
                            Natural Fermentation
                        </h3>
                        <p className="leading-7">
                            Sourdough fermentation allows natural fermentation process which give sourdough its tangy flavor, improved texture, and longer shelf life.
                        </p>
                    </div>

                    <div className="rounded-[2rem] bg-[#f8d39f] p-8 text-center shadow-lg">
                        <h3 className="mb-3 text-2xl font-bold text-[#6b2d05]">
                            Homemade Quality
                        </h3>
                        <p className="leading-7">
                            Every loaf is prepared to order with care and not mass produced to ensure you always gets the best bread possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* POPUP */}
            {showOrderPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
                    <div className="relative w-full max-w-md rounded-[2rem] bg-[#fff4cf] p-8 text-center shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setShowOrderPopup(false)}
                            className="absolute right-5 top-4 text-2xl font-bold text-[#6b2d05] hover:text-[#9a5a32]"
                        >
                            ×
                        </button>

                        <h2
                            className="text-4xl font-black text-[#6b2d05]"
                            style={{ fontFamily: "Cooper Black, serif" }}
                        >
                            Ready to order?
                        </h2>

                        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-[#7a3f16]">
                            Create an account or log in to place your next homemade sourdough
                            order.
                        </p>

                        <Link
                            to="/login"
                            className="mt-8 inline-block rounded-full bg-[#6b2d05] px-8 py-3 font-bold text-[#fff4cf] shadow-md hover:bg-[#552304]"
                        >
                            Place an Order
                        </Link>
                    </div>
                </div>
            )}
        </main>

        //     <div className="mt-10">
        //         {session ?
        //             <Link
        //             to="/form"
        //             className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
        //         >
        //             Place An Order
        //         </Link> :
        //
        //             <Link
        //                 to="/login"
        //                 className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
        //             >
        //                 Place An Order
        //             </Link>}
        //
        //     </div>
        //
        // </div>
    );
};