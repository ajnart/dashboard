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

export const widgetsFetch = async (token :any, serviceName: string) => {
	let fetchedData : any[] | any = [];
	let widgetList = [];

		try {	
			const res = await axios.get(`http://localhost:8080/widget/fetchAll?token=`+ token.token + "&serviceName=" + serviceName, {
			})
			fetchedData = res.data;
			if (fetchedData.message) {
				return [];
			}
			for (let widget of fetchedData) {
				widgetList.push(widget);
			}
			return (widgetList);
		} catch (err) {
			console.log(err);
		}
}

export default async function servicesFetch(token : any)
{
	let fetchedData = [];
	let serviceList = [];

	try {
		const res = await axios.get(`http://localhost:8080/service/fetchAll?token=` + token.token, {
		})
		fetchedData = res.data;
		for (let service of fetchedData) {
			const wait = await widgetsFetch(token, service.name);
			serviceList.push(wait);
		}
		console.log("aré plein", serviceList);
		return (serviceList);
	} catch (err) {
		console.log(err);
	}

}
