import {useNavigate} from 'react-router-dom';

export const WelcomePage = () => {

    const logo = "./src/assests/Screenshot.png"
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-50 flex items-center justify-center px-6">

            <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-white/40">

                <img
                    src={logo}
                    alt="Sourdough Logo"
                    className="w-20 h-20 mx-auto mb-4 object-contain"
                />
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Welcome 👋
                </h1>

                <p className="text-gray-600 mb-6">
                    Glad you're here. Get started by filling out your details.
                </p>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:scale-[1.02] transition"
                        onClick={() => navigate("/form")}
                >
                    Get Started
                </button>

            </div>

        </div>
    );
};