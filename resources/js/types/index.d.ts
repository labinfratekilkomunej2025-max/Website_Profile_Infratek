import Navbar from "@/Components/Navbar";

export interface User {
    id: number;
    name: string;
    is_active: boolean;
    is_admin: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface FlashProps {
    success?: string;
    error?: string;
    message?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: FlashProps;
};
type NavbarProps = {
  CurrentPath: string
}
