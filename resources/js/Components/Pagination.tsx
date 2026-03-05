import { router } from "@inertiajs/react";
import { PaginationData } from "@/SharedType";

type PaginationProps = {
  payload: PaginationData;
  only: string[]; // inertia partial reload key
  back_route_name: string | null;
};

export default function Pagination({ payload, only, back_route_name }: PaginationProps) {
  const currentPage = payload.current_page;
  const lastPage = payload.last_page;
  const MAX_VISIBLE = 4;

  let start = Math.max(currentPage - 1, 1);
  let end = start + MAX_VISIBLE - 1;

  if (end > lastPage) {
    end = lastPage;
    start = Math.max(end - MAX_VISIBLE + 1, 1);
  }

  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  const visit = (url: string | null) => {
    if (!url) return;

    router.get(url, {}, {
      preserveState: true,
      preserveScroll: true,
      only: only,
    });
  };

  return (
    <div className="flex flex-col mt-10 gap-6">

    {/* TOP AREA */}
    <div className="relative flex items-center justify-center">

        {/* GO BACK - FIX LEFT */}
        {back_route_name!=null && (<button
        onClick={() => router.get(route(back_route_name))}
        className="
            absolute left-0
            group
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            border
            bg-white
            text-slate-600
            hover:bg-blue-50
            hover:text-blue-600
            hover:border-blue-300
            transition-all
            duration-300
            shadow-sm
        "
        >
        <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>

        <span className="font-semibold text-sm tracking-wide">
            Go Back
        </span>
        </button>)}

        {/* PAGINATION CENTERED PERFECTLY */}
        <div className="flex items-center gap-2">
        <button
            onClick={() => visit(payload.first_page_url)}
            disabled={currentPage === 1}
            className="px-4 h-10 rounded-xl bg-white border shadow-sm disabled:opacity-40 hover:bg-slate-50"
        >
            First
        </button>

        <button
            onClick={() => visit(payload.prev_page_url)}
            disabled={!payload.prev_page_url}
            className="w-10 h-10 rounded-xl bg-white border shadow-sm disabled:opacity-40 hover:bg-slate-50"
        >
            ‹
        </button>

        {visiblePages.map(page => (
            <button
            key={page}
            onClick={() => visit(`${payload.path}?page=${page}`)}
            className={`w-10 h-10 rounded-xl font-bold transition-all
                ${page === currentPage
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white border text-gray-500 hover:text-blue-600 hover:border-blue-300"
                }`}
            >
            {page}
            </button>
        ))}

        <button
            onClick={() => visit(payload.next_page_url)}
            disabled={!payload.next_page_url}
            className="w-10 h-10 rounded-xl bg-white border shadow-sm disabled:opacity-40 hover:bg-slate-50"
        >
            ›
        </button>

        <button
            onClick={() => visit(payload.last_page_url)}
            disabled={currentPage === lastPage}
            className="px-4 h-10 rounded-xl bg-white border shadow-sm disabled:opacity-40 hover:bg-slate-50"
        >
            Last
        </button>
        </div>
    </div>

    {/* PAGE INFO */}
    <span className="text-xs font-bold text-gray-400 uppercase text-center">
        Page {currentPage} of {lastPage}
    </span>

    </div>
  );
}