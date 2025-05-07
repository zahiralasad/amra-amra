import React from 'react';
import info1 from '../../images/picnic2025info.jpg';
import info2 from '../../images/indoorgames2025info.jpg';
import Banner from '../Banner/Banner';
import { Link } from "react-router-dom";

import "./home.css";

function Home() {
    return (
        <div className='row'>
            <Banner />
            <div className='row ms-1 mt-1'>
                <div className="text-center text-white">
                    <div className='row p-2'>
                        <div className='col px-2 pt-3 border-bottom'>
                            <p className='text-center'  style={{ fontSize: "clamp(12px, 2vw, 15px)" }}>
                                প্রতিবারের মতো আমরা-আমরা এবারও আমাদের সবাইকে নিয়ে পিকনিক আয়োজন করতে যাচ্ছে। 
                                খুব শিগ্রী রেজিষ্ট্রেণ ফর্ম ওপেন করা হব। <br/>                                
                                দিন - ২৬ এ জুলাই ২০২৫। <br/>
                                স্থান - <br/>
                                বাস ছাড়ার সময় - ৮টা ৩০।
                            </p>
                            
                                <Link className="btn" type="button" to='/registertopicnic'  style={{ fontSize: "clamp(12px, 2vw, 15px)", backgroundColor: "red", color: "white"}}>Register</Link>
                            

                        </div>
                        <div className='col info-frame p-2'>
                            <img className="Banner-top-row" src={info1} />
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col info-frame p-2'>
                            <img className="Banner-top-row" src={info2} />
                        </div>
                        <div className='col  px-5 pt-3 fs-6'>
                            <p className='text-center'  style={{ fontSize: "clamp(12px, 2vw, 15px)" }}>
                                গত ৫ই এপ্রিল ২০২৫, আমরা-আমরা এর পক্ষ থেকে একটি Indoor games প্রতিযোগিতা আয়োজন করা হয়। 
                                সবার আন্তরিক সহযোগিতা ও অংশগ্রহণে ইভেন্টটি আমরা সফল ভাবে সম্পন্ন করতে পেরেছ। <br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;