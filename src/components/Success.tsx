import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import TestCall from "./TestCall";
import Testmemo from "./Testmemo";
import axios from 'axios'

const Success = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    // Access individual query parameters
    const code = queryParams.get('code');
    console.log(code, "========success==========");


    useEffect(() => {
        // handleLogin()
    }, []);

    const handleLogin = () => {
        axios.get(`https://37c1-120-72-93-91.ngrok.io/auth/google/callback?code=${code}`).then((res: any) => { // Replace with your backend URL

            console.log(res.data, '-----------res.data------------');

            // window.location = res.data;
        });
    };

    // const handleSignIn = async () => {
    //     try {
    //         console.log("------------------------");

    //         const gapi: any = (window as any).gapi;
    //         // Sign in with Google
    //         const auth2 = gapi.auth2.getAuthInstance();

    //         console.log(auth2, '----------auth2--------------');

    //         const googleUser = await auth2.signIn();

    //         console.log(googleUser, '----------googleUser-------------');

    //         // Get the Google idToken
    //         const idToken = googleUser.getAuthResponse().id_token;

    //         console.log(idToken, '========idToken=============');


    //         // Send the idToken to your backend
    //         await fetch('http://localhost:3013/api/v1/member/auth/google', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ idToken: idToken })
    //         });

    //         // Handle the response from the backend if needed
    //     } catch (error) {
    //         console.error('Error signing in:', error);
    //         // Handle error during Sign-In process
    //     }
    // };


    // useLayoutEffect(() => {
    //     console.log("========uselayout=================");
    // }, [])


    return (
        <div>
            <>
                Sample
                <button onClick={handleLogin}>increment</button>
                {/* </Link> */}
            </>
        </div>
    )
}

export default Success