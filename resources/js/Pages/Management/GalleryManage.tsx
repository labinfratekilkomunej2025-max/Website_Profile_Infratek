import { useEffect, useState } from "react";
import axios from "axios";
import ManageLayout from '@/Layouts/ManagementLayout';
import { getLocalTime } from "@/Utils";
import { router, usePage } from "@inertiajs/react";

interface Gallery {
id: number;
title: string;
description: string;
is_public: boolean;
editor: User;
created_at: string;
edited_at: string;
}
type User = {
    id: number;
    name: string;
}
        
interface Props {
    gallery_payload: Gallery;
}

export default function GalleryDetail({gallery_payload}: Props) {
    const [imagesId, setImagesId] = useState<number[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { props } = usePage<any>();
    const flash = props.flash;
    const [message, setMessage] = useState<string | null>(null);
    const [textColor, setTextColor] = useState("text");
    const [formData, setFormData] = useState({
        title: gallery_payload.title,
        description: gallery_payload.description,
    });
    useEffect(() => {
        if (flash?.success) {
            setMessage(`Success: ${flash.success}`);
            setTextColor("text-green-600");
        }
        if (flash?.error) {
            setMessage(`Error: ${flash.error}`);
            setTextColor("text-red-600");
        }
        }, [flash]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
        const res = await axios.get(route('galleries.images-id', gallery_payload.id));
            setImagesId(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            router.put(route('galleries.update', gallery_payload.id), formData);
            setEditMode(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const form = new FormData();
        Array.from(e.target.files).forEach((file) => {
        form.append("images[]", file);
        });

        try {
            setUploading(true);
            var result = await axios.post(route('galleries.upload-images', gallery_payload.id), form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            gallery_payload.edited_at = result.data.edited_at;
            fetchGallery();
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (!confirm("Hapus gambar ini?")) return;
        try {
            var result = await axios.delete(
                route('galleries.delete-image', {
                    galleryId:gallery_payload.id,
                    imageId:imageId,
                })
            );
            gallery_payload.edited_at = result.data.edited_at;
            fetchGallery();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteGallery = ()=>{setIsDeleting(true);router.delete(route('galleries.destroy', gallery_payload.id));}
    if (loading) return <div className="p-6">Loading...</div>;
    if (!gallery_payload) return <div className="p-6">Gallery tidak ditemukan</div>;

    const setIsPublis = async (value: boolean)=>{router.patch(route('galleries.toggle-publish', gallery_payload.id))}

    return (
        <ManageLayout>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* ================== DETAIL ================== */}
            {isDeleting && (
                <div className="flex items-center justify-center">
                    <span>Info: Deleting...</span>
                </div>
            )}
            <div className="bg-white shadow rounded-xl p-6">
                {!editMode ? (
                <>
                    {message && (
                        <div className={`p-3 rounded-xl bg-gray-100 text-sm ${textColor}`}>
                        {message}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold">{gallery_payload.title}</h1>
                    <p className="mt-2 text-gray-600">{gallery_payload.description}</p>
                    <p className="mt-2 text-gray-600">Dibuat Pada: {getLocalTime(gallery_payload.created_at)}</p>
                    <p className="mt-2 text-gray-600">Terakhir Diedit Pada: {getLocalTime(gallery_payload.edited_at)}</p>
                    <p className="mt-2 text-gray-600">Terakhir Diedit Oleh: {gallery_payload.editor.name}</p>
                    <p className="mt-2">
                    Status:{" "}
                    <span
                        className={`font-semibold ${
                        gallery_payload.is_public ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {gallery_payload.is_public ? "Public" : "Private"}
                    </span>
                    </p>
                    <div className="flex gap-5">
                    {!gallery_payload.is_public ? (<button
                    onClick={() => setIsPublis(true)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                    Publish
                    </button>)
                    :(<button
                    onClick={() => setIsPublis(false)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                    Unpublish
                    </button>)}
                    <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                    Edit Gallery
                    </button>
                    <button
                    onClick={() => handleDeleteGallery()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                    Delete Gallery
                    </button>
                    </div>
                </>
                ) : (
                <div className="space-y-4">
                    <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    />

                    <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    />

                    <div className="flex gap-3">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Simpan
                    </button>

                    <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                        Batal
                    </button>
                    </div>
                </div>
                )}
            </div>

            {/* ================== UPLOAD ================== */}
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                Upload Gambar
                </h2>

                <input
                type="file"
                multiple
                onChange={handleUpload}
                className="block w-full text-sm text-gray-600"
                />

                {uploading && (
                <p className="text-blue-600 mt-2">Uploading...</p>
                )}
            </div>

            {/* ================== LIST IMAGES ================== */}
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                Daftar Gambar
                </h2>

                {imagesId?.length === 0 ? (
                <p className="text-gray-500">Belum ada gambar.</p>
                ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {imagesId?.map((imageId) => (
                    <div
                        key={imageId}
                        className="border rounded-lg overflow-hidden shadow"
                    >
                        <img
                        src={route('galleries.image', {
                            gallery: gallery_payload.id,
                            image: imageId,
                        })}
                        alt=""
                        className="w-full h-48 object-cover"
                        />

                        <div className="p-3">
                        <button
                            onClick={() =>
                            handleDeleteImage(imageId)
                            }
                            className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Hapus
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            <button
                onClick={() => router.get(route('gallery'))}
                className="
                    left-6
                    group
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    border
                    bg-white
                    text-slate-600
                    hover:bg-blue-50
                    hover:text-blue-600
                    hover:border-blue-300
                    transition-all
                    duration-300
                    shadow-sm
                    z-50
                "
            >
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" > <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> </svg> <span className="font-semibold text-sm tracking-wide">
            Go Back
            </span>
            </button>
            </div>
        </ManageLayout>
        );
}