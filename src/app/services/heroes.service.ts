import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loggin-app-7ef10.firebaseio.com';

  constructor( private http : HttpClient ) { }

  obtenerHeroePorId( id: string  ){
    return this.http.get(`${ this.url }/heroes/${id}.json`)
  }
  obtenerHeroes( ){
    return this.http.get(`${ this.url }/heroes.json`)
                        .pipe(
                          map( resp => this.crearArreglo( resp ) )
                        )
  }

  private crearArreglo( heroesObj : Object ){
    
    const heroes : HeroeModel[]=[];

    if( heroesObj === null )return [];

    Object.keys( heroesObj ).forEach( key => {
      const heroe : HeroeModel = heroesObj[ key ];
      heroe.id= key;
      heroes.push( heroe );
    })

    return heroes;


  }

  crearHeroe( heroe :HeroeModel ) {
    return this.http.post( `${ this.url }/heroes.json`, heroe )
      .pipe( 
        map( resp => {
          heroe.id = resp['name'];
          return heroe;
        })
       );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;
  
    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemp );

  }

  deleteHeroe( id: string ) {
    return this.http.delete( `${ this.url }/heroes/${ id }.json` );
  }
}

