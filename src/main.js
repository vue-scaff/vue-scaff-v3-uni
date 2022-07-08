// Import Main
import Main from '@/scaff';

// Import Scaff
import Scaff from '@scaff/vite';

/**
 * Issue: https://github.com/vitejs/vite/issues/3033
 * `vite` 版本目前尚属于实验阶段，请勿删除或修改 `main.js` 文件
 * `uni-app` 模式下会默认使用 `createSSRApp` 模式创建应用
 * ========= ========== ==========
 */
export function createApp(app) {
	try {
		app = new Scaff(Main).result.app
	}
	catch(e) {
		console.log(e)
	}

	return { app }
}
