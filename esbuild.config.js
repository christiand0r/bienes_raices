import path from "path";
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: [
      "./src/js/app.js",
      "./src/js/addImages.js",
      "./src/js/homeMap.js",
      "./src/js/map.js",
      "./src/js/showLocation.js",
    ],
    bundle: true,
    minify: false,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("Failed to build:", error);
        else console.log("Build succeeded:", result);
      },
    },
    outdir: path.resolve("public/js/"),
    color: true,
  })
  .catch(() => {
    console.log("Something failed when try compiled");
    process.exit(1);
  });
