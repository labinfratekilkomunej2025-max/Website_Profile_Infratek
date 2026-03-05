import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PaginationData } from "@/SharedType";
import ManageLayout from '@/Layouts/ManagementLayout';

type Period = { id: number; title: string };

type PeriodPayload = PaginationData & {
    data: Period[];
}

type Props = {
  periods_payload: PeriodPayload;
};

export default function ManagePeriodsPage({ periods_payload }: Props) {
  const periods: Period[] = periods_payload.data;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [form, setForm] = useState<{ id: null|number, title: string }>({ id: null, title: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      router.post(route("periods.store"), form);
    } else {
      router.put(route("periods.update", String(form.id)), form);
    }

    setOpen(false);
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin?")) return;
    router.delete(route("periods.destroy", id));
  };

  const { props } = usePage<any>();
    const flash = props.flash;
    const [message, setMessage] = useState<string | null>(null);
    const [textColor, setTextColor] = useState("text");
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

  return (
    <ManageLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Periods</h1>
      {message && (
            <div className={`p-3 mb-5 rounded-xl bg-gray-100 text-sm ${textColor}`}>
            {message}
            </div>
        )}

      <button
        onClick={() => {
          setMode("create");
          setForm({ id: null, title: "" });
          setOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        Tambah
      </button>

      <div className="flex flex-col gap-4">
        {periods.map(item => (
          <div key={item.id} className="border rounded-xl p-4 flex justify-between">
            <div>{item.title}</div>
            <div className="flex gap-2">
              <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => {
                  setMode("edit");
                  setForm(item);
                  setOpen(true);
                }}
              >
                Edit
              </button>

              <button 
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                onClick={() => destroy(item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination payload={periods_payload} only={["periods_payload"]} back_route_name='managements.index'/>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <form onSubmit={submit} className="bg-white p-6 rounded-xl w-80 flex flex-col gap-4">
            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <button type="submit" className="bg-blue-600 text-white py-2 rounded-xl">
              Simpan
            </button>
            <button type="button" onClick={()=>setOpen(false)} className="text-black border-2 py-2 rounded-xl">
              Batal
            </button>
          </form>
        </div>
      )}
    </div>
    </ManageLayout>
  );
}