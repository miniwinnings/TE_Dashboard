import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const getAllFixtures = async () => {
      try {
        const res = await axios.get("/api/fixtures/");
        setFixtures(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllFixtures();
  }, []);

  console.log(fixtures);
  const test = {sn: "123", pn: "456"};

  return (
     <div>
        <h3>Fixtures</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>SN</th>
                    <th>PN</th>
                    <th>Model</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    fixtures.map((fixture)=>{
                        return (<tr key={`${fixture.id}`}>
                            <td>{fixture.id}</td>
                            <td>{fixture.sn}</td>
                            <td>{fixture.pn}</td>
                            <td>{fixture.model}</td>                        
                            <td>
                                <Link className='btn mx-2 btn-success'  
                                to={`/fixtures/${fixture.id}`}
                                state={fixture}
                                >
                                  Details</Link>                             
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
  );
};

export default Home;
