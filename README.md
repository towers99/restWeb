# Inicio De Proyecto Utilizando Express

# Comandos De instalacion 
1. mkdir mi-proyecto
2. cd mi-proyecto
3. npm init -y 
4. npm i -D typescript @types/node tsx rimraf
5. mkdir src
6. npx tsc --init --rootDir src --outDir dist```

# Agrega Scripts .json
1. "dev": "tsnd --respawn --clear src/app.ts",
2. "build": "rimraf ./dist && tsc",
3. "start": "npm run build && node dist/app.js"
4. Cambia el Commonjs por Module en types

# Agrega A ts.config
1. "exclude": ["node_modules","dist" ],
2. "include": ["src"],
3. Agrega "node" a type
