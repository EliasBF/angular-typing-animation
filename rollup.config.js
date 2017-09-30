export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/angular-typing-animation.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.angular-typing-animation',
    globals: {
      '@angular/core': 'ng.core'
    }
}