module.exports = {
  install: {
    description: 'Install dependencies',
    glob: '(package.json|yarn.lock)',
    commands: ['yarn'],
  },
  build: {
    description: 'Build app',
    glob: '(src|...)/**/*.*',
    commands: ['yarn build'],
  },
}
