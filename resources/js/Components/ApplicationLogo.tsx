import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="flex relative rounded-lg shadow-xl overflow-hidden w-10 h-10 sm:w-12 sm:h-12">
            {/* KONVERSI: Next/Image dihapus, diganti tag img standar */}
            <img
                src="/assets/images/logo/infratek.jpg"
                alt="Logo INFRATEK"
                width={48}
                height={48}
                className="object-cover w-full h-full"
            />
        </div>
    );
}
