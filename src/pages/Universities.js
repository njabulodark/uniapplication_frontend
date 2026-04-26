import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { host } from "../components/variables";

export default function Universities() {
    const [data, setData] = useState({});

    useEffect(() => {
        const handleSubmit = async () => {
            const value = await axios.post(host+"/api/userInfo2", {"id": localStorage.getItem("userId")});
            setData(value.data.data[0]);
        }
        handleSubmit();
    }, []);

  return (
    <>
    <Navbar />
    <main>
    <div className="container">
        <section className="mx-auto my-5" >
            {(data === undefined)? (
                <><div style={{height: '80vh'}}></div></>):
            (
            <div className="row">
                <div className="col-md-6" style={{maxWidth: "clamp(280px, 95%, 350px)"}}>  
                    <Card imageUrl="https://www.universityinfo.co.za/schools/uj.png" UniName="University of Johannesburg" nav="/application/course/uj" list={{ [data["uj_faculty1"]]: data["uj_course1"], [data["uj_faculty2"]]: data["uj_course2"] }} />
                </div>
                <div className="col-md-6" style={{maxWidth: "clamp(280px, 95%, 350px)"}}>  
                    <Card imageUrl="https://services.nwu.ac.za/sites/services.nwu.ac.za/files/files/designs-branding/NWU-holding-shape-digital-white.png" nav="/application/course/nwu" UniName="North-West University (NWU)" list={{ [data["nwu_campus1"]]: data["nwu_course1"], [data["nwu_campus2"]]: data["nwu_course2"] }} />
                </div>
                <div className="col-md-6" style={{maxWidth: "clamp(280px, 95%, 350px)"}}>  
                    <Card imageUrl="https://www.universityinfo.co.za/schools/ufs.png" UniName="University of Free State (UFS)" list={{ [data["ufs_faculty1"]]: data["ufs_course1"], [data["ufs_faculty2"]]: data["ufs_course2"] }} />
                </div>
            </div>
            )
            }
        </section>
    </div>
    </main>
    <Footer />

    </>
  )
}
