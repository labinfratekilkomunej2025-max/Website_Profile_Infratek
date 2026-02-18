import React, {useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import {getLocalTime, escapeHtml} from '@/Utils';
import Checkbox from '@/Components/Checkbox';
import InputLabel from "@/Components/InputLabel";

type Member = {
  id: number;
  full_name: string;
  position_id: number;
  photo_path: string;
  created_at: string;
  edited_at: string;
  position: Position;
  management_detail: ManagementDetail;
};

type Position = {
  id: number;
  name: string;
};

type Props = {
  members: Member[];
};

type ManagementDetail = {
  linkedin_link: string;
  period: Period;
}
type Period = {
  id: number;
  title: string;
}

export default function MembersPage({ members }: Props) {
  const { props } = usePage<any>();

  const errors = props.errors;
  const flash = props.flash;

  const [positions, setPositions] = useState<Position[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [open, setOpen] = useState(false);
  const [is_detail_check, setIsDetail] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [message, setMessage] = useState<string | null>(null);
  const [text_color, setTextColor] = useState<string>("text");

  const [form, setForm] = useState({
    id: null as number | null,
    full_name: "",
    position_id: "",
    is_photo_update: "",
    photo: null as File | null,
    is_detail: "",
    period_id: "",
    linkedin_link: "",
  });

  useEffect(() => {
    fetch(route("positions.all"))
      .then((res) => res.json())
      .then((data) => setPositions(data))
      .catch(() => console.error("Failed to load positions"));
  }, []);
  useEffect(() => {
    fetch(route("periods.all"))
      .then((res) => res.json())
      .then((data) => setPeriods(data))
      .catch(() => console.error("Failed to load periods"));
  }, []);

  useEffect(() => {
    if (flash?.success) {setMessage(`Success: ${props.flash.success}`); setTextColor("text-green-600")}
    if (flash?.error) {setMessage(`Error: ${props.flash.error}`); setTextColor("text-red-600")}
  }, [flash]);

  const openCreate = () => {
    setMode("create");
    setForm({ id: null, full_name: "", position_id: "", photo: null, is_photo_update: '0',
              is_detail: "0", period_id: "" ,linkedin_link: "" });
    setOpen(true);
  };

  const openEdit = (member: Member) => {
    setIsDetail(member.management_detail!=null);
    setMode("edit");
    setForm({
      id: member.id,
      full_name: member.full_name,
      position_id: String(member.position_id),
      is_photo_update: '0',
      photo: null,
      is_detail: is_detail_check ? '1' : '0',
      period_id: String(member.management_detail?.period.id ?? ''),
      linkedin_link: member.management_detail?.linkedin_link ?? '',
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    // @ts-ignore
    data.append("id", form.id);
    data.append("full_name", form.full_name);
    data.append("position_id", form.position_id);
    data.append("is_detail", is_detail_check ? '1' : '0');
    if (form.photo) {data.append("photo", form.photo); data.append("is_photo_update", '1')}
    else {data.append("is_photo_update", '0')};
    if (is_detail_check) {data.append("linkedin_link", form.linkedin_link);data.append("period_id", form.period_id);};
    if (mode === "create") {
      router.post(route("members.store"), data, {
        onSuccess: () => setOpen(false),
      });
    } else {
      console.log(form.is_photo_update)
      router.put(route("members.update"), data, {
        onSuccess: () => setOpen(false),
        onError: (errors) => console.log(errors),
        forceFormData: true,
      });
    }
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin ingin menghapus member ini?")) return;
    router.delete(route("members.destroy", id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Members</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-80"
        >
          Tambah Member
        </button>
      </div>

      {message && (
        <div className={"p-3 rounded-xl bg-gray-100 text-sm "+text_color}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex gap-4 flex-wrap">
              <img
                src={route("members.photo", member.id)}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1 min-w-[200px] text-sm space-y-1">
                <div><span className="font-medium">Nama:</span> {member.full_name}</div>
                <div><span className="font-medium">Posisi:</span> {member.position.name}</div>
                <div><span className="font-medium">Dibuat pada:</span> {getLocalTime(member.created_at)}</div>
                <div><span className="font-medium">Diubah pada:</span> {getLocalTime(member.edited_at)}</div>
              </div>
              {member.management_detail!=null && (<div className="flex-1 min-w-[200px] text-sm space-y-1">
                <div>Details:</div>
                <div><span className="font-medium">LinkedIn: </span><a className="text-blue-500 underline" href={escapeHtml(member.management_detail.linkedin_link)} target="_blank" rel="noopener noreferrer">Click Here</a></div>
                <div><span className="font-medium">Period:</span> {member.management_detail.period?.title}</div>
              </div>)}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(member)}
                className="px-3 py-1 rounded-xl border hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => destroy(member.id)}
                className="px-3 py-1 rounded-xl border text-red-600 hover:bg-red-50"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-lg space-y-3">
            <h3 className="text-lg font-semibold">
              {mode === "create" ? "Tambah" : "Edit"} Member
            </h3>

            <form onSubmit={submit} className="space-y-3">
              <div className="hidden">
                <input
                  type="number"
                  placeholder=""
                  // @ts-ignore
                  defaultValue={form.id}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <input
                  placeholder="Full name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                />
                {errors?.full_name && (
                  <div className="text-red-500 text-xs mt-1">{errors.full_name}</div>
                )}
              </div>
              
              <div>
                <select
                  value={form.position_id}
                  onChange={(e) => setForm({ ...form, position_id: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                >
                  <option value="">Pilih Position</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>{pos.name}</option>
                  ))}
                </select>
                {errors?.position_id && (
                  <div className="text-red-500 text-xs mt-1">{errors.position_id}</div>
                )}
              </div>
              
              <div>
                <input
                  type="file"
                  onChange={(e) => setForm({ ...form, photo: e.target.files ? e.target.files[0] : null })}
                  className="w-full text-sm"
                />
                {errors?.photo && (
                  <div className="text-red-500 text-xs mt-1">{errors.photo}</div>
                )}
              </div>

              <InputLabel htmlFor="is_detail" value="Is Detail" />
              <Checkbox
                  name="is_detail"
                  checked={is_detail_check}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setIsDetail(event.target.checked);
                  }}
              />

              {is_detail_check && (
                <>
                <div>
                  <input
                    placeholder="LinkedIn link"
                    value={form.linkedin_link}
                    onChange={(e) => setForm({ ...form, linkedin_link: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm"
                  />
                  {errors?.linkedin_link && (
                    <div className="text-red-500 text-xs mt-1">{errors.linkedin_link}</div>
                  )}
                </div>
                <div>
                  <select
                    value={form.period_id}
                    onChange={(e) => setForm({ ...form, period_id: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="">Pilih Periode</option>
                    {periods.map((pos) => (
                      <option key={pos.id} value={pos.id}>{pos.title}</option>
                    ))}
                  </select>
                  {errors?.period_id && (
                    <div className="text-red-500 text-xs mt-1">{errors.period_id}</div>
                  )}
                </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 rounded-xl border text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-xl bg-black text-white text-sm hover:opacity-80"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}