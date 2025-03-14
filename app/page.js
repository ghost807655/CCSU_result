"use client";

import { useState } from "react";

export default function Home() {
    const [rollNo, setRollNo] = useState("");
    const [studentData, setStudentData] = useState(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rollNo.trim()) {
            setLoading(true);
            try {
                const response = await fetch(`/api/getStudentData?rollNo=${rollNo}`);
                const data = await response.json();

                if (response.ok) {
                    setStudentData({
                        ...data,
                        subjects: data.subjects || []
                    });
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError("failed to fetch data");
            } finally {
                setLoading(false); // hide loading
            }
        }
    };

    return (
        <>

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}

            <meta httpEquiv="origin-trial"
                content="A/kargTFyk8MR5ueravczef/wIlTkbVk1qXQesp39nV+xNECPdLBVeYffxrM8TmZT6RArWGQVCJ0LRivD7glcAUAAACQeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZzIiLCJleHBpcnkiOjE3NDIzNDIzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Search Results - Result</title>

            <link href="/Content/css/printbba.css" rel="stylesheet" />

            <script src="https://www.google.com/recaptcha/api.js" async="" defer=""></script>
            <link href="/Content/css/bootstrap.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
            <link href="/Content/css/font-awesome.css" rel="stylesheet" />
            <link href="/Content/css/All.css" rel="stylesheet" />
            <link href="/Content/css/style.css" rel="stylesheet" />

            <header>

                <div className="navbar navbar-inverse set-radius-zero" style={{ backgroundColor: "white" }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-sm-10">
                                <div className="col-md-2 justify-content-center mt-2">
                                    <img alt="CCSU" src="/Content/Img/Logo.png" style={{ height: "100px" }} />
                                </div>
                                <div className="col-md-8 text-center" style={{ fontSize: "20px" }}>
                                    <b>चौधरी चरण सिंह विश्वविद्यालय, मेरठ</b><br />
                                    <b style={{ color: "Chocolate" }}>Chaudhary Charan Singh University, Meerut</b><br />
                                    <i style={{ color: "black", fontSize: "13.5px" }}>(Formerly, Meerut University) |</i> <i
                                        style={{ color: "#2773cb", fontSize: "13.5px" }}>NAAC A++ Accredited</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container body-content">
                <style>
                    {`
          a:link {
            color: blue;
          }
          a:visited {
            color: green;
          }
        `}
                </style>
                <form onSubmit={handleSubmit} id="form1">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12" style={{ textAlign: "center" }}>
                                <label htmlFor="rollNumber">Enter Roll Number:</label>&nbsp;
                            </div>
                            <div className="col-md-12">
                                <div className="form-group" style={{ textAlign: "center" }}>
                                    <input type="number" className="border border-dark rounded-sm px-1" value={rollNo} id="roll" name="roll" onChange={(e) => setRollNo(e.target.value)} style={{ appearance: "textfield" }} onWheel={(e) => e.target.blur()} />
                                </div>
                            </div>

                            <div className="flex justify-center">
                            <img alt="CCSU" src="/Content/Img/jock.jfif" style={{ height: "300px" }} />
                            </div>

                            <div className="col-md-12" style={{ verticalAlign: "middle", textAlign: "center" }}>
                                <span style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    <button type="submit" name="buttonClicked" value="NAG" className="btn">
                                        Search (NAG)
                                    </button>
                                    <button type="submit" name="buttonClicked" value="NEP" className="btn">
                                        Search (NEP)
                                    </button>
                                    <button type="submit" name="buttonClicked" value="NONNEP" className="btn">
                                        Search (NON-NEP)
                                    </button>
                                    <button type="submit" name="buttonClicked" value="BACK" className="btn">
                                        Search (BACK)
                                    </button>
                                </span>
                            </div>
                            <br />
                            {/* <hr /> */}

                            {/* student data section fetch on main site for view */}


                            {studentData ?
                                // <>
                                //     <h3 style={{ textAlign: "center", paddingTop: "15px" }}>Student Result</h3>
                                //     <div id="divmain">
                                //         <div>
                                //             <div style={{ textAlign: "center", fontSize: "12px" }}>
                                //                 <b>STATEMENT OF MARKS - EXAMINATION</b>
                                //             </div>
                                //             <table width="100%" style={{ fontSize: "12px" }}>
                                //                 <tbody>
                                //                     <tr>
                                //                         <td width="20%">Course Name </td>
                                //                         <td width="40%">
                                //                             <b>- &nbsp; B.Sc. SEM-I </b>
                                //                         </td>
                                //                         <td align="right" width="20%">Roll Number</td>
                                //                         <td width="20%">
                                //                             <b> &nbsp;&nbsp; - &nbsp;{studentData.rollNumber}</b>
                                //                         </td>
                                //                     </tr>
                                //                     <tr>
                                //                         <td>Name</td>
                                //                         <td>
                                //                             <b>-&nbsp;&nbsp;{studentData.name}</b>
                                //                         </td>
                                //                         <td width="20%" align="right">Enrollment Number</td>
                                //                         <td width="20%">
                                //                             <b> &nbsp;&nbsp; - &nbsp;{studentData.enrollmentNo}</b>
                                //                         </td>
                                //                     </tr>
                                //                     <tr>
                                //                         <td>Father Name &nbsp;</td>
                                //                         <td colSpan="3">
                                //                             <b> - &nbsp; {studentData.fatherName}</b>
                                //                         </td>
                                //                     </tr>
                                //                     <tr>
                                //                         <td>Mother Name &nbsp;</td>
                                //                         <td colSpan="3">
                                //                             <b> - &nbsp; {studentData.motherName}</b>
                                //                         </td>
                                //                     </tr>
                                //                     <tr>
                                //                         <td>Institution's Name </td>
                                //                         <td colSpan="3">
                                //                             <b> - &nbsp; GOVT DEGREE COLLEGE, NOIDA</b>
                                //                         </td>
                                //                     </tr>
                                //                 </tbody>
                                //             </table>
                                //             <hr />
                                //             <table className="table table-bordered table-striped">
                                //                 <tbody>
                                //                     <tr style={{ fontSize: "14px" }}>
                                //                         <td>
                                //                             <a
                                //                                 href={`/I/${studentData.rollNumber}.html`}
                                //                                 style={{ textDecoration: "none" }}
                                //                                 target="_blank"
                                //                                 rel="noopener noreferrer"
                                //                             >
                                //                                 COURSE-B.Sc. SEM-I- (DEC-2023)
                                //                             </a>
                                //                         </td>
                                //                     </tr>
                                //                     <tr style={{ fontSize: "14px" }}>
                                //                         <td>
                                //                             <a
                                //                                 href={`/II/${studentData.rollNumber}.html`}
                                //                                 style={{ textDecoration: "none" }}
                                //                                 target="_blank"
                                //                                 rel="noopener noreferrer"
                                //                             >
                                //                                 COURSE-B.Sc. SEM-II- (JUN-2024)
                                //                             </a>
                                //                         </td>
                                //                     </tr>
                                //                     <tr style={{ fontSize: "14px" }}>
                                //                         <td>
                                //                             <a
                                //                                 href={`/result/PrintMarksheetNEP/III/${studentData.rollNumber}`}
                                //                                 style={{ textDecoration: "none" }}
                                //                                 target="_blank"
                                //                                 rel="noopener noreferrer"
                                //                             >
                                //                                 COURSE-B.Sc. SEM-III- (DEC-2024)
                                //                             </a>
                                //                         </td>
                                //                     </tr>
                                //                 </tbody>
                                //             </table>
                                //         </div>
                                //     </div>
                                // </> 
                                <>
                                <h2 className="mt-2 pt-5 flex justify-center mb-56"> 😂😂😂😂😂😂 HOLI HAPPY HOLI 😂😂😂😂😂😂</h2>
                                </>
                                :""
                                }


                        </div>
                    </div>
                </form>
                {/* <hr /> */}
                <br />
                <footer>
                    <p>© 2025 - Chaudhary Charan Singh University, Meerut. All Rights Reserved.(379)</p>
                    <p className="text-black font-bold">This site maded by Vikesh & Abhishek ☠️☠️☠️☠️☠️😂😂(379)</p>
                </footer>
            </div>

        </>
    );
}
