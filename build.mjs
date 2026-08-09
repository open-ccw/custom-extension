import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./extensions/**/*.js'],
  bundle: true,
  outdir: 'dist',
  loader:{
    '.svg':'base64',
    '.png':'base64'
  }
})