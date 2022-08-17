/** @type {import('ts-jest').InitialOptionsTsJest} */
import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    transform: {
        '^.+\\.(js|esm)$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^.+\\.scss$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!(@googlemaps|maath)/)"],
    testEnvironment: 'jsdom',
    testRegex: '\\.test\\.tsx?$',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.d.ts', '<rootDir>/src/setupTests.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', '.esm', 'json', 'node','svg'],
    rootDir: '.',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            diagnostics: true,
            isolatedModules: true,
        },
    },
};

export default config;