import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
  </div>
  <div>
    <h1>Urbina Gutiérrez Angel</h1>
    <p>Programación con framework frontend</p>
    <h1>Mi primer proyecto en Vite y TypeScript</h1>
  </div>
</section>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
