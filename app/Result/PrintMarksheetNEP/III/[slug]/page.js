"use client";
import React, { useState, useEffect } from "react";

export default function MarksheetPage({ params }) {
  const { slug } = React.use(params);

  const [studentData, setStudentData] = useState({
    name: "",
    rollNumber: "",
    enrollmentNo: "",
    fatherName: "",
    motherName: "",
    subjects: [],
    preGrd: 0,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getStudentData?rollNo=${slug}`);
      const data = await response.json();

      if (response.ok) {
        setStudentData({
          ...data,
          subjects: data.subjects || []
        });
      } else {
        setError(data.error);
      }

    };

    if (slug) {
      fetchData();
    }
  }, [slug]);
  const totalGrdVal = studentData.subjects.reduce((sum, sub) => sum + (sub.grdVal || 0), 0);
  // check if any subject has grade "F"
  const hasFail = studentData.subjects.some((sub) => sub.grd === "F");

  // determine result
  const result = hasFail ? "LATER" : "PASS";


  // calculate sgpa and cgpa
  const sgpa = (totalGrdVal / 25).toFixed(2);
  const cgpa = ((studentData.preGrd + totalGrdVal) / 71).toFixed(2); // assuming prev credits were 46

  if (studentData.name == "") {
    return <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Marksheet</title>

      <div className="container text-center my-3 d-flex justify-content-center gap-1">
        <input type="button" className="ContentButton noprint" value="Print" onClick={() => window.print()} />
        <input type="button" className="ContentButton noprint" value="Back" onClick={() => window.history.back()} />
      </div>
      <div className="container text-center marksheetNAGPG"></div>
    </>
  }

  return <>
    <section className="container-fluid">
      <div className="container text-center my-3 d-flex justify-content-center gap-1">
        <input type="button" className="ContentButton noprint" value="Print" onClick={() => window.print()} />
        <input type="button" className="ContentButton noprint" value="Back" onClick={() => window.close()} />
      </div>

      <div className="container text-center marksheetNAGPG">
        <div className="sessPG">APR-2025</div>
        <div className="yearPG">Class/Course - B.Sc. SEM-III</div>
        <div className="dataCPG">
          <div className="data2">
            <span className="">Candidate's Name : </span>
            <span className="RollCPG">Roll No. :</span>
          </div>
          <div className="data2">
            <span className="">Father's Name : </span>
            <span className="EnrollCPG">Enroll No. :</span>
          </div>
          <div className="data2">
            <span className="">Mother's Name : </span>
          </div>
          <div className="data2">
            <span className="">Institution's Name : </span>
          </div>
        </div>
        <div className="dataPG">
          <div className="data1">
            <span>{studentData.name}</span>
            <span className="sub-dataPG"><strong>{slug}</strong></span>
          </div>

          <div className="data1">
            <span>{studentData.fatherName}</span>
            <span className="sub-dataPG"><strong>{studentData.enrollmentNo}</strong></span>
          </div>
          <div className="data1">
            {studentData.motherName}
          </div>
          <div className="data1">
            GOVT DEGREE COLLEGE, NOIDA
          </div>
        </div>

        <table className="table table-bordered mark-tablePG printtable">
          <tbody>
            <tr>
              <th style={{ textAlign: "left", width: "40%" }}>COURSE TITLE</th>
              <th style={{ textAlign: "center", width: "3%" }}>CODE NO.</th>
              <th style={{ textAlign: "center", width: "4%" }}>MAX</th>
              <th style={{ textAlign: "center", width: "4%" }}>MIN</th>
              <th style={{ textAlign: "center", width: "4%" }}>EXT+INT</th>
              <th style={{ textAlign: "center", width: "2%" }}>TOTAL</th>
              <th style={{ textAlign: "center", width: "2%" }}>CRD.</th>
              <th style={{ textAlign: "center", width: "4%" }}>GRD.</th>
              <th style={{ textAlign: "center", width: "4%" }}>GRD PTS.</th>
              <th style={{ textAlign: "center", width: "4%" }}>GRD VAL.</th>
            </tr>

            {studentData.subjects && studentData.subjects.map(sub => (
              <tr key={sub.courseTitle} className="fw-bold">
                <td style={{ textAlign: "left" }}>{sub.courseTitle}</td>
                <td style={{ textAlign: "center" }}>{sub.codeNo}</td>
                <td style={{ textAlign: "center" }}>{sub.maxMarks}</td>
                <td style={{ textAlign: "center" }}>{sub.minMarks}</td>
                <td style={{ textAlign: "center" }}>{sub.extMarks}+{sub.intMarks}</td>
                <td style={{ textAlign: "center" }}>{sub.extMarks + sub.intMarks}</td>
                <td style={{ textAlign: "center" }}>{sub.crd}</td>
                <td style={{ textAlign: "center" }}>{sub.grd}</td>
                <td style={{ textAlign: "center" }}>{sub.grdPts}</td>
                <td style={{ textAlign: "center" }}>{sub.grdVal}</td>
              </tr>
            ))}

            <tr>
              <td colSpan="10">
                <table className="table table-bordered pgPrint">
                  <thead>
                    <tr>
                      <th>PREV.CRD.</th>
                      <th>CURR.CRD</th>
                      <th>G.TOT.
                        <br />
                        CRD.</th>
                      <th>
                        PREV.GRD.
                        <br />
                        VAL
                      </th>
                      <th>
                        CURR.GRD.
                        <br />
                        VAL
                      </th>
                      <th>G.TOT.GRD.
                        <br />
                        VAL.</th>
                      <th>S.G.P.A</th>
                      <th>C.G.P.A.</th>
                      <th>RESULT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fw-bold">
                      <td> 46</td>
                      <td>25</td>
                      <td> 71</td>
                      <td> {studentData.preGrd}</td>
                      <td>{totalGrdVal}</td>
                      <td>{studentData.preGrd + totalGrdVal}</td>
                      <td>{sgpa}</td>
                      <td>{cgpa}</td>
                      <td>{result}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="crdvalue">CRD. : CREDIT, GRD. : GRADE, GRD PTS. : GRADE POINTS, GRD VAL. : GRADE VALUE</div>
        <div className="noteNEP">Note: This is Computer generated marksheet. This does not require signature. In case of any discripency between the entries in the Marksheet issued &amp; in the university record then university record will be final.</div>
        <div className="resDatePG">Print Date : </div>
      </div>
    </section>

  </>
}
