import { Directive, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core'
import { Typed } from './typed'

@Directive({
    selector: '[typingAnimation]'
})
export class TypingAnimationDirective implements OnInit {
    typed: Typed
    @Input('typeSpeed') typeSpeed: number = 0
    @Input('startDelay') startDelay: number = 0
    @Output('complete') complete: EventEmitter<null> = new EventEmitter()

    constructor (private elRef: ElementRef) {}

    ngOnInit () {
        this.typed = new Typed(this.elRef.nativeElement, {
            typeSpeed: this.typeSpeed,
            startDelay: this.startDelay,
            onComplete: () => this.complete.emit(null)
        })

        this.typed.begin()
    }
}