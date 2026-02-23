import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { getLocalTime } from "@/Utils";
import InputLabel from "@/Components/InputLabel";

type Member = {
  id: number;
  full_name: string;
  photo_path: string;
  created_at: string;
  edited_at: string;
  linkedin_link: string | null;
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

type Props = {
  members: Member[];
};

export default function MembersPage({ members }: Props) {
  const { props } = usePage<any>();
  const errors = props.errors;
  const flash = props.flash;

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
    is_photo_update: '0',
    photo: null as File | null,
  });

  const [detailForm, setDetailForm] = useState({
    id: null as number | null,
    member_id: null as number | null,
    position_id: "",
    period_id: "",
  });

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
    data.append("full_name", form.full_name);
    if (form.photo) {data.append("is_photo_update", '1'); data.append("photo", form.photo)}else{data.append("is_photo_update", '0');};

    if (mode === "create") {
      router.post(route("members.store"), data, {
        onSuccess: () => setOpen(false),
      });
    } else {
      console.log(errors);
      router.put(route("members.update"), data, {
        onSuccess: () => setOpen(false),
        forceFormData: true,
      });
    }
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin ingin menghapus member ini?")) return;
    router.delete(route("members.destroy", id));
  };
  const destroyDetail = (id: number) => {
    if (!confirm("Yakin ingin menghapus member ini?")) return;
    router.delete(route("management-details.destroy", id));
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
      });
    } else {
      router.put(route("management-details.update", String(detailForm.id)), payload, {
        onSuccess: () => setDetailOpen(false),
      });
    }
  };

  return (
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

                {member.linkedin_link && (
                  <a
                    href={member.linkedin_link}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                )}
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

      {/* MEMBER MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
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
  );
}