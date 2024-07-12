import { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { firebaseContext, AuthContext } from "../../store/Context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const { db, storage } = useContext(firebaseContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const date = new Date();

    const handleSubmit = async () => {
        if (!image) return;

        try {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            console.log("image url:", url);

            await addDoc(collection(db, "products"), {
                name,
                category,
                price,
                url,
                userId: user.uid,
                createAt: date.toDateString(),
            });

            navigate("/");
        } catch (error) {
            console.log("Error while uploading file:", error);
        }
    };

    return (
        <Fragment>
            <Header />
            <card>
                <div className="centerDiv">
                    <form>
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input className="input" type="text" id="fname" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <input className="input" type="text" id="fname" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <br />
                    </form>
                    <br />
                    <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>

                    <br />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" />
                    <br />
                    <button onClick={handleSubmit} className="uploadBtn">
                        upload and Submit
                    </button>
                </div>
            </card>
        </Fragment>
    );
};

export default Create;
