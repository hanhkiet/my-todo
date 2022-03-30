import React from 'react';
import LoginPanel from '../components/login-panel.component';

class Login extends React.Component {
    render() {
        return (
            <div className=' h-screen w-screen bg-blue-200'>
                <LoginPanel />
            </div>
        );
    }
}

export default Login;