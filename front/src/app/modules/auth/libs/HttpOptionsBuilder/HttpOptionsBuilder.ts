import { HttpHeaders } from '@angular/common/http';

export class HttpOptionsBuilder {

    constructor() {}

    getHeader(config?: { [name: string]: string | string[]; }) : HttpHeaders {
        let dconfig = {'Content-Type': 'application/json'};
        let mconfig = Object.assign(dconfig, config);
        return new HttpHeaders(mconfig);
    }
};