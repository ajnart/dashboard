import ServicePannel from '../components/ServicePannel'
import { useState, useEffect } from 'react'

export default function Home() {
  const [service, setService] = useState("");

  useEffect(() => {
    console.log(service)
  }, [service]);

  return (
    <div>
      <ServicePannel service={service} setService={setService} />
      <h1>service: {service}</h1>
    </div>
  )
}
