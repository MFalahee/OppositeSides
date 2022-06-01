/** @type {import('ts-jest').InitialOptionsTsJest} */

module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: ["/node_modules/?!(@googlemaps/typescript-guards)"],
    testEnvironment: "node",
    moduleFileExtensions: ["js", "tsx", "ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest",
    },
    globals: { 
        'ts-jest': { 
            tsConfig: 'tsconfig.json',
            diagnostics: true,
            isolatedModules: true,
            tsconfigRootDir: '.',
        }
    }
};