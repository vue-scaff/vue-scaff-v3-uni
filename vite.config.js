// Use Config from Vite
import { defineConfig } from 'vite';

// Plugin Vue
import vue from '@vitejs/plugin-vue';

// Plugin Scaff
import scaff from '@scaff/vite-plugin-node';

// Plugin Uni
import uni from '@dcloudio/vite-plugin-uni';

// Set Scaff Conf
const vueScaffConf = {};

/**
 * docs: https://vitejs.dev/config/
 * ========== ========== ==========
 */
export default defineConfig({
  plugins: [/* vue(), */ scaff(vueScaffConf), uni()],

  optimizeDeps: {
    exclude: [`@scaff/vite-plugin-node`, `@scaff/vite`],
  },
});
