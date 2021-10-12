import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaPostagens: Postagem []
  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTemas: number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router, 
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTemas(){
    this.temaService.getByIdTema(this.idTemas).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.postagemService.getByIdUser(this.idUser).subscribe((resp: User) =>{
      this.user = resp
    })
  }

  publicar(){
    this.tema.idTema = this.idTemas
    this.postagem.temaRelacionado = this.tema

    this.user.idUsuario = this.idUser
    this.postagem.criador = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem criada com sucesso!')
      this.postagem = new Postagem
      this.getAllPostagens()
    })
  }

}
