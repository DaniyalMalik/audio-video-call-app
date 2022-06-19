// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import PhoneIcon from '@mui/icons-material/Phone';
// import React, { useEffect, useRef, useState } from 'react';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import Peer from 'simple-peer';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:5000');

// function App() {
//   const [me, setMe] = useState('');
//   const [stream, setStream] = useState();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState('');
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [disabled, setDisabled] = useState(false);
//   const [idToCall, setIdToCall] = useState('');
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState('');
//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         myVideo.current.srcObject = stream;
//       });

//     socket.on('me', (id) => {
//       setMe(id);
//     });

//     socket.on('callUser', (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });

//     socket.on('callEnded', () => {
//       setCallEnded(true);
//       setIdToCall('');
//       setDisabled(false);
//       connectionRef.current.destroy();
//     });
//   }, []);

//   const callUser = () => {
//     if (!idToCall || !name) {
//       return alert('All fields are required!');
//     }

//     if (idToCall === me) {
//       return alert('You cannot call yourself!');
//     }

//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });
//     peer.on('signal', (data) => {
//       socket.emit('callUser', {
//         userToCall: idToCall,
//         signalData: data,
//         from: me,
//         name,
//       });
//     });
//     peer.on('stream', (stream) => {
//       userVideo.current.srcObject = stream;
//     });
//     socket.on('callAccepted', (data) => {
//       setIdToCall(data.from);
//       setCallAccepted(true);
//       setDisabled(true);
//       peer.signal(data.signal);
//     });

//     connectionRef.current = peer;
//   };

//   const answerCall = () => {
//     setCallAccepted(true);
//     setDisabled(true);

//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream: stream,
//     });
//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: caller, from: me });
//     });
//     peer.on('stream', (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     peer.signal(callerSignal);
//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     socket.emit('callEnding');
//     setDisabled(false);
//     setCallEnded(true);
//     setIdToCall('');
//     connectionRef.current.destroy();
//   };

//   return (
//     <>
//       {console.log(connectionRef, 'connectionRef')}
//       {console.log(me, 'me')}
//       {console.log(stream, 'stream')}
//       {console.log(receivingCall, 'receivingCall')}
//       {console.log(caller, 'caller')}
//       {console.log(callerSignal, 'callerSignal')}
//       {console.log(callAccepted, 'callAccepted')}
//       {console.log(idToCall, 'idToCall')}
//       {console.log(callEnded, 'callEnded')}
//       {console.log(name, 'name')}
//       {console.log(userVideo, 'userVideo')}
//       {console.log(myVideo, 'myVideo')}
//       <h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
//       <div className='container'>
//         <div className='video-container'>
//           <div className='video'>
//             {stream && (
//               <video
//                 playsInline
//                 muted
//                 ref={myVideo}
//                 autoPlay
//                 style={{ width: '300px' }}
//               />
//             )}
//           </div>
//           <div className='video'>
//             {callAccepted && !callEnded ? (
//               <video
//                 playsInline
//                 ref={userVideo}
//                 autoPlay
//                 style={{ width: '300px' }}
//               />
//             ) : null}
//           </div>
//         </div>
//         <div className='myId'>
//           <TextField
//             id='filled-basic'
//             label='Name'
//             variant='filled'
//             value={name}
//             disabled={disabled}
//             onChange={(e) => setName(e.target.value)}
//             style={{ marginBottom: '20px' }}
//           />
//           <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
//             <Button
//               variant='contained'
//               color='primary'
//               startIcon={<AssignmentIcon fontSize='large' />}>
//               Copy ID
//             </Button>
//           </CopyToClipboard>
//           <TextField
//             id='filled-basic'
//             label='ID to call'
//             variant='filled'
//             disabled={disabled}
//             value={idToCall}
//             onChange={(e) => setIdToCall(e.target.value)}
//           />
//           <div className='call-button'>
//             {callAccepted && !callEnded ? (
//               <Button variant='contained' color='secondary' onClick={leaveCall}>
//                 End Call
//               </Button>
//             ) : (
//               <IconButton
//                 color='primary'
//                 aria-label='call'
//                 onClick={() => callUser()}>
//                 <PhoneIcon fontSize='large' />
//               </IconButton>
//             )}
//           </div>
//         </div>
//         <div>
//           {receivingCall && !callAccepted ? (
//             <div className='caller'>
//               <h1>{name} is calling...</h1>
//               <Button variant='contained' color='primary' onClick={answerCall}>
//                 Answer
//               </Button>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
