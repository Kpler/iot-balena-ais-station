import C from './config';
import UdpInputStream from "./components/inputStrean/UdpInputStream";
import OutputStream from "./components/outputStream/OutputStream";


const inputHost = C.app.input.host;
const inputPort = C.app.input.port;
const networkInput = new UdpInputStream();
networkInput.listen(inputPort, inputHost);

const outputHost: string = C.app.output.host;
const outputPort: number = C.app.output.port;
const outputStream = new OutputStream(outputPort, outputHost);

networkInput
    .pipe(outputStream);
