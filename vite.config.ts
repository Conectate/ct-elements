import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default (opts: any) => {
	let development = process.env.NODE_ENV != 'production';
	return defineConfig({
		server: {
			port: 3000,
			host: '0.0.0.0'
		},
		define: {
			'process.env.NODE_ENV': JSON.stringify(development ? 'development' : 'production')
		}
	});
};
