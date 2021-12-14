import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

async function widgetsUpdate(token :string, name: string, description: string, serviceName: string, params : any) {

	const res = await axios.put(`https://localhost:8080/widget/put`, {
			params: {
    	        token: token,
    	        name: name,
    	        description: description,
    	        serviceName: serviceName,
    	        params: JSON.stringify(params),
    	    }
	});
}

async function widgetsFetch(token :string, serviceName: string) {
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

async function servicesFetch(token :string) {
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
	console.log(serviceList);
    return (serviceList);
}

module.exports = {
	widgetsUpdate,
	widgetsFetch,
	servicesFetch
};