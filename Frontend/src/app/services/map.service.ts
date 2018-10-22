import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()
export class MapService {

    constructor(private http:HttpClient) {}


    getFoods() {
    

     return this.http.get('https://hyperledger-power-watson-rest-turbulent-lynx.eu-gb.mybluemix.net/api/User');

    }
}
