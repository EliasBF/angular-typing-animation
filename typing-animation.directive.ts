import {
    Directive, OnInit, OnChanges,
    ElementRef, Input, Output,
    EventEmitter, SimpleChanges
} from '@angular/core'
import { Typed } from './typed'

@Directive({
    selector: '[typingAnimation]'
})
export class TypingAnimationDirective implements OnInit, OnChanges {
    typed: Typed
    @Input('typeSpeed') typeSpeed: number = 0
    @Input('startDelay') startDelay: number = 0
    @Input('condition') condition: boolean = true
    @Input('hideCursorOnComplete') hideCursorOnComplete: boolean = false
    @Output('complete') complete: EventEmitter<null> = new EventEmitter()
    typingLock: boolean = false

    constructor (private elRef: ElementRef) {}

    ngOnInit () {
        this.typed = new Typed(this.elRef.nativeElement, {
            typeSpeed: this.typeSpeed,
            startDelay: this.startDelay,
            condition: this.condition,
            hideCursorOnLast: this.hideCursorOnComplete,
            onComplete: () => {
                this.complete.emit(null)
                this.typingLock = false
            }
        })

        if (this.condition) {
            this.typed.begin()
            this.typingLock = true
        }
    }

    ngOnChanges (changes: SimpleChanges) {
        if ('condition' in changes) {
            if (this.typingLock) {
                return
            }

            if (this.condition) {
                this.typed.begin()
                this.typingLock = true
            }
        }
    }
}