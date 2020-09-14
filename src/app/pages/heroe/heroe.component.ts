import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService : HeroesService,
               private router        : ActivatedRoute ) { 
  }

  ngOnInit(){

    const id = this.router.snapshot.paramMap.get('id');
    
    if( id !== 'nuevo' ){
      this.heroesService.obtenerHeroePorId( id ).subscribe( (resp : HeroeModel) =>{
        
        this.heroe = resp;
        this.heroe.id = id;

      })
    }
  
  }


  save( f : NgModel ){

    if( f.invalid ) {

      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere..',
      text: 'Guardando la información..',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ){

      peticion = this.heroesService.actualizarHeroe( this.heroe );
      
    }else{

      peticion =  this.heroesService.crearHeroe( this.heroe );

    }
    
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre ,
        text: 'Se guardo la información correctamente',
        icon: 'success',
      });
    })


  }

}
