import { CleaningSite } from '@/components/cleaning-site'
import { DemoLocked } from '@/components/DemoLocked'

// Website reativado (19/11/2026). Mudar para true para mostrar a página "Website inativo".
const DEMO_LOCKED = false

export default function Page() {
  if (DEMO_LOCKED) return <DemoLocked business="Angela's Nettoyage" />
  return <CleaningSite />
}
