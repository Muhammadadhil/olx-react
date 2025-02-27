import { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { firebaseContext } from "../../store/Context";
import { collection, getDocs } from "firebase/firestore";
import { postContext } from "../../store/PostContext";
import {  useNavigate } from "react-router-dom";


function Posts() {

    const [products, setProducts] = useState([]);
    const { db } = useContext(firebaseContext);
    const {setPostDetails}=useContext(postContext);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                console.log("querySnapshot:::", querySnapshot);
                const allProducts = querySnapshot.docs.map((product) => ({
                    id: product.id,
                    ...product.data(),
                }));
                console.log("all products:", allProducts);
                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    
    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                {products.map((product) => (
                    <div className="cards" onClick={() => {
                        setPostDetails(product)
                        navigate("/viewpost");
                    }} key={product.id}>
                        <div className="card">
                            <div className="favorite">
                                <Heart></Heart>
                            </div>
                            <div className="image">
                                <img src={product.url} alt="" />
                            </div>
                            <div className="content">
                                <p className="rate"> {product.price}</p>
                                <span className="kilometer">{product.category}</span>
                                <p className="name"> </p>
                            </div>
                            <div className="date">
                                <span>Tue May 04 2021</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
