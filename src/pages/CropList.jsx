import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function CropList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logoError, setLogoError] = useState(false);

    const fetchCrops = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://qr-app-backend.vercel.app/api/crops"
            );
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);

    const deleteCrop = async (id) => {
        await axios.delete(
            `https://qr-app-backend.vercel.app/api/crops/${id}`
        );
        fetchCrops();
    };

    const downloadQR = (slug) => {
        const id = slug === "all-crops" ? "qr-all" : `qr-${slug}`;
        const canvas = document.getElementById(id);
        if (!canvas) return;

        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${slug}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf9f3] text-white">

            {/* 🔥 HEADER */}
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

            {/* 🔥 MAIN */}
            <main className="flex-grow flex items-start md:items-center justify-center p-4">
                <div className="bg-white text-black rounded-2xl shadow-xl p-4 sm:p-6 w-full h-[100vh]">
                    {/* HEADER */}
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold">Crops</h2>
                        <div className="flex flex-column md:flex-row items-center justify-center gap-2">
                            <div className="hidden">
                                <QRCodeCanvas
                                    id="qr-all"
                                    value={`https://arman-industries.vercel.app/crops`}
                                    size={200}
                                />
                            </div>

                            {/* 🔥 DOWNLOAD BUTTON */}
                            <button
                                onClick={() => downloadQR("all-crops")}
                                className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-fit hover:bg-orange-600 flex items-center justify-center h-[100%]"
                            >
                                All Crops QR
                            </button>
                            <Link
                                to="/admin/create"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add
                            </Link>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left w-1/3">Name</th>
                                    <th className="p-3 text-left w-1/3">Slug</th>
                                    <th className="p-3 text-left w-1/3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* 🔄 Skeleton */}
                                {loading
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="p-3 w-1/3">
                                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                            </td>
                                            <td className="p-3 w-1/3">
                                                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                            </td>
                                            <td className="p-3 w-1/3">
                                                <div className="flex gap-2">
                                                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                                </div>
                                            </td>
                                        </tr>
                                    )) : data.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-5 text-gray-500">
                                                No crops found
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((item) => (
                                            <tr key={item._id} className="border-t hover:bg-gray-50">
                                                <td className="p-3 w-1/3">{item.name?.en}</td>
                                                <td className="p-3 text-gray-500 w-1/3">{item.slug}</td>
                                                <td className="p-3 flex gap-3 w-1/3">
                                                    <Link
                                                        to={`/crop/${item.slug}`}
                                                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-fit hover:bg-orange-600 flex items-center justify-center"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        to={`/admin/edit/${item._id}`}
                                                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-fit hover:bg-orange-600 flex items-center justify-center"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteCrop(item._id)}
                                                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-fit hover:bg-orange-600 flex items-center justify-center"
                                                    >
                                                        Delete
                                                    </button>
                                                    <div className="hidden">
                                                        <QRCodeCanvas
                                                            id={`qr-${item.slug}`}
                                                            value={`https://arman-industries.vercel.app/crop/${item.slug}`}
                                                            size={200}
                                                        />
                                                    </div>

                                                    {/* 🔥 DOWNLOAD BUTTON */}
                                                    <button
                                                        onClick={() => downloadQR(item.slug)}
                                                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-fit hover:bg-orange-600 flex items-center justify-center"
                                                    >
                                                        Download QR
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
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