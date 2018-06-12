export class Typed {
    element: any
    options: any
    textContent: string
    strPos: number
    cursor: any
    cursorBlinking: boolean
    typingComplete: boolean
    timeout: any

    constructor(element: any, options: any, textContent: string) {
        const defaults: any = {
            typeSpeed: 0,
            startDelay: 0,
            showCursor: true,
            hideCursorOnComplete: false,
            onComplete: () => {}
        }

        this.element = element
        this.options = {...defaults, ...options}
        this.textContent = element.textContent.trim()
        this.strPos = 0
        this.typingComplete = false
        this.textContent = textContent
        this.element.textContent = ''
        this.appendAnimationCss()
    }

    public begin () {
        if (this.typingComplete) {
            return this.restart()
        }

        this.insertCursor()
        
        this.timeout = setTimeout(() => {
            this.typewrite()
        }, this.options.startDelay)
    }

    private typewrite() {
        const humanize = this.humanizer(this.options.typeSpeed)

        this.timeout = setTimeout(() => {
            this.toggleBlinking(false)

            if (this.strPos === this.textContent.length) {
                this.doneTyping()
            } else {
                this.keepTyping()
            }
        }, humanize)
    }

    private keepTyping () {
        if (this.strPos === 0) {
            this.toggleBlinking(false)
        }

        this.strPos += 1
        const nextString = this.textContent.substr(0, this.strPos)
        this.replaceText(nextString)
        this.typewrite()
    }

    private doneTyping () {
        this.toggleBlinking(true)

        if (this.textContent.length === this.strPos) {
            this.complete()
        }
    }

    private complete () {
        if (this.options.hideCursorOnComplete) {
            this.removeCursor()
        }
        this.typingComplete = true
        this.options.onComplete()
    }

    private restart () {
        if (!this.typingComplete) {
            return
        }

        clearTimeout(this.timeout)
        this.replaceText('')

        this.removeCursor()

        this.strPos = 0
        this.typingComplete = false
        this.begin()

    }
    
    private insertCursor () {
        if (this.cursor) {
            return
        }

        this.cursor = document.createElement('span')
        this.cursor.className = 'typed-cursor'
        this.cursor.innerHTML = '|'

        this.element.parentNode && this.element.parentNode.insertBefore(this.cursor, this.element.nextSibling)
    }

    private removeCursor () {
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor)
            this.cursor = null
        }
    }

    private replaceText (str: string) {
        this.element.textContent = str
    }

    private humanizer (speed: number) {
        return Math.round(Math.random() * speed / 2) + speed
    }

    private toggleBlinking (isBlinking: boolean) {
        if (!this.cursor) {
            return
        }

        if (this.cursorBlinking === isBlinking) {
            return
        }

        this.cursorBlinking = isBlinking
        const status = isBlinking ? 'infinite' : 0
        this.cursor.style.animationIterationCount = status
    }

    private appendAnimationCss () {
        if (this.options.showCursor) {
            if (document.head.querySelector('#typing')) {
                return
            }

            let css = document.createElement('style')
            css.type = 'text/css'
            css.id = 'typing'

            const innerCss = `
                .typed-cursor{
                    opacity: 1;
                    animation: typedjsBlink 0.7s infinite;
                    -webkit-animation: typedjsBlink 0.7s infinite;
                    animation: typedjsBlink 0.7s infinite;
                }
                @keyframes typedjsBlink{
                    50% { opacity: 0.0; }
                }
                @-webkit-keyframes typedjsBlink{
                    0% { opacity: 1; }
                    50% { opacity: 0.0; }
                    100% { opacity: 1; }
                }
            `

            css.innerHTML = innerCss
            document.head.appendChild(css)
        }
    }
}