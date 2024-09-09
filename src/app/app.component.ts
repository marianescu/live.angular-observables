import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, combineLatest, interval, map, Observable, of, share, shareReplay, startWith, subscribeOn, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  anNastere;
  ceva;
  lma(varsta:number){
    return new Observable<string>(subscriber=>{
      setInterval(()=>{
        subscriber.next(`La multi ani pentru varsta de ${varsta}!`)
      }, 1000)
    })
  }

  constructor(){

    const z=new BehaviorSubject<number>(1)

    z.next(z.value+2)
    
    this.anNastere=new Observable<number>((subscriber)=>{
      let id=setInterval(()=>{
        console.log("Au mai trecut 3 secunde")
        subscriber.next(1997)
      },3000)
      console.log("ceva",id)
      return ()=>{
        clearInterval(id)
      }
    }).pipe(
      map((v:number)=>{
        return 2024-v
      }),
      // switchMap((v:number)=>{
      //   return this.lma(v)
      // })
    )

    // setTimeout(()=>{
    //   this.anNastere.subscribe(date=>{
    //     console.log("2")
    //     console.log(date)
    //   })
    // },2000)
    const x=this.anNastere.subscribe(date=>{
      console.log("1")
      console.log(date)
    })
    x.unsubscribe()

    interval(1000).subscribe(v=>{
      console.log("-",v)
    })
    const a= interval(3000)
    const b= interval(5000)

    this.ceva=combineLatest([a,b]).pipe(
      map(([x,y])=>x+y),
    )

    

  }
  
}
