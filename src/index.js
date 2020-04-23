import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App';

import './styles/global.scss';

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'))

renderApp()

if (module.hot) {
    module.hot.accept('./components/App', () => { renderApp() });
}