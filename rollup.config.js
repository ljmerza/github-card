import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'main.js',
    output: {
        file: 'github-card.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        terser()
    ]
};