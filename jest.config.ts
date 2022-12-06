/** @type {import('ts-jest').InitialOptionsTsJest} */
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  automock: false,
  moduleNameMapper: {
    '^.+\\.(css | scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@googlemaps|maath|testing-library)/)'],
  testRegex: '(./src/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['./custom.d.ts', './src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      isolatedModules: true
    }
  }
}

export default config
