import { Pizza, Sandwich } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg-muted text-foreground flex h-full flex-col justify-between border-r p-10">
        <div className="text-foreground flex items-center gap-3 text-lg">
          <Sandwich className="h-5 w-5" />
          <span className="font-semibold">Brasa y Massa</span>
          <Pizza className="h-5 w-5" />
        </div>
        <footer className="text-sm">
          Paine do parceiro &copy; Brasa y Massa - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
