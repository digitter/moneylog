require('@babel/register'); // 以下のファイルでES6を使えるようにする

module.exports = function(env) {
  return require(`./${env}`)
}
