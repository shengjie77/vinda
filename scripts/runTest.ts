import { spawn, ChildProcess } from 'child_process';
import * as Path from 'path'

import * as Bundler from 'parcel-bundler';

const config = require('../package.json')['vinda'];

main();

function main() {
	const entryFile = Path.join(__dirname, '..', 'src', 'test', 'testbed.html')
	const bundler = new Bundler(entryFile, {});

	const port = config.testbedPort;
	bundler.serve(port);

	let testProcess: ChildProcess | undefined;
	const onBundleFinished = () => {
		testProcess = spawn('yarn', ['test-watch'], {
			stdio: 'inherit',
		});

		bundler.off('bundled', onBundleFinished);
	}
	bundler.on('bundled', onBundleFinished);
	bundler.on('buildError', (err) => {
		if (testProcess) {
			testProcess.kill();
		}
		console.log(err);
	})
}
