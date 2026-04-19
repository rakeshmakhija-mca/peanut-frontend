import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CropForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [logoError, setLogoError] = useState(false);

    const [form, setForm] = useState({
        name: { en: "", gu: "" },
        jat: { en: "", gu: "" },
        days: { en: "", gu: "" },
        weight: { en: "", gu: "" },
        bigSeed: false,
        revisedYear: { en: "", gu: "" },
        institute: { en: "", gu: "" },
        oilPercentage: { en: "", gu: "" },
        ground: { en: "", gu: "" },
        plantingTime: { en: "", gu: "" },
        seedRate: { en: "", gu: "" },
        distance: { en: "", gu: "" },
        weedControl: { en: "", gu: "" },
        diseaseControl: { en: "", gu: "" },
        pestControl: { en: "", gu: "" },
        features: { en: "", gu: "" },
        acidlevel: { en: "", gu: "" },
        production: { en: "", gu: "" }
    });

    const handleChange = (field, lang, value) => {
        setForm({
            ...form,
            [field]: {
                ...form[field],
                [lang]: value
            }
        });
    };

    // 🔥 Load data for edit
    useEffect(() => {
        if (id) {
            axios.get(`https://qr-app-backend.vercel.app/api/crops/${id}`).then((res) => {
                setForm(res.data.data);
            });
        }
    }, [id]);

    // ✅ Submit
    const handleSubmit = async () => {
        if (id) {
            await axios.put(`https://qr-app-backend.vercel.app/api/crops/${id}`, form);
        } else {
            await axios.post("https://qr-app-backend.vercel.app/api/crops", form);
        }
        navigate("/admin");
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf9f3] text-white">
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
                </div>
            </header >

            <main className="flex-grow flex items-start md:items-center justify-center p-4">
                <div className="bg-white text-black rounded-2xl shadow-xl p-4 sm:p-6 w-full mx-auto">

                    <h2 className="text-2xl font-semibold text-center mb-6">{id ? "Edit" : "Create"} Crop</h2>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Name
                                </label>
                                <input
                                    placeholder="Name (EN)"
                                    value={form.name.en}
                                    onChange={(e) => handleChange("name", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    નામ
                                </label>
                                <input
                                    placeholder="નામ (GU)"
                                    value={form.name.gu}
                                    onChange={(e) => handleChange("name", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Quality
                                </label>

                                <input
                                    placeholder="Quality (EN)"
                                    value={form.jat.en}
                                    onChange={(e) => handleChange("jat", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    જાત
                                </label>

                                <input
                                    placeholder="જાત (GU)"
                                    value={form.jat.gu}
                                    onChange={(e) => handleChange("jat", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Days to ripening
                                </label>

                                <input
                                    placeholder="Days to ripening (EN)"
                                    value={form.days.en}
                                    onChange={(e) => handleChange("days", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    પાકવા ના દિવસો
                                </label>

                                <input
                                    placeholder="પાકવા ના દિવસો (GU)"
                                    value={form.days.gu}
                                    onChange={(e) => handleChange("days", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Weight of 100 grains
                                </label>

                                <input
                                    placeholder="Weight of 100 grains (EN)"
                                    value={form.weight.en}
                                    onChange={(e) => handleChange("weight", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    ૧૦૦ દાના નું વજન
                                </label>

                                <input
                                    placeholder="૧૦૦ દાના નું વજન (GU)"
                                    value={form.weight.gu}
                                    onChange={(e) => handleChange("weight", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="bigSeed"
                                checked={form.bigSeed}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        bigSeed: e.target.checked
                                    })
                                }
                            />
                            <label>
                                Big Seed / મોટો દાણા
                            </label>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Revised year
                                </label>

                                <input
                                    placeholder="Revised year (EN)"
                                    value={form.revisedYear.en}
                                    onChange={(e) => handleChange("revisedYear", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    સંશોધિત વર્ષ
                                </label>

                                <input
                                    placeholder="સંશોધિત વર્ષ (GU)"
                                    value={form.revisedYear.gu}
                                    onChange={(e) => handleChange("revisedYear", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Revised Institute
                                </label>

                                <textarea
                                    placeholder="Revised Institute (EN)"
                                    value={form.institute.en}
                                    onChange={(e) => handleChange("institute", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    સંશોધિત સંસ્થા
                                </label>

                                <textarea
                                    placeholder="સંશોધિત સંસ્થા (GU)"
                                    value={form.institute.gu}
                                    onChange={(e) => handleChange("institute", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Acid Level
                                </label>

                                <textarea
                                    placeholder="Acid Level (EN)"
                                    value={form.acidlevel.en}
                                    onChange={(e) => handleChange("acidlevel", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    એસિડ સ્તર
                                </label>

                                <textarea
                                    placeholder="એસિડ સ્તર (GU)"
                                    value={form.acidlevel.gu}
                                    onChange={(e) => handleChange("acidlevel", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Average production
                                </label>

                                <textarea
                                    placeholder="Average production (EN)"
                                    value={form.production.en}
                                    onChange={(e) => handleChange("production", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    સરેરાશ ઉત્પાદન
                                </label>

                                <textarea
                                    placeholder="સરેરાશ ઉત્પાદન (GU)"
                                    value={form.production.gu}
                                    onChange={(e) => handleChange("production", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Percentage of oil
                                </label>

                                <input
                                    placeholder="Percentage of oil (EN)"
                                    value={form.oilPercentage.en}
                                    onChange={(e) => handleChange("oilPercentage", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    તેલની ટકાવારી
                                </label>

                                <input
                                    placeholder="તેલની ટકાવારી (GU)"
                                    value={form.oilPercentage.gu}
                                    onChange={(e) => handleChange("oilPercentage", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Ground / Earth
                                </label>

                                <input
                                    placeholder="Ground / Earth (EN)"
                                    value={form.ground.en}
                                    onChange={(e) => handleChange("ground", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    જમીન
                                </label>

                                <input
                                    placeholder="જમીન (GU)"
                                    value={form.ground.gu}
                                    onChange={(e) => handleChange("ground", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Planting time
                                </label>

                                <input
                                    placeholder="Planting time (EN)"
                                    value={form.plantingTime.en}
                                    onChange={(e) => handleChange("plantingTime", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    વાવેતર સમય
                                </label>

                                <input
                                    placeholder="વાવેતર સમય (GU)"
                                    value={form.plantingTime.gu}
                                    onChange={(e) => handleChange("plantingTime", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    seed
                                </label>

                                <input
                                    placeholder="seed (EN)"
                                    value={form.seedRate.en}
                                    onChange={(e) => handleChange("seedRate", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    બીજદર
                                </label>

                                <input
                                    placeholder="બીજદર (GU)"
                                    value={form.seedRate.gu}
                                    onChange={(e) => handleChange("seedRate", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Planting distance
                                </label>

                                <input
                                    placeholder="Planting distance (EN)"
                                    value={form.distance.en}
                                    onChange={(e) => handleChange("distance", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    વાવેતર અંતર
                                </label>

                                <input
                                    placeholder="વાવેતર અંતર (GU)"
                                    value={form.distance.gu}
                                    onChange={(e) => handleChange("distance", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Weed control
                                </label>

                                <input
                                    placeholder="Weed killer (EN)"
                                    value={form.weedControl.en}
                                    onChange={(e) => handleChange("weedControl", "en", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    નીંદામણ નાશક
                                </label>

                                <input
                                    placeholder="નીંદામણ નાશક (GU)"
                                    value={form.weedControl.gu}
                                    onChange={(e) => handleChange("weedControl", "gu", e.target.value)}
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 
        bg-white block min-w-0
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Disease Control: Tick Disease Control
                                </label>

                                <textarea
                                    placeholder="Disease Control: Tick Disease Control (EN)"
                                    value={form.diseaseControl.en}
                                    onChange={(e) => handleChange("diseaseControl", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    રોગ નિયંત્રણ : ટિક્કા રોગ નિયંત્રણ
                                </label>

                                <textarea
                                    placeholder="રોગ નિયંત્રણ : ટિક્કા રોગ નિયંત્રણ (GU)"
                                    value={form.diseaseControl.gu}
                                    onChange={(e) => handleChange("diseaseControl", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Pest and disease control
                                </label>

                                <textarea
                                    placeholder="Pest and disease control (EN)"
                                    value={form.pestControl.en}
                                    onChange={(e) => handleChange("pestControl", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    જીવાત અને મોલો ના નિયંત્રણ
                                </label>

                                <textarea
                                    placeholder="જીવાત અને મોલો ના નિયંત્રણ (GU)"
                                    value={form.pestControl.gu}
                                    onChange={(e) => handleChange("pestControl", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    Features / Description
                                </label>

                                <textarea
                                    placeholder="Features / Description (EN)"
                                    value={form.features.en}
                                    onChange={(e) => handleChange("features", "en", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <div className="w-full min-w-0">
                                <label className="text-sm font-medium mb-1 block">
                                    વિશેષતા
                                </label>

                                <textarea
                                    placeholder="વિશેષતા (GU)"
                                    value={form.features.gu}
                                    onChange={(e) => handleChange("features", "gu", e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
        bg-white block min-w-0 resize-none
        focus:outline-none focus:ring-2 focus:ring-orange-500 
        focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        <div className="col-span-12 mt-6">
                            <button
                                onClick={handleSubmit}
                                className="
      w-full 
      bg-green-500 
      text-white 
      py-3 
      rounded-lg 
      font-semibold 
      text-lg 
      hover:bg-green-600 
      transition
      md:w-auto md:px-6
    "
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* 🔥 FOOTER */}
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
                    © 2026 by Rakesh Makhija and Raj Patel Technologies - 8849884208
                </div>
            </div>
        </div>
    );
}