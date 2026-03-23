import { Link } from "react-router-dom";




export const OurStoryPage = ({session} : any) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex flex-col items-center px-2 py-6">

            {/* Hero Section */}
            <div className="max-w-lg w-full text-center mb-5">
                <h1 className="text-3xl underline italic text-gray-800 mb-2">
                    Our Story
                </h1>

                <img src='/breadpicture.png' alt="Bread picture" />

                <p className="text-gray-600 text-lg">
                    Simple ingredients. Honest process. Bread you can trust.
                </p>
            </div>

            {/* Story Card */}
            <div className="max-w-5xl bg-white rounded-2xl shadow-xl p-4 border border-gray-100 leading-relaxed text-gray-700 text-lg">

                <p className="mb-4">
                    After moving from Germany, I struggled to find bread made the way I believed it should be — with only a few simple, honest ingredients: organic flour, water, salt, and a natural sourdough starter.
                </p>

                <p className="mb-4">
                    What began as a personal pursuit for healthier, preservative-free bread quickly turned into a passion. Through time, patience, and practice, that passion grew into something more — beautifully crafted sourdough bread that is both nourishing and deeply flavorful.
                </p>

                <p>
                    Today, our mission is simple: to provide authentic, handcrafted sourdough made with only four ingredients, prepared with care and intention. Every loaf is baked to bring you and your family bread you can trust — wholesome, delicious, and free from unnecessary additives.
                </p>

            </div>

            <div className="mt-10">
                {session ?
                    <Link
                    to="/form"
                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                    Place An Order
                </Link> :

                    <Link
                        to="/login"
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Place An Order
                    </Link>}

            </div>

        </div>
    );
};