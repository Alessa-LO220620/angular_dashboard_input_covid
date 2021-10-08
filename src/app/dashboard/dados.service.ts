import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dado } from './models';

@Injectable()
export class  DadosService{
	
	dado = [
		['junho', 0],
		['julho', 0],
		['agosto', 0],
		['setembro', 0]
	]

	constructor() {}

	enviarDados(dado: Dado):void{
		let index = dado.mes[0];
		this.dado[index][1] = dado.casos;
		// this.dado[index][2] = dado.hospitalizados;
		// this.dado[index][3] = dado.leitos;
		// this.dado[index][4] = dado.obitos;

	}
	

	obterDados(): Observable<any> {
		return new Observable(observable => {
			observable.next(this.dado);
			observable.complete();
		})
}
}

