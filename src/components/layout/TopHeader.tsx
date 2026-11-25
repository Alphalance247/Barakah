import Link from "next/link";

interface TopHeaderProps {
  title: string;
}

export function TopHeader({ title }: TopHeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(15,30,27,0.03)]">
      <div className="h-16 px-4 max-w-120 mx-auto flex items-center justify-between">
        <Link href="/feed" className="flex items-center gap-2">
          <img
            alt="Barakah App Logo"
            className="h-8 w-8 rounded-lg object-contain"
            src="/images/barakah-logo.png"
          />
          <span className="text-lg leading-6 text-primary-dark font-bold tracking-tight">
            Barakah
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xs leading-4 font-medium text-on-surface-variant">
            {title}
          </h1>
          <Link
            className="flex items-center justify-center p-0.5 rounded-full hover:opacity-90 transition-opacity"
            href="/profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
