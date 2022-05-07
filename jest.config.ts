/** @type {import('ts-jest').InitialOptionsTsJest} */

module.exports = {
    transformIgnorePatterns: ["/node_modules/?!(@googlemaps/typescript-guards)"],
    globals: { 
        'ts-jest': { 
            tsConfig: 'tsconfig.json',
            diagnostics: true,
            isolatedModules: true,
            tsconfigRootDir: '.',
        }
    }
}