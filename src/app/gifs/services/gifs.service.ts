import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, SearchGifsResponse } from '../intefaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private _respuesta: Data[] = [];
  private apiKey : string = '9sLjPWsa7nMTtLxzoHBJLFrQVPdwu2t2';
  private urlService : string = 'https://api.giphy.com/v1/gifs';
  
  constructor(private http : HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._respuesta = JSON.parse(localStorage.getItem('busquedaGift')!) ||[];
  }

  get respuesta(){
    return this._respuesta;
  }

  get historial(){
    this._historial = this._historial.slice(0,10);
    return [...this._historial];
  }

  buscarGift(query : string){

    const params = new HttpParams()
    .append("api_key",this.apiKey)
    .append("q",query)
    .append("limit","10");

    query = query.trim().toLocaleLowerCase();
    if(! this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`,{params: params})
    .subscribe((resp)=>{
      console.log(resp.data);
      this._respuesta = resp.data;
      localStorage.setItem("busquedaGift",JSON.stringify(resp.data));
    });



    console.log(this._historial);
  }
}
