
export default {
  env: {
    node: true, // Asegúrate de que Node.js está habilitado
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module', 
  },
  
};
