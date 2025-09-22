import { useLocation } from "react-router-dom";

const Fixture = () => {
    const location = useLocation();
    const receivedData = location.state;
    console.log({receivedData});

    return (
    <div>
      <h1>Fixture Data: {receivedData.sn}</h1>
      <pre>
        <code>{JSON.stringify(receivedData, null, 2)}</code>
      </pre>
    </div>
    )
}

export default Fixture;