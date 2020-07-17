import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpOptionsBuilder {
	constructor() {}

	getHeader(config?: { [name: string]: string | string[] }): HttpHeaders {
		const dconfig = { 'Content-Type': 'application/json' };
		const mconfig = Object.assign(dconfig, config);
		return new HttpHeaders(mconfig);
	}
}
