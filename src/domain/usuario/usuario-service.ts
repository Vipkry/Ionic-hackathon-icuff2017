import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

class Usuario {
    public auth_token: string;
    public name: string;
    public reg: string;
    public teacher_id: number;
    
}

@Injectable()
export class UsuarioService {
    
    //public dado_id: number;
    private api: string = 'http://localhost:3000';
    
    // auth_token
    private current_user: string = 'randomString';
    
    constructor(private _http: Http) {}
    
    saveUser(data) {
        return new Promise((resolve, reject) => {
            this._http.post(this.api + '/users', {'user': {'reg': data.reg, 'password': data.password, 'name': data.name}})
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    login(data){
        return new Promise((resolve, reject) => {
            this._http.post(this.api + '/login', {'reg': data.reg, 'password': data.password})
            .map(res => res.json())
            .subscribe(res => {
              this.current_user = res.auth_token;
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    getCurrentUser(){
        return this.current_user;
    }
    
    getCurrentUserName(){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.set('Authorization', this.current_user);
            let options = new RequestOptions({ headers: headers });
            this._http.get(this.api + '/users_reg', options)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res.name);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    getTeacherId(){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.set('Authorization', this.current_user);
            let options = new RequestOptions({ headers: headers });
            this._http.get(this.api + '/users_reg', options)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res.teacher_id);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    getUsuario(){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.set('Authorization', this.current_user);
            let options = new RequestOptions({ headers: headers });
            this._http.get(this.api + '/users_reg', options)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res.teacher);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    changePassword(data){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.set('Authorization', this.current_user);
            let options = new RequestOptions({ headers: headers });
            this._http.post(this.api + '/change',
             {'reg': this.current_user, 'password': data.password, 'password_new': data.password_new, 'password_new_confirmation': data.password_new_confirmation},
             options)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    }
    
    logout(){
        this.current_user = 'randomString';
    }
    
}
