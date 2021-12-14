import { useState, useEffect } from 'React';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function widgetsUpdate(name: string, description: string, serviceName: string, params : any) {
	const [cookies, setCookie] = useCookies(['user']);
	const [fetchedData, setData] = useState({ items: [] });

    useEffect(() => {
		console.log(cookies.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/widget/put`, {
					params: {
                        token: cookies.token,
                        name: name,
                        description: description,
                        serviceName: serviceName,
                        params: JSON.stringify(params),
                    }
				});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
}	

function widgetsFetch(serviceName: string) {
	const [cookies, setCookie] = useCookies(['user']);
	const [fetchedData, setData] = useState({ items: [] });

    useEffect(() => {
		console.log(cookies.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/widget/fetchAll`, {
					params: {
                        token: cookies.token,
                        serviceName: serviceName,
                    }
				});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

    const widgets = JSON.parse(fetchedData);
	let widgetList = [];
    for (let widget in widgets) {
        widgetList.push(widget.description);
    }
    return (widgetList);
}

function servicesFetch(serviceName: string) {
	const [cookies, setCookie] = useCookies(['user']);
	const [fetchedData, setData] = useState({ items: [] });

    useEffect(() => {
		console.log(cookies.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/services/fetchAll`, {
					params: {
                        token: cookies.token,
                        serviceName: serviceName,
                    }
				});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

    const services = JSON.parse(fetchedData);
	let serviceList = [];
    for (let service in services) {
        serviceList.push(widgetsFetch(service.name));
    }
    return (serviceList);
}
export default widgetsUpdate;