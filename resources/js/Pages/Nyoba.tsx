import React from "react";
import { useForm, usePage } from "@inertiajs/react";

type Props = {
    userId: number;
};

export default function DeleteUserForm({ userId }: Props) {
    const {success, error}  = usePage().props.flash;

    const { data, setData, post, processing, errors } = useForm({
        user_id: userId=0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (confirm("Are you sure you want to delete this user?")) {
            post(route("user.delete"),{
                onSuccess:(data)=>{console.log(data)},
            });
        }
    };


    return (
        <>
        <form onSubmit={submit}>
            <input
                id="user_id"
                type="number"
                value={data.user_id}
                onChange={(e) => setData("user_id", Number(e.target.value))}
            />

            {errors.user_id && (
                <div style={{ color: "red" }}>{errors.user_id}</div>
            )}

            <button type="submit" disabled={processing}>
                {processing ? "Deleting..." : "Delete User"}
            </button>
        </form>
        {success && (
            <div className="text-green-600">
                {success}
            </div>
        )}

        {error && (
            <div className="text-red-600">
                {error}
            </div>
        )}
        </>
    );
}
