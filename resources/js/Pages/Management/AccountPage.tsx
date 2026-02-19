import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Checkbox from '@/Components/Checkbox';
import {getLocalTime} from '@/Utils';

type Account = {
  id: number;
  name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type Props = {
  accounts: Account[];
};

export default function AccountsPage({ accounts }: Props) {
  const { props } = usePage<any>();

  const errors = props.errors;
  const flash = props.flash;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [message, setMessage] = useState<string | null>(null);
  const [text_color, setTextColor] = useState<string>("text");

  const [form, setForm] = useState({
    id: null as number | null,
    name: "",
    is_admin: false,
    is_active: true,
    password: "",
    is_change_password: true,
    password_confirmation: "",
  });

  // ✅ Flash message handler (SAMA PERSIS)
  useEffect(() => {
    if (flash?.success) {
      setMessage(`Success: ${props.flash.success}`);
      setTextColor("text-green-600");
    }
    if (flash?.error) {
      setMessage(`Error: ${props.flash.error}`);
      setTextColor("text-red-600");
    }
  }, [flash]);

  const openCreate = () => {
    setMode("create");
    setForm({
      id: null,
      name: "",
      is_admin: false,
      is_active: true,
      password:"",
      is_change_password:true,
      password_confirmation: "",
    });
    setOpen(true);
  };

  const openEdit = (account: Account) => {
    setMode("edit");
    setForm({
      id: account.id,
      name: account.name,
      is_admin: account.is_admin,
      is_active: account.is_active,
      password: "",
      is_change_password:false,
      password_confirmation: "",
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.is_admin && !confirm("The is admin column is checked, are you sure want to proceed?")) return;
    if (mode === "create") {
      router.post(route("users.store"), form, {
        onSuccess: () => {setOpen(false); console.log('success');},
      });
    } else {
      router.put(route("users.update"), form, {
        onSuccess: () => {setOpen(false); console.log('success');},
      });
    }
  };

  const destroy = (id: number) => {
    if (!confirm("Yakin ingin menghapus akun ini?")) return;
    router.delete(route("users.destroy", id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-80"
        >
          Tambah Akun
        </button>
      </div>

      {message && (
        <div className={"p-3 rounded-xl bg-gray-100 text-sm " + text_color}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Nama:</span> {account.name}</div>
              <div><span className="font-medium">Admin:</span> {account.is_admin ? "Yes" : "No"}</div>
              <div><span className="font-medium">Active:</span> {account.is_active ? "Yes" : "No"}</div>
              <div><span className="font-medium">Dibuat pada:</span> {getLocalTime(account.created_at)}</div>
              <div><span className="font-medium">Diubah pada:</span> {getLocalTime(account.updated_at)}</div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(account)}
                className="px-3 py-1 rounded-xl border hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => destroy(account.id)}
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
              {mode === "create" ? "Tambah" : "Edit"} Akun
            </h3>

            <form onSubmit={submit} className="space-y-3">
              <div>
                <input
                  placeholder="Account Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                />
                {errors?.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>

              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="is_change_password"
                    checked={form.is_change_password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      {if (mode=='create') return; 
                      setForm({ ...form, is_change_password: e.target.checked })}
                    }
                  />
                  New Password
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="is_admin"
                    checked={form.is_admin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, is_admin: e.target.checked })
                    }
                  />
                  Admin
                </label>

                <label className="flex items-center gap-2">
                  <Checkbox
                    name="is_active"
                    checked={form.is_active}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, is_active: e.target.checked })
                    }
                  />
                  Active
                </label>
              </div>

              {form.is_change_password && (
              <>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Newer Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                />
                {errors?.password && (
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>
              <div>
                <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Write the Same Password"
                  value={form.password_confirmation}
                  onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                />
                {errors?.password_confirmation && (
                  <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>
                )}
              </div>
              </>)}

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
