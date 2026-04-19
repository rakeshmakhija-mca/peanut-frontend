import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

export default function CropDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState("gu");
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [otherCrops, setOtherCrops] = useState([]);

  function Row({ label, value }) {
    if (!value) return null;

    return (
      <div className="flex gap-4 border-b py-2 items-start">

        {/* LEFT LABEL */}
        <div className="w-[35%] text-gray-500">
          {label}
        </div>

        {/* RIGHT VALUE */}
        <div className="w-[65%] font-medium text-right break-words whitespace-normal">
          {value}
        </div>

      </div>
    );
  }

  useEffect(() => {
    // current crop
    axios
      .get(`https://qr-app-backend.vercel.app/api/crops/slug/${slug}`)
      .then((res) => setData(res.data.data));

    // other crops
    axios
      .get("https://qr-app-backend.vercel.app/api/crops")
      .then((res) => {
        const filtered = res.data.data.filter(
          (item) => item.slug !== slug
        );
        setOtherCrops(filtered);
      });
  }, [slug]);

  const labels = {
    jat: { en: "Quality", gu: "જાત" },
    days: { en: "Days to ripening", gu: "પાકવા ના દિવસો" },
    weight: { en: "Weight of 100 grains", gu: "૧૦૦ દાના નું વજન" },
    bigSeed: { en: "Seed Type", gu: "બીજ પ્રકાર" },
    oilPercentage: { en: "Percentage of oil", gu: "તેલની ટકાવારી" },
    ground: { en: "Ground / Earth", gu: "જમીન" },
    plantingTime: { en: "Planting time", gu: "વાવેતર સમય" },
    seedRate: { en: "Seed", gu: "બીજ દર" },
    distance: { en: "Planting distance", gu: "વાવેતર અંતર" },
    production: { en: "Average production", gu: "સરેરાશ ઉત્પાદન" },
    acidlevel: { en: "Acid Level", gu: "એસિડ સ્તર" },
    institute: { en: "Revised Institute", gu: "સંશોધિત સંસ્થા" },
    revisedYear: { en: "Revised year", gu: "સંશોધિત વર્ષ" },
    weedControl: { en: "Weed control", gu: "નીંદામણ નાશક" },
    diseaseControl: { en: "Disease Control: Tick Disease Control", gu: "રોગ નિયંત્રણ : ટિક્કા રોગ નિયંત્રણ" },
    pestControl: { en: "Pest and disease control", gu: "જીવાત અને મોલો ના નિયંત્રણ" },
    features: { en: "Features / Description", gu: "વિશેષતા" }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f3]">

        {/* LOADER CONTAINER */}
        <div className="relative flex items-center justify-center">

          {/* 🔵 SPINNER RING */}
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          {/* 🟢 LOGO CENTER */}
          <img
            src="/logo.png"
            alt="logo"
            className="absolute w-10 h-10 object-contain"
          />

        </div>

      </div>
    );
  }

  return (
    <div className="bg-[#ffffff]">
      <header className="bg-[#faf9f3] shadow-sm">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <a
            href="https://www.armanindustries.com/"
            className="flex items-center"
          >
            {!logoError ? (
              <img
                src="/logo.png" // 👉 change to your logo path
                alt="Arman Industries"
                className="h-[100px] object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="text-2xl font-serif font-bold tracking-widest">
                ARMAN
                <div className="text-xs tracking-[4px] text-gray-500">
                  INDUSTRIES
                </div>
              </div>
            )}

          </a>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
              <a href="https://www.armanindustries.com" className="hover:text-orange-500">Home</a>
              <a href="https://www.armanindustries.com/company" className="hover:text-orange-500">About Us</a>
              <a href="https://www.armanindustries.com/contact-us" className="hover:text-orange-500">Contact Us</a>
            </nav>

            {/* 🌐 LANGUAGE (ALWAYS VISIBLE) */}
            <div className="flex bg-gray-200 rounded-full p-1 text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full ${language === "en"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600"
                  }`}
              >
                EN
              </button>

              <button
                onClick={() => setLanguage("gu")}
                className={`px-3 py-1 rounded-full ${language === "gu"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600"
                  }`}
              >
                GU
              </button>
            </div>

            {/* 🍔 HAMBURGER (ONLY MOBILE) */}
            <button
              className="md:hidden text-2xl ml-2"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        {
          open && (
            <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
              <a href="https://www.armanindustries.com/" className="block text-gray-700">Home</a>
              <a href="https://www.armanindustries.com/company" className="block text-gray-700">About Us</a>
              <a href="https://www.armanindustries.com/contact-us" className="block text-gray-700">Contact Us</a>
            </div>
          )
        }
      </header >

      {/* 🔥 HERO SECTION */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[550px] flex items-center justify-center text-center"
      >
        <motion.img
          src="/peanut.png"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          className="relative z-10 px-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {data.name?.[language]}
          </h1>
        </motion.div>
      </motion.div>

      {/* 🔹 SECTION 1 */}
      < div className="bg-[#4b4f3f] py-16" >

        <h2 className="text-center text-3xl font-bold text-white mb-10">
          {data.name?.[language]}
        </h2>

        <div className="max-w-5xl mx-auto relative">

          {/* IMAGE */}
          <motion.img
            src="/peanut_raw.png"
            className="w-full md:w-[70%] rounded shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* FLOATING INFO BOX */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="
    bg-white
    p-6 md:p-8
    rounded-lg
    shadow-[0_10px_30px_rgba(0,0,0,0.15)]
    md:absolute
    md:top-8
    md:right-[-8%]
    md:w-[50%]
    mt-6 md:mt-0
    md:h-[calc(100%-80px)]
    mx-2 md:mx-0
    overflow-y-auto
  "
          >
            <div className="space-y-3 text-sm md:text-base text-gray-700">

              {data.jat && <Row label={labels.jat[language]} value={data.jat?.[language]} />}
              {data.days && <Row label={labels.days[language]} value={data.days?.[language]} />}
              {data.weight && <Row label={labels.weight[language]} value={data.weight?.[language]} />}
              <Row
                label={labels.bigSeed[language]}
                value={data.bigSeed
                  ? (language === "gu" ? "મોટા દાણા" : "Big Seed")
                  : (language === "gu" ? "સામાન્ય" : "Normal")
                }
              />
              {data.oilPercentage && <Row label={labels.oilPercentage[language]} value={data.oilPercentage?.[language]} />}
              {data.ground && <Row label={labels.ground[language]} value={data.ground?.[language]} />}
              {data.plantingTime && <Row label={labels.plantingTime[language]} value={data.plantingTime?.[language]} />}
              {data.seedRate && <Row label={labels.seedRate[language]} value={data.seedRate?.[language]} />}
              {data.distance && <Row label={labels.distance[language]} value={data.distance?.[language]} />}
              {data.production && <Row label={labels.production[language]} value={data.production?.[language]} />}
              {data.acidlevel && <Row label={labels.acidlevel[language]} value={data.acidlevel?.[language]} />}
              {data.institute && <Row label={labels.institute[language]} value={data.institute?.[language]} />}
              {data.revisedYear && <Row label={labels.revisedYear[language]} value={data.revisedYear?.[language]} />}
              {data.weedControl && <Row label={labels.weedControl[language]} value={data.weedControl?.[language]} />}
              {data.diseaseControl && <Row label={labels.diseaseControl[language]} value={data.diseaseControl?.[language]} />}
              {data.pestControl && <Row label={labels.pestControl[language]} value={data.pestControl?.[language]} />}
              {data.features && <Row label={labels.features[language]} value={data.features?.[language]} />}

            </div>
          </motion.div>

        </div>
      </div >

      {/* 🔥 OTHER CROPS SLIDER */}
      <div className="bg-[#ffffff] py-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-[#7a2e2e]">
          {language === "gu" ? "બીજા પાક" : "Other Crops"}
        </h2>

        <div className="px-6">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
          // navigation={true}
          >
            {otherCrops.map((crop) => (
              <SwiperSlide key={crop._id}>
                <motion.a
                  href={`/crop/${crop.slug}`}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src="/peanut.png"
                      alt={crop?.name?.[language]}
                      className="w-full h-[180px] object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      {crop?.name?.[language] || "-"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {crop?.features?.[language]}
                    </p>
                  </div>
                </motion.a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#ffffff] p-6 rounded shadow"
      >
        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
          <li>
            {language == "en" ? "*The above figures may vary depending on soil quality, temperature and crop conditions." : "*ઉપરોક્ત આંકડા જમીનની ગુણવત્તા, તાપમાન અને પાકની સ્થિતિના આધારે બદલાઈ શકે છે."}
          </li>

          <li>
            {language == "en" ? "*It is important to seek expert advice before using any type of pesticides or herbicides." : "*કોઈપણ પ્રકારના જંતુનાશકો અથવા નિંદણનાશકોનો ઉપયોગ કરતા પહેલા નિષ્ણાતની સલાહ લેવી મહત્વપૂર્ણ છે."}
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#ffffff] py-16"
      >

        {/* 🔥 TITLE */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl font-bold text-[#7a2e2e] mb-10 tracking-wide"
        >
          ARMAN INDUSTRIES
        </motion.h2>

        {/* 🔥 IMAGE CONTAINER */}
        <div className="max-w-5xl mx-auto px-4 overflow-hidden">

          <motion.img
            src="/peanut_order.png"
            alt="crop"
            className="rounded-xl w-full shadow-lg cursor-pointer"

            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}

          // whileHover={{ scale: 1.03 }}
          />

        </div>

      </motion.div>

      <div className="bg-[#faf9f3] py-12">
        <div className="mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT LOGO */}
          <a
            href="https://www.armanindustries.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >

            {!logoError ? (
              <img
                src="/logo.png" // 👉 change to your logo path
                alt="Arman Industries"
                className="h-[100px] object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="text-2xl font-serif font-bold tracking-widest">
                ARMAN
                <div className="text-xs tracking-[4px] text-gray-500">
                  INDUSTRIES
                </div>
              </div>
            )}

          </a>

          {/* RIGHT INFO */}
          <div className="space-y-6 text-sm text-gray-700">

            <div>
              <h4 className="font-semibold border-b border-black inline-block mb-2">
                Address
              </h4>
              <p>
                2, GIDC OPP. RELIANCE PETROL PUMP<br />
                BHANVAD JAMNAGAR ROAD<br />
                BHANVAD 360510
              </p>
            </div>

            <div>
              <h4 className="font-semibold border-b border-black inline-block mb-2">
                Mobile No
              </h4>
              <p>9429271399</p>
            </div>

            <div>
              <h4 className="font-semibold border-b border-black inline-block mb-2">
                Email Id
              </h4>
              <p>armanindustries2020@gmail.com</p>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs text-gray-600 mt-10">
          © 2023 by Rakesh Makhija and Raj Patel Technologies
        </div>
      </div>

    </div >
  );
}

/* 🔹 Feature Box */
function Feature({ title }) {
  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition">
      <p className="font-semibold">{title}</p>
    </div>
  );
}