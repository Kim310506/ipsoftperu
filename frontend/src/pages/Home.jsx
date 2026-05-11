import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsappButton from '../components/layout/WhatsappButton'
import ContactForm from '../components/forms/ContactForm'
import Card from '../components/cards/Card'

import { cards } from '../data/cardsData'

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex flex-col justify-center items-center py-8 px-4">
        <div className="text-center mb-6">
          <h1 className="text-blue-700 text-6xl md:text-7xl font-black">
            iCURA
          </h1>

          <h2 className="text-blue-700 text-lg md:text-xl font-bold">
            Sistema de Gestión de Seguridad Integral
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[1200px] w-full">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </main>

      <ContactForm />

      <Footer />

      <WhatsappButton />
    </div>
  )
}