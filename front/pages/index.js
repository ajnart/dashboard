import ServicePannel from '../components/ServicePannel'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function Home() {
  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(['name']);

  useEffect(() => {
    console.log(service)
      console.log("cookie:" + cookies.name)
  }, [service]);

  return (
    <div>
      <ServicePannel service={service} setService={setService} />
    </div>
  )
}
