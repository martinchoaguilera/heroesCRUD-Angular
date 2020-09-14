import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {

  heroes : HeroeModel[] = [];

  loading = true;

  constructor( private heroesService : HeroesService,
               private router :Router ) { }

  ngOnInit() {
    let heroe:any;
    this.heroesService.obtenerHeroes().subscribe( resp => {
      this.loading = false;
      this.heroes = resp 
    });
  }

  delete( heroe: HeroeModel , index : number){
    console.log('Hola');

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea eliminar a ${ heroe.nombre } ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: false
    }).then( resp => {
      if(resp.value ){
            this.heroes.splice( index , 1 )
            this.heroesService.deleteHeroe( heroe.id ).subscribe();
      }else return;
    })
  }

}
