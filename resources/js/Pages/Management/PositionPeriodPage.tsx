import React, { useEffect, useState } from "react";
import { router, usePage, useForm } from "@inertiajs/react";

type Position = { id: number; name: string };
type Period = { id: number; title: string };

type Props = {
  positions: Position[];
  periods: Period[];
};

export default function ManageMetaPage({ positions, periods }: Props) {
  const { props } = usePage();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [type, setType] = useState<"position" | "period">("position");
  const [message, setMessage] = useState<string | null>(null);
  const [text_color, setTextColor] = useState<string>("text");

  const [form, setForm] = useState<any>({ id: null, name: "", title: "" });

  useEffect(() => {
    if (props.flash?.success) {setMessage(`Success: ${props.flash.success}`); setTextColor("text-green-600")}
    else if (props.flash?.error) {setMessage(`Error: ${props.flash.error}`); setTextColor("text-red-600")}
    else if (Object.keys(props.errors).length != 0) {
        var data_error_msg:string = "";
        var count = 1;
        for (const [key, val] of Object.entries(props.errors)) 
        {
            data_error_msg+=`${count}. ${key}: ${val}\n`;
            count+=1;
        }
        setMessage(`Data Error: ${data_error_msg}`); setTextColor("text-red-600 font-bold")};
  }, [props.flash]);

  const openCreate = (resourceType: "position" | "period") => {
    setMode("create");
    setType(resourceType);
    setForm({ id: null, name: "", title: "" });
    setOpen(true);
  };

  const openEdit = (resourceType: "position" | "period", item: any) => {
    setMode("edit");
    setType(resourceType);
    setForm({
      id: item.id,
      name: item.name ?? "",
      title: item.title ?? "",
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "position") {
      if (mode === "create") {
        router.post(route("positions.store"), { name: form.name });
      } else {
        router.put(route("positions.update"), { name: form.name, id:form.id});
      }
    } else {
      if (mode === "create") {
        router.post(route("periods.store"), { title: form.title });
      } else {
        router.put(route("periods.update"), { title: form.title, id:form.id });
      }
    }

    setOpen(false);
  };

  const destroy = (resourceType: "position" | "period", id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    if (resourceType === "position") {
      router.delete(route("positions.destroy", id));
    } else {
      router.delete(route("periods.destroy", id));
    }
  };

  const renderList = (
    title: string,
    resourceType: "position" | "period",
    items: any[]
  ) => (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>{title}</h2>
        <button onClick={() => openCreate(resourceType)}>Tambah</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div>{resourceType === "position" ? item.name : item.title}</div>

            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => openEdit(resourceType, item)}>Edit</button>
              <button onClick={() => destroy(resourceType, item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      {message && (
        <div
          style={{
            gridColumn: "1 / -1",
            background: "#f5f5f5",
            padding: 10,
            borderRadius: 8,
          }}
          className={text_color}
        >
          {message}
        </div>
      )}

      {renderList("Positions", "position", positions)}
      {renderList("Periods", "period", periods)}

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 320 }}>
            <h3>
              {mode === "create" ? "Tambah" : "Edit"} {type}
            </h3>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {type === "position" ? (
                <input
                  placeholder="Position name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              ) : (
                <input
                  placeholder="Period title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" onClick={() => setOpen(false)}>
                  Batal
                </button>
                <button type="submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}