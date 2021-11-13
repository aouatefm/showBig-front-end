// import React, {Component} from 'react';
//
// class Test extends Component {
//     render() {
//         return (
//             <div>
//                 <h1>ADMIN</h1>
//             </div>
//         );
//     }
// }
//
// export default Test;

// import { useToasts } from 'react-toast-notifications'
// import Button from "react-bootstrap/Button";
//
// export const ToastDemo = ({ content }) => {
//     const { addToast } = useToasts()
//     return (
//         <Button onClick={() => addToast(content, {
//             appearance: 'info',
//             autoDismiss: false,
//         })}>
//             Add Toast
//         </Button>
//     )
// }
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Button from "react-bootstrap/Button";

const FormWithToasts = () => {
    const { addToast } = useToasts();

    const onSubmit = async value => {
        
            addToast('Saved Successfully', { appearance: 'success' });
            };

    return <form onSubmit={onSubmit}><Button type="submit">OK</Button></form>;
};

export const ToastDemo = () => (
    <ToastProvider>
        <FormWithToasts />
    </ToastProvider>
);