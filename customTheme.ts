
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "12px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #403E3D 
		"--color-primary-50": "226 226 226", // #e2e2e2
		"--color-primary-100": "217 216 216", // #d9d8d8
		"--color-primary-200": "207 207 207", // #cfcfcf
		"--color-primary-300": "179 178 177", // #b3b2b1
		"--color-primary-400": "121 120 119", // #797877
		"--color-primary-500": "64 62 61", // #403E3D
		"--color-primary-600": "58 56 55", // #3a3837
		"--color-primary-700": "48 47 46", // #302f2e
		"--color-primary-800": "38 37 37", // #262525
		"--color-primary-900": "31 30 30", // #1f1e1e
		// secondary | #74716F 
		"--color-secondary-50": "234 234 233", // #eaeae9
		"--color-secondary-100": "227 227 226", // #e3e3e2
		"--color-secondary-200": "220 220 219", // #dcdcdb
		"--color-secondary-300": "199 198 197", // #c7c6c5
		"--color-secondary-400": "158 156 154", // #9e9c9a
		"--color-secondary-500": "116 113 111", // #74716F
		"--color-secondary-600": "104 102 100", // #686664
		"--color-secondary-700": "87 85 83", // #575553
		"--color-secondary-800": "70 68 67", // #464443
		"--color-secondary-900": "57 55 54", // #393736
		// tertiary | #0368A0 
		"--color-tertiary-50": "217 232 241", // #d9e8f1
		"--color-tertiary-100": "205 225 236", // #cde1ec
		"--color-tertiary-200": "192 217 231", // #c0d9e7
		"--color-tertiary-300": "154 195 217", // #9ac3d9
		"--color-tertiary-400": "79 149 189", // #4f95bd
		"--color-tertiary-500": "3 104 160", // #0368A0
		"--color-tertiary-600": "3 94 144", // #035e90
		"--color-tertiary-700": "2 78 120", // #024e78
		"--color-tertiary-800": "2 62 96", // #023e60
		"--color-tertiary-900": "1 51 78", // #01334e
		// success | #077F2E 
		"--color-success-50": "218 236 224", // #daece0
		"--color-success-100": "205 229 213", // #cde5d5
		"--color-success-200": "193 223 203", // #c1dfcb
		"--color-success-300": "156 204 171", // #9cccab
		"--color-success-400": "81 165 109", // #51a56d
		"--color-success-500": "7 127 46", // #077F2E
		"--color-success-600": "6 114 41", // #067229
		"--color-success-700": "5 95 35", // #055f23
		"--color-success-800": "4 76 28", // #044c1c
		"--color-success-900": "3 62 23", // #033e17
		// warning | #B54D09 
		"--color-warning-50": "244 228 218", // #f4e4da
		"--color-warning-100": "240 219 206", // #f0dbce
		"--color-warning-200": "237 211 194", // #edd3c2
		"--color-warning-300": "225 184 157", // #e1b89d
		"--color-warning-400": "203 130 83", // #cb8253
		"--color-warning-500": "181 77 9", // #B54D09
		"--color-warning-600": "163 69 8", // #a34508
		"--color-warning-700": "136 58 7", // #883a07
		"--color-warning-800": "109 46 5", // #6d2e05
		"--color-warning-900": "89 38 4", // #592604
		// error | #B51D1D 
		"--color-error-50": "244 221 221", // #f4dddd
		"--color-error-100": "240 210 210", // #f0d2d2
		"--color-error-200": "237 199 199", // #edc7c7
		"--color-error-300": "225 165 165", // #e1a5a5
		"--color-error-400": "203 97 97", // #cb6161
		"--color-error-500": "181 29 29", // #B51D1D
		"--color-error-600": "163 26 26", // #a31a1a
		"--color-error-700": "136 22 22", // #881616
		"--color-error-800": "109 17 17", // #6d1111
		"--color-error-900": "89 14 14", // #590e0e
		// surface | #252424 
		"--color-surface-50": "222 222 222", // #dedede
		"--color-surface-100": "211 211 211", // #d3d3d3
		"--color-surface-200": "201 200 200", // #c9c8c8
		"--color-surface-300": "168 167 167", // #a8a7a7
		"--color-surface-400": "102 102 102", // #666666
		"--color-surface-500": "37 36 36", // #252424
		"--color-surface-600": "33 32 32", // #212020
		"--color-surface-700": "28 27 27", // #1c1b1b
		"--color-surface-800": "22 22 22", // #161616
		"--color-surface-900": "18 18 18", // #121212
		
	}
}