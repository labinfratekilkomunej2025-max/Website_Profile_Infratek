import { useEffect, useState } from "react";
import ManageLayout from '@/Layouts/ManagementLayout';
import { router, usePage } from "@inertiajs/react";
import { getLocalTime } from "@/Utils";

interface News {
    id: number;
    title: string;
    description: string;
    is_public: boolean;
    creator: user | null;
    editor: user | null;
    created_at: string;
    edited_at: string;
}

type user = {
    id: number;
    name: string;
}

type NewsCompType = "text" | "image" | "quote";

interface NewsComponent {
    id: number;
    news_id: number;
    type: NewsCompType;
    text_content?: string;
    image_path?: string;
    alt_text?: string;
    order: number;
    creator: user;
}



interface Props {
    news_payload: News;
}

export default function NewsDetail({ news_payload }: Props) {
    const [news, setNews] = useState<News>(news_payload);
    const [components, setComponents] = useState<Record<number,NewsComponent>>([]);
    const [editingNews, setEditingNews] = useState(false);

    const { props } = usePage<any>();
    const flash = props.flash;
    const errors = props.errors;
    const [message, setMessage] = useState<string | null>(null);
    const [textColor, setTextColor] = useState("text");

    const [editForm, setEditForm] = useState({
        title: news.title,
        description: news.description,
        image: null as null | File,
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
    // =========================
    // Fetch Components
    // =========================
    const fetchComponents = () => {
        fetch(route('news.components', news.id))
            .then(res => res.json())
            .then(data => setComponents(data));
    };
    useEffect(() => {
        fetchComponents();
    }, [news.id]);

    // =========================
    // Update News
    // =========================
    const handleUpdateNews = async () => {
        
        router.put(route('news.update', news.id), editForm)

        setNews({ ...news, ...editForm });
        setEditingNews(false);
    };

    // =========================
    // Delete News
    // =========================
    const handleDeleteNews = async () => {
        if (!confirm("Yakin hapus news?")) return;

        router.delete(route('news.delete', news.id));
    };

    const setIsPublis = async (value: boolean)=>{router.patch(route('news.toggle-publish', news.id))}
    const [compModalOpen, setCompModalOpen] = useState(false);
    const [compMode, setCompMode] = useState<"create" | "edit">("create");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [compForm, setCompForm] = useState({
        type: "text" as NewsCompType,
        text_content: "",
        image: null as File | null,
        alt_text: "",
        order: 1,
    });
    const openCreateModal = () => {
        setCompMode("create");
        setCompForm({
            type: "text",
            text_content: "",
            image: null,
            alt_text: "",
            order: 1,
        });
        setCompModalOpen(true);
        };

        const openEditModal = (comp: NewsComponent) => {
            setCompMode("edit");
            setSelectedId(comp.id);

            setCompForm({
                type: comp.type,
                text_content: comp.text_content || "",
                image: null,
                alt_text: comp.alt_text || "",
                order: 1,
        });

        setCompModalOpen(true);
        };

        const handleSubmitComponent = () => {
            const formData = new FormData();

            formData.append("news_id", String(news.id));
            formData.append("type", compForm.type);
            formData.append("text_content", compForm.text_content || "");
            formData.append("alt_text", compForm.alt_text || "");
            formData.append("order", String(compForm.order));

            if (compForm.image) {
                formData.append("image", compForm.image);
            }

            if (compMode === "create") {
                router.post(route("news.store-component", news.id), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {setCompModalOpen(false);fetchComponents();},
                });
            } else if (selectedId) {
                router.put(
                route("news.update-component", selectedId),
                {
                    ...Object.fromEntries(formData),
                },
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {setCompModalOpen(false);fetchComponents();},
                }
                );
            }
            };

        const handleDeleteComponent = (id: number) => {
        if (!confirm("Yakin hapus component?")) return;

        router.delete(route("news.delete-component", id), {
            preserveScroll: true,
            onSuccess: () => {fetchComponents();},
        });
        };

    return (
        <ManageLayout>
        <section className="max-w-4xl mx-auto py-12 px-6">

            {/* ================= NEWS DISPLAY ================= */}
            {!editingNews ? (
                <>
                    {message && (
                        <div className={`p-3 rounded-xl bg-gray-100 text-sm ${textColor}`}>
                        {message}
                        </div>
                    )}
                    <img 
                    src={route('news.tumbnail', news.id)} 
                    alt={news.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    // @ts-ignore
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found' }} // Fallback if image breaks
                  />
                    <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
                    <p className="text-gray-700 mb-4">{news.description}</p>
                    <p className="mb-4">
                    Status:{""}
                    <span
                        className={`font-semibold ${
                        news_payload.is_public ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {news_payload.is_public ? "Public" : "Private"}
                    </span>
                    </p>
                    <p className="text-gray-700 mb-4">Created at: {getLocalTime(news.created_at)} by {news_payload.creator?.name}</p>
                    <p className="text-gray-700 mb-6">Edited at: {getLocalTime(news.edited_at)} by {news_payload.editor?.name}</p>
                    <div className="flex gap-4 mb-10">
                        {!news_payload.is_public ? (
                            <button
                                onClick={() => setIsPublis(true)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                Publish
                            </button>)
                            :(<button
                                onClick={() => setIsPublis(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                Unpublish
                            </button>
                        )}
                        <button
                            onClick={() => setEditingNews(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDeleteNews}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        <input
                        type="file"
                        onChange={(e) =>
                            setEditForm({
                            ...editForm,
                            image: e.target.files?.[0] ?? null,
                            })
                        }
                        />
                        {errors?.image && (
                            <div className="text-red-500 text-xs mt-1">{errors.image}</div>
                        )}
                        <input
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <div className="flex gap-5">
                            <button
                                onClick={handleUpdateNews}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingNews(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ================= ADD COMPONENT BUTTON ================= */}
            <div className="mb-8">
                <button
                    onClick={openCreateModal}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                    + Tambah Component
                </button>
            </div>

            {/* ================= COMPONENT LIST ================= */}
            <div className="space-y-8">

                {Object.keys(components).map(Number).map((key) => (
                    <div
                        key={components[key].id}
                        className="border p-6 rounded-xl shadow-md flex justify-between items-start gap-4"
                    >

                        {/* ===== LEFT CONTENT ===== */}
                        <div className="flex-1">

                            {components[key].type === "text" && (
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {components[key].text_content}
                                </p>
                            )}

                            {components[key].type === "image" && (
                                <figure>
                                    <img
                                        src={route('news.image', components[key].id)}
                                        alt={components[key].alt_text || "Image"}
                                        className="rounded-xl mb-2"
                                    />
                                    {components[key].text_content && (
                                        <figcaption className="text-sm text-gray-500 italic">
                                            {components[key].text_content}
                                        </figcaption>
                                    )}
                                </figure>
                            )}

                            {components[key].type === "quote" && (
                                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-xl">
                                    "{components[key].text_content}"
                                </blockquote>
                            )}

                        </div>

                        {/* ===== RIGHT ACTION BUTTONS ===== */}
                        <div className="flex flex-col gap-2">
                            <p>
                                Created by {components[key].creator?.name}
                            </p>
                            <button
                                onClick={() => openEditModal(components[key])}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDeleteComponent(components[key].id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                Hapus
                            </button>
                        </div>

                    </div>
                ))}

            </div>
            {compModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4">

                    <h2 className="text-xl font-bold">
                        {compMode === "create" ? "Tambah Component" : "Edit Component"}
                    </h2>

                    {/* TYPE */}
                    <div className="flex gap-5 items-center">
                        <label>
                            Type:
                        </label>
                        <select
                            value={compForm.type}
                            onChange={(e) =>
                                setCompForm({ ...compForm, type: e.target.value as NewsCompType, image: null })
                            }
                            className="w-full border p-2 rounded"
                            >
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="quote">Quote</option>
                        </select>
                    </div>

                    {/* ORDER */}
                    <div className="flex gap-5 items-center">
                        <label>
                            Order:
                        </label>
                        <input
                        type="number"
                        min={1}
                        value={compForm.order}
                        onChange={(e) =>
                            setCompForm({
                            ...compForm,
                            order: Number(e.target.value),
                            })
                        }
                        className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* TEXT CONTENT */}
                    {(compForm.type === "text" || compForm.type === "quote") && (
                        <div className="flex gap-5 items-center">
                            <label>
                                Text:
                            </label>
                            <textarea
                            placeholder="Isi text..."
                            value={compForm.text_content}
                            onChange={(e) =>
                                setCompForm({ ...compForm, text_content: e.target.value })
                            }
                            className="w-full border p-2 rounded"
                            />
                        </div>
                    )}

                    {/* IMAGE INPUT */}
                    
                    {compForm.type === "image" && (
                    <>
                    <div className="flex gap-5 items-center">
                        <label>
                            Image:
                        </label>
                        <div>
                        {compForm.image && (
                            <img
                                src={URL.createObjectURL(compForm.image)}
                                className="rounded-xl max-h-48 object-cover"
                            />
                        )}
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setCompForm({
                            ...compForm,
                            image: e.target.files ? e.target.files[0] : null,
                            })
                        }
                        className="w-full border p-2 rounded"
                        />
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <label>
                            Alternative Image Name:
                        </label>
                        <input
                        type="text"
                        placeholder="Alt text..."
                        value={compForm.alt_text}
                        onChange={(e) =>
                            setCompForm({ ...compForm, alt_text: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex gap-5 items-center">
                        <label>
                            Caption:
                        </label>
                        <input
                        type="text"
                        placeholder="Caption text..."
                        value={compForm.text_content}
                        onChange={(e) =>
                            setCompForm({ ...compForm, text_content: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                        />
                    </div>
                    </>
                    )}

                    {/* BUTTON */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                        onClick={() => setCompModalOpen(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                        Batal
                        </button>
                        <button
                        onClick={handleSubmitComponent}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                        Simpan
                        </button>
                    </div>
                    </div>
                </div>
                )}
            <button
            onClick={() => router.get(route('news'))}
            className="
                absolute left-0
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
            "
            >
            <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
    
            <span className="font-semibold text-sm tracking-wide">
                Go Back
            </span>
            </button>
        </section>
        </ManageLayout>
    );
}