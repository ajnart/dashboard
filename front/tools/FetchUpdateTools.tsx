import axios from "axios";

export const widgetsUpdate= async (token :string, name: string, description: string, serviceName: string, params : any) => {

	const res = await axios.put(`https://localhost:8080/widget/edit`, {
			params: {
    	        token: token,
    	        name: name,
    	        description: description,
    	        serviceName: serviceName,
    	        params: JSON.stringify(params),
    	    }
	});
}

export const widgetsDelete = async (token :string, name: string) => {

	const res = await axios.delete(`https://localhost:8080/widget/delete`, {
			params: {
    	        token: token,
    	        name: name
    	    }
	});
}

export const widgetsFetch = async (token :string, serviceName: string) => {
	let fetchedData = [];

	try {
		const res = await axios.get(`https://localhost:8080/widget/fetchAll`, {
			params: {
                token: token,
                serviceName: serviceName,
            }
		});
		fetchedData = (res.data);
	} catch (err) {
		console.log(err);
	}

	let widgetList : Array<string> = [];
    for (let widget of fetchedData) {
        widgetList.push(widget.description);
    }
    return (widgetList);
}

export const servicesFetch = async (token :string) => {
	let fetchedData = [];

	try {
		const res = await axios.get(`https://localhost:8080/services/fetchAll`, {
			params: {
                token: token,
            }
		});
		fetchedData = res.data;
	} catch (err) {
		console.log(err);
	}

	let serviceList = [];
    for (let service of fetchedData) {
        serviceList.push(widgetsFetch(token, service.name));
    }
    return (serviceList);
}
