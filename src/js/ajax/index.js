import { render } from './render';
import history from './history-api';
import { startListening as request } from './request';

history();
request();

export default render;
