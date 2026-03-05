import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PaginationData } from "@/SharedType";
import ManageLayout from '@/Layouts/ManagementLayout';

type Division = {
  id: number;
  name: string;
};

type Position = {
  id: number;
  name: string;
  order: number;
  division_id: number;
  division?: Division;
};

type PositionPayload = PaginationData & {
  data: Position[];
};

type Props = {
  positions_payload: PositionPayload;
  divisions: Division[];
};

export default function ManagePositionsPage({ positions_payload, divisions }: Props) {
  const positions = positions_payload.data;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const [form, setForm] = useState<{
    id: number | null;
    name: string;
    order: number;
    division_id: number | "";
  }>({
    id: null,
    name: "",
    order: 1,
    division_id: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.division_id) {
      alert("Division wajib dipilih");
      return;
    }

    if (mode === "create") {
      router.post(route("positions.store"), form);
    } else {
      router.put(route("positions.update", String(form.id)), form);
    }

    setOpen(false);
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin?")) return;
    router.delete(route("positions.destroy", id));
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
        <h1 className="text-2xl font-bold mb-6">Manage Positions</h1>
        {message && (
            <div className={`p-3 mb-5 rounded-xl bg-gray-100 text-sm ${textColor}`}>
            {message}
            </div>
        )}
        <button
          onClick={() => {
            setMode("create");
            setForm({ id: null, name: "", order: 1, division_id: "" });
            setOpen(true);
          }}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Tambah
        </button>

        <div className="flex flex-col gap-4">
          {positions.map(item => (
            <div key={item.id} className="border rounded-xl p-4 flex justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">
                  Order: {item.order}
                </div>
                <div className="text-sm text-blue-600">
                  Division: {item.division?.name ?? "-"}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => {
                    setMode("edit");
                    setForm({
                      id: item.id,
                      name: item.name,
                      order: item.order,
                      division_id: item.division_id,
                    });
                    setOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  onClick={() => destroy(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        <Pagination payload={positions_payload} only={["positions_payload"]} back_route_name='managements.index'/>

        {open && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <form
              onSubmit={submit}
              className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4"
            >
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                type="number"
                value={form.order}
                onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                className="border p-2 rounded"
              />

              {/* DROPDOWN DIVISION */}
              <select
                value={form.division_id}
                onChange={e =>
                  setForm({ ...form, division_id: Number(e.target.value) })
                }
                className="border p-2 rounded"
              >
                <option value="">Pilih Division</option>
                {divisions.map(div => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-xl"
              >
                Simpan
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border py-2 rounded-xl"
              >
                Batal
              </button>
            </form>
          </div>
        )}
      </div>
    </ManageLayout>
  );
}