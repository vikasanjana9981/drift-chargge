/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
    serverBuildPath: "build/server/index.js",  // <-- Forces server output to this folder
    serverModuleFormat: "esm",
  };
  