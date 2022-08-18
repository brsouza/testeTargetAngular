import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  async buscaTodosUsuarios() {
    return new Promise(async (resolve, reject) => {

      await this.httpClient.get(environment.API_PATH.apiUsuario)
        .toPromise()
        .then((response: Usuario[]) => {
          console.log(response);
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        });

    });
  }

  async addUsuario(usuario: Usuario) {
    return new Promise(async (resolve, reject) => {

      this.httpClient.post(environment.API_PATH.apiUsuario, usuario)
        .toPromise()
        .then(async (response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        });

    });
  }

  async atualizarUsuario(usuario: Usuario) {
    return new Promise(async (resolve, reject) => {

      this.httpClient.put(environment.API_PATH.apiUsuario, usuario)
        .toPromise()
        .then(async (response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        });


    });
  }

  async deletarUsuario(idUsuarioAdeletar: number) {
    return new Promise(async (resolve, reject) => {

      this.httpClient.delete(environment.API_PATH.apiUsuario, { params: { idUsuarioAdeletar: idUsuarioAdeletar.toString() } })
        .toPromise()
        .then(async (response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        });

    });
  }
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;

}
