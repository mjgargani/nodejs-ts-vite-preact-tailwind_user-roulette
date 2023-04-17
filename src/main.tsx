import { render } from 'preact';
import App from './app';
import './tailwind.css';
import './i18n';

render(<App />, document.getElementById('app')!);
