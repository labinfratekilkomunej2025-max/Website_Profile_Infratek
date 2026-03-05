import { router } from "@inertiajs/react";
import ManageLayout from "@/Layouts/ManagementLayout";

type MenuItem = {
  title: string;
  description: string;
  color: string;
  routeName: string;
  icon: React.ReactNode;
};

export default function ManagementMenuPage() {
  const menus: MenuItem[] = [
    {
      title: "Members",
      description: "Kelola member yang ada",
      routeName: "members.manage",
      color: "bg-red-600 hover:bg-red-700",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-8 0v2m8 0H9m4-8a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      ),
    },
    {
      title: "Periods",
      description: "Kelola periode yang ada",
      routeName: "periods.manage",
      color: "bg-emerald-600 hover:bg-emerald-700",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Divisions",
      description: "Kelola divisi yang ada",
      routeName: "divisions.manage",
      color: "bg-blue-500 hover:bg-blue-600",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
    },
    {
      title: "Positions",
      description: "Kelola posisi yang ada",
      routeName: "positions.manage",
      color: "bg-rose-600 hover:bg-rose-700",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4zM19 12h2M3 12h2" />
        </svg>
      ),
    },
  ];

  return (
    <ManageLayout>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-10">
          Management Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {menus.map((menu) => (
            <button
              key={menu.title}
              onClick={() => router.get(route(menu.routeName))}
              className={`
                ${menu.color}
                text-white
                p-8
                rounded-3xl
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
                flex
                flex-col
                items-start
                gap-4
              `}
            >
              <div className="bg-white/20 p-4 rounded-2xl">
                {menu.icon}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {menu.title}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  {menu.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ManageLayout>
  );
}