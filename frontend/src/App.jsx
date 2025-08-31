import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"

export default function Page() {
  return (
    <main className="min-h-screen bg-bgPrimary">
      <section>
        <Signup />
      </section>
    </main>
  )
}
