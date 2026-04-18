import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="bg-[#f5f3ef] text-gray-800 overflow-hidden">

            {/* 🔥 HEADER */}
            <header className="bg-[#faf9f3] shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* LOGO */}
                    <a href="https://www.armanindustries.com/">
                        <img src="/logo.png" className="h-[80px]" />
                    </a>

                    {/* MENU */}
                    <nav className="hidden md:flex gap-8 font-medium">
                        <a href="https://www.armanindustries.com" className="hover:text-orange-500">Home</a>
                        <a href="https://www.armanindustries.com/company" className="hover:text-orange-500">About Us</a>
                        <a href="https://www.armanindustries.com/contact-us" className="hover:text-orange-500">Contact Us</a>
                    </nav>

                </div>
            </header>

            {/* 🔥 HERO SECTION (VIDEO FEEL) */}
            <motion.section
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative h-[550px]"
            >
                <motion.img
                    src="/peanut.png"
                    className="absolute w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative h-full flex items-center justify-center text-white text-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Premium Groundnut Products
                    </motion.h1>
                </div>
            </motion.section>

            {/* 🔥 SECTION 1 */}
            <motion.section
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-16"
            >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

                    <img src="/peanut_raw.png" className="rounded-xl shadow-lg" />

                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            We care for your health!
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Looking for delicious, high-quality peanuts? We follow strict
                            quality standards to provide premium peanuts packed with flavor.
                            Our peanuts are perfect for snacks and cooking.
                        </p>
                    </div>

                </div>
            </motion.section>

            {/* 🔥 SECTION 2 */}
            <motion.section
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="py-16 bg-[#f5f3ef]"
            >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

                    <div>
                        <h2 className="text-3xl font-bold">
                            We supply our best quality peanuts worldwide.
                        </h2>
                    </div>

                    <img src="/peanut.png" className="rounded-xl shadow-lg" />

                </div>
            </motion.section>

            {/* 🔥 OIL SECTION */}
            <section className="bg-[#4b4f3f] py-16 text-white">

                <h2 className="text-center text-3xl font-bold mb-10">
                    Groundnut Oil
                </h2>

                <div className="max-w-6xl mx-auto relative px-6">

                    <img src="/peanut.png" className="rounded-xl shadow-lg" />

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-10 right-0 bg-white text-gray-700 p-6 rounded shadow-xl w-[40%] md:h-[calc(100%-80px)]"
                    >
                        Introducing our premium groundnut oil - 'Natural' the perfect choice for all your cooking needs! Our groundnut oil is made from the highest quality groundnuts, carefully extracted and processed to ensure maximum purity and flavor. With its light, nutty taste and high smoke point, our groundnut oil is perfect for frying, sautéing and baking. It's not only delicious, but it's also packed with healthy nutrients and antioxidants that are great for your body. Our product is verified by our laboratory and also cross-verified by third party reputed laboratories. So why settle for ordinary cooking oil when you can experience the delicious taste and health benefits of our groundnut oil? Try it today and taste the difference!
                    </motion.div>

                </div>
            </section>

            {/* 🔥 TABLE SECTION */}
            <section className="bg-white py-16">
                <h2 className="text-center text-2xl font-bold text-[#7a2e2e] mb-10">
                    ARMAN INDUSTRIES
                </h2>

                <div className="max-w-5xl mx-auto px-4">
                    <img src="/peanut_order.png" className="rounded-xl" />
                </div>
            </section>

            {/* 🔥 FOOTER */}
            <footer className="bg-[#faf9f3] py-12">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

                    {/* LOGO */}
                    <img src="/logo.png" className="h-[80px]" />

                    {/* INFO */}
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold">Address</h4>
                            <p>
                                2, GIDC OPP. RELIANCE PETROL PUMP<br />
                                BHANVAD JAMNAGAR ROAD<br />
                                BHANVAD 360510
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Mobile</h4>
                            <p>9429271399</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <p>armanindustries2020@gmail.com</p>
                        </div>
                    </div>

                </div>

                <div className="text-center text-xs mt-8 text-gray-500">
                    © 2023 Arman Industries
                </div>
            </footer>

        </div>
    );
}