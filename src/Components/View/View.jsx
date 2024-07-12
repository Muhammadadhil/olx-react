import { useContext, useEffect, useState } from "react";
import "./View.css";
import { postContext } from "../../store/PostContext";
import { firebaseContext } from "../../store/Context";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
// import { db } from '../../firebase/config';

function View() {
    const [userDatails, setUserDetails] = useState({});
    const { postDetails } = useContext(postContext);
    const { db } = useContext(firebaseContext);
    console.log('db:',db);
    console.log("Post Details : ", postDetails);

    useEffect(() => {
        const { userId } = postDetails;
        console.log("userId fromm userDetails Post context:", userId);

        const fetchUserDetails = async () => {
            try {
                const docRef = doc(db, "users", userId); // Referencing the document with userId
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    setUserDetails(docSnap.data()); // Setting user details to state
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <div className="viewParentDiv">
            <div className="imageShowDiv">
                <img src={postDetails.url} alt="product img" />
            </div>
            <div className="rightSection">
                <div className="productDetails">
                    <p>&#x20B9; {postDetails.price}</p>
                    <span>{postDetails.name}</span>
                    <p>{postDetails.category}</p>
                    <span>{postDetails.createdAt}</span>
                </div>

                <div className="contactDetails">
                    <p>Seller details</p>
                    <p>{userDatails.username}</p>
                    <p>{userDatails.phone}</p>
                </div>
            </div>
        </div>
    );
}
export default View;
