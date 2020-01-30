import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/core.js',
        output: {
            file: 'build/frij.js',
            format: 'es',
            plugins: [
                terser()
            ]
        }
    },
    {
        input: 'src/frij.elements.js',
        output: {
            file: 'build/frij.elements.js',
            format: 'es',
            plugins: [
                terser()
            ]
        }
    }
];