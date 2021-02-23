import React ,{useState} from 'react';
import {getCurrentUser, login,getToken} from "../../firebase/firebase.utils";

//  const SignInComponent = ()=> {
//      const [email,setEmail]= useState('')
//      const [password,setPassword]= useState('')
//      const [loading, setLoading] = useState(false)
//      const handleGoGo = async (e) => {
//          const user = await getCurrentUser()
//
//      }
//
//
//      const handleSubmit = async (e) => {
//          e.preventDefault()
//          let newUser;
//          setLoading(true)
//          try {
//              newUser = await login(email, password)
//              console.log(newUser)
//              await newUser.getIdToken().then(function(idToken) {
//                  console.log(idToken
//                  )
//              });
//          } catch (error) {
//              console.log(error)
//          }
//          if (newUser) {
//              console.log("*******")
//
//          }
//          else {
//              setLoading(false);
//              console.log("loading")
//
//          }
//      }
//      return (
//             <div>
//                 <div className='sign-in'>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             name='email'
//                             type='email'
//                             value={email}
//                             required
//                             onChange={e => setEmail(e.target.value)}
//                         />
//                         <input
//                             name='password'
//                             type='password'
//                             value={password}
//                             required
//                             onChange={e => setPassword(e.target.value)}
//                         />
//                         <div className='buttons'>
//                             <button type='submit'> Sign in </button>
//                             <button onClick={handleGoGo}> GoGo </button>
//
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         );
//
// }
//
// export default SignInComponent;