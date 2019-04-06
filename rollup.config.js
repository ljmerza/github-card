import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";
import babel from 'rollup-plugin-babel';

export default {
    input: 'main.js',
    output: {
        file: 'github-card.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        uglify()
    ]
};