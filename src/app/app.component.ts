import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Usuario, UsuarioService } from './services/usuario/usuario.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isEditandoUsuario: boolean = false;
  displayedColumns: String[] = ['id', 'nome', 'email', 'actions'];
  dataSource;
  usuarioForm: FormGroup;

  mensagemValidacaoUsuario = {
    id: [],
    nome: [
      { tipo: 'required', mensagem: 'Nome é obrigatório!' },

    ],
    email: [
      { tipo: 'required', mensagem: 'Email é obrigatório!' },
      { tipo: 'email', menssagem: 'Informe um email válido.' }
    ],

  };

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.buscaTodosUsuarios().then((usuarios: Usuario[]) => {
      this.dataSource = new MatTableDataSource(usuarios);
    }).catch((error) => { console.log(error) })
  }

  // clickedRows = new Set<PeriodicElement>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {
    this.isEditandoUsuario = true;

    this.usuarioForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))

    });
  }

  atualizaUsuario(usuario: Usuario) {
    this.isEditandoUsuario = true;

    this.usuarioForm = new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(usuario.email, Validators.compose([
        Validators.required,
        Validators.email
      ]))

    });
  }

  onSubmitUsuario(usuario: Usuario) {
    if (usuario.id > 0) {
      this.usuarioService.atualizarUsuario(usuario).then((result) => {
        console.log(result);
        this.isEditandoUsuario=false;
        this.ngOnInit();
      }).catch((error) => { console.log(error) })
    }
    else {
      this.usuarioService.addUsuario(usuario).then((result) => {
        console.log(result);
        this.isEditandoUsuario=false;
        this.ngOnInit();
      }).catch((error) => { console.log(error) })
    }
  }

  cancelar() {
    this.isEditandoUsuario = false;
  }

  deletarUsuario(idUsuarioAdeletar) {
    this.usuarioService.deletarUsuario(idUsuarioAdeletar).then((result) => {
      console.log(result);
      this.ngOnInit();
    }).catch((error) => { console.log(error) })
  }
}
