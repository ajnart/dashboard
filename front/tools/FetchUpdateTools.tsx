import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function widgetsUpdate(name: string, description: string, serviceName: string, params : any) {
	const [cookies, setCookie] = useCookies(['user']);
	const [fetchedData, setData] = useState();

    useEffect(() => {
		console.log(cookies.user.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/widget/put`, {
					params: {
                        token: cookies.user.token,
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
	const [fetchedData, setData] = useState([]);

    useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/widget/fetchAll`, {
					params: {
                        token: cookies.user.token,
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

	let widgetList : Array<string> = [];
    for (let widget of fetchedData) {
        widgetList.push(widget.description);
    }
    return (widgetList);
}

function servicesFetch(serviceName: string) {
	const [cookies, setCookie] = useCookies(['user']);
	const [fetchedData, setData] = useState([]);

    useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.put(`https://localhost:8080/services/fetchAll`, {
					params: {
                        token: cookies.user.token,
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

	let serviceList = [];
    for (let service of fetchedData) {
        serviceList.push(widgetsFetch(service.name));
    }
    return (serviceList);
}

module.exports = {
	widgetsUpdate,
	widgetsFetch,
	servicesFetch
};