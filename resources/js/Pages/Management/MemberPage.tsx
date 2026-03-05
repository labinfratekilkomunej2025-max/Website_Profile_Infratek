import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { getLocalTime } from "@/Utils";
import InputLabel from "@/Components/InputLabel";
import ManageLayout from '@/Layouts/ManagementLayout';
import Pagination from "@/Components/Pagination";
import { PaginationData } from "@/SharedType";

type Member = {
  id: number;
  full_name: string;
  photo_path: string;
  created_at: string;
  edited_at: string;
  linkedin_link: string | null;
  instagram_link: string | null;
  management_detail: ManagementDetail[];
};

type ManagementDetail = {
  id: number;
  member_id: number;
  period_id: number;
  position_id: number;
  period: Period;
  position: Position;
};

type Position = {
  id: number;
  name: string;
  order: number;
};

type Period = {
  id: number;
  title: string;
};
type MemberPayload = PaginationData & {
  data: Member[];
}
type Props = {
  members_payload: MemberPayload;
};

export default function MembersPage({ members_payload }: Props) {
  const { props } = usePage<any>();
  const errors = props.errors;
  const flash = props.flash;
  const members: Member[]= members_payload.data;
  console.log(members)
  const [positions, setPositions] = useState<Position[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailMode, setDetailMode] = useState<"create" | "edit">("create");

  const [message, setMessage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("text");

  const [form, setForm] = useState({
    id: null as number | null,
    full_name: "",
    linkedin_link: "",
    instagram_link: "",
    is_photo_update: '0',
    photo: null as File | null,
  });

  const [detailForm, setDetailForm] = useState({
    id: null as number | null,
    member_id: null as number | null,
    position_id: "",
    period_id: "",
  });
  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);
  /* LOAD DROPDOWNS */
  useEffect(() => {
    fetch(route("positions.all"))
      .then((res) => res.json())
      .then((data) => setPositions(data));
  }, []);

  useEffect(() => {
    fetch(route("periods.all"))
      .then((res) => res.json())
      .then((data) => setPeriods(data));
  }, []);

  /* FLASH MESSAGE */
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

  /* MEMBER HANDLERS */
  const openCreate = () => {
    setMode("create");
    setForm({
      id: null,
      full_name: "",
      linkedin_link: "",
      instagram_link: "",
      is_photo_update: '0',
      photo: null,
    });
    setOpen(true);
  };

  const openEdit = (member: Member) => {
    setMode("edit");
    setForm({
      id: member.id,
      full_name: member.full_name,
      is_photo_update: '0',
      instagram_link: member.instagram_link ?? "",
      linkedin_link: member.linkedin_link ?? "",
      photo: null,
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (form.id) data.append("id", String(form.id));
    data.append('linkedin_link', form.linkedin_link);
    data.append('instagram_link', form.instagram_link);
    data.append("full_name", form.full_name);
    if (form.photo) {data.append("is_photo_update", '1'); data.append("photo", form.photo)}else{data.append("is_photo_update", '0');};

    if (mode === "create") {
      router.post(route("members.store"), data, {
        onSuccess: () => setOpen(false),
        preserveScroll: true,
        preserveState: true,
        only: ["members_payload"],
      });
    } else {
      router.put(route("members.update"), data, {
        onSuccess: () => setOpen(false),
        forceFormData: true,
        preserveScroll: true,
        preserveState: true,
        only: ["members_payload"],
      });
    }
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin ingin menghapus member ini?")) return;
    router.delete(route("members.destroy", id),
      {preserveScroll: true,
      preserveState: true,
      only: ["members_payload"],}
      );
  };
  const destroyDetail = (id: number) => {
    if (!confirm("Yakin ingin menghapus member ini?")) return;
    router.delete(route("management-details.destroy", id),
    {preserveScroll: true,
      preserveState: true,
      only: ["members_payload"],}
    );
  };

  /* DETAIL HANDLERS */
  const openDetailCreate = (member: Member) => {
    setDetailMode("create");
    setDetailForm({
      id: null,
      member_id: member.id,
      position_id: "",
      period_id: "",
    });
    setDetailOpen(true);
  };

  const openDetailEdit = (member: Member, detail: ManagementDetail) => {
    setDetailMode("edit");
    setDetailForm({
      id: detail.id,
      member_id: member.id,
      position_id: String(detail.position_id),
      period_id: String(detail.period_id),
    });
    setDetailOpen(true);
  };

  const submitDetail = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      member_id: detailForm.member_id,
      position_id: detailForm.position_id,
      period_id: detailForm.period_id,
    };

    if (detailMode === "create") {
      router.post(route("management-details.store"), payload, {
        onSuccess: () => setDetailOpen(false),
        preserveScroll: true,
        preserveState: true,
        only: ["members_payload"],
      });
    } else {
      router.put(route("management-details.update", String(detailForm.id)), payload, {
        onSuccess: () => setDetailOpen(false),
        preserveScroll: true,
        preserveState: true,
        only: ["members_payload"],
      });
    }
  };
  const LinkedInIcon = () => (
      <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
  );

  const InstagramIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
      </svg>
  );
  return (
    <ManageLayout>
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Members</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-xl bg-black text-white"
        >
          Tambah Member
        </button>
      </div>
      
      {message && (
        <div className={`p-3 rounded-xl bg-gray-100 text-sm ${textColor}`}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="border rounded-2xl p-4 shadow-sm">
            <div className="flex gap-4 flex-wrap">
              <img
                src={route("members.photo", member.id)}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1 text-sm">
                <div className="font-medium">{member.full_name}</div>
                <div>Dibuat: {getLocalTime(member.created_at)}</div>
                <div>Diubah: {getLocalTime(member.edited_at)}</div>
                <div className="flex gap-2">
                {member.linkedin_link && (
                    <a href={member.linkedin_link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors mt-auto group/icon">
                        <LinkedInIcon />
                    </a>
                )}
                {member.instagram_link && (
                    <a href={member.instagram_link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors mt-auto group/icon">
                        <InstagramIcon />
                    </a>
                )}
                </div>
              </div>

              <div className="flex-1 min-w-[220px] text-sm space-y-2">
                <div className="font-medium">Management Details</div>

                {member.management_detail.map((detail) => (
                  <div
                    key={detail.id}
                    className="border rounded-xl p-2 bg-gray-50 text-xs "
                  >
                    <div>Posisi: {detail.position.name}</div>
                    <div>Periode: {detail.period.title}</div>
                    <div className="flex justify-between w-full px-10 pt-2">
                      <button
                        onClick={() => openDetailEdit(member, detail)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit Detail
                      </button>
                      <button
                        onClick={() => destroyDetail(detail.id)}
                        className="text-red-600"
                      >
                        Hapus Detail
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => openDetailCreate(member)}
                  className="text-green-600 text-sm"
                >
                  + Tambah Detail
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(member)}>Edit</button>
              <button
                onClick={() => destroy(member.id)}
                className="text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination payload={members_payload} only={["members_payload"]} back_route_name='managements.index' />
      {/* MEMBER MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={submit}
            className="bg-white rounded-2xl p-6 space-y-3 w-[360px]"
          >
            <InputLabel
                htmlFor="full_name"
                value="Nama Lengkap"
                className="text-xl"
            />
            <input
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Full name"
            />
            {errors?.full_name && (
                <div className="text-red-500 text-xs mt-1">{errors.full_name}</div>
              )}
            <InputLabel
                htmlFor="linkedin_link"
                value="LinkedIn Link"
                className="text-xl"
            />
            <input
              value={form.linkedin_link}
              onChange={(e) =>
                setForm({
                  ...form,
                  linkedin_link: e.target.value,
                })
              }
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors?.linkedin_link && (
                <div className="text-red-500 text-xs mt-1">{errors.linkedin_link}</div>
              )}
              <InputLabel
                htmlFor="instagram_link"
                value="Instagram Link"
                className="text-xl"
            />
            <input
              value={form.instagram_link}
              onChange={(e) =>
                setForm({
                  ...form,
                  instagram_link: e.target.value,
                })
              }
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors?.instagram_link && (
                <div className="text-red-500 text-xs mt-1">{errors.instagram_link}</div>
              )}
            <InputLabel
                htmlFor="photo"
                value="File Foto"
                className="text-xl"
            />
            <input
              type="file"
              onChange={(e) =>
                setForm({
                  ...form,
                  photo: e.target.files?.[0] ?? null,
                })
              }
            />
            {errors?.photo && (
                <div className="text-red-500 text-xs mt-1">{errors.photo}</div>
              )}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)}>
                Batal
              </button>
              <button type="submit">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={submitDetail}
            className="bg-white rounded-2xl p-6 space-y-3 w-[360px]"
          >
            <InputLabel
                htmlFor="position_id"
                value="Posisi"
                className="text-xl"
            />
            <select
              value={detailForm.position_id}
              onChange={(e) =>
                setDetailForm({ ...detailForm, position_id: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">Pilih Position</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
            {errors?.position_id && (
                <div className="text-red-500 text-xs mt-1">{errors.position_id}</div>
              )}
            <InputLabel
                htmlFor="period_id"
                value="Periode"
                className="text-xl"
            />
            <select
              value={detailForm.period_id}
              onChange={(e) =>
                setDetailForm({ ...detailForm, period_id: e.target.value })
              }
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">Pilih Periode</option>
              {periods.map((per) => (
                <option key={per.id} value={per.id}>
                  {per.title}
                </option>
              ))}
            </select>
            {errors?.period_id && (
                <div className="text-red-500 text-xs mt-1">{errors.period_id}</div>
              )}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setDetailOpen(false)}>
                Batal
              </button>
              <button type="submit">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </ManageLayout>
  );
}