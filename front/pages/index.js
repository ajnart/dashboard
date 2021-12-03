import ServicePannel from '../components/ServicePannel'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function Home() {

  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(['name']);
  console.log(process.env.GOOGLE_ID)
  useEffect(() => {
    if (!cookies["user"] /* check cookie expiration */) {
      toast({
        title: "Please log in",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      router.push("/login");
    }
  }, []);

  return !cookies["user"] ? <div></div> : (
    <div>
      <ServicePannel service={service} setService={setService} />
    </div>
  )
}
