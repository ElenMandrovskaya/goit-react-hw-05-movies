import { useEffect, useState, Suspense, lazy, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Actor } from "../components/Actors/Actors";
import { getActorsInfo } from "../services/apiService";
import { Spinner } from "../components/Spinner/Spinner";


export default function ActorPage() {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);
    const history = useHistory();
    // const location = useLocation();
    // const locationState = useRef(location.state?.from).current;
    // console.log(actorId)

     useEffect(() => {
        async function getActor() {
            try {
                const actor = await getActorsInfo(actorId);
                if (!actor) {
                    throw new Error("Page not found");
                }
                setActor(actor);
            } catch (error) {
                history.push("/");
                toast.warning("Page not found")
            }
        }
        getActor();
     }, [actorId, history]);
    
    return (
        <>
            {actor && <Actor
                photo={actor.profile_path}
                name={actor.name}
                place={actor.place_of_birth}
                bio={actor.biography}
                birthday={actor.birthday}
            />}
        </>    
    )
}