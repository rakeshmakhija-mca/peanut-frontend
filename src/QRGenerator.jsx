import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator() {
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);

    const isEnglish = (text) => /^[A-Za-z0-9\s.,-]*$/.test(text);
    const isGujarati = (text) => /[\u0A80-\u0AFF]/.test(text);

    // Convert using Google Input Tools
    const convertText = async (text, lang) => {
        try {
            if (lang === "en" && isGujarati(text)) {
                const res = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=gu|en`
                );

                const data = await res.json();

                return data?.responseData?.translatedText || text;
            }

            // English → Gujarati → use input tools
            const url = `https://inputtools.google.com/request?itc=${lang}-t-i0-und&text=${encodeURIComponent(text)}&num=1&tlit=1`;

            const res = await fetch(url);
            const data = await res.json();

            return data?.[1]?.[0]?.[0] || text;
        } catch {
            return text;
        }
    };

    const [form, setForm] = useState({
        name: "",
        jat: "",
        days: "",
        weight: "",
        bigSeed: false,
        revisedYear: "",
        institute: "",
        oilPercentage: "",
        ground: "",
        plantingTime: "",
        seedRate: "",
        distance: "",
        weedControl: "",
        diseaseControl: "",
        pestControl: "",
        features: "",
        acidlevel: "",
        production: ""
    });

    const [qrData, setQrData] = useState("");
    const [size, setSize] = useState(200);
    const qrRef = useRef();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);

        // 🔥 Only update QR, NOT form
        if (qrData) {
            updateQR(form, lang);
        }
    };

    const updateQR = async (dataForm, langOverride) => {
        setLoading(true);

        await new Promise((r) => setTimeout(r, 400));

        const currentLang = langOverride || language;

        let converted = { ...dataForm };

        for (let key in converted) {
            const value = converted[key];

            // skip checkbox / empty
            if (typeof value === "boolean" || !value) continue;

            // ✅ Skip conversion if already in correct language
            if (currentLang === "en" && isEnglish(value)) continue;
            if (currentLang === "gu" && isGujarati(value)) continue;

            // 🔥 Only convert when needed
            converted[key] =
                currentLang === "gu"
                    ? await convertText(value, "gu")
                    : await convertText(value, "en");
        }

        const data = `
Name: ${converted.name}
Quality: ${converted.jat}
Days to ripening: ${converted.days}
Weight of 100 Grains: ${converted.weight}
Big Seed: ${converted.bigSeed ? "Yes" : "No"}

Revised Year: ${converted.revisedYear}
Revised Institute: ${converted.institute}

Oil Percentage: ${converted.oilPercentage}
Ground / Soil: ${converted.ground}
Planting Time: ${converted.plantingTime}
Seed Rate: ${converted.seedRate}
Planting Distance: ${converted.distance}

ACID level: ${converted.acidlevel}
Average Production:${converted.production}

Weed Control: ${converted.weedControl}
Disease Control: ${converted.diseaseControl}
Pest Control: ${converted.pestControl}

Features / Description:
${converted.features}
  `;

        setQrData(data);
        setLoading(false);
    };

    const generateQR = () => {
        updateQR(form);
    };

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const url = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = url;
        link.download = "qr-code.png";
        link.click();
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1220] text-white">

            {/* 🔥 HEADER */}
            <header className="sticky top-0 z-50 bg-[#0b1220]/80 backdrop-blur border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <h1 className="text-lg font-bold tracking-wide text-white">
                        QR Generator
                    </h1>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* 🌐 Language Switch */}
                        <div className="flex bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => handleLanguageChange("en")}
                                className={`px-3 py-1 rounded-md text-sm ${language === "en"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300"
                                    } `}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => handleLanguageChange("gu")}
                                className={`px-3 py-1 rounded-md text-sm ${language === "gu"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300"
                                    } `}
                            >
                                GU
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* 🔥 MAIN */}
            <main className="flex-grow flex items-start md:items-center justify-center p-4">
                <div className="bg-white text-black rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-3xl mx-auto">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        {language === "gu" ? "વિગતો દાખલ કરો" : "Enter Details"}
                    </h2>

                    {/* FORM */}
                    {/* FORM */}
                    <div className="grid grid-cols-12 gap-4">

                        {/* Name */}
                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "નામ" : "Name"}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Jat */}
                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "જાત" : "Quality"}
                                name="jat"
                                value={form.jat}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Days */}
                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "પાકવા ના દિવસો" : "Days to ripening"}
                                name="days"
                                value={form.days}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Weight */}
                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "૧૦૦ દાના નું વજન" : "Weight of 100 grains"}
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Checkbox full width */}
                        <div className="col-span-12 flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="bigSeed"
                                checked={form.bigSeed}
                                onChange={handleChange}
                            />
                            <label>
                                {language === "gu" ? "મોટો દાણા" : "Big Seed"}
                            </label>
                        </div>

                        <div className="col-span-12">
                            <Input
                                label={language === "gu" ? "સંશોધિત વર્ષ" : "Revised year"}
                                name="revisedYear"
                                value={form.revisedYear}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "સંશોધિત સંસ્થા" : "Revised Institute"}
                                name="institute"
                                value={form.institute}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "એસિડ સ્તર" : "Acid Level"}
                                name="acidlevel"
                                value={form.acidlevel}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "સરેરાશ ઉત્પાદન" : "Average production"}
                                name="production"
                                value={form.production}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "તેલની ટકાવારી" : "Percentage of oil"}
                                name="oilPercentage"
                                value={form.oilPercentage}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "જમીન" : "Ground / Earth"}
                                name="ground"
                                value={form.ground}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "વાવેતર સમય" : "Planting time"}
                                name="plantingTime"
                                value={form.plantingTime}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "બીજદર" : "seed"}
                                name="seedRate"
                                value={form.seedRate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "વાવેતર અંતર" : "Planting distance"}
                                name="distance"
                                value={form.distance}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Input
                                label={language === "gu" ? "નીંદામણ નાશક" : "Weed killer"}
                                name="weedControl"
                                value={form.weedControl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "રોગ નિયંત્રણ : ટિક્કા રોગ નિયંત્રણ " : "Disease Control: Tick Disease Control"}
                                name="diseaseControl"
                                value={form.diseaseControl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "જીવાત અને મોલો ના નિયંત્રણ" : "Pest and disease control"}
                                name="pestControl"
                                value={form.pestControl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                label={language === "gu" ? "વિશેષતા" : "Features / Description"}
                                name="features"
                                value={form.features || ""}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 mt-6 justify-center flex-wrap">
                        <button
                            onClick={generateQR}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                        >
                            {language === "gu" ? "QR બનાવો" : "Generate QR"}
                        </button>

                        <button
                            onClick={downloadQR}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            {language === "gu" ? "ડાઉનલોડ" : "Download"}
                        </button>
                    </div>

                    {/* SLIDER */}
                    <div className="mt-6">
                        <label>
                            {language === "gu"
                                ? `માપ: ${size} px`
                                : `Size: ${size} px`}
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="400"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full mt-2"
                        />
                    </div>

                    {/* QR */}
                    <div className="mt-6 flex justify-center">
                        <div
                            ref={qrRef}
                            className="bg-gray-100 rounded-xl flex items-center justify-center"
                            style={{ width: size + 32, height: size + 32 }} // padding match
                        >
                            {loading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm text-gray-500">Generating...</p>
                                </div>
                            ) : qrData ? (
                                <QRCodeCanvas value={qrData} size={size} />
                            ) : (
                                <p className="text-gray-400 text-sm">QR will appear here</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* 🔥 FOOTER */}
            <footer className="bg-[#0b1220] border-t border-gray-800 text-gray-400">
                <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">

                    <div>
                        <h3 className="text-white font-semibold mb-2">QR Generator</h3>
                        <p className="text-sm">
                            Create and download QR codes easily with multi-language support.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2">Product</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Features</li>
                            <li>Docs</li>
                            <li>Get Started</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs py-4 border-t border-gray-800">
                    © 2026 QR Generator. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

function Input({ label, ...props }) {
    return (
        <div className="w-full min-w-0">
            <label className="text-sm font-medium mb-1 block">
                {label}
            </label>

            <input
                {...props}
                className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500 transition"
            />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div className="w-full min-w-0">
            <label className="text-sm font-medium mb-1 block">
                {label}
            </label>

            <textarea
                {...props}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500 transition"
            />
        </div>
    );
}

// import { useState, useRef, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function QRGenerator() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(false);
//     const qrRef = useRef();

//     const [form, setForm] = useState({
//         name: { en: "", gu: "" },
//         jat: { en: "", gu: "" },
//         days: { en: "", gu: "" },
//         weight: { en: "", gu: "" },
//         bigSeed: false,
//         revisedYear: { en: "", gu: "" },
//         institute: { en: "", gu: "" },
//         oilPercentage: { en: "", gu: "" },
//         ground: { en: "", gu: "" },
//         plantingTime: { en: "", gu: "" },
//         seedRate: { en: "", gu: "" },
//         distance: { en: "", gu: "" },
//         weedControl: { en: "", gu: "" },
//         diseaseControl: { en: "", gu: "" },
//         pestControl: { en: "", gu: "" },
//         features: { en: "", gu: "" },
//         acidlevel: { en: "", gu: "" },
//         production: { en: "", gu: "" }
//     });

//     const [qrData, setQrData] = useState("");
//     const [size, setSize] = useState(200);

//     // 🔥 Handle change
//     const handleChange = (field, lang, value) => {
//         setForm({
//             ...form,
//             [field]: {
//                 ...form[field],
//                 [lang]: value
//             }
//         });
//     };

//     const handleCheckbox = (e) => {
//         setForm({
//             ...form,
//             bigSeed: e.target.checked
//         });
//     };

//     // 🔥 Load data for update
//     useEffect(() => {
//         if (id) {
//             axios.get(`/api/crops/${id}`).then((res) => {
//                 setForm(res.data.data);
//             });
//         }
//     }, [id]);

//     // 🔥 Generate QR
//     const generateQR = () => {
//         const data = `
// Name: ${form.name.en}
// નામ: ${form.name.gu}

// Quality: ${form.jat.en}
// જાત: ${form.jat.gu}

// Days: ${form.days.en}
// દિવસ: ${form.days.gu}

// Weight: ${form.weight.en}
// વજન: ${form.weight.gu}

// Big Seed: ${form.bigSeed ? "Yes" : "No"}

// Production: ${form.production.en}
// ઉત્પાદન: ${form.production.gu}
//     `;

//         setQrData(data);
//     };

//     // 🔥 Download QR
//     const downloadQR = () => {
//         const canvas = qrRef.current.querySelector("canvas");
//         const url = canvas.toDataURL("image/png");

//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "qr-code.png";
//         link.click();
//     };

//     // 🔥 Submit API
//     const handleSubmit = async () => {
//         try {
//             if (id) {
//                 await axios.put(`/api/crops/${id}`, form);
//             } else {
//                 await axios.post("/api/crops", form);
//             }

//             alert("Saved Successfully");
//             navigate("/");
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#0b1220] text-white p-4">
//             <div className="bg-white text-black rounded-xl p-6 max-w-5xl mx-auto">

//                 <h2 className="text-2xl font-bold mb-4">
//                     {id ? "Update Crop" : "Create Crop"}
//                 </h2>

//                 <div className="grid grid-cols-12 gap-4">

//                     {/* NAME */}
//                     <div className="col-span-6">
//                         <Input
//                             label="Name (EN)"
//                             value={form.name.en}
//                             onChange={(e) => handleChange("name", "en", e.target.value)}
//                         />
//                     </div>

//                     <div className="col-span-6">
//                         <Input
//                             label="નામ (GU)"
//                             value={form.name.gu}
//                             onChange={(e) => handleChange("name", "gu", e.target.value)}
//                         />
//                     </div>

//                     {/* JAT */}
//                     <div className="col-span-6">
//                         <Input
//                             label="Quality (EN)"
//                             value={form.jat.en}
//                             onChange={(e) => handleChange("jat", "en", e.target.value)}
//                         />
//                     </div>

//                     <div className="col-span-6">
//                         <Input
//                             label="જાત (GU)"
//                             value={form.jat.gu}
//                             onChange={(e) => handleChange("jat", "gu", e.target.value)}
//                         />
//                     </div>

//                     {/* DAYS */}
//                     <div className="col-span-6">
//                         <Input
//                             label="Days (EN)"
//                             value={form.days.en}
//                             onChange={(e) => handleChange("days", "en", e.target.value)}
//                         />
//                     </div>

//                     <div className="col-span-6">
//                         <Input
//                             label="દિવસ (GU)"
//                             value={form.days.gu}
//                             onChange={(e) => handleChange("days", "gu", e.target.value)}
//                         />
//                     </div>

//                     {/* CHECKBOX */}
//                     <div className="col-span-12 flex gap-2 items-center">
//                         <input
//                             type="checkbox"
//                             checked={form.bigSeed}
//                             onChange={handleCheckbox}
//                         />
//                         <label>Big Seed</label>
//                     </div>

//                 </div>

//                 {/* BUTTONS */}
//                 <div className="flex gap-3 mt-6 flex-wrap">
//                     <button
//                         onClick={generateQR}
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Generate QR
//                     </button>

//                     <button
//                         onClick={downloadQR}
//                         className="bg-green-600 text-white px-4 py-2 rounded"
//                     >
//                         Download QR
//                     </button>

//                     <button
//                         onClick={handleSubmit}
//                         className="bg-black text-white px-4 py-2 rounded"
//                     >
//                         {id ? "Update" : "Save"}
//                     </button>
//                 </div>

//                 {/* QR */}
//                 <div className="mt-6 flex justify-center">
//                     <div ref={qrRef}>
//                         {qrData && <QRCodeCanvas value={qrData} size={size} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // INPUT
// function Input({ label, ...props }) {
//     return (
//         <div>
//             <label className="block text-sm mb-1">{label}</label>
//             <input
//                 {...props}
//                 className="w-full border px-3 py-2 rounded"
//             />
//         </div>
//     );
// }