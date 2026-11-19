import { CleaningSite } from '@/components/cleaning-site'
import { DemoLocked } from '@/components/DemoLocked'

// Website desativado (19/11/2026). Mudar para false para voltar a mostrar o site.
const DEMO_LOCKED = true

export default function Page() {
  if (DEMO_LOCKED) return <DemoLocked business="Angela's Nettoyage" />
  return <CleaningSite />
}
