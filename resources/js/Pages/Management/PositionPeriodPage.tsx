import React, { useEffect, useState } from "react";
import { router, usePage, useForm } from "@inertiajs/react";

type Position = { id: number; name: string; order: number };
type Period = { id: number; title: string };
type Division = { id: number; name: string; order:number };

type Props = {
  positions: Position[];
  periods: Period[];
  divisions: Division[];
};

export default function ManageMetaPage({ positions, periods, divisions }: Props) {
  const { props } = usePage();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [type, setType] = useState<"Position" | "Period" | "Division">("Position");
  const [message, setMessage] = useState<string | null>(null);
  const [text_color, setTextColor] = useState<string>("text");

  const [form, setForm] = useState<any>({ id: null, name: "", title: "", order: 1 });

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

  const openCreate = (resourceType: "Position" | "Period" | "Division") => {
    setMode("create");
    setType(resourceType);
    setForm({ id: null, name: "", title: "", order: 1});
    setOpen(true);
  };

  const openEdit = (resourceType: "Position" | "Period" | "Division", item: any) => {
    setMode("edit");
    setType(resourceType);
    setForm({
      id: item.id,
      name: item.name ?? "",
      title: item.title ?? "",
      order: 1,
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    switch(type){
    case "Position":
      if (mode === "create") {
        router.post(route("positions.store"), { name: form.name, order: form.order });
      } else {
        router.put(route("positions.update", form.id), { name: form.name, order: form.order});
      }
      break;
    case "Period":
      if (mode === "create") {
        router.post(route("periods.store"), { title: form.title });
      } else {
        router.put(route("periods.update", form.id), { title: form.title });
      }
      break;
    case "Division":
      if (mode === "create") {
        router.post(route("divisions.store"), { name: form.name, order: form.order });
      } else {
        router.put(route("divisions.update", form.id), { name: form.name, order: form.order });
      }
      break;
    }

    setOpen(false);
  };

  const destroy = (resourceType: "Position" | "Period" | "Division", id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    switch(resourceType){
    case "Position":
      router.delete(route("positions.destroy", id));
      break;
    case "Period":
      router.delete(route("periods.destroy", id));
      break;
    case "Division":
      router.delete(route("divisions.destroy", id));
      break;
    }
  };

  const renderList = (
    title: string,
    resourceType: "Position" | "Period" | "Division",
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
            <div>{resourceType === "Period" ? item.title : item.name}</div>

            <div style={{ display: "flex", gap: 6 }}>
              { resourceType != "Period" && (
                <div>Order: {item.order}</div>
              )}
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

      {renderList("Positions", "Position", positions)}
      {renderList("Divisi", "Division", divisions)}
      {renderList("Periods", "Period", periods)}

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
              {type === "Period" ? (
                <input
                  placeholder="Period title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              ) : (
                <>
                  <input
                    placeholder={type+" name"}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder={type+" order"}
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                  />
                </>
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