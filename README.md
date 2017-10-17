# Angular 4 Typing Animation Directive

# Usage

- Install node_module `angular-typing-animation`

```
$ npm install angular-typing-animation --save
```

- Import TypingAnimationDirective to your AppModule

``` js
import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'

import { AppComponent } from './app.component';
import { TypingAnimationDirective } from 'angular-typing-animation'

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
        TypingAnimationDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

- Use it in your template

``` html
<span typingAnimation [typeSpeed]="20" [startDelay]="2000" (complete)="onComplete()">
</span>
```

For a full example, please check out this plunker [example](https://embed.plnkr.co/CefhwrE7yFLAciY7ZsPU/)

# Documentation

#### Properties

``` js
/**
 * @property {number} typeSpeed, type speed in milliseconds
 */
typeSpeed: 0,

/**
 * @property {number} startDelay, time before typing starts in milliseconds
 */
startDelay: 0,

/**
 * @property {boolean} condition, required condition for typing begin
 */
condition: true,

/**
 * @property {boolean} hideCursorOnComplete, hide cursor on typing complete
 */
hideCursorOnComplete: false,

/**
 * All typing is complete
 * @event TypingAnimation#complete
 */
complete: () => {},
```

# Remarks

This is an fork from the javascript library [Typed.js](http://www.mattboldt.com/demos/typed-js/) created for [www.mattboldt.com](http://www.mattboldt.com/)