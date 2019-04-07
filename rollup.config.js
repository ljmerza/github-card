import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";
import babel from 'rollup-plugin-babel';

export default {
    input: ['src/index.js', 'src/index-editor.js'],
    output: {
        folder: 'dist',
        format: 'umd'
    },
    plugins: [
        // resolve(),
        babel(),
        // uglify()
    ]
};